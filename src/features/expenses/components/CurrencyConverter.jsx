import PropTypes from "prop-types";
import { useThemeStore } from "../../theme/store/useThemeStore.js";
import { THEME_COLORS } from "../../theme/utils/theme.constants.js";
import { useCurrencyConversion } from "../hooks/useCurrencyConversion.js";
import {
	CURRENCY_LABELS,
	CURRENCY_SYMBOLS,
	SUPPORTED_CURRENCIES,
} from "../services/currencyApi.js";

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
			<div
				className={`border-2 rounded-2xl p-8 ${colors.card} ${colors.border} ${colors.shadow} bg-gradient-to-br from-red-500/10 to-orange-500/10`}
			>
				<div className="flex items-center gap-3 mb-3">
					<span className="text-3xl">⚠️</span>
					<p className="text-red-600 text-sm font-semibold">
						Failed to load exchange rates
					</p>
				</div>
				<p className={`text-3xl font-bold ${colors.accent}`}>
					₹{totalAmount.toFixed(2)}
				</p>
			</div>
		);
	}

	return (
		<div
			className={`border-2 rounded-xl p-2.5 ${colors.cardGradient} ${colors.border} ${colors.shadow} transform transition-all duration-300 hover:scale-[1.01] hover:shadow-teal-300/50 hover:border-teal-300 relative overflow-hidden`}
		>
			<div className="flex items-center justify-between gap-4 relative z-10">
				<div className="flex items-center gap-3">
					<span className="text-2xl">💱</span>
					<label htmlFor="currency-select" className="sr-only">
						Select currency
					</label>
					<select
						id="currency-select"
						value={selectedCurrency}
						onChange={(e) => handleChangeCurrency(e.target.value)}
						disabled={isLoading}
						className={`px-3 py-1.5 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer ${colors.input} disabled:opacity-50 font-semibold text-sm`}
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
						<output
							aria-live="polite"
							className="flex items-center gap-1 text-sm"
						>
							<span className="sr-only">Loading exchange rates</span>
							<span aria-hidden="true" className="animate-spin">
								⏳
							</span>
						</output>
					)}

					<div className="text-right">
						<p className="text-xs font-bold uppercase tracking-wide opacity-70">
							Converted
						</p>
						<p className={`text-xl font-black ${colors.accent}`}>
							{CURRENCY_SYMBOLS[selectedCurrency]}
							{convertedAmount.toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

CurrencyConverter.propTypes = {
	totalAmount: PropTypes.number.isRequired,
};
