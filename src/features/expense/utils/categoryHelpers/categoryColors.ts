import { twMerge } from 'tailwind-merge';
import { ExpenseCategory } from '../../constants/expense.constants';
import { categoryColorsClassName } from './categoryColors.styles';

export function getCategoryColor(category: string): string {
  return (
    categoryColorsClassName[category] ||
    categoryColorsClassName[ExpenseCategory.OTHER]
  );
}

/**
 * Gets merged color classes for a category with optional additional classes.
 *
 * @param category - The expense category, gets the Tailwind CSS color classes for a given expense category.
 * @param additionalClasses - Optional additional CSS classes to merge
 * @returns Merged CSS class string
 */
export function getCategoryColorClasses(
  category: string,
  additionalClasses: string = '',
): string {
  return twMerge(getCategoryColor(category), additionalClasses);
}
