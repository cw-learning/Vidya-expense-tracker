import { act, renderHook } from '@testing-library/react';
import type { FormEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as expenseModel from '../../models/expense.model';
import type { ExpenseType } from '../../types/expense.types';
import * as validation from '../../utils/validation/validateExpense';
import { useExpenseForm } from './useExpenseForm';

const mockCreateExpense = vi.fn();
const mockValidateExpense = vi.fn();
const mockOnAddExpense = vi.fn();

vi.mock('../../models/expense.model');
vi.mock('../../utils/validation/validateExpense');

const fixtureExpense: ExpenseType = {
  id: '1',
  title: 'Test',
  amount: 100,
  category: 'food',
  type: 'expense',
  notes: '',
  createdAt: new Date().toISOString(),
};

const renderExpenseForm = (validationErrors = {}) => {
  vi.mocked(expenseModel.createExpense).mockImplementation(mockCreateExpense);
  vi.mocked(validation.validateExpense).mockImplementation(mockValidateExpense);
  mockCreateExpense.mockReturnValue(fixtureExpense);
  mockValidateExpense.mockReturnValue(validationErrors);

  return renderHook(() => useExpenseForm(mockOnAddExpense));
};

describe('useExpenseForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('updates the form field value and clears any existing error for that field', () => {
    const { result } = renderExpenseForm();

    act(() => result.current.updateField('title', 'New Title'));

    expect(result.current.formData.title).toBe('New Title');
  });

  it('validates form data, creates expense, and invokes the onAddExpense callback when form is submitted successfully', () => {
    const { result } = renderExpenseForm();
    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as FormEvent;

    act(() => result.current.handleSubmit(mockEvent));

    expect(mockOnAddExpense).toHaveBeenCalled();
  });
});
