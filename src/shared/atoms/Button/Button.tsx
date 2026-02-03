import clsx from 'clsx';
import type { MouseEvent, ReactElement } from 'react';
import { baseButtonClassNames, variantButtonClassNames } from './Button.styles';
import {
  type ButtonProps,
  ButtonType,
  ButtonVariantType,
} from './Button.types';

const getButtonClassNames = (
  variant: ButtonVariantType,
  className?: string,
): string => {
  return clsx(
    baseButtonClassNames,
    variantButtonClassNames[variant],
    className,
  );
};

/**
 * Reusable Button component with multiple variants and states.
 * Supports loading state, disabled state, and different visual styles.
 */
export function Button({
  children,
  type = ButtonType.BUTTON,
  variant = ButtonVariantType.PRIMARY,
  className,
  disabled,
  loading,
  onClick,
}: ButtonProps): ReactElement {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      onClick?.(event);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      onClick={handleClick}
      className={getButtonClassNames(variant, className)}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
