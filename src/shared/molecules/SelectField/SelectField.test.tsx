import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SelectField } from './SelectField';

const mockHandleChange = vi.fn();

const fixtureOptions = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
];

describe('SelectField', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders label, select, and options', () => {
    render(
      <SelectField
        label="Category"
        value=""
        onChange={mockHandleChange}
        options={fixtureOptions}
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
        onChange={mockHandleChange}
        options={fixtureOptions}
      />,
    );
    expect(screen.getByRole('combobox')).toHaveValue('food');
  });

  it('displays error message', () => {
    render(
      <SelectField
        label="Category"
        value=""
        onChange={mockHandleChange}
        options={fixtureOptions}
        error="Required"
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('calls onChange on selection', async () => {
    const user = userEvent.setup();
    render(
      <SelectField
        label="Category"
        value=""
        onChange={mockHandleChange}
        options={fixtureOptions}
      />,
    );
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'transport');
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom placeholder', () => {
    render(
      <SelectField
        label="Type"
        value=""
        onChange={mockHandleChange}
        options={fixtureOptions}
        placeholder="Choose type"
      />,
    );
    expect(
      screen.getByRole('option', { name: 'Choose type' }),
    ).toBeInTheDocument();
  });
});
