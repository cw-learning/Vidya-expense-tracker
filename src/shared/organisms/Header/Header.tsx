import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { useThemeColors } from '../../../core/hooks/useThemeColors';
import type { HeaderProps } from './Header.types';

export function Header({
  title,
  subtitle,
  className = '',
}: HeaderProps): JSX.Element {
  const { text } = useThemeColors();
  const headerClasses = twMerge(className);

  return (
    <div className={headerClasses}>
      <h1 className="text-3xl font-black mb-1 bg-linear-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h1>
      <p className={`text-sm font-medium opacity-70 ${text}`}>{subtitle}</p>
    </div>
  );
}
