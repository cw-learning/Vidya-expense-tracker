import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
	EXPENSE_CATEGORIES,
	EXPENSE_TYPES,
} from "../../models/expense.model.js";
import { ExpenseGrid } from "../ExpenseGrid.jsx";

vi.mock("ag-grid-react", () => ({
	AgGridReact: ({ rowData, columnDefs, context, onCellValueChanged }) => (
		<div data-testid="ag-grid">
			<button
				type="button"
				onClick={() =>
					onCellValueChanged?.({
						data: rowData[0],
						colDef: { field: "amount" },
						newValue: "123.45",
					})
				}
			>
				trigger-edit
			</button>

			{rowData.map((row, index) => (
				<div key={row.id} data-testid={`grid-row-${index}`}>
					{columnDefs.map((col, colIndex) => {
						const colId =
							col.field ?? col.colId ?? col.headerName ?? `col-${colIndex}`;

						if (col.cellRenderer) {
							const renderedValue = col.cellRenderer({ data: row, context });
							return (
								<div key={colId} data-testid={`cell-${colId}-${index}`}>
									{renderedValue}
								</div>
							);
						}

						const value = col.valueGetter
							? col.valueGetter({ data: row })
							: row[col.field];

						const formattedValue = col.valueFormatter
							? col.valueFormatter({ value })
							: value;

						return (
							<div key={colId} data-testid={`cell-${colId}-${index}`}>
								{formattedValue}
							</div>
						);
					})}
				</div>
			))}
		</div>
	),
}));

vi.mock("../../../theme/store/useThemeStore.js", () => ({
	useThemeStore: () => ({ theme: "light" }),
}));

vi.mock("../../../theme/utils/theme.constants.js", () => ({
	THEME_COLORS: {
		light: {
			background: "bg-white",
			input: "border-gray-300",
			text: "text-black",
		},
		dark: {
			background: "bg-gray-800",
			input: "border-gray-600",
			text: "text-white",
		},
	},
}));

vi.mock("../../utils/categoryIcons.js", () => ({
	getCategoryIcon: vi.fn((category) => `<icon for ${category}>`),
}));

describe("ExpenseGrid", () => {
	const mockExpenses = [
		{
			id: "1",
			title: "Lunch",
			amount: 50,
			category: EXPENSE_CATEGORIES.FOOD,
			type: EXPENSE_TYPES.EXPENSE,
			notes: "Team lunch",
			createdAt: new Date("2023-01-01T12:00:00.000Z"),
		},
		{
			id: "2",
			title: "Transport",
			amount: 500,
			category: EXPENSE_CATEGORIES.TRANSPORT,
			type: EXPENSE_TYPES.INCOME,
			notes: "Reimbursement",
			createdAt: new Date("2023-01-02T12:00:00.000Z"),
		},
	];

	const mockOnUpdateExpense = vi.fn();
	const mockOnDeleteExpense = vi.fn();

	it("should render the grid with expenses", () => {
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
		expect(screen.getAllByTestId(/^grid-row-/)).toHaveLength(2);
	});

	it("should display expense data correctly (timezone-safe date assertion)", () => {
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		expect(screen.getByTestId("cell-createdAt-0")).toHaveTextContent(
			new Date(mockExpenses[0].createdAt).toLocaleDateString()
		);
		expect(screen.getByTestId("cell-title-0")).toHaveTextContent("Lunch");
		expect(screen.getByTestId("cell-category-0")).toHaveTextContent("Food");
		expect(screen.getByTestId("cell-amount-0")).toHaveTextContent("₹50.00");
		expect(screen.getByTestId("cell-type-0")).toHaveTextContent("Expense");
		expect(screen.getByTestId("cell-notes-0")).toHaveTextContent("Team lunch");

		expect(screen.getByTestId("cell-createdAt-1")).toHaveTextContent(
			new Date(mockExpenses[1].createdAt).toLocaleDateString()
		);
		expect(screen.getByTestId("cell-title-1")).toHaveTextContent("Transport");
		expect(screen.getByTestId("cell-amount-1")).toHaveTextContent("₹500.00");
		expect(screen.getByTestId("cell-type-1")).toHaveTextContent("Income");
	});

	it("should render category icons", () => {
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		expect(screen.getByTestId("cell--0")).toHaveTextContent("<icon for food>");
		expect(screen.getByTestId("cell--1")).toHaveTextContent(
			"<icon for transport>"
		);
	});

	it("should render delete buttons", () => {
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
		expect(deleteButtons).toHaveLength(2);
	});

	it("should call onDeleteExpense when delete button is clicked", async () => {
		const user = userEvent.setup();
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
		await user.click(deleteButtons[0]);

		expect(mockOnDeleteExpense).toHaveBeenCalledWith("1");
	});

	it("should call onUpdateExpense when a cell edit occurs, coercing amount to number", async () => {
		const user = userEvent.setup();
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		await user.click(screen.getByRole("button", { name: /trigger-edit/i }));

		expect(mockOnUpdateExpense).toHaveBeenCalledWith(
			expect.objectContaining({ id: "1", amount: 123.45 })
		);
	});

	it("should render quick filter input", () => {
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		expect(screen.getByPlaceholderText(/quick filter/i)).toBeInTheDocument();
	});

	it("should update quick filter on input change", async () => {
		const user = userEvent.setup();
		render(
			<ExpenseGrid
				expenses={mockExpenses}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		const filterInput = screen.getByPlaceholderText(/quick filter/i);
		await user.type(filterInput, "Lunch");

		expect(filterInput).toHaveValue("Lunch");
	});

	it("should render with empty expenses array", () => {
		render(
			<ExpenseGrid
				expenses={[]}
				onUpdateExpense={mockOnUpdateExpense}
				onDeleteExpense={mockOnDeleteExpense}
			/>
		);

		expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
		expect(screen.queryByTestId(/^grid-row-/)).not.toBeInTheDocument();
	});
});
