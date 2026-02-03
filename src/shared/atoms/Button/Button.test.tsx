import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import { type ButtonProps, ButtonType } from './Button.types';

const mockHandleClick = vi.fn();
let user: ReturnType<typeof userEvent.setup>;

const renderComponent = (props?: Partial<ButtonProps>) => {
  const defaultProps: ButtonProps = {
    children: 'Click me',
    ...props,
  };
  return render(<Button {...defaultProps} />);
};

const mockHandleClick = vi.fn();

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderComponent();
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', ButtonType.BUTTON);
      expect(button).not.toBeDisabled();
    });

    it('renders with custom type', () => {
      renderComponent({ type: ButtonType.SUBMIT, children: 'Submit' });
      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toHaveAttribute('type', ButtonType.SUBMIT);
    });

    it('renders children correctly', () => {
      renderComponent({ children: 'Custom Text' });
      const button = screen.getByRole('button', { name: /custom text/i });
      expect(button).toHaveTextContent('Custom Text');
    });
  });

  describe('Disabled State', () => {
    it('is disabled when disabled prop is true', () => {
      renderComponent({ disabled: true, children: 'Disabled' });
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Loading State', () => {
    it('shows loading state', () => {
      renderComponent({ loading: true, children: 'Submit' });
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Loading...');
      expect(button).toBeDisabled();
    });
  });

  describe('Click Handlers', () => {
    it('calls onClick when clicked', async () => {
      renderComponent({ onClick: mockHandleClick, children: 'Clickable' });
      const button = screen.getByRole('button', { name: /clickable/i });

      await user.click(button);

      expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      renderComponent({
        disabled: true,
        onClick: mockHandleClick,
        children: 'Disabled Click',
      });
      const button = screen.getByRole('button', { name: /disabled click/i });

      await user.click(button);

      expect(mockHandleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      renderComponent({
        loading: true,
        onClick: mockHandleClick,
        children: 'Submit',
      });
      const button = screen.getByRole('button');

      await user.click(button);

      expect(mockHandleClick).not.toHaveBeenCalled();
    });
  });
});
