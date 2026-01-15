import { EXPENSE_CATEGORIES } from '../models/expense.model.js';

export function validateExpenseTitle(title) {
  if (title === null || title === undefined || typeof title !== 'string') {
    return 'title is required';
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return 'title cannot be empty';
  }

  if (trimmedTitle.length > 100) {
    return 'title must be less than 100 characters';
  }

  return null;
}

export function validateExpenseAmount(amount) {
  if (amount === '' || amount === null || amount === undefined) {
    return 'amount is required';
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return 'amount must be a valid number';
  }

  if (numericAmount <= 0) {
    return 'amount must be greater than zero';
  }

  if (numericAmount > 1000000) {
    return 'amount must be less than 1,000,000';
  }

  return null;
}

export function validateExpenseCategory(category) {
  if (!category) {
    return 'category is required';
  }

  const validCategories = Object.values(EXPENSE_CATEGORIES);

  if (!validCategories.includes(category)) {
    return 'invalid category selected';
  }

  return null;
}

export function validateExpense(expenseData) {
  const expense = expenseData && typeof expenseData === 'object' ? expenseData : {};

  const errors = {};

  const titleError = validateExpenseTitle(expense.title);
  if (titleError) errors.title = titleError;

  const amountError = validateExpenseAmount(expense.amount);
  if (amountError) errors.amount = amountError;

  const categoryError = validateExpenseCategory(expense.category);
  if (categoryError) errors.category = categoryError;

  return errors;
}
