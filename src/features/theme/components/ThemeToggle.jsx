import { useThemeStore } from '../store/useThemeStore.js';
import { THEME_MODES } from '../utils/theme.constants.js';

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();
    const isDarkMode = theme === THEME_MODES.DARK;

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg border-2 transition-colors duration-200 hover:opacity-80"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            type="button"
        >
            <span className="flex items-center gap-2">
                {isDarkMode ? (
                    <>
                        <span className="text-2xl">☀️</span>
                        <span className="font-medium">Light Mode</span>
                    </>
                ) : (
                    <>
                        <span className="text-2xl">🌙</span>
                        <span className="font-medium">Dark Mode</span>
                    </>
                )}
            </span>
        </button>
    );
}