import { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from './expenseService';
import { Expense, CreateExpenseDTO } from '../types/expenseTypes';

export const getAllDeptoExpenses = async (): Promise<Expense[]> => getAllExpenses('depto');
export const getDeptoExpenseById = async (id: string): Promise<Expense> => getExpenseById('depto', id);
export const createDeptoExpense = async (expense: CreateExpenseDTO): Promise<Expense> => createExpense('depto', expense);
export const updateDeptoExpense = async (id: string, expense: CreateExpenseDTO): Promise<Expense> => updateExpense('depto', id, expense);
export const deleteDeptoExpense = async (id: string): Promise<void> => deleteExpense('depto', id);
