import { THEME_COLORS } from '../../features/theme/constants/theme.constants';
import { useThemeStore } from '../../features/theme/hooks/useThemeStore';

/**
 * Hook to get the current theme's color palette.
 * Returns the appropriate color configuration based on active theme.
 *
 * @returns ThemeColorsType object with all theme-specific CSS classes
 */
export const useThemeColors = () => {
  const { theme } = useThemeStore();
  return THEME_COLORS[theme];
};
