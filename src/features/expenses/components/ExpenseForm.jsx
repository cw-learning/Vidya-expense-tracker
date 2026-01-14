import { useState } from 'react';
import { Button } from '../../../shared/components/Button.jsx';
import { ErrorMessage } from '../../../shared/components/ErrorMessage.jsx';
import { useThemeStore } from '../../theme/store/useThemeStore.js';
import { THEME_COLORS } from '../../theme/utils/theme.constants.js';
import {
    EXPENSE_CATEGORIES,
    EXPENSE_CATEGORY_LABELS,
    createExpense,
} from '../models/expense.model.js';
import { validateExpense } from '../utils/validateExpense.js';
import PropTypes from 'prop-types';

const INITIAL_FORM_STATE = {
    title: '',
    amount: '',
    category: '',
};

export function ExpenseForm({ onAddExpense }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [formErrors, setFormErrors] = useState({});
    const { theme } = useThemeStore();
    const colors = THEME_COLORS[theme];

    function handleChangeTitle(event) {
        setFormData((previousFormData) => ({
            ...previousFormData,
            title: event.target.value,
        }));

        if (formErrors.title) {
            setFormErrors((previousErrors) => ({
                ...previousErrors,
                title: null,
            }));
        }
    }

    function handleChangeAmount(event) {
        setFormData((previousFormData) => ({
            ...previousFormData,
            amount: event.target.value,
        }));

        if (formErrors.amount) {
            setFormErrors((previousErrors) => ({
                ...previousErrors,
                amount: null,
            }));
        }
    }

    function handleChangeCategory(event) {
        setFormData((previousFormData) => ({
            ...previousFormData,
            category: event.target.value,
        }));

        if (formErrors.category) {
            setFormErrors((previousErrors) => ({
                ...previousErrors,
                category: null,
            }));
        }
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        const errors = validateExpense(formData);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const newExpense = createExpense(
            formData.title,
            formData.amount,
            formData.category
        );

        onAddExpense(newExpense);
        setFormData(INITIAL_FORM_STATE);
        setFormErrors({});
    }

    const inputBaseStyles =
        `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${colors.input}`;
    const inputErrorStyles = 'border-red-500 focus:ring-red-500';
    const labelStyles = `block text-sm font-semibold mb-2 ${colors.text}`;

    return (
        <form onSubmit={handleSubmitForm} className="space-y-5">
            <div className="relative">
                <label htmlFor="expense-title" className={labelStyles}>
                    <span className="flex items-center gap-2">
                        <span>📝</span>
                        Title
                    </span>
                </label>
                <input
                    id="expense-title"
                    type="text"
                    value={formData.title}
                    onChange={handleChangeTitle}
                    className={`${inputBaseStyles} ${formErrors.title ? inputErrorStyles : ''}`}
                    placeholder="e.g., Grocery shopping"
                />
                <ErrorMessage message={formErrors.title} />
            </div>

            <div className="relative">
                <label htmlFor="expense-amount" className={labelStyles}>
                    <span className="flex items-center gap-2">
                        <span>₹</span>
                        Amount
                    </span>
                </label>
                <input
                    id="expense-amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChangeAmount}
                    className={`${inputBaseStyles} ${formErrors.amount ? inputErrorStyles : ''}`}
                    placeholder="0.00"
                />
                <ErrorMessage message={formErrors.amount} />
            </div>

            <div className="relative">
                <label htmlFor="expense-category" className={labelStyles}>
                    <span className="flex items-center gap-2">
                        <span>🏷️</span>
                        Category
                    </span>
                </label>
                <select
                    id="expense-category"
                    value={formData.category}
                    onChange={handleChangeCategory}
                    className={`${inputBaseStyles} ${formErrors.category ? inputErrorStyles : ''} cursor-pointer`}
                >
                    <option value="">Select a category</option>
                    {Object.values(EXPENSE_CATEGORIES).map((category) => (
                        <option key={category} value={category}>
                            {EXPENSE_CATEGORY_LABELS[category]}
                        </option>
                    ))}
                </select>
                <ErrorMessage message={formErrors.category} />
            </div>

            <Button type="submit" className="w-full mt-6">
                Add Expense
            </Button>
        </form>
    ); 
}

ExpenseForm.propTypes = {
    onAddExpense: PropTypes.func.isRequired,
};