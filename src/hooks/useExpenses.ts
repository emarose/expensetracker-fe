// src/hooks/useExpenses.ts

import { useCallback, useEffect, useState } from "react";
import { getAllExpensesByYearAndMonth, deleteExpense } from "../services/expenseService";
import { Expense, ExpenseFormData } from "../types/expenseTypes";
import { calculateTotalsByProperty, calculateTotalsByTypeAndPayer } from "../utils/expenseUtils";

export const useExpenses = (initialMonth: number) => {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [totalsByProperty, setTotalsByProperty] = useState<Record<string, number>>({
    casa: 0,
    depto: 0,
    french: 0,
  });
  const [totalStoreTransactions, setTotalStoreTransactions] = useState(0);
  const [selectedExpensesPropertyFilter, setSelectedPropertyFilter] = useState<string>("");
  const [selectedExpensesTypeFilter, setSelectedExpensesTypeFilter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const year = new Date().getFullYear();
      let expensesByMonth = await getAllExpensesByYearAndMonth(year, selectedMonth);

      if (selectedExpensesPropertyFilter) {
        expensesByMonth = expensesByMonth.filter(
          (expense) => expense.property === selectedExpensesPropertyFilter
        );
      }
      if (selectedExpensesTypeFilter) {
        expensesByMonth = expensesByMonth.filter(
          (expense) => expense.type === selectedExpensesTypeFilter
        );
      }

      setFilteredExpenses(expensesByMonth);
    };
    fetchData();
  }, [selectedMonth, selectedExpensesPropertyFilter, selectedExpensesTypeFilter]);

  const handlePropertyFilter = useCallback((property: string) => {
    setSelectedPropertyFilter(property);
  }, []);

  const handleExpenseTypeFilter = useCallback((type: string) => {
    setSelectedExpensesTypeFilter(type);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      setFilteredExpenses(filteredExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (formData: ExpenseFormData) => {
    // Implement the form submission logic here
  };

  useEffect(() => {
    const propertyTotals = calculateTotalsByProperty(filteredExpenses);
    setTotalsByProperty(propertyTotals);

    const totalStore = filteredExpenses
      .filter((expense) => expense.category === "tienda")
      .reduce((acc, expense) => acc + expense.amount, 0);

    setTotalStoreTransactions(totalStore);
  }, [filteredExpenses]);

  const {
    propertiesTotal,
    personalTotal,
    propertyEmaTotal,
    propertyAgusTotal,
    personalEmaTotal,
    personalAgusTotal,
  } = calculateTotalsByTypeAndPayer(filteredExpenses);

  return {
    filteredExpenses,
    selectedMonth,
    totalsByProperty,
    totalStoreTransactions,
    propertiesTotal,
    personalTotal,
    propertyEmaTotal,
    propertyAgusTotal,
    personalEmaTotal,
    personalAgusTotal,
    selectedExpensesTypeFilter,
    selectedExpensesPropertyFilter,
    handlePropertyFilter,
    handleExpenseTypeFilter,
    handleDelete,
    handleFormSubmit,
    setSelectedMonth
  };
};
