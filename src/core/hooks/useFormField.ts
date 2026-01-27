import { useState } from 'react';

export function useFormField(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValue(e.target.value);
    if (error) setError(null);
  };

  return { value, error, setError, onChange, setValue };
}
