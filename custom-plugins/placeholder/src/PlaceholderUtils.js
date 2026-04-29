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

/**
 * Checks if a view element is an unsolved, non-fixed placeholder
 * @param {Object} viewElement - View element to check
 * @returns {boolean} - True if element is a valid unsolved placeholder
 */
function isSolvedPlaceholder(viewElement) {
  return (
    viewElement.hasClass("placeholder") &&
    !viewElement.getAttribute("data-is-fixed") &&
    viewElement.getAttribute("data-is-solved")
  );
}

export function nextPlaceholder(editor, fromStart) {
  const ckView = editor.editing.view;
  const ckDocument = ckView.document;
  const currentNode = ckDocument.selection.getLastRange().end.parent;

  const position = new ViewPosition(
    currentNode.isEmpty || fromStart ? ckDocument.getRoot() : currentNode,
    0,
  );
  const walker = new ViewTreeWalker({
    startPosition: position,
  });

  for (const element of walker) {
    if (element.type !== "elementStart") {
      continue;
    }
    const item = element.item;

    // Debug: Log all placeholder elements found
    if (!item.hasClass("placeholder")) {
      continue;
    }

    if (isSolvedPlaceholder(item)) {
      continue;
    }

    const modelElement = editor.editing.mapper.toModelElement(item);
    if (!modelElement) {
      continue;
    }

    editor.model.change((writer) => {
      writer.setSelection(modelElement, "in");
    });

    // Call the plugin's openBalloon method directly
    try {
      const domTarget = ckView.domConverter.viewToDom(item, ckDocument);
      const data = {
        target: item,
        domTarget,
      };

      const placeholderPlugin = editor.plugins.get("PlaceholderEditing");
      placeholderPlugin.openBalloon(data);
      return true;
    } catch (error) {
      console.error("Error calling openBalloon method:", error);
      return false;
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
