export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const THEME_COLORS = {
  [THEME_MODES.LIGHT]: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    card: 'bg-white',
    cardText: 'text-gray-800',
    border: 'border-gray-200',
  },
  [THEME_MODES.DARK]: {
    background: 'bg-gray-900',
    text: 'text-gray-100',
    card: 'bg-gray-800',
    cardText: 'text-gray-100',
    border: 'border-gray-700',
  },
};

export const THEME_STORAGE_KEY = 'expense-tracker-theme';