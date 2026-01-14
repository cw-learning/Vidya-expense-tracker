import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	convertCurrency,
	fetchExchangeRates,
	SUPPORTED_CURRENCIES,
} from "../currencyApi.js";

vi.mock("axios");

describe("currencyApi", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("fetchExchangeRates", () => {
		it("should fetch exchange rates successfully", async () => {
			const mockRates = {
				INR: 1,
				USD: 0.012,
				EUR: 0.011,
			};

			axios.get.mockResolvedValue({
				data: {
					rates: mockRates,
				},
			});

			const rates = await fetchExchangeRates("INR");

			expect(rates).toEqual(mockRates);
			expect(axios.get).toHaveBeenCalledWith(
				"https://api.exchangerate-api.com/v4/latest/INR",
				{ signal: null }
			);
		});

		it("should handle API errors", async () => {
			axios.get.mockRejectedValue(new Error("Network error"));

			await expect(fetchExchangeRates("INR")).rejects.toThrow(
				"Failed to fetch exchange rates"
			);
		});

		it("should handle cancelled requests", async () => {
			const cancelError = new Error("Request cancelled");
			axios.isCancel.mockReturnValue(true);
			axios.get.mockRejectedValue(cancelError);

			await expect(fetchExchangeRates("INR")).rejects.toThrow(
				"Request cancelled"
			);
		});
	});

	describe("convertCurrency", () => {
		const mockRates = {
			INR: 1,
			USD: 0.012,
			EUR: 0.011,
		};

		it("should convert INR to USD", () => {
			const result = convertCurrency(
				100,
				SUPPORTED_CURRENCIES.INR,
				SUPPORTED_CURRENCIES.USD,
				mockRates
			);

			expect(result).toBe(1.2);
		});

		it("should convert INR to EUR", () => {
			const result = convertCurrency(
				100,
				SUPPORTED_CURRENCIES.INR,
				SUPPORTED_CURRENCIES.EUR,
				mockRates
			);

			expect(result).toBe(1.1);
		});

		it("should return same amount when currencies are same", () => {
			const result = convertCurrency(
				100,
				SUPPORTED_CURRENCIES.INR,
				SUPPORTED_CURRENCIES.INR,
				mockRates
			);

			expect(result).toBe(100);
		});
	});
});
