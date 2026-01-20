import { useState } from "react";
import { Button } from "../../../shared/components/Button.jsx";
import { ThemeToggle } from "../../theme/components/ThemeToggle.jsx";
import { useThemeStore } from "../../theme/store/useThemeStore.js";
import { THEME_COLORS } from "../../theme/utils/theme.constants.js";
import { CurrencyConverter } from "../components/CurrencyConverter.jsx";
import { ExpenseForm } from "../components/ExpenseForm.jsx";
import { ExpenseGrid } from "../components/ExpenseGrid.jsx";
import { TotalExpense } from "../components/TotalExpense.jsx";

export function ExpensePage() {
	const [expenses, setExpenses] = useState([]);
	const { theme } = useThemeStore();
	const colors = THEME_COLORS[theme];
	const [showForm, setShowForm] = useState(false);

	function handleAddExpense(newExpense) {
		setExpenses((previousExpenses) => [...previousExpenses, newExpense]);
	}

	function handleUpdateExpense(updatedExpense) {
		setExpenses((previousExpenses) =>
			previousExpenses.map((expense) =>
				expense.id === updatedExpense.id ? updatedExpense : expense
			)
		);
	}

	function handleDeleteExpense(expenseId) {
		setExpenses((previousExpenses) =>
			previousExpenses.filter((expense) => expense.id !== expenseId)
		);
	}

	const totalExpenseAmount = expenses.reduce(
		(total, expense) => total + expense.amount,
		0
	);

	return (
		<div
			className={`min-h-screen py-6 px-4 ${colors.background} ${colors.text}`}
		>
			<div className="max-w-7xl mx-auto">
				<header className="mb-8">
					<div className="flex items-center justify-between">
						<div className="flex-1">
							<h1 className="text-3xl font-black mb-1 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
								💰 Expense Tracker
							</h1>
							<p className={`text-sm font-medium ${colors.text} opacity-70`}>
								Track your expenses effortlessly
							</p>
						</div>
						<ThemeToggle />
					</div>
				</header>

				{/* Stats Cards - Horizontal Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					<TotalExpense totalAmount={totalExpenseAmount} />
					<CurrencyConverter totalAmount={totalExpenseAmount} />
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 gap-6">
					<div
						className={`${colors.cardGradient} rounded-3xl ${colors.shadow} p-6 border-2 ${colors.border} transform transition-all duration-300 hover:scale-[1.01] hover:shadow-teal-300/50 hover:border-teal-300`}
					>
						<div className="flex items-center justify-between mb-6">
							<h2
								className={`text-xl font-bold ${colors.accent} flex items-center gap-2`}
							>
								<span className="text-2xl">📊</span>
								Your Expenses
							</h2>
							<Button
								onClick={() => setShowForm(!showForm)}
								className={`px-4 py-2 rounded ${colors.button} ${colors.buttonText}`}
							>
								{showForm ? "Cancel" : "+ Add New Expense"}
							</Button>
						</div>
						{showForm && (
							<div className="mb-6">
								<ExpenseForm onAddExpense={handleAddExpense} />
							</div>
						)}
						<ExpenseGrid
							expenses={expenses}
							onUpdateExpense={handleUpdateExpense}
							onDeleteExpense={handleDeleteExpense}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
