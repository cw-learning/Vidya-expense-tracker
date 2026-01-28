import type { ChangeEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string | null;
  placeholder?: string;
  id?: string;
  className?: string;
}
