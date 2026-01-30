import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariantType = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: ButtonType;
  variant?: ButtonVariantType;
}
