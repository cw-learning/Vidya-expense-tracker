import { Button } from '../../../shared/components/Button.jsx';
import { EXPENSE_CATEGORY_LABELS } from '../models/expense.model.js';
import { useThemeStore } from '../../theme/store/useThemeStore.js';
import { THEME_COLORS } from '../../theme/utils/theme.constants.js';
import PropTypes from 'prop-types';

export function ExpenseItem({ expense, onDeleteExpense }) {
    const { theme } = useThemeStore();
    const colors = THEME_COLORS[theme];

    function handleClickDelete() {
        onDeleteExpense(expense.id);
    }

    return (
        <li className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow ${colors.card} ${colors.border}`}>
            <div className="flex-1">
                <h3 className={`text-lg font-semibold ${colors.text}`}>{expense.title}</h3>
                <p className={`text-sm mt-1 ${colors.text} opacity-70`}>
                    {EXPENSE_CATEGORY_LABELS[expense.category]}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <span className={`text-xl font-bold ${colors.text}`}>
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