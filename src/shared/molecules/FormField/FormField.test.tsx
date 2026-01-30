import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FormField } from './FormField';

const mockHandleChange = vi.fn();

describe('FormField', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders label, input, and handles value', () => {
    render(
      <FormField
        label="Test Label"
        value="test value"
        onChange={mockHandleChange}
      />,
    );
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test value');
  });

  it('applies custom type', () => {
    render(
      <FormField
        label="Amount"
        type="number"
        value=""
        onChange={mockHandleChange}
      />,
    );
    const input = screen.getByLabelText('Amount');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('displays error message', () => {
    render(
      <FormField
        label="Title"
        value=""
        onChange={mockHandleChange}
        error="Required"
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('does not display error when none', () => {
    render(<FormField label="Title" value="" onChange={mockHandleChange} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('calls onChange on input', async () => {
    const user = userEvent.setup();

    render(<FormField label="Title" value="" onChange={mockHandleChange} />);
    const input = screen.getByLabelText('Title');
    await user.type(input, 'new value');

    expect(mockHandleChange).toHaveBeenCalled();
  });
});
