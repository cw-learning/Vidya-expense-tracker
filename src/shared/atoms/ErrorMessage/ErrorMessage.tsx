import type { ErrorMessageProps } from './ErrorMessage.types';

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p className={`text-sm text-red-600 mt-1 ${className}`} role="alert">
      {message}
    </p>
  );
}
