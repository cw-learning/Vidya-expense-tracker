import type { ExpenseProps } from '../../types/expense.types';

export interface ExpenseFormProps {
  onAddExpense: (expense: ExpenseProps) => void;
}
