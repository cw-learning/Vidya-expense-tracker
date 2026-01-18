import PropTypes from "prop-types";
import { Button } from "../../../shared/components/Button.jsx";
import { useThemeStore } from "../../theme/store/useThemeStore.js";
import { THEME_COLORS } from "../../theme/utils/theme.constants.js";
import {
	EXPENSE_CATEGORIES,
	EXPENSE_CATEGORY_LABELS,
} from "../models/expense.model.js";
import { getCategoryColor, getCategoryIcon } from "../utils/categoryIcons.js";

export function ExpenseItem({ expense, onDeleteExpense }) {
	const { theme } = useThemeStore();
	const colors = THEME_COLORS[theme];
	const categoryIcon = getCategoryIcon(expense.category);
	const categoryColor = getCategoryColor(expense.category);
	const categoryLabel =
		EXPENSE_CATEGORY_LABELS[expense.category] ??
		EXPENSE_CATEGORY_LABELS[EXPENSE_CATEGORIES.OTHER];

	function handleClickDelete() {
		onDeleteExpense(expense.id);
	}

	return (
		<li
			className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${colors.card} ${colors.border} shadow-md`}
		>
			<div className="flex items-center gap-3 flex-1">
				<div
					className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${categoryColor}`}
					aria-hidden="true"
				>
					{categoryIcon}
				</div>
				<div className="flex-1">
					<h3 className={`text-base font-bold ${colors.text}`}>
						{expense.title}
					</h3>
					<p className={`text-xs mt-0.5 ${colors.text} opacity-60 font-medium`}>
						{categoryLabel}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<span className={`text-lg font-black ${colors.accent}`}>
					₹{expense.amount.toFixed(2)}
				</span>
				<Button
					variant="danger"
					onClick={handleClickDelete}
					className="px-3 py-1.5 text-sm"
				>
					🗑️ Delete
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
