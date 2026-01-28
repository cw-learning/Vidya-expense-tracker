import {
  AllCommunityModule,
  type CellValueChangedEvent,
  type ColDef,
  iconSetQuartzBold,
  ModuleRegistry,
  themeQuartz,
} from 'ag-grid-community';
import {
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SetFilterModule,
  SideBarModule,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import { useThemeColors } from '../../../../core/hooks/useThemeColors';
import { Card } from '../../../../shared/molecules/Card/Card';
import {
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORY_LABELS,
  EXPENSE_TYPE_LABELS,
  EXPENSE_TYPES,
  HIGH_AMOUNT_THRESHOLD,
} from '../../constants/expense.constants';
import type { ExpenseProps } from '../../types/expense.types';
import { getCategoryIcon } from '../../utils/categoryHelpers/categoryIcons';
import type { ExpenseGridProps } from './ExpenseGrid.types';

ModuleRegistry.registerModules([
  AllCommunityModule,
  SetFilterModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

export function ExpenseGrid({
  expenses,
  onDeleteExpense,
  onUpdateExpense,
}: ExpenseGridProps) {
  const { text } = useThemeColors();
  const [quickFilterText, setQuickFilterText] = useState('');

  const totalIncome = useMemo(
    () =>
      expenses
        .filter((expense) => expense.type === 'income')
        .reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  const totalExpense = useMemo(
    () =>
      expenses
        .filter((expense) => expense.type === 'expense')
        .reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  const balance = useMemo(
    () => totalIncome - totalExpense,
    [totalIncome, totalExpense],
  );

  const myTheme = useMemo(() => {
    return themeQuartz.withPart(iconSetQuartzBold).withParams({
      accentColor: '#9FE2CD',
      backgroundColor: '#1f2836',
      borderRadius: 10,
      browserColorScheme: 'dark',
      chromeBackgroundColor: '#0097A7',
      columnBorder: false,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen-Sans',
        'Ubuntu',
        'Cantarell',
        'Helvetica Neue',
        'sans-serif',
      ],
      fontSize: 14,
      foregroundColor: '#FFF',
      headerBackgroundColor: '#136D77',
      headerFontSize: 14,
      headerFontWeight: 500,
      headerRowBorder: true,
      rowBorder: false,
      spacing: 8,
      wrapperBorder: true,
      wrapperBorderRadius: 20,
    });
  }, []);

  const columnDefs = useMemo<ColDef<ExpenseProps>[]>(
    () => [
      {
        headerName: '',
        cellRenderer: (params: { data?: ExpenseProps }) =>
          params.data?.category ? getCategoryIcon(params.data.category) : null,
        editable: false,
        filter: false,
        width: 50,
      },
      {
        headerName: 'Category',
        field: 'category',
        width: 130,
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: Object.values(EXPENSE_CATEGORIES),
        },
        valueFormatter: (params: { value: string }) =>
          EXPENSE_CATEGORY_LABELS[params.value] || params.value,
        filter: 'agSetColumnFilter',
        enableRowGroup: true,
      },
      {
        headerName: 'Title',
        field: 'title',
        flex: 1,
        minWidth: 150,
        editable: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Amount',
        field: 'amount',
        width: 130,
        editable: true,
        cellEditor: 'agNumberCellEditor',
        cellEditorParams: { precision: 2 },
        valueFormatter: (params: { value: number }) =>
          typeof params.value === 'number' ? `₹${params.value.toFixed(2)}` : '',
        cellClassRules: {
          'text-green-600 dark:text-green-400 font-bold': (params: {
            data?: ExpenseProps;
          }) => params.data?.type === EXPENSE_TYPES.INCOME,
          'text-red-600 dark:text-red-400 font-bold': (params: {
            data?: ExpenseProps;
          }) => params.data?.type === EXPENSE_TYPES.EXPENSE,
        },
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
      },
      {
        headerName: 'Type',
        field: 'type',
        width: 120,
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: Object.values(EXPENSE_TYPES) },
        valueFormatter: (params: { value: string }) =>
          EXPENSE_TYPE_LABELS[params.value] || params.value,
        cellRenderer: (params: { value: string }) => {
          const isIncome = params.value === 'income';
          const bgClass = isIncome
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${bgClass}`}
            >
              {params.value.toUpperCase()}
            </span>
          );
        },
        filter: 'agSetColumnFilter',
        enableRowGroup: true,
      },
      {
        headerName: 'Notes',
        field: 'notes',
        flex: 1,
        minWidth: 150,
        editable: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Date',
        field: 'createdAt',
        width: 130,
        editable: false,
        valueGetter: (params: { data?: ExpenseProps }) =>
          params.data?.createdAt ? new Date(params.data.createdAt) : null,
        valueFormatter: (params: { value: Date | null }) =>
          params.value instanceof Date && !Number.isNaN(params.value.valueOf())
            ? params.value.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '',
        filter: 'agDateColumnFilter',
        sort: 'desc',
      },
      {
        headerName: 'Actions',
        width: 100,
        cellRenderer: (params: { data: ExpenseProps }) => {
          return (
            <button
              type="button"
              onClick={() => onDeleteExpense(params.data.id)}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              Delete
            </button>
          );
        },
        pinned: 'right',
      },
    ],
    [onDeleteExpense],
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    }),
    [],
  );

  const getRowStyle = useCallback((params: { data?: ExpenseProps }) => {
    if ((params.data?.amount ?? 0) > HIGH_AMOUNT_THRESHOLD) {
      return {
        backgroundColor: 'rgba(254, 243, 199, 0.2)', // yellow tint for dark theme
      };
    }
    return undefined;
  }, []);

  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent<ExpenseProps>) => {
      const field = event.colDef.field;
      if (!field) return;

      const data = event.data;
      if (!data) return;

      if (field === 'amount') {
        const raw =
          typeof event.newValue === 'string'
            ? event.newValue.trim()
            : event.newValue;

        if (raw === '' || raw === null || raw === undefined) return;

        const amount = Number(raw);
        if (!Number.isFinite(amount) || amount <= 0) return;

        onUpdateExpense({ ...data, amount });
        return;
      }

      const nextValue =
        typeof event.newValue === 'string'
          ? event.newValue.trim()
          : event.newValue;

      onUpdateExpense({ ...data, [field]: nextValue });
    },
    [onUpdateExpense],
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-20 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
          <p className="text-sm text-green-900 dark:text-green-400 font-medium">
            Total Income
          </p>
          <p className="text-2xl font-bold text-green-900 dark:text-green-300 mt-1">
            ₹{totalIncome.toFixed(2)}
          </p>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            Total Expense
          </p>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">
            ₹{totalExpense.toFixed(2)}
          </p>
        </Card>

        <Card
          className={`border-2 ${
            balance >= 0
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
              : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
          }`}
        >
          <p
            className={`text-sm font-medium ${
              balance >= 0
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-orange-600 dark:text-orange-400'
            }`}
          >
            Balance
          </p>
          <p
            className={`text-2xl font-bold mt-1 ${
              balance >= 0
                ? 'text-blue-700 dark:text-blue-300'
                : 'text-orange-700 dark:text-orange-300'
            }`}
          >
            ₹{balance.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* AG Grid Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-semibold ${text}`}>
            All Transactions ({expenses.length})
          </h2>
          <input
            type="text"
            placeholder="Quick Filter (search all columns)..."
            value={quickFilterText}
            onChange={(event) => {
              const { value } = event.target;
              setQuickFilterText(value);
            }}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 w-64"
          />
        </div>
        {expenses.length === 0 ? (
          <div className="text-center py-12">
            <p className={`${text} text-lg`}>No expenses yet.</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Click "+ Add Expense" to get started!
            </p>
          </div>
        ) : (
          <div className="ag-theme-quartz-dark h-125">
            <AgGridReact
              rowData={expenses}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              theme={myTheme}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50]}
              enableCellTextSelection={true}
              ensureDomOrder={true}
              rowGroupPanelShow="always"
              groupDisplayType="groupRows"
              groupDefaultExpanded={-1}
              showOpenedGroup={true}
              getRowStyle={getRowStyle}
              onCellValueChanged={onCellValueChanged}
              quickFilterText={quickFilterText}
              sideBar={{
                toolPanels: [
                  {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                  },
                  {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                  },
                ],
                defaultToolPanel: '',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
