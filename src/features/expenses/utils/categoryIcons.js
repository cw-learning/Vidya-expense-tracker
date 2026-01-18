import { EXPENSE_CATEGORIES } from "../models/expense.model.js";

export const CATEGORY_ICONS = {
	[EXPENSE_CATEGORIES.FOOD]: "🍔",
	[EXPENSE_CATEGORIES.TRANSPORT]: "🚗",
	[EXPENSE_CATEGORIES.ENTERTAINMENT]: "🎬",
	[EXPENSE_CATEGORIES.UTILITIES]: "⚡",
	[EXPENSE_CATEGORIES.HEALTHCARE]: "🏥",
	[EXPENSE_CATEGORIES.OTHER]: "📌",
	[EXPENSE_CATEGORIES.SHOPPING]: "🛍️",
};

export const CATEGORY_COLORS = {
	[EXPENSE_CATEGORIES.FOOD]:
		"bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
	[EXPENSE_CATEGORIES.TRANSPORT]:
		"bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
	[EXPENSE_CATEGORIES.ENTERTAINMENT]:
		"bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
	[EXPENSE_CATEGORIES.UTILITIES]:
		"bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
	[EXPENSE_CATEGORIES.HEALTHCARE]:
		"bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
	[EXPENSE_CATEGORIES.SHOPPING]:
		"bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
	[EXPENSE_CATEGORIES.OTHER]:
		"bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
};

/**
 * @param {string} category - One of EXPENSE_CATEGORIES.
 * @returns {string} Emoji representing the category.
 */
export function getCategoryIcon(category) {
	return CATEGORY_ICONS[category] || CATEGORY_ICONS[EXPENSE_CATEGORIES.OTHER];
}

/**
 * @param {string} category - One of EXPENSE_CATEGORIES.
 * @returns {string} Tailwind class string for background/text colors.
 */
export function getCategoryColor(category) {
	return CATEGORY_COLORS[category] || CATEGORY_COLORS[EXPENSE_CATEGORIES.OTHER];
}
