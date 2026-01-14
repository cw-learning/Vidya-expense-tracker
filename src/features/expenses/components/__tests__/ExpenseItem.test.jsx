import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EXPENSE_CATEGORIES } from "../../models/expense.model.js";
import { ExpenseItem } from "../ExpenseItem.jsx";

describe("ExpenseItem", () => {
	const mockExpense = {
		id: "123",
		title: "Lunch",
		amount: 50,
		category: EXPENSE_CATEGORIES.FOOD,
		createdAt: new Date().toISOString(),
	};

	it("should render expense details", () => {
		render(<ExpenseItem expense={mockExpense} onDeleteExpense={vi.fn()} />);

		expect(screen.getByText("Lunch")).toBeInTheDocument();
		expect(screen.getByText("Food")).toBeInTheDocument();
		expect(screen.getByText("₹50.00")).toBeInTheDocument();
	});

	it("should render delete button", () => {
		render(<ExpenseItem expense={mockExpense} onDeleteExpense={vi.fn()} />);

		expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
	});

	it("should call onDeleteExpense with expense id when delete is clicked", async () => {
		const user = userEvent.setup();
		const handleDeleteExpense = vi.fn();
		render(
			<ExpenseItem
				expense={mockExpense}
				onDeleteExpense={handleDeleteExpense}
			/>
		);

		await user.click(screen.getByRole("button", { name: /delete/i }));

		expect(handleDeleteExpense).toHaveBeenCalledTimes(1);
		expect(handleDeleteExpense).toHaveBeenCalledWith("123");
	});

	it("should format amount with two decimal places", () => {
		const expenseWithDecimals = { ...mockExpense, amount: 123.456 };
		render(
			<ExpenseItem expense={expenseWithDecimals} onDeleteExpense={vi.fn()} />
		);

		expect(screen.getByText("₹123.46")).toBeInTheDocument();
	});
});
