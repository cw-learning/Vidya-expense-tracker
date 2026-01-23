import type { ButtonProps } from './Button.types';
import { getButtonClasses } from './Button.utils';

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={getButtonClasses(variant, className)}
    >
      {children}
    </button>
  );
}
