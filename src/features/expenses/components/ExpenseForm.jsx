import { useState } from 'react';
import { Button } from '../../../shared/components/Button.jsx';
import { ErrorMessage } from '../../../shared/components/ErrorMessage.jsx';
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
        'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
    const inputErrorStyles = 'border-red-500 focus:ring-red-500';

    return (
        <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
                <label htmlFor="expense-title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <input
                    id="expense-title"
                    type="text"
                    value={formData.title}
                    onChange={handleChangeTitle}
                    className={`${inputBaseStyles} ${formErrors.title ? inputErrorStyles : ''}`}
                    placeholder="Enter expense title"
                />
                <ErrorMessage message={formErrors.title} />
            </div>

            <div>
                <label htmlFor="expense-amount" className="block text-sm font-medium mb-1">
                    Amount
                </label>
                <input
                    id="expense-amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChangeAmount}
                    className={`${inputBaseStyles} ${formErrors.amount ? inputErrorStyles : ''}`}
                    placeholder="Enter amount"
                />
                <ErrorMessage message={formErrors.amount} />
            </div>

            <div>
                <label htmlFor="expense-category" className="block text-sm font-medium mb-1">
                    Category
                </label>
                <select
                    id="expense-category"
                    value={formData.category}
                    onChange={handleChangeCategory}
                    className={`${inputBaseStyles} ${formErrors.category ? inputErrorStyles : ''}`}
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

            <Button type="submit" className="w-full">
                Add Expense
            </Button>
        </form>
    );
}

ExpenseForm.propTypes = {
    onAddExpense: PropTypes.func.isRequired,
};