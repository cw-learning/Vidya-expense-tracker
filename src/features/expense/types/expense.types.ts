export type ExpenseType = {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  notes: string;
  createdAt: string;
};

export type ExpenseFormDataType = {
  title: string;
  amount: string;
  category: string;
  type: string;
  notes: string;
};
