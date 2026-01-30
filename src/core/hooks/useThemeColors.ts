import { THEME_COLORS } from '../../features/theme/constants/theme.constants';
import { useThemeStore } from '../../features/theme/hooks/useThemeStore';

export const useThemeColors = () => {
  const { theme } = useThemeStore();
  return THEME_COLORS[theme];
};
