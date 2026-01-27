import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ErrorMessageProps } from './ErrorMessage.types';

export function ErrorMessage({
  id,
  message,
  className = '',
}: ErrorMessageProps): JSX.Element | null {
  if (!message) {
    return null;
  }

  const errorClasses = twMerge('text-sm text-red-600 mt-1', className);

  return (
    <p id={id} className={errorClasses} role="alert">
      {message}
    </p>
  );
}
