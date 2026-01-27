import axios from 'axios';
import { vi } from 'vitest';
import { convertCurrency, fetchExchangeRates } from './currencyApi';

vi.mock('axios');

describe('currencyApi', () => {
  it('fetches exchange rates', async () => {
    const mockResponse = { data: { rates: { USD: 0.012 } } };
    vi.mocked(axios.get).mockResolvedValue(mockResponse);
    const rates = await fetchExchangeRates();
    expect(rates).toEqual({ USD: 0.012 });
  });

  it('converts currency correctly', () => {
    const result = convertCurrency(100, 'INR', 'USD', { INR: 1, USD: 0.012 });
    expect(result).toBe(1.2);
  });

  it('returns same amount for same currency', () => {
    const result = convertCurrency(100, 'INR', 'INR', { INR: 1 });
    expect(result).toBe(100);
  });

  it('handles missing rates gracefully', () => {
    const result = convertCurrency(100, 'INR', 'USD', {});
    expect(result).toBe(100);
  });
});
