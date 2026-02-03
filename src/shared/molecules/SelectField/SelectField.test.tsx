import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SelectField } from './SelectField';
import type { SelectFieldProps, SelectOption } from './SelectField.types';

const mockHandleChange = vi.fn();

const fixtureOptions: SelectOption[] = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
];

const renderComponent = (props?: Partial<SelectFieldProps>) => {
  const defaultProps: SelectFieldProps = {
    label: 'Category',
    value: '',
    onChange: mockHandleChange,
    options: fixtureOptions,
    ...props,
  };

  return render(<SelectField {...defaultProps} />);
};

describe('SelectField', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  it('renders an accessible select dropdown with label and all provided options', () => {
    renderComponent();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Food' })).toBeInTheDocument();
  });

  it('displays the currently selected value in the dropdown', () => {
    renderComponent({ value: 'food' });
    expect(screen.getByRole('combobox')).toHaveValue('food');
  });

  it('displays an error message with role="alert" when an error is provided', () => {
    renderComponent({ error: 'Required' });
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('invokes the onChange handler when user selects an option from the dropdown', async () => {
    renderComponent();
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'transport');
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('renders a custom placeholder option when placeholder prop is provided', () => {
    renderComponent({ label: 'Type', placeholder: 'Choose type' });
    expect(
      screen.getByRole('option', { name: 'Choose type' }),
    ).toBeInTheDocument();
  });
});
