import clsx from 'clsx';
import { type JSX, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { INPUT_STYLES, LABEL_STYLES } from './FormField.styles';
import type { FormFieldProps } from './FormField.types';

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  id,
  className = '',
}: FormFieldProps): JSX.Element {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  const inputClasses = twMerge(
    clsx(INPUT_STYLES, { 'border-red-500 focus:ring-red-500': !!error }),
  );

  return (
    <div className={twMerge('relative', className)}>
      <label htmlFor={inputId} className={LABEL_STYLES}>
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClasses}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={errorId}
      />
      <ErrorMessage id={errorId} message={error} />
    </div>
  );
}
