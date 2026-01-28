export type ExpenseCategoryType =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'utilities'
  | 'healthcare'
  | 'shopping'
  | 'other';

export type ExpenseType = 'income' | 'expense';

export interface ExpenseProps {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategoryType;
  type: ExpenseType;
  notes: string;
  createdAt: string;
}

export interface ExpenseFormDataProps {
  title: string;
  amount: string;
  category: ExpenseCategoryType;
  type: ExpenseType;
  notes: string;
}
