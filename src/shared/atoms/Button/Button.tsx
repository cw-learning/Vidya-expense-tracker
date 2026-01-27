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
  onClick,
}: ButtonProps): JSX.Element {
  const buttonClasses = twMerge(
    BASE_STYLES,
    VARIANT_STYLES[variant],
    className,
  );

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
