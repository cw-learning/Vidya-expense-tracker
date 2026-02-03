import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { useThemeColors } from '../../../core/hooks/useThemeColors';
import { cardClassName } from './Card.styles';
import type { CardProps } from './Card.types';

/**
 * Themed card container component.
 * Automatically applies theme-based styling for cards.
 */
export function Card({ children, className }: CardProps): ReactElement {
  const colors = useThemeColors();
  const cardClassNames = twMerge(
    cardClassName,
    colors.card,
    colors.cardBorder,
    className,
  );

  return <div className={cardClassNames}>{children}</div>;
}
