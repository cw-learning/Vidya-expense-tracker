import type { JSX } from 'react';
import type { ErrorMessageProps } from './ErrorMessage.types';

export function ErrorMessage({
  message,
  className = '',
}: ErrorMessageProps): JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <p className={`text-sm text-red-600 mt-1 ${className}`} role="alert">
      {message}
    </p>
  );
}
