import type { ThemeColors, ThemeMode } from '../theme.types';

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const THEME_COLORS: Record<ThemeMode, ThemeColors> = {
  [THEME_MODES.LIGHT]: {
    background: 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50',
    text: 'text-gray-900',
    card: 'bg-white',
    cardText: 'text-gray-800',
    cardBorder: 'border-gray-200',
    border: 'border-gray-200',
    accent: 'bg-teal-600',
    accentText: 'text-teal-600',
    accentHover: 'hover:bg-teal-700',
    input: 'bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500',
    buttonSecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    shadow: 'shadow-lg',
    cardGradient: 'bg-gray-50',
    totalCard:
      'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700',
  },
  [THEME_MODES.DARK]: {
    background: 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900',
    text: 'text-gray-100',
    card: 'bg-slate-800',
    cardText: 'text-gray-200',
    cardBorder: 'border-slate-700',
    border: 'border-slate-700',
    accent: 'bg-teal-600',
    accentText: 'text-teal-600',
    accentHover: 'hover:bg-teal-700',
    input:
      'bg-slate-700 border-slate-600 focus:border-teal-500 focus:ring-teal-500',
    buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-gray-200',
    shadow: 'shadow-xl shadow-black/40',
    cardGradient: 'bg-slate-800',
    totalCard:
      'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700',
  },
} as const;

export const THEME_STORAGE_KEY = 'expense-tracker-theme';
