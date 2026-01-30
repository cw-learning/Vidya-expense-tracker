import {
  EXPENSE_CATEGORIES,
  EXPENSE_TYPES,
  NOTES_MAX_LENGTH,
} from '../../constants/expense.constants';

export function validateExpenseTitle(
  title: string | null | undefined,
): string | null {
  if (title == null || typeof title !== 'string') return 'Title is required';
  const trimmed = title.trim();
  if (!trimmed) return 'Title cannot be empty';
  if (trimmed.length > 100) return 'Title must be less than 100 characters';
  return null;
}

export function validateExpenseAmount(
  amount: string | null | undefined,
): string | null {
  if (amount == null || amount === '') return 'Amount is required';
  const num = Number(amount);
  if (Number.isNaN(num)) return 'Amount must be a valid number';
  if (num <= 0) return 'Amount must be greater than zero';
  if (num > 1000000) return 'Amount must be less than 1,000,000';
  return null;
}

export function validateExpenseCategory(
  category: string | null | undefined,
): string | null {
  if (!category) return 'Category is required';
  const validCategories = Object.values(EXPENSE_CATEGORIES) as string[];
  if (!validCategories.includes(category)) return 'Invalid category selected';
  return null;
}

export function validateExpenseType(
  type: string | null | undefined,
): string | null {
  if (!type) return 'Type is required';
  const validTypes = Object.values(EXPENSE_TYPES) as string[];
  if (!validTypes.includes(type)) return 'Invalid type selected';
  return null;
}

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
