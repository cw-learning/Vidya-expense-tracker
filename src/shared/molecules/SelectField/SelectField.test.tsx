import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  const options = [
    { value: 'food', label: 'Food' },
    { value: 'transport', label: 'Transport' },
  ];

  it('renders label, select, and options', () => {
    render(
      <SelectField
        label="Category"
        value=""
        onChange={vi.fn()}
        options={options}
      />,
    );
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Food' })).toBeInTheDocument();
  });

  it('selects the correct value', () => {
    render(
      <SelectField
        label="Category"
        value="food"
        onChange={vi.fn()}
        options={options}
      />,
    );
    expect(screen.getByRole('combobox')).toHaveValue('food');
  });

  it('displays error message', () => {
    render(
      <SelectField
        label="Category"
        value=""
        onChange={vi.fn()}
        options={options}
        error="Required"
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('calls onChange on selection', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <SelectField
        label="Category"
        value=""
        onChange={handleChange}
        options={options}
      />,
    );
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'transport');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom placeholder', () => {
    render(
      <SelectField
        label="Type"
        value=""
        onChange={vi.fn()}
        options={options}
        placeholder="Choose type"
      />,
    );
    expect(
      screen.getByRole('option', { name: 'Choose type' }),
    ).toBeInTheDocument();
  });
});
