export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  notes: string;
  createdAt: string;
}

export interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
  type: string;
  notes: string;
}

export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'utilities'
  | 'healthcare'
  | 'shopping'
  | 'other';
export type ExpenseType = 'income' | 'expense';
