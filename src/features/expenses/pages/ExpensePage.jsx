import { useState } from 'react';
import { ExpenseForm } from '../components/ExpenseForm.jsx';
import { ExpenseList } from '../components/ExpenseList.jsx';
import { TotalExpense } from '../components/TotalExpense.jsx';

export function ExpensePage() {
    const [expenses, setExpenses] = useState([]);

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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 text-center">
                        Expense Tracker
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                                Add Expense
                            </h2>
                            <ExpenseForm onAddExpense={handleAddExpense} />
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <TotalExpense totalAmount={totalExpenseAmount} />
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
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