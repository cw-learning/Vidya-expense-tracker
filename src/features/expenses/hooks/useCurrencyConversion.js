import { useEffect, useState } from "react";
import {
	convertCurrency,
	fetchExchangeRates,
	SUPPORTED_CURRENCIES,
} from "../services/currencyApi.js";

export function useCurrencyConversion(baseAmount) {
	const [selectedCurrency, setSelectedCurrency] = useState(
		SUPPORTED_CURRENCIES.INR
	);
	const [convertedAmount, setConvertedAmount] = useState(baseAmount);
	const [exchangeRates, setExchangeRates] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch exchange rates on mount
	useEffect(() => {
		const abortController = new AbortController();

		async function loadExchangeRates() {
			setIsLoading(true);
			setError(null);

			try {
				const rates = await fetchExchangeRates("INR", abortController.signal);
				setExchangeRates(rates);
			} catch (err) {
				const message = err instanceof Error ? err.message : "Unknown error";
				if (message !== "Request cancelled") {
					setError(message);
				}
			} finally {
				setIsLoading(false);
			}
		}

		loadExchangeRates();

		return () => {
			abortController.abort();
		};
	}, []);

	// Convert amount when currency or base amount changes
	useEffect(() => {
		// For INR, always show the base amount
		if (selectedCurrency === SUPPORTED_CURRENCIES.INR) {
			setConvertedAmount(baseAmount);
			return;
		}

		// For other currencies, wait for rates to load
		if (!exchangeRates) {
			return;
		}

		const converted = convertCurrency(
			baseAmount,
			SUPPORTED_CURRENCIES.INR,
			selectedCurrency,
			exchangeRates
		);

		setConvertedAmount(converted);
	}, [baseAmount, selectedCurrency, exchangeRates]);

	function handleChangeCurrency(currency) {
		setSelectedCurrency(currency);
	}

	return {
		selectedCurrency,
		convertedAmount,
		isLoading,
		error,
		handleChangeCurrency,
	};
}
