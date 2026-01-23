import { BASE_STYLES, VARIANT_STYLES } from './Button.styles';
import type { ButtonVariantType } from './Button.types';

export const getButtonClasses = (
  variant: ButtonVariantType = 'primary',
  className = '',
): string => {
  const selectedVariantStyles =
    VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;
  return `${BASE_STYLES} ${selectedVariantStyles} ${className}`;
};
