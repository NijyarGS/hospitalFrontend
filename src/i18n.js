import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import en from "../public/locales/en/translation.json";
import ar from "../public/locales/ar/translation.json";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "ar",
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  interpolation: {
    escapeValue: false,
  },
  detection: {
    // order: ["localStorage", "cookie", "navigator"],
    // caches: ["localStorage", "cookie"],
  },
});
export default i18next;
