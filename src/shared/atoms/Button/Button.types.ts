import type { MouseEvent, ReactNode } from 'react';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariantType = 'primary' | 'secondary' | 'danger';

export interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  variant?: ButtonVariantType;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
