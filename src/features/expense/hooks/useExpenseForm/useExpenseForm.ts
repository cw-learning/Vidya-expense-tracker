import type { FormEvent } from 'react';
import { useState } from 'react';
import { ExpenseKind } from '../../constants/expense.constants';
import { createExpense } from '../../models/expense.model';
import type {
  ExpenseFormDataType,
  ExpenseType,
} from '../../types/expense.types';
import { validateExpense } from '../../utils/validation/validateExpense';

const INITIAL_FORM_STATE: ExpenseFormDataType = {
  title: '',
  amount: '',
  category: '',
  type: ExpenseKind.EXPENSE,
  notes: '',
};

/**
 * Custom hook for managing expense form state, validation, and submission.
 *
 * @param onAddExpense - Callback function invoked when a valid expense is submitted
 * @returns Form state, errors, field updater, and submit handler
 */
export function useExpenseForm(onAddExpense: (expense: ExpenseType) => void) {
  const [formData, setFormData] =
    useState<ExpenseFormDataType>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof ExpenseFormDataType, value: string) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [field]: value,
    }));
    if (formErrors[field]) {
      setFormErrors((previousErrors) => ({ ...previousErrors, [field]: '' }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const errors = validateExpense(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const newExpense = createExpense(
      formData.title,
      formData.amount,
      formData.category,
      formData.type,
      formData.notes,
    );
    onAddExpense(newExpense);
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
  };

  return { formData, formErrors, updateField, handleSubmit };
}
