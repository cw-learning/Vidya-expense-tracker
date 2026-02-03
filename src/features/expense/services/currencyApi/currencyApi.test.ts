import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { convertCurrency, fetchExchangeRates } from './currencyApi';

const mockAxiosGet = vi.fn();

vi.mock('axios');

const setupMockAxios = (mockResponse?: {
  data: { rates: Record<string, number> };
}) => {
  vi.mocked(axios.get).mockImplementation(mockAxiosGet);
  if (mockResponse) {
    mockAxiosGet.mockResolvedValue(mockResponse);
  }
};

describe('currencyApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchExchangeRates', () => {
    it('retrieves exchange rates from the API and returns the rates object', async () => {
      const mockResponse = { data: { rates: { USD: 0.012 } } };
      setupMockAxios(mockResponse);

      const rates = await fetchExchangeRates();

      expect(rates).toEqual({ USD: 0.012 });
    });

    it('throws an error when the API request fails', async () => {
      setupMockAxios();
      mockAxiosGet.mockRejectedValue(new Error('Network error'));

      await expect(fetchExchangeRates()).rejects.toThrow(
        'Failed to fetch exchange rates',
      );
    });
  });

  describe('convertCurrency', () => {
    it('calculates the converted amount using the provided exchange rates', () => {
      const result = convertCurrency(100, 'INR', 'USD', { INR: 1, USD: 0.012 });

      expect(result).toBe(1.2);
    });

    it('returns the original amount unchanged when converting to the same currency', () => {
      const result = convertCurrency(100, 'INR', 'INR', { INR: 1 });

      expect(result).toBe(100);
    });

    it('returns the original amount as fallback when exchange rates are unavailable', () => {
      const result = convertCurrency(100, 'INR', 'USD', {});

      expect(result).toBe(100);
    });

    it('handles conversions between two non-base currencies correctly', () => {
      const result = convertCurrency(100, 'USD', 'EUR', {
        USD: 0.012,
        EUR: 0.011,
      });

      expect(result).toBeCloseTo(91.67, 2);
    });

    it('returns the original amount when source currency rate is missing', () => {
      const result = convertCurrency(100, 'GBP', 'USD', { USD: 0.012 });

      expect(result).toBe(100);
    });

    it('returns the original amount when target currency rate is missing', () => {
      const result = convertCurrency(100, 'INR', 'GBP', { INR: 1 });

      expect(result).toBe(100);
    });
  });
});
