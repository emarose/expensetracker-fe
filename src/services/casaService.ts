import { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from './expenseService';
import { Expense, CreateExpenseDTO } from '../types/expenseTypes';

export const getAllCasaExpenses = async (): Promise<Expense[]> => getAllExpenses('casa');
export const getCasaExpenseById = async (id: string): Promise<Expense> => getExpenseById('casa', id);
export const createCasaExpense = async (expense: CreateExpenseDTO): Promise<Expense> => createExpense('casa', expense);
export const updateCasaExpense = async (id: string, expense: CreateExpenseDTO): Promise<Expense> => updateExpense('casa', id, expense);
export const deleteCasaExpense = async (id: string): Promise<void> => deleteExpense('casa', id);
