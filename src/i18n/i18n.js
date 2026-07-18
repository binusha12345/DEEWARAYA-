import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: {} },
    si: { translation: {} },
  },
  lng: localStorage.getItem("language") || "en", // ✅ Load saved language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;