import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as currencyApi from '../../services/currencyApi/currencyApi';
import { useCurrencyConversion } from './useCurrencyConversion';

const mockFetchExchangeRates = vi.fn();
const mockConvertCurrency = vi.fn();

vi.mock('../../services/currencyApi/currencyApi');

describe('useCurrencyConversion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(currencyApi.fetchExchangeRates).mockImplementation(
      mockFetchExchangeRates,
    );
    vi.mocked(currencyApi.convertCurrency).mockImplementation(
      mockConvertCurrency,
    );
  });

  it('initializes with INR as the default currency and the base amount as converted amount', () => {
    mockFetchExchangeRates.mockResolvedValue({ USD: 0.012 });
    const { result } = renderHook(() => useCurrencyConversion(100));
    expect(result.current.selectedCurrency).toBe('INR');
    expect(result.current.convertedAmount).toBe(100);
  });

  it('fetches exchange rates from the API when the hook is first mounted', async () => {
    mockFetchExchangeRates.mockResolvedValue({ USD: 0.012 });
    renderHook(() => useCurrencyConversion(100));
    await waitFor(() => expect(mockFetchExchangeRates).toHaveBeenCalled());
  });

  it('recalculates the converted amount using exchange rates when user changes currency', async () => {
    mockFetchExchangeRates.mockResolvedValue({ USD: 0.012 });
    mockConvertCurrency.mockReturnValue(1.2);
    const { result } = renderHook(() => useCurrencyConversion(100));
    result.current.onChangeCurrency('USD' as const);
    await waitFor(() => expect(result.current.convertedAmount).toBe(1.2));
  });
});
