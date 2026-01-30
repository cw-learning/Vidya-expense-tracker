import {
  validateExpense,
  validateExpenseAmount,
  validateExpenseCategory,
  validateExpenseTitle,
} from './validateExpense';

describe('validateExpense', () => {
  it('validates title correctly', () => {
    expect(validateExpenseTitle('')).toBe('Title cannot be empty');
    expect(validateExpenseTitle('Valid')).toBeNull();
    expect(validateExpenseTitle(null)).toBe('Title is required');
    expect(validateExpenseTitle('a'.repeat(101))).toBe(
      'Title must be less than 100 characters',
    );
  });

  it('validates amount correctly', () => {
    expect(validateExpenseAmount('')).toBe('Amount is required');
    expect(validateExpenseAmount('0')).toBe('Amount must be greater than zero');
    expect(validateExpenseAmount('abc')).toBe('Amount must be a valid number');
    expect(validateExpenseAmount('100')).toBeNull();
  });

  it('validates category correctly', () => {
    expect(validateExpenseCategory('')).toBe('Category is required');
    expect(validateExpenseCategory('invalid')).toBe(
      'Invalid category selected',
    );
    expect(validateExpenseCategory('food')).toBeNull();
  });

  it('validates full expense object', () => {
    const errors = validateExpense({ title: '', amount: '0' });
    expect(errors.title).toBe('Title cannot be empty');
    expect(errors.amount).toBe('Amount must be greater than zero');
  });

  it('returns multiple errors for invalid expense', () => {
    const errors = validateExpense({ title: '', amount: 'abc', category: '' });
    expect(Object.keys(errors).length).toBeGreaterThan(1);
  });

  it('handles null/undefined input', () => {
    const errors = validateExpense(null);
    expect(errors.title).toBeTruthy();
    expect(errors.amount).toBeTruthy();
  });
});
