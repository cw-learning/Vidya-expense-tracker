import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EXPENSE_CATEGORIES } from "../../models/expense.model.js";
import { ExpenseForm } from "../ExpenseForm.jsx";

describe("ExpenseForm", () => {
	it("should render all form fields", () => {
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /add expense/i })
		).toBeInTheDocument();
	});

	it("should update title input on change", async () => {
		const user = userEvent.setup();
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		const titleInput = screen.getByLabelText(/title/i);
		await user.type(titleInput, "Lunch");

		expect(titleInput).toHaveValue("Lunch");
	});

	it("should update amount input on change", async () => {
		const user = userEvent.setup();
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		const amountInput = screen.getByLabelText(/amount/i);
		await user.type(amountInput, "50");

		expect(amountInput).toHaveValue(50);
	});

	it("should update category select on change", async () => {
		const user = userEvent.setup();
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		const categorySelect = screen.getByLabelText(/category/i);
		await user.selectOptions(categorySelect, EXPENSE_CATEGORIES.FOOD);

		expect(categorySelect).toHaveValue(EXPENSE_CATEGORIES.FOOD);
	});

	it("should update type select on change", async () => {
		const user = userEvent.setup();
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		const typeSelect = screen.getByLabelText(/type/i);
		await user.selectOptions(typeSelect, "income");

		expect(typeSelect).toHaveValue("income");
	});

	it("should update notes input on change", async () => {
		const user = userEvent.setup();
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		const notesInput = screen.getByLabelText(/notes/i);
		await user.type(notesInput, "Some notes");

		expect(notesInput).toHaveValue("Some notes");
	});

	it("should show validation errors for empty form submission", async () => {
		const user = userEvent.setup();
		const handleAddExpense = vi.fn();
		render(<ExpenseForm onAddExpense={handleAddExpense} />);

		await user.click(screen.getByRole("button", { name: /add expense/i }));

		expect(
			await screen.findByText(/title cannot be empty/i)
		).toBeInTheDocument();
		expect(await screen.findByText(/amount is required/i)).toBeInTheDocument();
		expect(
			await screen.findByText(/category is required/i)
		).toBeInTheDocument();
		expect(handleAddExpense).not.toHaveBeenCalled();
	});

	it("should show validation error for negative amount", async () => {
		const user = userEvent.setup();
		const handleAddExpense = vi.fn();
		render(<ExpenseForm onAddExpense={handleAddExpense} />);

		await user.type(screen.getByLabelText(/title/i), "Test");
		await user.type(screen.getByLabelText(/amount/i), "-10");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.FOOD
		);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		expect(
			await screen.findByText(/amount must be greater than zero/i)
		).toBeInTheDocument();
		expect(handleAddExpense).not.toHaveBeenCalled();
	});

	it("should call onAddExpense with valid data", async () => {
		const user = userEvent.setup();
		const handleAddExpense = vi.fn();
		render(<ExpenseForm onAddExpense={handleAddExpense} />);

		await user.type(screen.getByLabelText(/title/i), "Lunch");
		await user.type(screen.getByLabelText(/amount/i), "50");
		await user.selectOptions(
			screen.getByLabelText(/category/i),
			EXPENSE_CATEGORIES.FOOD
		);
		await user.selectOptions(screen.getByLabelText(/type/i), "expense");
		await user.type(screen.getByLabelText(/notes/i), "Optional notes");
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		expect(handleAddExpense).toHaveBeenCalledTimes(1);
		const expense = handleAddExpense.mock.calls[0][0];
		expect(expense).toMatchObject({
			title: "Lunch",
			amount: 50,
			category: EXPENSE_CATEGORIES.FOOD,
			type: "expense",
			notes: "Optional notes",
		});
		expect(expense.id).toBeDefined();
		expect(expense.createdAt).toBeDefined();
	});

	it("should reset form after successful submission", async () => {
		const user = userEvent.setup();
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		const titleInput = screen.getByLabelText(/title/i);
		const amountInput = screen.getByLabelText(/amount/i);
		const categorySelect = screen.getByLabelText(/category/i);

		await user.type(titleInput, "Lunch");
		await user.type(amountInput, "50");
		await user.selectOptions(categorySelect, EXPENSE_CATEGORIES.FOOD);
		await user.click(screen.getByRole("button", { name: /add expense/i }));

		expect(titleInput).toHaveValue("");
		expect(amountInput).toHaveValue(null);
		expect(categorySelect).toHaveValue("");
	});

	it("should clear error when user starts typing", async () => {
		const user = userEvent.setup();
		render(<ExpenseForm onAddExpense={vi.fn()} />);

		await user.click(screen.getByRole("button", { name: /add expense/i }));
		expect(
			await screen.findByText(/title cannot be empty/i)
		).toBeInTheDocument();

		await user.type(screen.getByLabelText(/title/i), "L");
		expect(
			screen.queryByText(/title cannot be empty/i)
		).not.toBeInTheDocument();
	});
});
