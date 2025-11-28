import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import JSON files
import en from "./en/AddStudent.json";
import ar from "./ar/AddStudent.json";

i18n
  .use(LanguageDetector) // auto-detect browser language
  .use(initReactI18next) // bind i18n to react
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
