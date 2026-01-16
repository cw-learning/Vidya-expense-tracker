import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EXPENSE_CATEGORIES } from "../../models/expense.model.js";
import * as currencyApi from "../../services/currencyApi.js";
import { ExpensePage } from "../ExpensePage.jsx";

vi.mock("../../services/currencyApi.js");

describe("ExpensePage", () => {
	const mockRates = {
		INR: 1,
		USD: 0.012,
		EUR: 0.011,
	};

	beforeEach(() => {
		vi.clearAllMocks();
		currencyApi.fetchExchangeRates.mockResolvedValue(mockRates);
	});

	it("should render page title", async () => {
		render(<ExpensePage />);

		await waitFor(() => {
			expect(
				screen.getByRole("heading", { name: /Expense Tracker/i })
			).toBeInTheDocument();
		});
	});

	it("should render expense form", async () => {
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
		});
	});

	it("should render total expense with initial value of zero", async () => {
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByText("Total Expenses")).toBeInTheDocument();
		});

		const totalCard = screen.getByText("Total Expenses").closest("div");
		expect(within(totalCard).getByText("₹0.00")).toBeInTheDocument();
	});

	it("should render empty state for expenses", async () => {
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
		});
	});

	it("should add expense when form is submitted", async () => {
		const user = userEvent.setup();
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
		});

		await user.type(screen.getByLabelText(/title/i), "Lunch");
		await user.type(screen.getByLabelText(/amount/i), "50");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.FOOD
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		expect(screen.getByText("Lunch")).toBeInTheDocument();
		const totalCard = screen.getByText("Total Expenses").closest("div");
		expect(within(totalCard).getByText("₹50.00")).toBeInTheDocument();
	});

	it("should update total when expense is added", async () => {
		const user = userEvent.setup();
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByText("Total Expenses")).toBeInTheDocument();
		});

		await user.type(screen.getByLabelText(/title/i), "Lunch");
		await user.type(screen.getByLabelText(/amount/i), "50");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.FOOD
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		const totalSection = screen.getByText("Total Expenses").closest("div");
		expect(within(totalSection).getByText("₹50.00")).toBeInTheDocument();
	});

	it("should add multiple expenses", async () => {
		const user = userEvent.setup();
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
		});

		await user.type(screen.getByLabelText(/title/i), "Lunch");
		await user.type(screen.getByLabelText(/amount/i), "50");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.FOOD
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		await user.type(screen.getByLabelText(/title/i), "Bus");
		await user.type(screen.getByLabelText(/amount/i), "20");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.TRANSPORT
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		expect(screen.getByText("Lunch")).toBeInTheDocument();
		expect(screen.getByText("Bus")).toBeInTheDocument();

		const totalSection = screen.getByText("Total Expenses").closest("div");
		expect(within(totalSection).getByText("₹70.00")).toBeInTheDocument();
	});

	it("should delete expense when delete button is clicked", async () => {
		const user = userEvent.setup();
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
		});

		await user.type(screen.getByLabelText(/title/i), "Lunch");
		await user.type(screen.getByLabelText(/amount/i), "50");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.FOOD
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		const deleteButton = screen.getByRole("button", { name: /delete/i });
		await user.click(deleteButton);

		expect(screen.queryByText("Lunch")).not.toBeInTheDocument();
		expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
	});

	it("should update total when expense is deleted", async () => {
		const user = userEvent.setup();
		render(<ExpensePage />);

		await waitFor(() => {
			expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
		});

		await user.type(screen.getByLabelText(/title/i), "Lunch");
		await user.type(screen.getByLabelText(/amount/i), "50");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.FOOD
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		await user.type(screen.getByLabelText(/title/i), "Bus");
		await user.type(screen.getByLabelText(/amount/i), "20");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.TRANSPORT
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
		await user.click(deleteButtons[0]);

		const totalSection = screen.getByText("Total Expenses").closest("div");
		expect(within(totalSection).getByText("₹20.00")).toBeInTheDocument();
	});
});
