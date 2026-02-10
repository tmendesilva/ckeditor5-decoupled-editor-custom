import { Plugin } from "ckeditor5";

export default class CustomFontFamilyUI extends Plugin {
  init() {
    this.editor.ui.componentFactory.add("fontFamilyDropdown", () => {
      const editor = this.editor;

      const command = editor.commands.get("fontFamily");

      // Use original fontFamily button - we only changes its behavior.
      const dropdownView = editor.ui.componentFactory.create("fontFamily");

      // Show label on dropdown's button.
      dropdownView.buttonView.set("withText", true);

      // To hide the icon uncomment below.
      dropdownView.buttonView.set("icon", false);

      // Bind dropdown's button label to fontFamily value.
      dropdownView.buttonView.bind("label").to(command, "value", (value) => {
        // If no value is set on the command show 'Default' text.
        // Use t() method to make that string translatable.
        return value || "Arial";
      });

      return dropdownView;
    });
  }
}
