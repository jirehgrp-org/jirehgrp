// @/components/common/ThemeContext.tsx

"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTheme as useNextTheme } from "next-themes";

type ThemeContextType = {
  theme: string | undefined;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  if (!mounted) return null;

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme,
        isDark: resolvedTheme === "dark",
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
