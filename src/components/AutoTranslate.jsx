// client/src/components/AutoTranslate.jsx

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";

const translationCache = new Map();

const AutoTranslate = ({ children }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const containerRef = useRef(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const currentLang = i18n.language;

    // ✅ Only translate if not English (English is default page state)
    if (currentLang === "en") return;

    const timer = setTimeout(() => {
      translatePage(currentLang);
    }, 300);

    return () => clearTimeout(timer);
  }, [i18n.language, location.pathname]);

  const getAllTextNodes = (element) => {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          const skipTags = [
            "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE",
            "INPUT", "TEXTAREA",
          ];
          if (skipTags.includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (parent.closest(".notranslate")) return NodeFilter.FILTER_REJECT;

          const text = node.textContent.trim();
          if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
          if (/^[\d\s\W]+$/.test(text)) return NodeFilter.FILTER_REJECT;

          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }
    return nodes;
  };

  const translatePage = async (targetLang) => {
    if (!containerRef.current) return;

    setIsTranslating(true);
    const textNodes = getAllTextNodes(containerRef.current);
    const textsToTranslate = [];
    const nodesMap = [];

    textNodes.forEach((node) => {
      const originalText = node.textContent.trim();
      const cacheKey = `${originalText}_${targetLang}`;

      if (translationCache.has(cacheKey)) {
        node.textContent = translationCache.get(cacheKey);
      } else {
        textsToTranslate.push(originalText);
        nodesMap.push(node);
      }
    });

    if (textsToTranslate.length === 0) {
      setIsTranslating(false);
      return;
    }

    try {
      console.log(`🌐 Translating ${textsToTranslate.length} texts to ${targetLang}...`);

      const response = await api.post("/translate/batch", {
        texts: textsToTranslate,
        to: targetLang,
      });

      const translations = response.data.translations;

      translations.forEach((translated, index) => {
        const node = nodesMap[index];
        const original = textsToTranslate[index];

        if (node && translated) {
          node.textContent = translated;
          translationCache.set(`${original}_${targetLang}`, translated);
        }
      });

      console.log("✅ Translation complete!");
    } catch (error) {
      console.error("❌ Translation failed:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <>
      {isTranslating && (
        <div className="fixed top-4 right-4 z-[9999] bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 notranslate">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Translating...</span>
        </div>
      )}
      <div ref={containerRef}>{children}</div>
    </>
  );
};

export default AutoTranslate;