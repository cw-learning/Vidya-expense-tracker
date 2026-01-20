import {
	AllCommunityModule,
	iconSetQuartzBold,
	ModuleRegistry,
	themeQuartz,
	ValidationModule,
} from "ag-grid-community";
import {
	ColumnsToolPanelModule,
	RowGroupingModule,
	SetFilterModule,
	SideBarModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button.jsx";
import { useThemeStore } from "../../theme/store/useThemeStore.js";
import { THEME_COLORS } from "../../theme/utils/theme.constants.js";
import {
	EXPENSE_CATEGORIES,
	EXPENSE_CATEGORY_LABELS,
	EXPENSE_TYPE_LABELS,
	EXPENSE_TYPES,
} from "../models/expense.model.js";
import { getCategoryIcon } from "../utils/categoryIcons.js";

ModuleRegistry.registerModules([
	AllCommunityModule,
	SetFilterModule,
	ValidationModule,
	RowGroupingModule,
	SideBarModule,
	ColumnsToolPanelModule,
]);

export function ExpenseGrid({ expenses, onUpdateExpense, onDeleteExpense }) {
	const HIGH_AMOUNT_THRESHOLD = 1000;
	const { theme } = useThemeStore();
	const colors = THEME_COLORS[theme];

	const [quickFilterText, setQuickFilterText] = useState("");

	const rowSelection = useMemo(() => ({ mode: "multiRow" }), []);

	const columnDefs = useMemo(
		() => [
			{
				headerName: "",
				cellRenderer: (params) =>
					params.data?.category ? getCategoryIcon(params.data.category) : null,
				editable: false,
				filter: false,
				width: 30,
			},
			{
				field: "createdAt",
				headerName: "Date",
				valueGetter: ({ data }) =>
					data?.createdAt ? new Date(data.createdAt) : null,
				valueFormatter: ({ value }) =>
					value instanceof Date && !Number.isNaN(value.valueOf())
						? value.toLocaleDateString()
						: "",
				editable: false,
				filter: "agDateColumnFilter",
				minWidth: 100,
				flex: 1,
			},
			{
				field: "title",
				editable: true,
				filter: "agTextColumnFilter",
				minWidth: 150,
				flex: 1,
			},
			{
				field: "category",
				editable: true,
				filter: "agSetColumnFilter",
				cellEditor: "agSelectCellEditor",
				cellEditorParams: {
					values: Object.values(EXPENSE_CATEGORIES),
				},
				valueFormatter: (categoryLabelParams) =>
					EXPENSE_CATEGORY_LABELS[categoryLabelParams.value] ||
					categoryLabelParams.value,
				rowGroup: true,
				minWidth: 100,
				flex: 1,
			},
			{
				field: "amount",
				editable: true,
				filter: "agNumberColumnFilter",
				valueFormatter: ({ value }) =>
					typeof value === "number" ? `₹${value.toFixed(2)}` : "",
				cellEditor: "agNumberCellEditor",
				cellEditorParams: { precision: 2 },
				cellClassRules: {
					"text-green-600 font-bold": (amountParams) =>
						amountParams.data?.type === EXPENSE_TYPES.INCOME,
					"text-red-600 font-bold": (amountParams) =>
						amountParams.data?.type === EXPENSE_TYPES.EXPENSE,
				},
				minWidth: 100,
				flex: 1,
			},
			{
				field: "type",
				editable: true,
				cellEditor: "agSelectCellEditor",
				cellEditorParams: { values: Object.values(EXPENSE_TYPES) },
				valueFormatter: (typeLabelParams) =>
					EXPENSE_TYPE_LABELS[typeLabelParams.value] || typeLabelParams.value,
				filter: "agSetColumnFilter",
				rowGroup: true,
				minWidth: 80,
				flex: 1,
			},
			{
				field: "notes",
				editable: true,
				filter: "agTextColumnFilter",
				minWidth: 150,
				flex: 1,
			},
			{
				headerName: "Actions",
				cellRenderer: (params) => {
					if (!params.data?.id) return null;

					return (
						<Button
							variant="danger"
							className="px-1 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
							onClick={() => onDeleteExpense(params.data.id)}
						>
							Delete
						</Button>
					);
				},
				editable: false,
				filter: false,
				width: 100,
			},
		],
		[onDeleteExpense]
	);

	const defaultColDef = useMemo(
		() => ({
			filter: true,
			floatingFilter: true,
			resizable: true,
			sortable: true,
		}),
		[]
	);

	const rowClassRules = useMemo(
		() => ({
			"highlight-high-amount": (amountParams) =>
				amountParams.data?.amount > HIGH_AMOUNT_THRESHOLD,
		}),
		[]
	);

	const onCellValueChanged = useCallback(
		(event) => {
			const field = event.colDef.field;
			if (!field) return;

			const nextValue =
				field === "amount"
					? Number(event.newValue)
					: typeof event.newValue === "string"
						? event.newValue.trim()
						: event.newValue;

			if (field === "amount" && Number.isNaN(nextValue)) return;

			onUpdateExpense({
				...event.data,
				[field]: nextValue,
			});
		},
		[onUpdateExpense]
	);

	const myTheme = useMemo(() => {
		return themeQuartz.withPart(iconSetQuartzBold).withParams({
			accentColor: "#9FE2CD",
			backgroundColor: "#1f2836",
			borderRadius: 10,
			browserColorScheme: "dark",
			chromeBackgroundColor: "#0097A7",
			columnBorder: false,
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"Oxygen-Sans",
				"Ubuntu",
				"Cantarell",
				"Helvetica Neue",
				"sans-serif",
			],
			fontSize: 14,
			foregroundColor: "#FFF",
			headerBackgroundColor: "#136D77",
			headerFontSize: 14,
			headerFontWeight: 500,
			headerRowBorder: true,
			rowBorder: false,
			spacing: 8,
			wrapperBorder: true,
			wrapperBorderRadius: 20,
		});
	}, []);

	const sideBar = useMemo(
		() => ({
			toolPanels: [
				{
					id: "columns",
					labelDefault: "Columns",
					labelKey: "columns",
					iconKey: "columns",
					toolPanel: "agColumnsToolPanel",
				},
				{
					id: "filters",
					labelDefault: "Filters",
					labelKey: "filters",
					iconKey: "filter",
					toolPanel: "agFiltersToolPanel",
				},
			],
			defaultToolPanel: "columns",
		}),
		[]
	);

	const gridContext = useMemo(
		() => ({
			onDeleteExpense,
		}),
		[onDeleteExpense]
	);

	return (
		<div className={`${colors.background} p-4 rounded-lg`}>
			<input
				type="text"
				placeholder="Quick Filter (search all columns)..."
				value={quickFilterText}
				onChange={(event) => setQuickFilterText(event.target.value)}
				className={`w-full mb-4 px-3 py-2 border rounded ${colors.input} ${colors.text}`}
			/>
			<div className={`w-full h-96`}>
				<AgGridReact
					rowData={expenses}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					rowClassRules={rowClassRules}
					onCellValueChanged={onCellValueChanged}
					quickFilterText={quickFilterText}
					rowSelection={rowSelection}
					pagination={true}
					paginationPageSize={10}
					paginationPageSizeSelector={[10, 20, 50]}
					groupDisplayType="groupRows"
					context={{ onDeleteExpense }}
					theme={myTheme}
					groupDefaultExpanded={-1}
					showOpenedGroup={true}
					sideBar={sideBar}
					gridContext={gridContext}
				/>
			</div>
		</div>
	);
}
