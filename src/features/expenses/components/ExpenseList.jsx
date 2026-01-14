import { ExpenseItem } from './ExpenseItem.jsx';
import { useThemeStore } from '../../theme/store/useThemeStore.js';
import { THEME_COLORS } from '../../theme/utils/theme.constants.js';
import PropTypes from 'prop-types';

export function ExpenseList({ expenses, onDeleteExpense }) {
    const { theme } = useThemeStore();
    const colors = THEME_COLORS[theme];

    if (expenses.length === 0) {
        return (
            <div className="text-center py-12">
                <p className={`text-lg ${colors.text} opacity-60`}>
                    No expenses yet. Add your first expense!
                </p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDeleteExpense={onDeleteExpense}
                />
            ))}
        </ul>
    );
}

ExpenseList.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDeleteExpense: PropTypes.func.isRequired,
};