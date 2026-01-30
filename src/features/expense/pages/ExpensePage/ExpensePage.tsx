import { useState } from 'react';
import { useThemeColors } from '../../../../core/hooks/useThemeColors';
import { Button } from '../../../../shared/atoms/Button/Button';
import { Header } from '../../../../shared/organisms/Header/Header';
import { Modal } from '../../../../shared/organisms/Modal/Modal';
import { ThemeToggle } from '../../../theme/components/ThemeToggle/ThemeToggle';
import { ExpenseForm } from '../../components/ExpenseForm/ExpenseForm';
import { ExpenseGrid } from '../../components/ExpenseGrid/ExpenseGrid';
import { useCurrencyConversion } from '../../hooks/useCurrencyConversion/useCurrencyConversion';
import {
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
  SUPPORTED_CURRENCIES,
} from '../../services/currencyApi/currencyApi';
import type { ExpenseProps } from '../../types/expense.types';

export function ExpensePage() {
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bg, text, border, accentText } = useThemeColors();

  const handleAddExpense = (expense: ExpenseProps) => {
    setExpenses((prev) => [expense, ...prev]);
    setIsModalOpen(false);
  };

  const handleUpdateExpense = (updatedExpense: ExpenseProps) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense,
      ),
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalExpenseAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const {
    selectedCurrency,
    convertedAmount,
    isLoading,
    error,
    handleChangeCurrency,
  } = useCurrencyConversion(totalExpenseAmount);

  return (
    <div className={`min-h-screen py-6 px-4 ${bg} ${text}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Expense Button and Theme Toggle */}
        <header className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Header
                title="💰 Expense Tracker"
                subtitle="Track your expenses effortlessly"
              />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2"
              >
                + Add Expense
              </Button>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Total Expense Card */}
          <div
            className={`border-2 rounded-xl p-4 border-transparent shadow-xl transform transition-all duration-300 hover:scale-[1.01] bg-linear-to-br from-teal-500 to-emerald-600 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/90">
                    Total Expenses
                  </p>
                  <p className="text-xl font-black text-white drop-shadow-lg">
                    ₹{totalExpenseAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Currency Converter Card */}
          <div
            className={`border-2 rounded-xl p-4 ${bg} ${border} shadow-xl transform transition-all duration-300 hover:scale-[1.01] hover:shadow-teal-300/50 hover:border-teal-300 relative overflow-hidden`}
          >
            {error ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-red-600 text-sm font-semibold">
                    Failed to load exchange rates
                  </p>
                  <p className={`text-xl font-bold ${accentText}`}>
                    ₹{totalExpenseAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💱</span>
                  <select
                    value={selectedCurrency}
                    onChange={(event) => {
                      const { value } = event.target;
                      handleChangeCurrency(
                        value as keyof typeof SUPPORTED_CURRENCIES,
                      );
                    }}
                    disabled={isLoading}
                    className={`px-3 py-1.5 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer ${bg} ${border} disabled:opacity-50 font-semibold text-sm ${text}`}
                    aria-label="Select currency"
                  >
                    {Object.values(SUPPORTED_CURRENCIES).map((currency) => (
                      <option key={currency} value={currency}>
                        {CURRENCY_LABELS[currency]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  {isLoading && (
                    <span className="animate-spin text-sm">⏳</span>
                  )}
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-wide opacity-70">
                      Converted
                    </p>
                    <p className={`text-xl font-black ${accentText}`}>
                      {CURRENCY_SYMBOLS[selectedCurrency]}
                      {convertedAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`${bg} rounded-3xl shadow-xl p-6 border-2 ${border} transform transition-all duration-300 hover:scale-[1.01] hover:shadow-teal-300/50 hover:border-teal-300`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-xl font-bold ${accentText} flex items-center gap-2`}
            >
              <span className="text-2xl">📊</span>
              Your Expenses
            </h2>
          </div>
          <ExpenseGrid
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            onUpdateExpense={handleUpdateExpense}
          />
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Expense"
        >
          <ExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </div>
  );
}
