/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// Add eventos
import { ViewPosition, ViewTreeWalker } from "ckeditor5";

export function addCustomEvents(editor) {
  // Utiliza F6 para avançar variaveis
  editor.keystrokes.set("F6", (data, stop) => {
    stop();
    data.preventDefault();
    data.stopPropagation();
    nextPlaceholder(editor, true);
  });
}

export function nextPlaceholder(editor, fromStart) {
  const ckView = editor.editing.view;
  const ckDocument = ckView.document;
  const currentNode = ckDocument.selection.getLastRange().end.parent;

  const position = new ViewPosition(
    currentNode.isEmpty || fromStart ? ckDocument.getRoot() : currentNode,
    0
  );
  const walker = new ViewTreeWalker({
    startPosition: position,
  });
  for (const element of walker) {
    if (element.type === "elementStart") {
      const item = element.item;
      if (
        item.hasClass("placeholder") &&
        item.hasAttribute("data-is-fixed") &&
        !item.getAttribute("data-is-fixed") &&
        !item.getAttribute("data-is-solved")
      ) {
        const modelElement = editor.editing.mapper.toModelElement(item);
        editor.model.change((writer) => {
          writer.setSelection(modelElement, "in");
        });
        const domConverter = ckView.domConverter;
        domConverter.viewToDom(item, ckDocument).click();
        return true;
      }
    }
  }
  if (!fromStart) {
    nextPlaceholder(editor, true);
    return true;
  }
  return false;
}

/**
 * @return {boolean}
 */
export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
