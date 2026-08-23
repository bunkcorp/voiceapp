"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  persistTheme,
  readStoredTheme,
  subscribeTheme,
  type ThemePreference,
} from "@/lib/theme";

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(
    () => readStoredTheme()
  );

  useLayoutEffect(() => {
    applyTheme(preference);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystem = () => {
      if (readStoredTheme() === "system") {
        applyTheme("system");
      }
    };

    const syncStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== THEME_STORAGE_KEY) {
        return;
      }
      const next = readStoredTheme();
      setPreference(next);
      applyTheme(next);
    };

    media.addEventListener("change", syncSystem);
    window.addEventListener("storage", syncStorage);
    const unsubscribe = subscribeTheme(setPreference);
    return () => {
      media.removeEventListener("change", syncSystem);
      window.removeEventListener("storage", syncStorage);
      unsubscribe();
    };
  }, [preference]);

  const setTheme = useCallback((next: ThemePreference) => {
    setPreference(next);
    persistTheme(next);
  }, []);

  return { preference, setTheme };
}
