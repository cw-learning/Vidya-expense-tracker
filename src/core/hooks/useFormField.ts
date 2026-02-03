import type { ChangeEvent } from 'react';
import { useState } from 'react';

/**
 * Custom hook for managing a single form field's state and errors.
 * Provides value, error state, and change handler.
 *
 * @param initialValue - Initial value for the field (defaults to empty string)
 * @returns Object containing value, error, setters, and onChange handler
 */
export function useFormField(initialValue: string = '') {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValue(event.target.value);
    if (error) setError(null);
  };

  return { value, error, setError, onChange: handleOnChange, setValue };
}
