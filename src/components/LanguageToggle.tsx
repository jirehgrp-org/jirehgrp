// @/components/LanguageToggle.tsx

"use client";

import Link from "next/link";
import type { SiteLanguage } from "@/content/home";

type LanguageToggleProps = {
  language: SiteLanguage;
  variant?: "light" | "dark";
};

export default function LanguageToggle({
  language,
  variant = "light",
}: LanguageToggleProps) {
  const isAmharic = language === "am";
  const targetLanguage: SiteLanguage = isAmharic ? "en" : "am";
  const targetHref = isAmharic ? "/" : "/am";

  return (
    <Link
      href={targetHref}
      hrefLang={targetLanguage}
      lang={targetLanguage}
      className={`language-toggle ${
        variant === "dark" ? "language-toggle--dark" : ""
      }`}
      aria-label={
        isAmharic
          ? "Switch website language to English"
          : "የድረ ገጹን ቋንቋ ወደ አማርኛ ቀይር"
      }
    >
      <span className="language-toggle__current">
        {isAmharic ? "አማ" : "EN"}
      </span>
      <span aria-hidden="true">/</span>
      <span className="language-toggle__target">
        {isAmharic ? "EN" : "አማ"}
      </span>
    </Link>
  );
}
