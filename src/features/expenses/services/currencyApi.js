import axios from 'axios';

const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const SUPPORTED_CURRENCIES = {
  INR: 'INR',
  USD: 'USD',
  EUR: 'EUR',
};

export const CURRENCY_LABELS = {
  [SUPPORTED_CURRENCIES.INR]: '₹ INR',
  [SUPPORTED_CURRENCIES.USD]: '$ USD',
  [SUPPORTED_CURRENCIES.EUR]: '€ EUR',
};

export const CURRENCY_SYMBOLS = {
  [SUPPORTED_CURRENCIES.INR]: '₹',
  [SUPPORTED_CURRENCIES.USD]: '$',
  [SUPPORTED_CURRENCIES.EUR]: '€',
};

// Fetch exchange rates from the API
export async function fetchExchangeRates(baseCurrency = 'INR', signal = null) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${baseCurrency}`, {
      signal,
    });

    return response.data.rates;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request cancelled');
    }
    throw new Error('Failed to fetch exchange rates');
  }
}

export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rateToTarget = rates[toCurrency];
  const convertedAmount = amount * rateToTarget;

  return Number(convertedAmount.toFixed(2));
}
