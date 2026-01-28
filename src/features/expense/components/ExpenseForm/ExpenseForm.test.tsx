import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useExpenseForm } from '../../hooks/useExpenseForm/useExpenseForm';
import * as expenseModel from '../../models/expense.model';
import type { ExpenseProps } from '../../types/expense.types';
import * as validation from '../../utils/validation/validateExpense';

vi.mock('../../models/expense.model');
vi.mock('../../utils/validation/validateExpense');

const fixtureExpense: ExpenseProps = {
  id: '1',
  title: 'Grocery',
  amount: 500,
  category: 'food',
  type: 'expense',
  notes: 'Weekly',
  createdAt: new Date().toISOString(),
};

const mockOnAddExpense = vi.fn();

describe('ExpenseForm functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(expenseModel.createExpense).mockReturnValue(fixtureExpense);
    vi.mocked(validation.validateExpense).mockReturnValue({});
  });

  it('updates title field correctly', () => {
    const { result } = renderHook(() => useExpenseForm(mockOnAddExpense));
    act(() => result.current.updateField('title', 'New Grocery'));
    expect(result.current.formData.title).toBe('New Grocery');
  });

  it('clears error when field is updated', () => {
    vi.mocked(validation.validateExpense).mockReturnValueOnce({
      title: 'Error',
    });
    const { result } = renderHook(() => useExpenseForm(mockOnAddExpense));

    act(() => {
      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;
      result.current.handleSubmit(mockEvent);
    });

    act(() => result.current.updateField('title', 'Valid Title'));
    expect(result.current.formErrors.title).toBe('');
  });

  it('calls onAddExpense on valid form submission', () => {
    const { result } = renderHook(() => useExpenseForm(mockOnAddExpense));

    act(() => {
      result.current.updateField('title', 'Grocery');
      result.current.updateField('amount', '500');
      result.current.updateField('category', 'food');
      result.current.updateField('type', 'expense');
    });

    act(() => {
      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;
      result.current.handleSubmit(mockEvent);
    });

    expect(mockOnAddExpense).toHaveBeenCalledWith(fixtureExpense);
  });

  it('resets form after successful submission', () => {
    const { result } = renderHook(() => useExpenseForm(mockOnAddExpense));

    act(() => {
      result.current.updateField('title', 'Grocery');
      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.formData.title).toBe('');
  });
});
