import apiClient from './apiClient';
import { Expense, ExpenseFormData, TotalByProperty } from '../types/expenseTypes';

export const getAllExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await apiClient.get<Expense[]>(`/expenses`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch expenses`);
  }
};

export const getAllExpensesByProperty = async (property: string): Promise<Expense[]> => {
  try {
    const response = await apiClient.get<Expense[]>(`/expenses?property=${property}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch expenses`);
  }
};

export const getAllExpensesByYearAndMonth = async (year: number, month: number): Promise<Expense[]> => {
  try {
    const response = await apiClient.get<Expense[]>(`/expenses?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch expenses`);
  }
};

export const getExpenseById = async (property: string, id: string): Promise<Expense> => {
  try {
    const response = await apiClient.get<Expense>(`/expenses/${id}?property=${property}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch expense for ${property} with ID: ${id}`);
  }
};

export const createExpense = async (expense: ExpenseFormData): Promise<Expense> => {
  try {
    const response = await apiClient.post<Expense>(`/expenses?property=${expense.property}`, expense);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create expense for ${expense.property}`);
  }
};

export const updateExpense = async (property: string, id: string, expense: ExpenseFormData): Promise<Expense> => {
  try {
    const response = await apiClient.put<Expense>(`/expenses/${id}?property=${property}`, expense);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update expense for ${property} with ID: ${id}`);
  }
};

export const deleteExpense = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/expenses/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete expense with ID: ${id}`);
  }
};

export const getTotalByProperty = async (): Promise<TotalByProperty[]> => {
  try {
    const response = await apiClient.get<TotalByProperty[]>('/expenses/totals/byProperty');

    return response.data;
  } catch (error) {
    console.error('Error fetching totals:', error);
    throw error;
  }
};
export const getTotalsByTypeAndPayer = async (): Promise<TotalByProperty[]> => {
  try {
    const response = await apiClient.get<TotalByProperty[]>('/expenses/totals/');
    console.log("🚀 ~ getTotalsByTypeAndPayer ~ response:", response)

    return response.data;
  } catch (error) {
    console.error('Error fetching totals:', error);
    throw error;
  }
};
