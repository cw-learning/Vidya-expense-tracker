export const EXPENSE_CATEGORIES = {
  FOOD: 'food',
  TRANSPORT: 'transport',
  ENTERTAINMENT: 'entertainment',
  UTILITIES: 'utilities',
  HEALTHCARE: 'healthcare',
  SHOPPING: 'shopping',
  OTHER: 'other',
} as const;

export const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
  [EXPENSE_CATEGORIES.FOOD]: 'Food',
  [EXPENSE_CATEGORIES.TRANSPORT]: 'Transport',
  [EXPENSE_CATEGORIES.ENTERTAINMENT]: 'Entertainment',
  [EXPENSE_CATEGORIES.UTILITIES]: 'Utilities',
  [EXPENSE_CATEGORIES.HEALTHCARE]: 'Healthcare',
  [EXPENSE_CATEGORIES.SHOPPING]: 'Shopping',
  [EXPENSE_CATEGORIES.OTHER]: 'Other',
};

export const EXPENSE_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

export const EXPENSE_TYPE_LABELS: Record<string, string> = {
  [EXPENSE_TYPES.INCOME]: 'Income',
  [EXPENSE_TYPES.EXPENSE]: 'Expense',
};

export const HIGH_AMOUNT_THRESHOLD = 1000;
export const NOTES_MAX_LENGTH = 500;
