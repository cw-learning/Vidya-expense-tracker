import type { JSX, MouseEvent } from 'react';
import type { ButtonProps } from './Button.types';
import { getButtonClasses } from './Button.utils';

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled,
  onClick,
  ...props
}: ButtonProps): JSX.Element {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      className={getButtonClasses(variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}
