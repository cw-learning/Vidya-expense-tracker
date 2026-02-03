import type { THEME_MODES } from './constants/theme.constants';

export type ThemeModeType = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export type ThemeColorsType = {
  background: string;
  text: string;
  card: string;
  cardText: string;
  cardBorder: string;
  border: string;
  accent: string;
  accentText: string;
  accentHover: string;
  input: string;
  buttonSecondary: string;
  shadow: string;
  cardGradient: string;
  totalCard: string;
};
