import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { THEME_COLORS, THEME_MODES } from '../../constants/theme.constants';
import { useThemeStore } from '../../hooks/useThemeStore';

/**
 * Toggle button for switching between light and dark themes.
 * Displays current theme icon and switches to opposite theme on click.
 */
export function ThemeToggle(): ReactElement {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === THEME_MODES.DARK;
  const colors = THEME_COLORS[theme];

  const handleClickToggleTheme = () => {
    toggleTheme();
  };

  const buttonClassNames = twMerge(
    'px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    colors.card,
    colors.border,
    colors.shadow,
  );

  return (
    <button
      onClick={handleClickToggleTheme}
      className={buttonClassNames}
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
