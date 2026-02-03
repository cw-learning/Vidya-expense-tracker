import axios from 'axios';

const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const SUPPORTED_CURRENCIES = {
  INR: 'INR',
  USD: 'USD',
  EUR: 'EUR',
} as const;

export const CURRENCY_LABELS: Record<string, string> = {
  [SUPPORTED_CURRENCIES.INR]: '₹ INR',
  [SUPPORTED_CURRENCIES.USD]: '$ USD',
  [SUPPORTED_CURRENCIES.EUR]: '€ EUR',
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  [SUPPORTED_CURRENCIES.INR]: '₹',
  [SUPPORTED_CURRENCIES.USD]: '$',
  [SUPPORTED_CURRENCIES.EUR]: '€',
};

/**
 * Fetches current exchange rates from the API.
 *
 * @param baseCurrency - Base currency for rates (defaults to INR)
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to exchange rates object
 */
export async function fetchExchangeRates(
  baseCurrency = 'INR',
  signal?: AbortSignal,
) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${baseCurrency}`, {
      signal,
    });
    return response.data.rates as Record<string, number>;
  } catch (error) {
    if (axios.isCancel(error)) throw new Error('Request cancelled');
    throw new Error('Failed to fetch exchange rates');
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>,
) {
  if (fromCurrency === toCurrency) return amount;
  const rateFrom =
    rates[fromCurrency] ?? (fromCurrency === 'INR' ? 1 : undefined);
  const rateTo = rates[toCurrency] ?? (toCurrency === 'INR' ? 1 : undefined);
  if (typeof rateFrom !== 'number' || typeof rateTo !== 'number') return amount;
  return Number((amount * (rateTo / rateFrom)).toFixed(2));
}
