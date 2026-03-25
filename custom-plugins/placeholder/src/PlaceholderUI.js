/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import {
  Plugin,
  addListToDropdown,
  createDropdown,
  Collection,
  UIModel,
} from "ckeditor5";
import "../css/placeholder.css";
import fixedIcon from "../icon/fixed.svg?raw";
import keyboardIcon from "../icon/keyboard.svg?raw";
import listIcon from "../icon/list.svg?raw";
import placeholderIcon from "../icon/placeholder.svg?raw";

export default class PlaceholderUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    // The "placeholder" dropdown must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add("placeholder", (locale) => {
      const dropdownView = createDropdown(locale);

      dropdownView.buttonView.set({
        icon: placeholderIcon,
        label: t("Variáveis"),
        tooltip: true,
        class: "bg-light",
      });

      const variables = editor.config.get("variables") || [];

      // Drop menu para esquerda
      dropdownView.panelPosition = "sw";
      dropdownView.class = "placeholder-dropdown";

      // Utilizado para desabilitar widget no modo readOnly
      const command = editor.commands.get("placeholder");
      dropdownView.bind("isEnabled").to(command);

      // Populate the list in the dropdown with items.
      addListToDropdown(dropdownView, getDropdownItemsDefinitions(variables));

      // Execute the command when the dropdown item is clicked (executed).
      this.listenTo(dropdownView, "execute", (evt) => {
        editor.execute("placeholder", evt.source.commandParam);
        editor.editing.view.focus();
      });

      return dropdownView;
    });
  }
}

/**
 *
 * @param variables
 * @returns {Collection}
 */
function getDropdownItemsDefinitions(variables) {
  const collection = new Collection();
  collection.add({
    type: "button",
    model: new UIModel({
      icon: keyboardIcon,
      withText: true,
      label: "VARIÁVEL LIVRE",
      attr: "empty",
      commandParam: {
        name: "VARIÁVEL LIVRE",
        attr: "empty",
        is_fixed: false,
        is_solved: false,
        value: null,
        options: null,
      },
    }),
  });
  variables.forEach((variable) => {
    collection.add({
      type: "button",
      model: new UIModel({
        icon: variable.is_fixed ? fixedIcon : listIcon,
        withText: true,
        label: variable.name,
        attr: variable.attribute,
        commandParam: variable,
      }),
    });
  });
  return collection;
}
