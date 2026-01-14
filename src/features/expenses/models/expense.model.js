// Expense categories
export const EXPENSE_CATEGORIES = {
  FOOD: 'food',
  TRANSPORT: 'transport',
  ENTERTAINMENT: 'entertainment',
  UTILITIES: 'utilities',
  HEALTHCARE: 'healthcare',
  SHOPPING: 'shopping',
  OTHER: 'other',
};

// Labels for expense categories
export const EXPENSE_CATEGORY_LABELS = {
  [EXPENSE_CATEGORIES.FOOD]: 'Food',
  [EXPENSE_CATEGORIES.TRANSPORT]: 'Transport',
  [EXPENSE_CATEGORIES.ENTERTAINMENT]: 'Entertainment',
  [EXPENSE_CATEGORIES.UTILITIES]: 'Utilities',
  [EXPENSE_CATEGORIES.HEALTHCARE]: 'Healthcare',
  [EXPENSE_CATEGORIES.SHOPPING]: 'Shopping',
  [EXPENSE_CATEGORIES.OTHER]: 'Other',
};

// Create a new expense object with a unique id, trimmed title, numeric amount, category, and creation timestamp
export function createExpense(title, amount, category) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    amount: Number(amount),
    category,
    createdAt: new Date().toISOString(),
  };
}