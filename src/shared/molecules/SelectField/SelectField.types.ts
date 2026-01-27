import type { ChangeEvent } from 'react';

export type SelectOptionType = {
  value: string;
  label: string;
};

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOptionType[];
  error?: string | null;
  placeholder?: string;
  id?: string;
  className?: string;
}
