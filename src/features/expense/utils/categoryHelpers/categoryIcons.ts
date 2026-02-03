import { ExpenseCategory } from '../../constants/expense.constants';

export const CATEGORY_ICONS: Record<string, string> = {
  [ExpenseCategory.FOOD]: '🍔',
  [ExpenseCategory.TRANSPORT]: '🚗',
  [ExpenseCategory.ENTERTAINMENT]: '🎬',
  [ExpenseCategory.UTILITIES]: '⚡',
  [ExpenseCategory.HEALTHCARE]: '🏥',
  [ExpenseCategory.SHOPPING]: '🛍️',
  [ExpenseCategory.OTHER]: '📌',
};

/**
 * Gets the icon emoji for a given expense category.
 *
 * @param category - The expense category
 * @returns Emoji icon for the category, or OTHER icon if not found
 */
export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS[ExpenseCategory.OTHER];
}
