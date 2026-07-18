// client/src/components/LanguageSwitcher.jsx

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const changeLanguage = (lang) => {
    if (lang === currentLang) return; // Same language, do nothing

    localStorage.setItem("language", lang);

    // ✅ Reload page for BOTH directions (clean & reliable)
    // - EN → SI: Page loads in EN, then auto-translates
    // - SI → EN: Page loads fresh in EN
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 notranslate">
      <FaGlobe className="text-white/70" />
      <div className="flex rounded-lg overflow-hidden border border-white/20">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1.5 text-sm font-semibold transition-all ${
            currentLang === "en"
              ? "bg-white text-blue-700"
              : "text-white/80 hover:bg-white/10"
          }`}
        >
          🇬🇧 EN
        </button>
        <button
          onClick={() => changeLanguage("si")}
          className={`px-3 py-1.5 text-sm font-semibold transition-all ${
            currentLang === "si"
              ? "bg-white text-blue-700"
              : "text-white/80 hover:bg-white/10"
          }`}
        >
          🇱🇰 සිං
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;