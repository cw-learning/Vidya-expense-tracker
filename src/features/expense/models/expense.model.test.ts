import { describe, expect, it } from 'vitest';
import { ExpenseKind } from '../constants/expense.constants';
import { createExpense } from './expense.model';

describe('createExpense', () => {
  it('creates an expense object with all provided fields and auto-generated id and timestamp', () => {
    const expense = createExpense(
      'Groceries',
      '100',
      'food',
      ExpenseKind.EXPENSE,
      'Weekly shopping',
    );

    expect(expense).toHaveProperty('id');
    expect(expense.title).toBe('Groceries');
    expect(expense.amount).toBe(100);
    expect(expense.category).toBe('food');
    expect(expense.type).toBe('expense');
    expect(expense.notes).toBe('Weekly shopping');
    expect(expense).toHaveProperty('createdAt');
  });

  it('removes leading and trailing whitespace from title and notes', () => {
    const expense = createExpense(
      '  Groceries  ',
      '100',
      'food',
      ExpenseKind.EXPENSE,
      '  Notes  ',
    );
    expect(expense.title).toBe('Groceries');
    expect(expense.notes).toBe('Notes');
  });

  it('sets type to "expense" when no type parameter is provided', () => {
    const expense = createExpense('Groceries', '100', 'food');
    expect(expense.type).toBe('expense');
  });

  it('sets notes to empty string when no notes parameter is provided', () => {
    const expense = createExpense(
      'Groceries',
      '100',
      'food',
      ExpenseKind.EXPENSE,
    );
    expect(expense.notes).toBe('');
  });

  it('parses the amount string parameter into a numeric value', () => {
    const expense = createExpense('Groceries', '123.45', 'food');
    expect(expense.amount).toBe(123.45);
    expect(typeof expense.amount).toBe('number');
  });

  it('generates a different unique identifier for each expense created', () => {
    const expense1 = createExpense('Test1', '10', 'food');
    const expense2 = createExpense('Test2', '20', 'food');
    expect(expense1.id).not.toBe(expense2.id);
  });

  it('generates a valid ISO 8601 formatted date string for createdAt timestamp', () => {
    const expense = createExpense('Test', '10', 'food');
    const date = new Date(expense.createdAt);
    expect(date.toISOString()).toBe(expense.createdAt);
  });
});
