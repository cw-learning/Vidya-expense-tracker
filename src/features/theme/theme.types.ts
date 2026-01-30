import type { THEME_MODES } from './constants/theme.constants';

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export interface ThemeColors {
  background: string;
  bg: string;
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
}
