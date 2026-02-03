import clsx from 'clsx';
import { type ReactElement, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { formInputClassName, formLabelClassName } from './FormField.styles';
import type { FormFieldProps } from './FormField.types';

/**
 * Form input field with label, error display, and accessibility features.
 * Automatically generates unique IDs and manages error states.
 */
export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  id,
  className,
}: FormFieldProps): ReactElement {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  const inputClasses = twMerge(
    clsx(formInputClassName, { 'border-red-500 focus:ring-red-500': !!error }),
  );

  const containerClassNames = twMerge('relative', className);

  return (
    <div className={containerClassNames}>
      <label htmlFor={inputId} className={formLabelClassName}>
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
