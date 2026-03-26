import { Command, Plugin } from "ckeditor5";

export default class GeminiEditing extends Plugin {
  init() {
    this._defineCommand();
  }

  _defineCommand() {
    const editor = this.editor;
    editor.commands.add("generateGemini", new GeminiCommand(editor));
  }
}

class GeminiCommand extends Command {
  constructor(editor) {
    super(editor);
    this.set("isExecuting", false);
  }

  execute(options = {}) {
    const editor = this.editor;
    const { prompt = "" } = options;
    const selection = editor.model.document.selection;
    let selectedText = "";
    const range = selection.getFirstRange();

    if (range) {
      for (const item of range.getItems()) {
        if (item.is("$text") || item.is("$textProxy")) {
          selectedText += item.data;
        }
      }
    }

    if (!selectedText && !prompt) {
      return;
    }

    const variables = editor.config.get("variables") || [];
    let variablesContext = "";
    if (variables.length > 0) {
      variablesContext =
        "\n\nYou can use the following variables by wrapping their key exactly in curly braces, e.g. {" +
        variables[0].attr +
        "}:\n" +
        variables.map((v) => `- {${v.attr}}`).join("\n");
    }

    const finalPrompt = prompt
      ? `${prompt}\n\nContext:\n${selectedText}${variablesContext}`
      : `${selectedText}${variablesContext}`;

    const API_URL = editor.config.get("promptApiUrl");

    if (!API_URL) {
      console.error("Prompt API URL is missing.");
      return;
    }

    this.isExecuting = true;
    editor.enableReadOnlyMode("gemini");

    fetch(API_URL, {
      method: "POST",
      body: new URLSearchParams({
        prompt: finalPrompt,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${editor.config.get("user")}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialData = "";
        let accumulatedText = "";

        // Ensure we know where to insert. We capture the current selection before starting.
        let insertPosition = editor.model.document.selection.getFirstPosition();
        let lastInsertedRange = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          partialData += chunk;

          const lines = partialData.split("\n");
          // Keep the last partial line
          partialData = lines.pop();

          let newContent = "";
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.text) {
                  newContent += data.text;
                }
              } catch (e) {
                console.error("Error parsing streaming JSON:", e);
              }
            }
          }

          if (newContent) {
            accumulatedText += newContent;

            let textToParse = accumulatedText;

            if (variables && variables.length > 0) {
              variables.forEach((variable) => {
                const escapedAttr = variable.attr.replace(
                  /[.*+?^${}()|[\]\\]/g,
                  "\\$&"
                );
                // Match exact {attr} format
                const regex = new RegExp(`\\{${escapedAttr}\\}`, "g");

                const spanHtml = variable.is_block
                  ? `<figure class="placeholder-block" data-is-block="${
                      variable.is_block
                    }" data-name="${variable.name}" data-attr="${
                      variable.attr
                    }" data-value="${variable.value || ""}" data-is-fixed="${
                      variable.is_fixed
                    }" data-is-solved="${variable.is_solved}" data-options="${
                      variable.options || ""
                    }"></figure>`
                  : `<span class="placeholder" data-is-block="${
                      variable.is_block
                    }" data-name="${variable.name}" data-attr="${
                      variable.attr
                    }" data-value="${variable.value || ""}" data-is-fixed="${
                      variable.is_fixed
                    }" data-is-solved="${variable.is_solved}" data-options="${
                      variable.options || ""
                    }"></span>`;

                textToParse = textToParse.replace(regex, spanHtml);
              });
            }

            editor.model.change((writer) => {
              // Parse the entire accumulated markdown/html
              const viewFragment = editor.data.processor.toView(textToParse);
              const modelFragment = editor.data.toModel(viewFragment);

              // If we already inserted something, remove it
              if (lastInsertedRange) {
                writer.remove(lastInsertedRange);
              }

              // Insert the newly parsed content at the original position
              lastInsertedRange = editor.model.insertContent(
                modelFragment,
                insertPosition
              );

              // update insertPosition to the start of the newly inserted content
              // so next time we insert at the same place
              insertPosition = lastInsertedRange.start;
            });
          }
        }
      })
      .catch((error) => {
        console.error("Gemini API error:", error);
      })
      .finally(() => {
        this.isExecuting = false;
        editor.disableReadOnlyMode("gemini");
      });
  }
}
