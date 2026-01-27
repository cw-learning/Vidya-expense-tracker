import { twMerge } from 'tailwind-merge';
import { EXPENSE_CATEGORIES } from '../../constants/expense.constants';
import { CATEGORY_COLORS } from './categoryColors.styles';

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS[EXPENSE_CATEGORIES.OTHER];
}

export function getCategoryColorClasses(
  category: string,
  additionalClasses: string = '',
): string {
  return twMerge(getCategoryColor(category), additionalClasses);
}
