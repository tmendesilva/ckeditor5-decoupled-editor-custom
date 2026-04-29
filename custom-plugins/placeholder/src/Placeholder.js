/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { Plugin } from "ckeditor5";
import PlaceholderEditing from "./PlaceholderEditing.js";
import PlaceholderUI from "./PlaceholderUI.js";

export default class Placeholder extends Plugin {
  static get pluginName() {
    return "Placeholder";
  }

  static get requires() {
    return [PlaceholderEditing, PlaceholderUI];
  }
}
