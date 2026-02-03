import { ExpenseKind } from '../constants/expense.constants';
import type { ExpenseType } from '../types/expense.types';

/**
 * Factory function to create a new expense object with a unique ID and timestamp.
 *
 * @param title - The expense title/description
 * @param amount - The amount as a string (will be converted to number)
 * @param category - The expense category
 * @param type - Transaction type (defaults to EXPENSE)
 * @param notes - Optional additional notes (defaults to empty string)
 * @returns A complete ExpenseType object ready to be stored
 * ```
 */
export function createExpense(
  title: string,
  amount: string,
  category: string,
  type: string = ExpenseKind.EXPENSE,
  notes: string = '',
): ExpenseType {
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
