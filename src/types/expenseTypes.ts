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