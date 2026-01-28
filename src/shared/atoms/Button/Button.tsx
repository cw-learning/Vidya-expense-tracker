import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { BASE_STYLES, VARIANT_STYLES } from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled,
  ...buttonProps
}: ButtonProps): JSX.Element {
  const buttonClasses = twMerge(
    BASE_STYLES,
    VARIANT_STYLES[variant],
    className,
  );

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
