// @/components/LanguageToggle.tsx

"use client";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useSitePreferences();

  return (
    <button type="button" className="toggle-btn" onClick={toggleLanguage}>
      {language === "en" ? "lang / en" : "lang / am"}
    </button>
  );
}