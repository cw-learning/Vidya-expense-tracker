import type { MouseEventHandler, ReactNode } from 'react';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariantType = 'primary' | 'secondary' | 'danger';

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  variant?: ButtonVariantType;
  disabled?: boolean;
  className?: string;
}
