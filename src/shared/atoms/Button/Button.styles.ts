export const BASE_STYLES =
  'px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-md hover:shadow-lg';

export const VARIANT_STYLES: Record<string, string> = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-teal-200',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-red-200',
};
