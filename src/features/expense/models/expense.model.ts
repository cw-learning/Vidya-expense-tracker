import { EXPENSE_TYPES } from '../constants/expense.constants';
import type {
  ExpenseCategoryType,
  ExpenseProps,
  ExpenseType,
} from '../types/expense.types';

export function createExpense(
  title: string,
  amount: string,
  category: ExpenseCategoryType,
  type: ExpenseType = EXPENSE_TYPES.EXPENSE,
  notes: string = '',
): ExpenseProps {
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
