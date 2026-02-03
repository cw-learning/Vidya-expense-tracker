import clsx from 'clsx';
import type { ReactElement } from 'react';
import type { ErrorMessageProps } from './ErrorMessage.types';

/**
 * Displays error or validation messages to users.
 * Returns null when no message is provided for conditional rendering.
 */
export function ErrorMessage({
  id,
  message,
  className,
}: ErrorMessageProps): ReactElement | null {
  if (!message) return null;

  const errorMessageClassNames = clsx('text-red-600 text-sm mt-1', className);

  return (
    <div id={id} role="alert" className={errorMessageClassNames}>
      {message}
    </div>
  );
}
