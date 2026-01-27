import { EXPENSE_TYPES } from '../constants/expense.constants';
import { createExpense } from './expense.model';

describe('createExpense', () => {
  it('creates expense with all fields', () => {
    const expense = createExpense(
      'Groceries',
      '100',
      'food',
      EXPENSE_TYPES.EXPENSE,
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

  it('trims title and notes', () => {
    const expense = createExpense(
      '  Groceries  ',
      '100',
      'food',
      EXPENSE_TYPES.EXPENSE,
      '  Notes  ',
    );
    expect(expense.title).toBe('Groceries');
    expect(expense.notes).toBe('Notes');
  });

  it('defaults to expense type', () => {
    const expense = createExpense('Groceries', '100', 'food');
    expect(expense.type).toBe('expense');
  });

  it('defaults to empty notes', () => {
    const expense = createExpense(
      'Groceries',
      '100',
      'food',
      EXPENSE_TYPES.EXPENSE,
    );
    expect(expense.notes).toBe('');
  });

  it('converts string amount to number', () => {
    const expense = createExpense('Groceries', '123.45', 'food');
    expect(expense.amount).toBe(123.45);
    expect(typeof expense.amount).toBe('number');
  });

  it('generates unique IDs', () => {
    const expense1 = createExpense('Test1', '10', 'food');
    const expense2 = createExpense('Test2', '20', 'food');
    expect(expense1.id).not.toBe(expense2.id);
  });

  it('creates valid ISO date string', () => {
    const expense = createExpense('Test', '10', 'food');
    const date = new Date(expense.createdAt);
    expect(date.toISOString()).toBe(expense.createdAt);
  });
});
