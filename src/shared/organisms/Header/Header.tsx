import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { ThemeToggle } from '../../../features/theme/components/ThemeToggle/ThemeToggle';
import { headerClassName } from './Header.styles';
import type { HeaderProps } from './Header.types';

/**
 * Application header with title, subtitle, and theme toggle.
 */
export function Header({
  title,
  subtitle,
  className,
}: HeaderProps): ReactElement {
  const headerClassNames = twMerge(headerClassName, className);
  const titleClassNames =
    'text-3xl font-black mb-1 bg-linear-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg';
  const subtitleClassNames = 'text-sm font-medium opacity-70';

  return (
    <header className={headerClassNames}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className={titleClassNames}>{title}</h1>
          <p className={subtitleClassNames}>{subtitle}</p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
