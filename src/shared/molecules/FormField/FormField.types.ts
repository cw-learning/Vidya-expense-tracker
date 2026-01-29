import type { ChangeEvent } from 'react';

export interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  id?: string;
  className?: string;
}
