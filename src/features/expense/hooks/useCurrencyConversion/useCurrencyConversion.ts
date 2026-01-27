import { useEffect, useState } from 'react';
import {
  convertCurrency,
  fetchExchangeRates,
  SUPPORTED_CURRENCIES,
} from '../../services/currencyApi/currencyApi';

type SupportedCurrency =
  (typeof SUPPORTED_CURRENCIES)[keyof typeof SUPPORTED_CURRENCIES];

export function useCurrencyConversion(baseAmount: number) {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(
    SUPPORTED_CURRENCIES.INR,
  );
  const [convertedAmount, setConvertedAmount] = useState(baseAmount);
  const [exchangeRates, setExchangeRates] = useState<Record<
    string,
    number
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    const converted = convertCurrency(
      baseAmount,
      SUPPORTED_CURRENCIES.INR,
      selectedCurrency,
      exchangeRates,
    );
    setConvertedAmount(converted);
  }, [baseAmount, selectedCurrency, exchangeRates]);

  const handleChangeCurrency = (currency: SupportedCurrency) =>
    setSelectedCurrency(currency);

  return {
    selectedCurrency,
    convertedAmount,
    isLoading,
    error,
    handleChangeCurrency,
  };
}
