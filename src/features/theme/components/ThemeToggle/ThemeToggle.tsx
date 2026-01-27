import type { JSX } from 'react';
import { THEME_COLORS, THEME_MODES } from '../../constants/theme.constants';
import { useThemeStore } from '../../hooks/useThemeStore';

export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === THEME_MODES.DARK;
  const colors = THEME_COLORS[theme];

  return (
    <button
      onClick={toggleTheme}
      className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${colors.card} ${colors.border} ${colors.shadow} focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      type="button"
    >
      <span className="flex items-center gap-3">
        {isDarkMode ? (
          <>
            <span className="text-2xl">☀️</span>
            <span className={`font-bold ${colors.accentText}`}>Light</span>
          </>
        ) : (
          <>
            <span className="text-2xl">🌙</span>
            <span className={`font-bold ${colors.accentText}`}>Dark</span>
          </>
        )}
      </span>
    </button>
  );
}
