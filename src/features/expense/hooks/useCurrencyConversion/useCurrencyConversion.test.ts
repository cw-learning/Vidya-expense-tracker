import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as currencyApi from '../../services/currencyApi/currencyApi';
import { useCurrencyConversion } from './useCurrencyConversion';

vi.mock('../../services/currencyApi/currencyApi');

describe('useCurrencyConversion', () => {
  it('initializes with INR and base amount', () => {
    const { result } = renderHook(() => useCurrencyConversion(100));
    expect(result.current.selectedCurrency).toBe('INR');
    expect(result.current.convertedAmount).toBe(100);
  });

  it('fetches rates on mount', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ USD: 0.012 });
    vi.mocked(currencyApi.fetchExchangeRates).mockImplementation(mockFetch);
    renderHook(() => useCurrencyConversion(100));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
  });

  it('converts amount when currency changes', async () => {
    vi.mocked(currencyApi.fetchExchangeRates).mockResolvedValue({ USD: 0.012 });
    vi.mocked(currencyApi.convertCurrency).mockReturnValue(1.2);
    const { result } = renderHook(() => useCurrencyConversion(100));
    result.current.handleChangeCurrency('USD' as const);
    await waitFor(() => expect(result.current.convertedAmount).toBe(1.2));
  });
});
