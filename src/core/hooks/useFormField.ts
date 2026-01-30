import { useState } from 'react';

export function useFormField(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    setValue(value);
    if (error) setError(null);
  };

  return { value, error, setError, onChange, setValue };
}
