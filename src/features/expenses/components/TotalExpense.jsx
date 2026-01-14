import PropTypes from 'prop-types';

export function TotalExpense({ totalAmount }) {
    return (
        <div className="border-2 rounded-xl p-2.5 border-transparent shadow-xl transform transition-all duration-300 hover:scale-[1.01] bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 relative overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-white/90">Total Expenses</p>
                        <p className="text-xl font-black text-white drop-shadow-lg">₹{totalAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

TotalExpense.propTypes = {
    totalAmount: PropTypes.number.isRequired,
};