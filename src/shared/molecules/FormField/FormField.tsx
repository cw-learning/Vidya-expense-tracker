import clsx from 'clsx';
import type { JSX } from 'react';
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
  const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const inputDynamicClasses = twMerge(
    clsx(INPUT_STYLES, {
      'border-red-500 focus:ring-red-500': error,
    }),
  );

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={inputId} className={LABEL_STYLES}>
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        className={inputDynamicClasses}
        placeholder={placeholder}
      />
      <ErrorMessage message={error} />
    </div>
  );
}
