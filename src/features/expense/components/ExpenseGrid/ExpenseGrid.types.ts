import type { ExpenseProps } from '../../types/expense.types';

export interface ExpenseGridProps {
  expenses: ExpenseProps[];
  onDeleteExpense: (id: string) => void;
  onUpdateExpense: (expense: ExpenseProps) => void;
}
