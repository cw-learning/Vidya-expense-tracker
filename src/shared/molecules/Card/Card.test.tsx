import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';
import type { CardProps } from './Card.types';

const renderComponent = (props?: Partial<CardProps>) => {
  const defaultProps: CardProps = {
    children: <p>Test content</p>,
    ...props,
  };

  return render(<Card {...defaultProps} />);
};

describe('Card', () => {
  it('renders the content provided in the children prop', () => {
    renderComponent();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
