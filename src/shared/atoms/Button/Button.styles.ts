import type { ButtonVariantType } from './Button.types';

export const BASE_STYLES =
  'px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md ' +
  'transform hover:shadow-lg active:scale-95 enabled:cursor-pointer ' +
  'disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:transform-none disabled:active:scale-100';

export const VARIANT_STYLES = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-teal-200',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-red-200',
} as const satisfies Record<ButtonVariantType, string>;
