import { useThemeColors } from '../../../../core/hooks/useThemeColors';
import { Button } from '../../../../shared/atoms/Button/Button';
import { FormField } from '../../../../shared/molecules/FormField/FormField';
import { SelectField } from '../../../../shared/molecules/SelectField/SelectField';
import {
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORY_LABELS,
  EXPENSE_TYPE_LABELS,
  EXPENSE_TYPES,
} from '../../constants/expense.constants';
import { useExpenseForm } from '../../hooks/useExpenseForm/useExpenseForm';
import type { ExpenseFormProps } from './ExpenseForm.types';

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const { formData, formErrors, updateField, handleSubmit } =
    useExpenseForm(onAddExpense);
  const { text } = useThemeColors();

  const categoryOptions = Object.values(EXPENSE_CATEGORIES).map((value) => ({
    value,
    label: EXPENSE_CATEGORY_LABELS[value],
  }));

  const typeOptions = Object.values(EXPENSE_TYPES).map((value) => ({
    value,
    label: EXPENSE_TYPE_LABELS[value],
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <label
          htmlFor="expense-title"
          className={`block text-sm font-semibold mb-2 ${text}`}
        >
          <span className="flex items-center gap-2">
            <span>📝</span>
            Title
          </span>
        </label>
        <FormField
          label=""
          id="expense-title"
          value={formData.title}
          onChange={(event) => {
            const { value } = event.target;
            updateField('title', value);
          }}
          error={formErrors.title}
          placeholder="e.g., Grocery shopping"
        />
      </div>

      <div className="relative">
        <label
          htmlFor="expense-amount"
          className={`block text-sm font-semibold mb-2 ${text}`}
        >
          <span className="flex items-center gap-2">
            <span>₹</span>
            Amount
          </span>
        </label>
        <FormField
          label=""
          id="expense-amount"
          type="number"
          value={formData.amount}
          onChange={(event) => {
            const { value } = event.target;
            updateField('amount', value);
          }}
          error={formErrors.amount}
          placeholder="0.00"
        />
      </div>

      <div className="relative">
        <label
          htmlFor="expense-category"
          className={`block text-sm font-semibold mb-2 ${text}`}
        >
          <span className="flex items-center gap-2">
            <span>🏷️</span>
            Category
          </span>
        </label>
        <SelectField
          label=""
          id="expense-category"
          value={formData.category}
          onChange={(e) => updateField('category', e.target.value)}
          options={categoryOptions}
          error={formErrors.category}
          placeholder="Select a category"
        />
      </div>

      <div className="relative">
        <label
          htmlFor="expense-type"
          className={`block text-sm font-semibold mb-2 ${text}`}
        >
          <span className="flex items-center gap-2">
            <span>💰</span>
            Type
          </span>
        </label>
        <SelectField
          label=""
          id="expense-type"
          value={formData.type}
          onChange={(e) => updateField('type', e.target.value)}
          options={typeOptions}
          error={formErrors.type}
        />
      </div>

      <div className="relative">
        <label
          htmlFor="expense-notes"
          className={`block text-sm font-semibold mb-2 ${text}`}
        >
          <span className="flex items-center gap-2">
            <span>📝</span>
            Notes (Optional)
          </span>
        </label>
        <FormField
          label=""
          id="expense-notes"
          value={formData.notes}
          onChange={(event) => {
            const { value } = event.target;
            updateField('notes', value);
          }}
          error={formErrors.notes}
          placeholder="e.g., Weekly groceries"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full mt-6">
        Add Expense
      </Button>
    </form>
  );
}
