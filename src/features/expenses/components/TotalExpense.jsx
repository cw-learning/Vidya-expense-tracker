import PropTypes from 'prop-types';

export function TotalExpense({ totalAmount }) {
    return (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Total Expenses</h2>
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