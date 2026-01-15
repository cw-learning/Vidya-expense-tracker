import { EXPENSE_CATEGORIES } from '../models/expense.model.js';

const MAX_TITLE_LENGTH = 100;  
const MAX_AMOUNT = 1_000_000; 

export function validateExpenseTitle(title) {
  if (title === null || title === undefined || typeof title !== 'string') {
    return 'title is required';
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return 'title cannot be empty';
  }

  if (trimmedTitle.length > MAX_TITLE_LENGTH) {  
  return `title must be less than ${MAX_TITLE_LENGTH} characters`;  
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

  if (numericAmount > MAX_AMOUNT) {  
  return `amount must be less than ${MAX_AMOUNT.toLocaleString()}`;  
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
