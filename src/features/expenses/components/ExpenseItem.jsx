import { Button } from '../../../shared/components/Button.jsx';
import { EXPENSE_CATEGORY_LABELS } from '../models/expense.model.js';
import PropTypes from 'prop-types';

export function ExpenseItem({ expense, onDeleteExpense }) {
    function handleClickDelete() {
        onDeleteExpense(expense.id);
    }

    return (
        <li className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{expense.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    {EXPENSE_CATEGORY_LABELS[expense.category]}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-gray-900">
                    ₹{expense.amount.toFixed(2)}
                </span>
                <Button variant="danger" onClick={handleClickDelete}>
                    Delete
                </Button>
            </div>
        </li>
    );
}

ExpenseItem.propTypes = {
    expense: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
    onDeleteExpense: PropTypes.func.isRequired,
};