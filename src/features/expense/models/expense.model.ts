import { EXPENSE_TYPES } from '../constants/expense.constants';
import type { Expense } from '../types/expense.types';

export function createExpense(
  title: string,
  amount: string,
  category: string,
  type: string = EXPENSE_TYPES.EXPENSE,
  notes: string = '',
): Expense {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    amount: Number(amount),
    category,
    type,
    notes: notes.trim(),
    createdAt: new Date().toISOString(),
  };
}
