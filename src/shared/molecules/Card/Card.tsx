import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { CARD_STYLES } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card({ children, className = '' }: CardProps): JSX.Element {
  const cardDynamicClasses = twMerge(CARD_STYLES, className);
  return <div className={cardDynamicClasses}>{children}</div>;
}
