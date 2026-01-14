import { useThemeStore } from '../../theme/store/useThemeStore.js';
import { THEME_COLORS } from '../../theme/utils/theme.constants.js';
import PropTypes from 'prop-types';

export function TotalExpense({ totalAmount }) {
    const { theme } = useThemeStore();
    const colors = THEME_COLORS[theme];

    return (
        <div className={`border-2 rounded-lg p-6 ${colors.card} ${colors.border}`}>
            <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${colors.cardText}`}>Total Expenses</h2>
                <p className="text-3xl font-bold text-blue-600">
                    ₹{totalAmount.toFixed(2)}
                </p>
            </div>
        </div>
    );
}

TotalExpense.propTypes = {
    totalAmount: PropTypes.number.isRequired,
};