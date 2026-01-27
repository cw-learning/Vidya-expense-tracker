import { EXPENSE_CATEGORIES } from '../../constants/expense.constants';

export const CATEGORY_ICONS: Record<string, string> = {
  [EXPENSE_CATEGORIES.FOOD]: '🍔',
  [EXPENSE_CATEGORIES.TRANSPORT]: '🚗',
  [EXPENSE_CATEGORIES.ENTERTAINMENT]: '🎬',
  [EXPENSE_CATEGORIES.UTILITIES]: '⚡',
  [EXPENSE_CATEGORIES.HEALTHCARE]: '🏥',
  [EXPENSE_CATEGORIES.SHOPPING]: '🛍️',
  [EXPENSE_CATEGORIES.OTHER]: '📌',
};

export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS[EXPENSE_CATEGORIES.OTHER];
}
