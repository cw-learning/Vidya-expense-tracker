import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_MODES, THEME_STORAGE_KEY } from '../constants/theme.constants';
import type { ThemeMode } from '../theme.types';

interface ThemeStore {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
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
      setTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: THEME_STORAGE_KEY,
    },
  ),
);
