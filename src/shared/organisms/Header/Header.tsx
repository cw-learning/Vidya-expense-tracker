import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { HEADER_STYLES } from './Header.styles';
// import { ThemeToggle } from '../../../theme/components/ThemeToggle'; -> Yet to add
import type { HeaderProps } from './Header.types';

export function Header({
  title,
  subtitle,
  className = '',
}: HeaderProps): JSX.Element {
  const headerClasses = twMerge(HEADER_STYLES, className);

  return (
    <header className={headerClasses}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-black mb-1 bg-linear-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
            {title}
          </h1>
          <p className="text-sm font-medium opacity-70">{subtitle}</p>
        </div>
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}
