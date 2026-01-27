import clsx from 'clsx';
import { type JSX, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LABEL_STYLES, SELECT_STYLES } from './SelectField.styles';
import type { SelectFieldProps } from './SelectField.types';

export function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = 'Select an option',
  id,
  className = '',
}: SelectFieldProps): JSX.Element {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;

  const selectClasses = twMerge(
    clsx(SELECT_STYLES, { 'border-red-500 focus:ring-red-500': !!error }),
  );

  return (
    <div className={twMerge('relative', className)}>
      <label htmlFor={selectId} className={LABEL_STYLES}>
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={selectClasses}
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
