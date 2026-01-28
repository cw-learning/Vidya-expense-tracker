import { useState } from 'react';
import { EXPENSE_TYPES } from '../../constants/expense.constants';
import { createExpense } from './../../models/expense.model';
import type {
  ExpenseFormDataProps,
  ExpenseProps,
} from '../../types/expense.types';
import { validateExpense } from '../../utils/validation/validateExpense';

const INITIAL_FORM_STATE: ExpenseFormDataProps = {
  title: '',
  amount: '',
  category: 'food',
  type: EXPENSE_TYPES.EXPENSE,
  notes: '',
};

export function useExpenseForm(onAddExpense: (expense: ExpenseProps) => void) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof ExpenseFormDataProps, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
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
