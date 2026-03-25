// Custom translations for local plugins (gemini, placeholder)
if (!window.CKEDITOR_TRANSLATIONS) {
  window.CKEDITOR_TRANSLATIONS = {};
}
if (!window.CKEDITOR_TRANSLATIONS["pt"]) {
  window.CKEDITOR_TRANSLATIONS["pt"] = { dictionary: {}, getPluralForm: null };
}

Object.assign(window.CKEDITOR_TRANSLATIONS["pt"].dictionary, {
  "Artificial Intelligence": "Inteligência Artificial",
  "Qual tipo de documento deseja criar?":
    "Qual tipo de documento deseja criar?",
  Generate: "Gerar",
  Cancel: "Cancelar",
});
