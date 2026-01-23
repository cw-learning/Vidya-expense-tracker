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
}: ButtonProps) {
  const handleSafeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const buttonElement = (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={handleSafeClick}
      className={getButtonClasses(variant, className)}
      {...props}
    >
      {children}
    </button>
  );

  // Wrap disabled buttons in a div with cursor-not-allowed
  if (disabled) {
    return (
      <div className="inline-block cursor-not-allowed">{buttonElement}</div>
    );
  }

  return buttonElement;
}
