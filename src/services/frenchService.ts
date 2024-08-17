import { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from './expenseService';
import { Expense, CreateExpenseDTO } from '../types/expenseTypes';

export const getAllFrenchExpenses = async (): Promise<Expense[]> => getAllExpenses('french');
export const getFrenchExpenseById = async (id: string): Promise<Expense> => getExpenseById('french', id);
export const createFrenchExpense = async (expense: CreateExpenseDTO): Promise<Expense> => createExpense('french', expense);
export const updateFrenchExpense = async (id: string, expense: CreateExpenseDTO): Promise<Expense> => updateExpense('french', id, expense);
export const deleteFrenchExpense = async (id: string): Promise<void> => deleteExpense('french', id);
