import {
  ButtonView,
  ContextualBalloon,
  Plugin,
  clickOutsideHandler,
} from "ckeditor5";
import GeminiFormView from "./geminiformview.js";
import sparklesIcon from "./theme/icons/sparkles.svg?raw";
import spinnerIcon from "./theme/icons/spinner.svg?raw";

export default class GeminiUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const t = editor.t;

    this._balloon = editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView();

    editor.ui.componentFactory.add("gemini", (locale) => {
      const view = new ButtonView(locale);
      const command = editor.commands.get("generateGemini");

      view.set({
        label: t("Artificial Intelligence"),
        tooltip: true,
        class: "ck-gemini-button",
      });

      view
        .bind("icon")
        .to(command, "isExecuting", (isExecuting) =>
          isExecuting ? spinnerIcon : sparklesIcon,
        );
      view
        .bind("isEnabled")
        .to(command, "isExecuting", (isExecuting) => !isExecuting);

      // Add spinning animation class when loading
      view.iconView
        .bind("class")
        .to(command, "isExecuting", (isExecuting) =>
          isExecuting ? "ck-icon_spinning" : "",
        );

      // Central Loading Overlay
      this._overlay = document.createElement("div");
      this._overlay.className = "ck-gemini-overlay";
      this._overlay.innerHTML = `<div class="ck-gemini-spinner">${spinnerIcon}</div>`;

      command.on("change:isExecuting", (evt, propertyName, isExecuting) => {
        const container = editor.ui.view.editable.element.parentElement;
        if (isExecuting) {
          container.style.position = "relative";
          container.appendChild(this._overlay);
        } else {
          if (this._overlay.parentNode) {
            this._overlay.parentNode.removeChild(this._overlay);
          }
        }
      });

      // Show the balloon on click
      this.listenTo(view, "execute", () => {
        this._showUI();
      });

      return view;
    });

    // Close the balloon when clicking outside
    clickOutsideHandler({
      emitter: this.formView,
      activator: () => this._balloon.visibleView === this.formView,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideUI(),
    });
  }

  _createFormView() {
    const editor = this.editor;
    const formView = new GeminiFormView(editor.locale);

    this.listenTo(formView, "submit", () => {
      const prompt = formView.setInputView.fieldView.element.value;

      editor.execute("generateGemini", { prompt });
      this._hideUI();
      editor.editing.view.focus();
    });

    this.listenTo(formView, "cancel", () => {
      this._hideUI();
      editor.editing.view.focus();
    });

    return formView;
  }

  _showUI() {
    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData(),
    });

    this.formView.focus();
  }

  _hideUI() {
    this.formView.setInputView.fieldView.element.value = "";
    this._balloon.remove(this.formView);
  }

  _getBalloonPositionData() {
    const editor = this.editor;
    const view = editor.editing.view;
    const viewRange = view.document.selection.getFirstRange();

    return {
      target: view.domConverter.viewRangeToDom(viewRange),
    };
  }
}
