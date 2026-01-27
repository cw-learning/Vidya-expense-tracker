import clsx from 'clsx';
import type { JSX } from 'react';
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
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const selectDynamicClasses = clsx(SELECT_STYLES, {
    'border-red-500 focus:ring-red-500': error,
  });

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={selectId} className={LABEL_STYLES}>
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={selectDynamicClasses}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage message={error} />
    </div>
  );
}
