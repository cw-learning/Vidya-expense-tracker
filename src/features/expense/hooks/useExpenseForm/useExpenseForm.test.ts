import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import * as expenseModel from '../../models/expense.model';
import type { Expense } from '../../types/expense.types';
import * as validation from '../../utils/validation/validateExpense';
import { useExpenseForm } from './useExpenseForm';

vi.mock('../../models/expense.model');
vi.mock('../../utils/validation/validateExpense');

const fixtureExpense: Expense = {
  id: '1',
  title: 'Test',
  amount: 100,
  category: 'food',
  type: 'expense',
  notes: '',
  createdAt: new Date().toISOString(),
};

const mockOnAdd = vi.fn();

describe('useExpenseForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(expenseModel.createExpense).mockReturnValue(fixtureExpense);
    vi.mocked(validation.validateExpense).mockReturnValue({});
  });

  it('updates field and clears error', () => {
    const { result } = renderHook(() => useExpenseForm(mockOnAdd));
    act(() => result.current.updateField('title', 'New Title'));
    expect(result.current.formData.title).toBe('New Title');
  });

  it('submits form successfully', () => {
    const mockOnAdd = vi.fn();
    const { result } = renderHook(() => useExpenseForm(mockOnAdd));
    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    act(() => result.current.handleSubmit(mockEvent));
    expect(mockOnAdd).toHaveBeenCalled();
  });
});
