import { ExpenseItem } from './ExpenseItem.jsx';

export function ExpenseList({ expenses, onDeleteExpense }) {
    if (expenses.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No expenses yet. Add your first expense!</p>
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