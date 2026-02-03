import { useEffect, useState } from 'react';
import {
  convertCurrency,
  fetchExchangeRates,
  SUPPORTED_CURRENCIES,
} from '../../services/currencyApi/currencyApi';

type SupportedCurrency =
  (typeof SUPPORTED_CURRENCIES)[keyof typeof SUPPORTED_CURRENCIES];

/**
 * Custom hook for currency conversion functionality.
 * Fetches exchange rates on mount and converts base amount when currency changes.
 * Includes proper cleanup to prevent memory leaks.
 *
 * @param baseAmount - The base amount in INR to convert
 * @returns Currency state including selected currency, converted amount, loading state, errors, and change handler
 */
export function useCurrencyConversion(baseAmount: number) {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(
    SUPPORTED_CURRENCIES.INR,
  );
  const [convertedAmount, setConvertedAmount] = useState<number>(baseAmount);
  const [exchangeRates, setExchangeRates] = useState<Record<
    string,
    number
  > | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadExchangeRates() {
      setIsLoading(true);
      setError(null);
      try {
        const rates = await fetchExchangeRates('INR', abortController.signal);
        setExchangeRates(rates);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        if (message !== 'Request cancelled') {
          setError(message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadExchangeRates();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (selectedCurrency === SUPPORTED_CURRENCIES.INR) {
      setConvertedAmount(baseAmount);
      return;
    }
    if (!exchangeRates) return;
    const currency = convertCurrency(
      baseAmount,
      SUPPORTED_CURRENCIES.INR,
      selectedCurrency,
      exchangeRates,
    );
    setConvertedAmount(currency);
  }, [baseAmount, selectedCurrency, exchangeRates]);

  const onChangeCurrency = (currency: SupportedCurrency) =>
    setSelectedCurrency(currency);

  return {
    selectedCurrency,
    convertedAmount,
    isLoading,
    error,
    onChangeCurrency,
  };
}
