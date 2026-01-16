import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as currencyApi from "../../services/currencyApi.js";
import { useCurrencyConversion } from "../useCurrencyConversion.js";

vi.mock("../../services/currencyApi.js", async () => {
	const actual = await vi.importActual("../../services/currencyApi.js");
	return {
		...actual,
		fetchExchangeRates: vi.fn(),
	};
});

describe("useCurrencyConversion", () => {
	const mockRates = {
		INR: 1,
		USD: 0.012,
		EUR: 0.011,
	};

	beforeEach(() => {
		vi.clearAllMocks();
		currencyApi.fetchExchangeRates.mockResolvedValue(mockRates);
	});

	it("should initialize with INR and base amount", async () => {
		const { result } = renderHook(() => useCurrencyConversion(100));

		await waitFor(() => {
			expect(result.current.selectedCurrency).toBe("INR");
			expect(result.current.convertedAmount).toBe(100);
			expect(result.current.isLoading).toBe(false);
		});
	});

	it("should fetch exchange rates on mount", async () => {
		renderHook(() => useCurrencyConversion(100));

		await waitFor(() => {
			expect(currencyApi.fetchExchangeRates).toHaveBeenCalledTimes(1);
		});
	});

	it("should convert currency when currency changes", async () => {
		const { result } = renderHook(() => useCurrencyConversion(100));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		act(() => {
			result.current.handleChangeCurrency("USD");
		});

		await waitFor(() => {
			expect(result.current.selectedCurrency).toBe("USD");
			expect(result.current.convertedAmount).toBeCloseTo(1.2, 2);
		});
	});

	it("should handle API errors", async () => {
		currencyApi.fetchExchangeRates.mockRejectedValue(
			new Error("Failed to fetch")
		);

		const { result } = renderHook(() => useCurrencyConversion(100));

		await waitFor(() => {
			expect(result.current.error).toBe("Failed to fetch");
			expect(result.current.isLoading).toBe(false);
		});
	});

	it("should recalculate when base amount changes", async () => {
		const { result, rerender } = renderHook(
			({ amount }) => useCurrencyConversion(amount),
			{ initialProps: { amount: 100 } }
		);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		rerender({ amount: 200 });

		await waitFor(() => {
			expect(result.current.convertedAmount).toBe(200);
		});
	});
});
