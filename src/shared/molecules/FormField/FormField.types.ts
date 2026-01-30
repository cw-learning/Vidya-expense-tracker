import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';

export interface FormFieldProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  id?: string;
  className?: string;
}
