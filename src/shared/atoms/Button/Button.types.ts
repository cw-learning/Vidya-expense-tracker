import type { MouseEvent, ReactNode } from 'react';

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum ButtonVariantType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  variant?: ButtonVariantType;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
