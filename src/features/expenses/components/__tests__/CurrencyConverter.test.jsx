import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as currencyApi from "../../services/currencyApi.js";
import { CurrencyConverter } from "../CurrencyConverter.jsx";

vi.mock("../../services/currencyApi.js", async () => {
	const actual = await vi.importActual("../../services/currencyApi.js");
	return {
		...actual,
		fetchExchangeRates: vi.fn(),
	};
});

describe("CurrencyConverter", () => {
	const mockRates = {
		INR: 1,
		USD: 0.012,
		EUR: 0.011,
	};

	beforeEach(() => {
		vi.clearAllMocks();
		currencyApi.fetchExchangeRates.mockResolvedValue(mockRates);
	});

	it("should render currency converter", async () => {
		render(<CurrencyConverter totalAmount={100} />);

		await waitFor(() => {
			expect(screen.getByRole("combobox")).toBeInTheDocument();
		});
	});

	it("should show loading state initially", async () => {
		render(<CurrencyConverter totalAmount={100} />);

		expect(await screen.findByRole("status")).toHaveTextContent(
			/Loading exchange rates/i
		);
	});

	it("should display currency dropdown", async () => {
		render(<CurrencyConverter totalAmount={100} />);

		await waitFor(() => {
			expect(screen.getByRole("combobox")).toBeInTheDocument();
		});
	});

	it("should show converted amount", async () => {
		render(<CurrencyConverter totalAmount={100} />);

		await waitFor(() => {
			expect(screen.getByText("₹100.00")).toBeInTheDocument();
		});
	});

	it("should change currency when dropdown is changed", async () => {
		const user = userEvent.setup();
		render(<CurrencyConverter totalAmount={100} />);

		await waitFor(() => {
			expect(screen.queryByRole("status")).not.toBeInTheDocument();
		});

		const select = screen.getByLabelText(/select currency/i);
		await user.selectOptions(select, "USD");

		await waitFor(() => {
			expect(screen.getByText("$1.20")).toBeInTheDocument();
		});
	});

	it("should display error message when API fails", async () => {
		currencyApi.fetchExchangeRates.mockRejectedValue(
			new Error("Failed to fetch")
		);

		render(<CurrencyConverter totalAmount={100} />);

		await waitFor(() => {
			expect(
				screen.getByText(/Failed to load exchange rates/i)
			).toBeInTheDocument();
			expect(screen.getByText("₹100.00")).toBeInTheDocument();
		});
	});
});
