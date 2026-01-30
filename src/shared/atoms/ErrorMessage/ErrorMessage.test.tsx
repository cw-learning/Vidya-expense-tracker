import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the message when provided', () => {
    render(<ErrorMessage message="This is an error" />);
    const messageElement = screen.getByRole('alert');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent('This is an error');
  });

  it('does not render when message is empty string', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when message is null', () => {
    const { container } = render(<ErrorMessage message={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when message is undefined', () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toBeNull();
  });
});
