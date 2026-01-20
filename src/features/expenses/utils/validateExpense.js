import { EXPENSE_CATEGORIES, EXPENSE_TYPES } from "../models/expense.model.js";

export function validateExpenseTitle(title) {
	if (title === null || title === undefined || typeof title !== "string") {
		return "title is required";
	}

	const trimmedTitle = title.trim();

	if (trimmedTitle.length === 0) {
		return "title cannot be empty";
	}

	if (trimmedTitle.length > 100) {
		return "title must be less than 100 characters";
	}

	return null;
}

export function validateExpenseAmount(amount) {
	if (amount === "" || amount === null || amount === undefined) {
		return "amount is required";
	}

	const numericAmount = Number(amount);

	if (Number.isNaN(numericAmount)) {
		return "amount must be a valid number";
	}

	if (numericAmount <= 0) {
		return "amount must be greater than zero";
	}

	if (numericAmount > 1000000) {
		return "amount must be less than 1,000,000";
	}

	return null;
}

export function validateExpenseCategory(category) {
	if (!category) {
		return "category is required";
	}

	const validCategories = Object.values(EXPENSE_CATEGORIES);

	if (!validCategories.includes(category)) {
		return "invalid category selected";
	}

	return null;
}

export function validateExpenseType(type) {
	if (!type) {
		return "type is required";
	}

	const validTypes = Object.values(EXPENSE_TYPES);

	if (!validTypes.includes(type)) {
		return "invalid type selected";
	}

	return null;
}

export function validateExpenseNotes(notes) {
	if (notes === null || notes === undefined) {
		return null; // Optional, so no error if missing
	}

	if (typeof notes !== "string") {
		return "notes must be a string";
	}

	const trimmedNotes = notes.trim();

	if (trimmedNotes.length > 500) {
		return "notes must be less than 500 characters";
	}

	return null; // No error if empty or within limit
}

export function validateExpense(expenseData) {
	if (!expenseData || typeof expenseData !== "object") {
		return {
			title: "title is required",
			amount: "amount is required",
			category: "category is required",
			type: "type is required",
		};
	}

	const errors = {};

	const titleError = validateExpenseTitle(expenseData.title);

	if (titleError) {
		errors.title = titleError;
	}

	const amountError = validateExpenseAmount(expenseData.amount);
	if (amountError) {
		errors.amount = amountError;
	}

	const categoryError = validateExpenseCategory(expenseData.category);
	if (categoryError) {
		errors.category = categoryError;
	}

	const typeError = validateExpenseType(expenseData.type);
	if (typeError) {
		errors.type = typeError;
	}

	const notesError = validateExpenseNotes(expenseData.notes);
	if (notesError) {
		errors.notes = notesError;
	}

	return errors;
}
