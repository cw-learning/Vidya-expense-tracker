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
  it('displays the error message with role="alert" for accessibility when a message is provided', () => {
    renderComponent({ message: 'This is an error' });

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This is an error');
  });

  it('renders nothing when no message prop is provided', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when an empty string is provided as the message', () => {
    const { container } = renderComponent({ message: '' });

    expect(container.firstChild).toBeNull();
  });
});
