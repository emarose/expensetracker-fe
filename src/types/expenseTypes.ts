export interface Expense {
  _id: string;
  property?: string;
  date: string;
  year?: number;
  month?: number;
  amount: number;
  category: string;
  description?: string;
  paidBy: string;
  paymentMethod: string;
  type: string
}

export interface CreateExpenseDTO {
  property?: string | null;
  date: string;
  amount: number;
  category: string;
  description?: string;
  paidBy: string;
  paymentMethod: string;
  type: string
}

export interface TotalByProperty {
  property: string;
  total: number;
}
export interface ExpenseFormData {
  expenseType: string;
  selectedProperty: string;
  selectedCategory: string;
  otherCategory: string;
  paidBy: string;
  otherPaidBy: string;
  paymentMethod: string;
  date: string;
  description: string;
  amount: number;
}

export type CategoryType = "luz" | "gas" | "agua" | "internet";

export type PropertyType = "casa" | "depto" | "french";
export type ExpenseType = "property" | "personal";