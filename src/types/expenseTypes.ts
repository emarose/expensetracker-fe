export interface PaidByObject {
  Ema: number;
  Agus: number;
}

export interface Expense {
  _id: string;
  category: string;
  isDivided?: boolean;
  paidBy: string;
  paidByAgus?: number;
  paidByEma?: number;
  paymentMethod: string;
  date: string;
  type: string;
  description: string;
  amount: number;
  property?: string;
}
export interface TotalByProperty {
  property: string;
  total: number;
}

export interface ExpenseFormData {
  type: string;
  property: string;
  category: string;
  paidBy?: string | PaidByObject;
  paymentMethod: string;
  date: string;
  description: string;
  amount: number;
  paidByEma: number;
  paidByAgus: number;
  isDivided: boolean;
  otherCategory?: string;
  otherPaidBy?: string;
}

export type CategoryType = "luz" | "gas" | "agua" | "internet";
export type PropertyType = "casa" | "depto" | "french";
export type ExpenseType = "property" | "personal";
