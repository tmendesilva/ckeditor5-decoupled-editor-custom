/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { Command } from "ckeditor5";
import { addCustomEvents } from "./PlaceholderUtils.js";

export default class PlaceholderCommand extends Command {
  execute(item) {
    const editor = this.editor;
    editor.model.change((writer) => {
      const placeholder = writer.createElement(
        item.is_block ? "placeholderBlock" : "placeholder",
        {
          name: item.name,
          attr: item.attr ? item.attr : "",
          value: item.is_solved ? item.value : "",
          isFixed: item.is_fixed ? 1 : "",
          isSolved: item.is_solved ? 1 : "",
          isBlock: item.is_block ? 1 : "",
          options: item.options ? JSON.stringify(item.options) : "",
          style: `font-size: ${editor.config.get("defaultFontSize")}pt`,
        }
      );

      // ... and insert it into the document.
      editor.model.insertContent(placeholder);

      // Put the selection after inserted element.
      writer.setSelection(placeholder, "after");
    });
    addCustomEvents(editor);
  }

  refresh() {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    addCustomEvents(editor);
    this.isEnabled =
      model.schema.checkChild(selection.focus.parent, "placeholder") ||
      model.schema.checkChild(selection.focus.parent, "placeholderBlock");
  }
}
