import { useCallback, useEffect, useState } from "react";
import { getAllExpensesByYearAndMonth, deleteExpense, createExpense } from "../services/expenseService";
import { Expense, ExpenseFormData } from "../types/expenseTypes";
import { calculateTotalsByProperty, calculateTotalsByTypeAndPayer } from "../utils/expenseUtils";

export const useExpenses = (initialMonth: number) => {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [selectedExpensesPropertyFilter, setSelectedPropertyFilter] = useState<string>("");
  const [selectedExpensesTypeFilter, setSelectedExpensesTypeFilter] = useState<string>("");

  const [totalsByProperty, setTotalsByProperty] = useState<Record<string, number>>({
    casa: 0,
    depto: 0,
    french: 0,
  });
  const [totalStoreTransactions, setTotalStoreTransactions] = useState(0);
  const [propertiesTotal, setPropertiesTotal] = useState(0);
  const [personalTotal, setPersonalTotal] = useState(0);
  const [propertyEmaTotal, setPropertyEmaTotal] = useState(0);
  const [propertyAgusTotal, setPropertyAgusTotal] = useState(0);
  const [personalEmaTotal, setPersonalEmaTotal] = useState(0);
  const [personalAgusTotal, setPersonalAgusTotal] = useState(0);

  // Fetch data on initial load or when selectedMonth changes
  useEffect(() => {
    const fetchData = async () => {
      const year = new Date().getFullYear();
      const expensesByMonth = await getAllExpensesByYearAndMonth(year, selectedMonth);

      setAllExpenses(expensesByMonth);
      setFilteredExpenses(expensesByMonth);

      const propertyTotals = calculateTotalsByProperty(expensesByMonth);
      setTotalsByProperty(propertyTotals);

      const totalStore = expensesByMonth
        .filter((expense) => expense.category === "tienda")
        .reduce((acc, expense) => acc + expense.amount, 0);

      setTotalStoreTransactions(totalStore);

      const totals = calculateTotalsByTypeAndPayer(expensesByMonth);
      setPropertiesTotal(totals.propertiesTotal);
      setPersonalTotal(totals.personalTotal);
      setPropertyEmaTotal(totals.propertyEmaTotal);
      setPropertyAgusTotal(totals.propertyAgusTotal);
      setPersonalEmaTotal(totals.personalEmaTotal);
      setPersonalAgusTotal(totals.personalAgusTotal);
    };
    fetchData();
  }, [selectedMonth]);

  // Filter the expenses based on the selected filters
  useEffect(() => {
    let expenses = [...allExpenses];

    if (selectedExpensesPropertyFilter) {
      expenses = expenses.filter(
        (expense) => expense.property === selectedExpensesPropertyFilter
      );
    }
    if (selectedExpensesTypeFilter) {
      expenses = expenses.filter(
        (expense) => expense.type === selectedExpensesTypeFilter
      );
    }

    setFilteredExpenses(expenses);
  }, [selectedExpensesPropertyFilter, selectedExpensesTypeFilter, allExpenses]);

  const handlePropertyFilter = useCallback((property: string) => {
    setSelectedPropertyFilter(property);
  }, []);

  const handleExpenseTypeFilter = useCallback((type: string) => {
    setSelectedExpensesTypeFilter(type);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      setAllExpenses(allExpenses.filter((expense) => expense._id !== id));
      setFilteredExpenses(filteredExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (formData: ExpenseFormData) => {
    try {
      await createExpense(formData);
      const year = new Date().getFullYear();
      const expensesByMonth = await getAllExpensesByYearAndMonth(year, selectedMonth);

      setAllExpenses(expensesByMonth);
      setFilteredExpenses(expensesByMonth);

      const propertyTotals = calculateTotalsByProperty(expensesByMonth);
      setTotalsByProperty(propertyTotals);

      const totalStore = expensesByMonth
        .filter((expense) => expense.category === "tienda")
        .reduce((acc, expense) => acc + expense.amount, 0);

      setTotalStoreTransactions(totalStore);

      const totals = calculateTotalsByTypeAndPayer(expensesByMonth);
      setPropertiesTotal(totals.propertiesTotal);
      setPersonalTotal(totals.personalTotal);
      setPropertyEmaTotal(totals.propertyEmaTotal);
      setPropertyAgusTotal(totals.propertyAgusTotal);
      setPersonalEmaTotal(totals.personalEmaTotal);
      setPersonalAgusTotal(totals.personalAgusTotal);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    filteredExpenses,
    selectedMonth,
    selectedExpensesTypeFilter,
    selectedExpensesPropertyFilter,
    handlePropertyFilter,
    handleExpenseTypeFilter,
    handleDelete,
    handleFormSubmit,
    setSelectedMonth,
    totalsByProperty,
    totalStoreTransactions,
    propertiesTotal,
    personalTotal,
    propertyEmaTotal,
    propertyAgusTotal,
    personalEmaTotal,
    personalAgusTotal,
  };
};
