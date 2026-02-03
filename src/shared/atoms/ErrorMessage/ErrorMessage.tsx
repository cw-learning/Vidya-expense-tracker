import clsx from 'clsx';
import type { ReactElement } from 'react';
import type { ErrorMessageProps } from './ErrorMessage.types';

export function ErrorMessage({
  id,
  message,
  className,
}: ErrorMessageProps): ReactElement | null {
  if (!message) return null;

  const errorMessageClassNames = clsx('text-red-600 text-sm mt-1', className);

  const errorClasses = twMerge('text-sm text-red-600 mt-1', className);

  return (
    <div role="alert" className={errorMessageClassNames}>
      {message}
    </div>
  );
}
