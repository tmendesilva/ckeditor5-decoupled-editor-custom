/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoDgNARATAdAnDAjBSBWKBmA7NuiAMOAbBvoogCxFFSVH75VFaJapxEGoEMgoQAHAC4oMYYIjCTpUsPgC6kCgCMMAUxUATCPKA==
 */

import {
  Alignment,
  AutoImage,
  Autoformat,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  CloudServices,
  DecoupledEditor,
  Emoji,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsertViaUrl,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PlainTableOutput,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
} from "ckeditor5";

// Custom plugins
import CustomFontFamilyUI from "./custom-plugins/custom-font-ui/src/CustomFontFamilyUI.js";
import CustomFontSizeUI from "./custom-plugins/custom-font-ui/src/CustomFontSizeUI.js";
import GeminiEditing from "./custom-plugins/gemini/geminiediting.js";
import GeminiUI from "./custom-plugins/gemini/geminiui.js";
import Placeholder from "./custom-plugins/placeholder/src/Placeholder.js";

import translations from "ckeditor5/translations/pt.js";
import "./custom-translations.js";

import "ckeditor5/ckeditor5.css";

import "./style.css";

export default class CustomDecoupledEditor extends DecoupledEditor {
  /**
   * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
   */
  static LICENSE_KEY = "GPL"; // or <YOUR_LICENSE_KEY>.

  static editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "fontFamilyDropdown",
        "|",
        "fontSizeDropdown",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "alignment:left",
        "alignment:center",
        "alignment:right",
        "alignment:justify",
        "|",
        "link",
        "insertTable",
        "blockQuote",
        "|",
        "gemini",
        "placeholder",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      Alignment,
      Autoformat,
      AutoImage,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      BlockToolbar,
      Bold,
      CloudServices,
      Emoji,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Fullscreen,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageEditing,
      ImageInline,
      ImageInsertViaUrl,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImageUtils,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      MediaEmbed,
      Mention,
      Paragraph,
      PlainTableOutput,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Heading,

      // Custom
      CustomFontSizeUI,
      CustomFontFamilyUI,
      Placeholder,
      GeminiEditing,
      GeminiUI,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "|",
      "bulletedList",
      "numberedList",
    ],
    blockToolbar: [
      "|",
      "fontFamilyDropdown",
      "|",
      "fontSizeDropdown",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      "insertTable",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
    fontFamily: {
      options: [
        "Arial",
        "Courier New",
        "Georgia",
        "Lucida Sans Unicode",
        "Tahoma",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana",
      ],
    },
    fontSize: {
      options: [
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "18",
        "20",
        "22",
        "24",
        "26",
        "28",
        "36",
        "48",
      ].map((val) => ({
        model: parseInt(val),
        title: val,
        view: {
          name: "span",
          styles: {
            "font-size": `${val}pt`,
          },
        },
      })),
    },
    fullscreen: {
      onEnterCallback: (container) =>
        container.classList.add(
          "editor-container",
          "editor-container_document-editor",
          "editor-container_include-fullscreen",
          "main-container"
        ),
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
      ],
    },
    // initialData:
    //   '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
    language: "pt",
    licenseKey: CustomDecoupledEditor.LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    mention: {
      feeds: [
        {
          marker: "@",
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ],
        },
      ],
    },
    placeholder: "Digite ou cole o seu conteúdo aqui.",
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    translations: [translations],
  };
}
