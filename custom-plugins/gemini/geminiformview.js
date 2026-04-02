import {
  ButtonView,
  LabeledFieldView,
  View,
  createLabeledTextarea,
  submitHandler,
} from "ckeditor5";

export default class GeminiFormView extends View {
  constructor(locale) {
    super(locale);

    const t = locale.t;

    this.setInputView = this._createInputView();
    this.saveButtonView = this._createButton(t("Gerar"), "ck-button-action");
    this.cancelButtonView = this._createButton(
      t("Cancelar"),
      "ck-button-cancel"
    );

    this.set("isExecuting", false);
    this.saveButtonView
      .bind("isEnabled")
      .to(this, "isExecuting", (isExecuting) => !isExecuting);

    // Create separate collections for input and buttons
    this.inputViews = this.createCollection([this.setInputView]);

    this.buttonViews = this.createCollection([
      this.cancelButtonView,
      this.saveButtonView,
    ]);

    this.childViews = this.createCollection([
      this.inputViews,
      this.buttonViews,
    ]);

    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-gemini-form"],
        tabindex: "-1",
      },
      children: [
        {
          tag: "div",
          attributes: {
            class: ["ck-gemini-form__input-group"],
          },
          children: this.inputViews,
        },
        {
          tag: "div",
          attributes: {
            class: ["ck-gemini-form__button-group"],
          },
          children: this.buttonViews,
        },
      ],
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
    const labeledInput = new LabeledFieldView(locale, createLabeledTextarea);

    labeledInput.label = "Qual tipo de documento deseja criar?";

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
        type: className === "ck-button-action" ? "submit" : "button",
      },
    });

    if (className === "ck-button-cancel") {
      view.on("execute", () => this.fire("cancel"));
    }

    return view;
  }
}
