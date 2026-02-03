import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import { type ButtonProps, ButtonType } from './Button.types';

const mockHandleClick = vi.fn();

const renderComponent = (props?: Partial<ButtonProps>) => {
  const defaultProps: ButtonProps = {
    children: 'Click me',
    ...props,
  };
  return render(<Button {...defaultProps} />);
};

describe('Button', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  describe('Rendering', () => {
    it('renders as an enabled button with type="button" when no props are specified', () => {
      renderComponent();
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', ButtonType.BUTTON);
      expect(button).not.toBeDisabled();
    });

    it('renders with the specified button type attribute', () => {
      renderComponent({ type: ButtonType.SUBMIT, children: 'Submit' });
      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toHaveAttribute('type', ButtonType.SUBMIT);
    });

    it('displays the content provided in the children prop', () => {
      renderComponent({ children: 'Custom Text' });
      const button = screen.getByRole('button', { name: /custom text/i });
      expect(button).toHaveTextContent('Custom Text');
    });
  });

  describe('Disabled State', () => {
    it('becomes disabled and sets aria-disabled when disabled prop is true', () => {
      renderComponent({ disabled: true, children: 'Disabled' });
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Loading State', () => {
    it('displays "Loading..." text and becomes disabled when loading prop is true', () => {
      renderComponent({ loading: true, children: 'Submit' });
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Loading...');
      expect(button).toBeDisabled();
    });
  });

  describe('Click Handlers', () => {
    it('invokes the onClick handler when the button is clicked', async () => {
      renderComponent({ onClick: mockHandleClick, children: 'Clickable' });
      const button = screen.getByRole('button', { name: /clickable/i });

      await user.click(button);

      expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents onClick handler from being called when button is disabled', async () => {
      renderComponent({
        disabled: true,
        onClick: mockHandleClick,
        children: 'Disabled Click',
      });
      const button = screen.getByRole('button', { name: /disabled click/i });

      await user.click(button);

      expect(mockHandleClick).not.toHaveBeenCalled();
    });

    it('prevents onClick handler from being called when button is in loading state', async () => {
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
