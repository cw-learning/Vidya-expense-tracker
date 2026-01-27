import clsx from 'clsx';
import type { JSX } from 'react';
import { CARD_STYLES } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card({ children, className = '' }: CardProps): JSX.Element {
  const cardDynamicClasses = clsx(CARD_STYLES, className);
  return <div className={cardDynamicClasses}>{children}</div>;
}
