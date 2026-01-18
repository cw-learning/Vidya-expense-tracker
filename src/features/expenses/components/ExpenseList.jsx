import PropTypes from "prop-types";
import { useThemeStore } from "../../theme/store/useThemeStore.js";
import { THEME_COLORS } from "../../theme/utils/theme.constants.js";
import { ExpenseItem } from "./ExpenseItem.jsx";

export function ExpenseList({ expenses, onDeleteExpense }) {
	const { theme } = useThemeStore();
	const colors = THEME_COLORS[theme];

	if (expenses.length === 0) {
		return (
			<div className="text-center py-16">
				<div className="text-5xl mb-4">📊</div>
				<p className={`text-lg font-semibold ${colors.text} mb-2`}>
					No expenses yet
				</p>
				<p className={`text-sm ${colors.text} opacity-60`}>
					Start tracking by adding your first expense!
				</p>
			</div>
		);
	}

	return (
		<ul className="space-y-4">
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
