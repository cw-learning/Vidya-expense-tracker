export enum ExpenseCategory {
  FOOD = 'food',
  TRANSPORT = 'transport',
  ENTERTAINMENT = 'entertainment',
  UTILITIES = 'utilities',
  HEALTHCARE = 'healthcare',
  SHOPPING = 'shopping',
  OTHER = 'other',
}

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.FOOD]: 'Food',
  [ExpenseCategory.TRANSPORT]: 'Transport',
  [ExpenseCategory.ENTERTAINMENT]: 'Entertainment',
  [ExpenseCategory.UTILITIES]: 'Utilities',
  [ExpenseCategory.HEALTHCARE]: 'Healthcare',
  [ExpenseCategory.SHOPPING]: 'Shopping',
  [ExpenseCategory.OTHER]: 'Other',
};

export enum ExpenseKind {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const EXPENSE_TYPE_LABELS: Record<ExpenseKind, string> = {
  [ExpenseKind.INCOME]: 'Income',
  [ExpenseKind.EXPENSE]: 'Expense',
};

export const HIGH_AMOUNT_THRESHOLD = 1000;

export const NOTES_MAX_LENGTH = 500;
