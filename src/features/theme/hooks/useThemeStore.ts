import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { THEME_MODES, THEME_STORAGE_KEY } from '../constants/theme.constants';
import type { ThemeModeType } from '../theme.types';

type ThemeStoreType = {
  theme: ThemeModeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeModeType) => void;
};

/**
 * Zustand store for managing application theme state.
 * Persists theme preference to localStorage.
 */
export const useThemeStore = create<ThemeStoreType>()(
  persist(
    (set) => ({
      theme: THEME_MODES.LIGHT,
      toggleTheme: () =>
        set((state) => ({
          theme:
            state.theme === THEME_MODES.LIGHT
              ? THEME_MODES.DARK
              : THEME_MODES.LIGHT,
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: THEME_STORAGE_KEY,
      partialize: (state) => ({ theme: state.theme }),
      storage:
        typeof window === 'undefined'
          ? undefined
          : createJSONStorage(() => window.localStorage),
    },
  ),
);
