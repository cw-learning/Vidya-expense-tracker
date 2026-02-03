import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from './ErrorMessage';
import type { ErrorMessageProps } from './ErrorMessage.types';

const renderComponent = (props?: Partial<ErrorMessageProps>) => {
  const defaultProps: ErrorMessageProps = {
    ...props,
  };

  return render(<ErrorMessage {...defaultProps} />);
};

describe('ErrorMessage', () => {
  it('renders the message when provided', () => {
    renderComponent({ message: 'This is an error' });

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This is an error');
  });

  it('returns null when no message is provided', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toBeNull();
  });

  it('returns null when message is empty string', () => {
    const { container } = renderComponent({ message: '' });

    expect(container.firstChild).toBeNull();
  });
});
