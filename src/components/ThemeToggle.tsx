// @/components/ThemeToggle.tsx

"use client";

import { IconSun, IconMoon } from "@tabler/icons-react";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useSitePreferences();

  return (
    <button
      type="button"
      className="toggle-btn icon-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <IconMoon size={16} stroke={1.5} />
      ) : (
        <IconSun size={16} stroke={1.5} />
      )}
    </button>
  );
}