import { getAllDeptoExpenses } from './deptoService';
import { getAllCasaExpenses } from './casaService';
import { getAllFrenchExpenses } from './frenchService';
import { Expense } from '../types/expenseTypes';


// Aggregate all expenses from depto, casa, and french
export const getAllHomeExpenses = async (): Promise<Expense[]> => {
  const deptoExpenses = await getAllDeptoExpenses();
  const casaExpenses = await getAllCasaExpenses();
  const frenchExpenses = await getAllFrenchExpenses();

  return [...deptoExpenses, ...casaExpenses, ...frenchExpenses];
};

