import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { useThemeColors } from '../../../core/hooks/useThemeColors';
import { CARD_STYLES } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card({ children, className = '' }: CardProps): JSX.Element {
  const colors = useThemeColors();
  return (
    <div
      className={twMerge(
        CARD_STYLES,
        colors.card,
        colors.cardBorder,
        className,
      )}
    >
      {children}
    </div>
  );
}
