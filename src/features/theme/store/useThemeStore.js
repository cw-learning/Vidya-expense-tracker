import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_MODES, THEME_STORAGE_KEY } from '../utils/theme.constants.js';

export const useThemeStore = create(
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

      setTheme: (theme) =>
        set(() => ({
          theme,
        })),

      isDarkMode: () => {
        const state = useThemeStore.getState();
        return state.theme === THEME_MODES.DARK;
      },
    }),
    {
      name: THEME_STORAGE_KEY,
    }
  )
);