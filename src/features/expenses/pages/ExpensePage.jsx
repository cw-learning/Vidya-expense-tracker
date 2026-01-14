import { useState } from 'react';
import { ExpenseForm } from '../components/ExpenseForm.jsx';
import { ExpenseList } from '../components/ExpenseList.jsx';
import { TotalExpense } from '../components/TotalExpense.jsx';
import { ThemeToggle } from '../../theme/components/ThemeToggle.jsx';
import { useThemeStore } from '../../theme/store/useThemeStore.js';
import { THEME_COLORS } from '../../theme/utils/theme.constants.js';
import { CurrencyConverter } from '../components/CurrencyConverter.jsx';

export function ExpensePage() {
    const [expenses, setExpenses] = useState([]);
    const { theme } = useThemeStore();
    const colors = THEME_COLORS[theme];

    function handleAddExpense(newExpense) {
        setExpenses((previousExpenses) => [...previousExpenses, newExpense]);
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
        <div className={`min-h-screen py-8 px-4 ${colors.background} ${colors.text}`}>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-bold text-center flex-1">
                            Expense Tracker
                        </h1>
                        <ThemeToggle />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className={`${colors.card} rounded-lg shadow-md p-6 border ${colors.border}`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${colors.cardText}`}>
                                Add Expense
                            </h2>
                            <ExpenseForm onAddExpense={handleAddExpense} />
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <TotalExpense totalAmount={totalExpenseAmount} />
                        <CurrencyConverter totalAmount={totalExpenseAmount} />
                        <div className={`${colors.card} rounded-lg shadow-md p-6 border ${colors.border}`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${colors.cardText}`}>
                                Expenses
                            </h2>
                            <ExpenseList
                                expenses={expenses}
                                onDeleteExpense={handleDeleteExpense}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}