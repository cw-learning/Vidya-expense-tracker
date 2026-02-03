import clsx from 'clsx';
import { type ReactElement, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import {
  selectFieldClassName,
  selectLabelClassName,
} from './SelectField.styles';
import type { SelectFieldProps } from './SelectField.types';

/**
 * Form select/dropdown field with label, error display, and accessibility features.
 * Automatically generates unique IDs and manages error states.
 */
export function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = 'Select an option',
  id,
  className,
}: SelectFieldProps): ReactElement {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;

  const selectClassNames = twMerge(
    clsx(selectFieldClassName, {
      'border-red-500 focus:ring-red-500': !!error,
    }),
  );

  const containerClassNames = twMerge('relative', className);

  return (
    <div className={containerClassNames}>
      <label htmlFor={selectId} className={selectLabelClassName}>
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={selectClassNames}
        aria-invalid={!!error}
        aria-describedby={errorId}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage id={errorId} message={error} />
    </div>
  );
}
