import { describe, expect, it } from 'vitest';
import {
  validateExpense,
  validateExpenseAmount,
  validateExpenseCategory,
  validateExpenseTitle,
} from './validateExpense';

describe('validateExpense', () => {
  describe('validateExpenseTitle', () => {
    it('returns an error message when title is an empty string', () => {
      const error = validateExpenseTitle('');

      expect(error).toBe('Title cannot be empty');
    });

    it('returns null when title is valid and non-empty', () => {
      const error = validateExpenseTitle('Valid');

      expect(error).toBeNull();
    });

    it('returns an error message when title is null or undefined', () => {
      const error = validateExpenseTitle(null);

      expect(error).toBe('Title is required');
    });

    it('returns an error message when title exceeds the 100 character limit', () => {
      const error = validateExpenseTitle('a'.repeat(101));

      expect(error).toBe('Title must be less than 100 characters');
    });
  });

  describe('validateExpenseAmount', () => {
    it('returns an error message when amount is an empty string', () => {
      const error = validateExpenseAmount('');

      expect(error).toBe('Amount is required');
    });

    it('returns an error message when amount is zero', () => {
      const error = validateExpenseAmount('0');

      expect(error).toBe('Amount must be greater than zero');
    });

    it('returns an error message when amount contains non-numeric characters', () => {
      const error = validateExpenseAmount('abc');

      expect(error).toBe('Amount must be a valid number');
    });

    it('returns null when amount is a valid positive numeric string', () => {
      const error = validateExpenseAmount('100');

      expect(error).toBeNull();
    });
  });

  describe('validateExpenseCategory', () => {
    it('returns an error message when category is an empty string', () => {
      const error = validateExpenseCategory('');

      expect(error).toBe('Category is required');
    });

    it('returns an error message when category is not in the list of valid categories', () => {
      const error = validateExpenseCategory('invalid');

      expect(error).toBe('Invalid category selected');
    });

    it('returns null when category is a valid option from the allowed list', () => {
      const error = validateExpenseCategory('food');

      expect(error).toBeNull();
    });
  });

  describe('validateExpense', () => {
    it('returns validation errors for multiple invalid fields simultaneously', () => {
      const errors = validateExpense({ title: '', amount: '0' });

      expect(errors.title).toBe('Title cannot be empty');
      expect(errors.amount).toBe('Amount must be greater than zero');
    });

    it('accumulates errors from all validation functions when all fields are invalid', () => {
      const errors = validateExpense({
        title: '',
        amount: 'abc',
        category: '',
      });

      expect(Object.keys(errors).length).toBeGreaterThan(1);
    });

    it('returns error messages for required fields when input is null or undefined', () => {
      const errors = validateExpense(null);

      expect(errors.title).toBeTruthy();
      expect(errors.amount).toBeTruthy();
    });
  });
});
