import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView,
  submitHandler,
} from "ckeditor5";

export default class GeminiFormView extends View {
  constructor(locale) {
    super(locale);

    this.setInputView = this._createInputView();
    this.saveButtonView = this._createButton("Generate", "ck-button-action");
    this.cancelButtonView = this._createButton("Cancel", "ck-button-cancel");

    this.set("isExecuting", false);
    this.saveButtonView
      .bind("isEnabled")
      .to(this, "isExecuting", (isExecuting) => !isExecuting);

    this.childViews = this.createCollection([
      this.setInputView,
      this.saveButtonView,
      this.cancelButtonView,
    ]);

    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-gemini-form"],
        tabindex: "-1",
      },
      children: this.childViews,
    });
  }

  render() {
    super.render();

    submitHandler({
      view: this,
    });
  }

  focus() {
    this.setInputView.focus();
  }

  _createInputView() {
    const locale = this.locale;
    const labeledInput = new LabeledFieldView(locale, createLabeledInputText);

    labeledInput.label = "Ask Gemini:";

    return labeledInput;
  }

  _createButton(label, className) {
    const view = new ButtonView(this.locale);

    view.set({
      label,
      withText: true,
      tooltip: true,
    });

    view.extendTemplate({
      attributes: {
        class: className,
      },
    });

    if (className === "ck-button-cancel") {
      view.on("execute", () => this.fire("cancel"));
    }

    return view;
  }
}
