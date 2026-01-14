import { useCurrencyConversion } from '../hooks/useCurrencyConversion.js';
import {
    SUPPORTED_CURRENCIES,
    CURRENCY_LABELS,
    CURRENCY_SYMBOLS,
} from '../services/currencyApi.js';
import { useThemeStore } from '../../theme/store/useThemeStore.js';
import { THEME_COLORS } from '../../theme/utils/theme.constants.js';
import PropTypes from 'prop-types';

export function CurrencyConverter({ totalAmount }) {
    const { theme } = useThemeStore();
    const colors = THEME_COLORS[theme];

    const {
        selectedCurrency,
        convertedAmount,
        isLoading,
        error,
        handleChangeCurrency,
    } = useCurrencyConversion(totalAmount);

    if (error) {
        return (
            <div className={`border-2 rounded-lg p-6 ${colors.card} ${colors.border}`}>
                <p className="text-red-600 text-sm">
                    Failed to load exchange rates. Showing amount in INR.
                </p>
                <p className={`text-2xl font-bold mt-2 ${colors.text}`}>
                    ₹{totalAmount.toFixed(2)}
                </p>
            </div>
        );
    }

    return (
        <div className={`border-2 rounded-lg p-6 ${colors.card} ${colors.border}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${colors.cardText}`}>
                    Currency Converter
                </h3>
                {isLoading && (
                    <span className={`text-sm ${colors.text} opacity-70`}>Loading...</span>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="currency-select"
                        className={`block text-sm font-medium mb-2 ${colors.text}`}
                    >
                        Select Currency
                    </label>
                    <select
                        id="currency-select"
                        value={selectedCurrency}
                        onChange={(e) => handleChangeCurrency(e.target.value)}
                        disabled={isLoading}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${colors.card} ${colors.text} ${colors.border} disabled:opacity-50`}
                    >
                        {Object.values(SUPPORTED_CURRENCIES).map((currency) => (
                            <option key={currency} value={currency}>
                                {CURRENCY_LABELS[currency]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={`p-4 rounded-lg ${colors.background}`}>
                    <p className={`text-sm ${colors.text} opacity-70 mb-1`}>
                        Converted Amount
                    </p>
                    <p className={`text-3xl font-bold ${colors.text}`}>
                        {CURRENCY_SYMBOLS[selectedCurrency]}
                        {convertedAmount.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}

CurrencyConverter.propTypes = {
    totalAmount: PropTypes.number.isRequired,
};