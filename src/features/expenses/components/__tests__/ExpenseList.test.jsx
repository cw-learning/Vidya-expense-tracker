import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EXPENSE_CATEGORIES } from "../../models/expense.model.js";
import { ExpenseList } from "../ExpenseList.jsx";

describe("ExpenseList", () => {
	const mockExpenses = [
		{
			id: "1",
			title: "Lunch",
			amount: 50,
			category: EXPENSE_CATEGORIES.FOOD,
			createdAt: new Date().toISOString(),
		},
		{
			id: "2",
			title: "Bus Ticket",
			amount: 20,
			category: EXPENSE_CATEGORIES.TRANSPORT,
			createdAt: new Date().toISOString(),
		},
	];

	it("should render empty state when no expenses", () => {
		render(<ExpenseList expenses={[]} onDeleteExpense={vi.fn()} />);

		expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
	});

	it("should render all expenses", () => {
		render(<ExpenseList expenses={mockExpenses} onDeleteExpense={vi.fn()} />);

		expect(screen.getByText("Lunch")).toBeInTheDocument();
		expect(screen.getByText("Bus Ticket")).toBeInTheDocument();
	});

	it("should render one list item per expense", () => {
		const { container } = render(
			<ExpenseList expenses={mockExpenses} onDeleteExpense={vi.fn()} />
		);

		expect(container.querySelectorAll("li")).toHaveLength(mockExpenses.length);
	});

	it("should call onDeleteExpense when delete button is clicked", async () => {
		const user = userEvent.setup();
		const handleDeleteExpense = vi.fn();
		render(
			<ExpenseList
				expenses={mockExpenses}
				onDeleteExpense={handleDeleteExpense}
			/>
		);

		const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
		await user.click(deleteButtons[0]);

		expect(handleDeleteExpense).toHaveBeenCalledTimes(1);
		expect(handleDeleteExpense).toHaveBeenCalledWith("1");
	});
});
