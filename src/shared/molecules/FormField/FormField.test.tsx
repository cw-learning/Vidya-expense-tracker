import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FormField } from './FormField';
import type { FormFieldProps } from './FormField.types';

const mockHandleChange = vi.fn();

const renderComponent = (props?: Partial<FormFieldProps>) => {
  const defaultProps: FormFieldProps = {
    label: 'Test Label',
    value: '',
    onChange: mockHandleChange,
    ...props,
  };

  return render(<FormField {...defaultProps} />);
};

describe('FormField', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  it('renders an input field with an accessible label and displays the current value', () => {
    renderComponent({ value: 'test value' });
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test value');
  });

  it('renders the input with the specified type attribute', () => {
    renderComponent({ label: 'Amount', type: 'number' });
    const input = screen.getByLabelText('Amount');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('displays an error message with role="alert" when an error is provided', () => {
    renderComponent({ label: 'Title', error: 'Required' });
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('does not render an error message when no error is provided', () => {
    renderComponent({ label: 'Title' });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('invokes the onChange handler when user types into the input field', async () => {
    renderComponent({ label: 'Title' });
    const input = screen.getByLabelText('Title');
    await user.type(input, 'new value');

    expect(mockHandleChange).toHaveBeenCalled();
  });
});
