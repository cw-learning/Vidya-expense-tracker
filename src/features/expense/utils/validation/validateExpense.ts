import {
  ExpenseCategory,
  ExpenseKind,
  NOTES_MAX_LENGTH,
} from '../../constants/expense.constants';

/**
 * Validates the expense title field.
 *
 * @param title - The title to validate
 * @returns Error message if invalid, null if valid
 */
export function validateExpenseTitle(
  title: string | null | undefined,
): string | null {
  if (title === null || title === undefined || typeof title !== 'string')
    return 'Title is required';
  const trimmed = title.trim();
  if (!trimmed) return 'Title cannot be empty';
  if (trimmed.length > 100) return 'Title must be less than 100 characters';
  return null;
}

/**
 * Validates the expense amount field.
 *
 * @param amount - The amount string to validate
 * @returns Error message if invalid, null if valid
 */
export function validateExpenseAmount(
  amount: string | null | undefined,
): string | null {
  if (amount === null || amount === undefined || amount === '')
    return 'Amount is required';
  const num = Number(amount);
  if (Number.isNaN(num)) return 'Amount must be a valid number';
  if (num <= 0) return 'Amount must be greater than zero';
  if (num > 1000000) return 'Amount must be less than 1,000,000';
  return null;
}

/**
 * Validates the expense category field.
 *
 * @param category - The category to validate
 * @returns Error message if invalid, null if valid
 */
export function validateExpenseCategory(
  category: string | null | undefined,
): string | null {
  if (!category) return 'Category is required';
  const validCategories = Object.values(ExpenseCategory) as string[];
  if (!validCategories.includes(category)) return 'Invalid category selected';
  return null;
}

/**
 * Validates the expense type field.
 *
 * @param type - The type to validate
 * @returns Error message if invalid, null if valid
 */
export function validateExpenseType(
  type: string | null | undefined,
): string | null {
  if (!type) return 'Type is required';
  const validTypes = Object.values(ExpenseKind) as string[];
  if (!validTypes.includes(type)) return 'Invalid type selected';
  return null;
}

/**
 * Validates the expense notes field.
 *
 * @param notes - The notes to validate
 * @returns Error message if invalid, null if valid
 */
export function validateExpenseNotes(
  notes: string | null | undefined,
): string | null {
  if (notes == null) return null;
  if (typeof notes !== 'string') return 'Notes must be a string';
  if (notes.trim().length > NOTES_MAX_LENGTH)
    return `Notes must be ${NOTES_MAX_LENGTH} characters or less`;
  return null;
}

export function validateExpense(expenseData: unknown): Record<string, string> {
  if (!expenseData || typeof expenseData !== 'object') {
    return {
      title: 'Title is required',
      amount: 'Amount is required',
      category: 'Category is required',
      type: 'Type is required',
    };
  }

  const data = expenseData as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const titleError = validateExpenseTitle(
    data.title as string | null | undefined,
  );
  if (titleError) errors.title = titleError;
  const amountError = validateExpenseAmount(
    data.amount as string | null | undefined,
  );
  if (amountError) errors.amount = amountError;
  const categoryError = validateExpenseCategory(
    data.category as string | null | undefined,
  );
  if (categoryError) errors.category = categoryError;
  const typeError = validateExpenseType(data.type as string | null | undefined);
  if (typeError) errors.type = typeError;
  const notesError = validateExpenseNotes(
    data.notes as string | null | undefined,
  );
  if (notesError) errors.notes = notesError;
  return errors;
}
