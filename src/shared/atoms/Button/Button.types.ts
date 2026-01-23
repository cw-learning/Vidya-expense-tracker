import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariantType = 'primary' | 'secondary' | 'danger';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'className'
> & {
  children: ReactNode;
  type?: ButtonType;
  variant?: ButtonVariantType;
  className?: string;
};
