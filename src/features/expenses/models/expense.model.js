// Expense categories
export const EXPENSE_CATEGORIES = {
	FOOD: "food",
	TRANSPORT: "transport",
	ENTERTAINMENT: "entertainment",
	UTILITIES: "utilities",
	HEALTHCARE: "healthcare",
	SHOPPING: "shopping",
	OTHER: "other",
};

// Labels for expense categories
export const EXPENSE_CATEGORY_LABELS = {
	[EXPENSE_CATEGORIES.FOOD]: "Food",
	[EXPENSE_CATEGORIES.TRANSPORT]: "Transport",
	[EXPENSE_CATEGORIES.ENTERTAINMENT]: "Entertainment",
	[EXPENSE_CATEGORIES.UTILITIES]: "Utilities",
	[EXPENSE_CATEGORIES.HEALTHCARE]: "Healthcare",
	[EXPENSE_CATEGORIES.SHOPPING]: "Shopping",
	[EXPENSE_CATEGORIES.OTHER]: "Other",
};

// Expense types
export const EXPENSE_TYPES = {
	INCOME: "income",
	EXPENSE: "expense",
};

// Labels for expense types
export const EXPENSE_TYPE_LABELS = {
	[EXPENSE_TYPES.INCOME]: "Income",
	[EXPENSE_TYPES.EXPENSE]: "Expense",
};

// Create a new expense object with a unique id, trimmed title, numeric amount, category, type, notes, and creation timestamp
export function createExpense(
	title,
	amount,
	category,
	type = EXPENSE_TYPES.EXPENSE,
	notes = ""
) {
	return {
		id: crypto.randomUUID(),
		title: title.trim(),
		amount: Number(amount),
		category,
		type,
		notes: notes.trim(),
		createdAt: new Date().toISOString(),
	};
}
