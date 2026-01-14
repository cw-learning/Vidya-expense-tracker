import { useThemeStore } from "../store/useThemeStore.js";
import { THEME_COLORS, THEME_MODES } from "../utils/theme.constants.js";

export function ThemeToggle() {
	const { theme, toggleTheme } = useThemeStore();
	const isDarkMode = theme === THEME_MODES.DARK;
	const colors = THEME_COLORS[theme];

	return (
		<button
			onClick={toggleTheme}
			className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${colors.card} ${colors.border} ${colors.shadow}`}
			aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
			type="button"
		>
			<span className="flex items-center gap-3">
				{isDarkMode ? (
					<>
						<span className="text-2xl">☀️</span>
						<span className={`font-bold ${colors.accent}`}>Light</span>
					</>
				) : (
					<>
						<span className="text-2xl">🌙</span>
						<span className={`font-bold ${colors.accent}`}>Dark</span>
					</>
				)}
			</span>
		</button>
	);
}
