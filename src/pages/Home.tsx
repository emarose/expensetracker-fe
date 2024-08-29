import React, { useState, useEffect } from "react";
import ExpenseModal from "../components/ExpenseModal/ExpenseModal";
import MonthSelector from "../components/MonthSelector/MonthSelector";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import ExpenseFilters from "../components/ExpenseFilters/ExpenseFilters";
import ExpensesTable from "../components/ExpenseTable/ExpenseTable";
import ExpenseTotals from "../components/ExpenseTotals/ExpenseTotals";
import { useExpenses } from "../hooks/useExpenses";
import { Expense } from "../types/expenseTypes";
import {
  calculateTotalsByProperty,
  calculateTotalsByTypeAndPayer,
  calculateTotalStoreTransactions,
} from "../utils/expenseUtils";

const Home: React.FC = () => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    filteredExpenses,
    selectedMonth,
    selectedExpensesTypeFilter,
    selectedExpensesPropertyFilter,
    handlePropertyFilter,
    handleExpenseTypeFilter,
    handleDelete,
    handleFormSubmit,
    setSelectedMonth,
  } = useExpenses(new Date().getMonth() + 1);

  const [totalsByProperty, setTotalsByProperty] = useState({
    casa: 0,
    depto: 0,
    french: 0,
  });
  const [totals, setTotals] = useState({
    propertiesTotal: 0,
    personalTotal: 0,
    propertyEmaTotal: 0,
    propertyAgusTotal: 0,
    personalEmaTotal: 0,
    personalAgusTotal: 0,
    totalStoreTransactions: 0,
  });

  useEffect(() => {
    const calculatedTotalsByProperty =
      calculateTotalsByProperty(filteredExpenses);
    const calculatedTotals = calculateTotalsByTypeAndPayer(filteredExpenses);
    const calculatedTotalStoreTransactions =
      calculateTotalStoreTransactions(filteredExpenses);

    setTotalsByProperty(calculatedTotalsByProperty);
    setTotals({
      ...calculatedTotals,
      totalStoreTransactions: calculatedTotalStoreTransactions,
    });
  }, [filteredExpenses]);

  const openModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  return (
    <div className="container">
      <ExpenseForm onSubmit={handleFormSubmit} />
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <ExpenseFilters
        selectedExpensesTypeFilter={selectedExpensesTypeFilter}
        selectedExpensesPropertyFilter={selectedExpensesPropertyFilter}
        onExpenseTypeFilterChange={handleExpenseTypeFilter}
        onPropertyFilterChange={handlePropertyFilter}
      />
      <ExpensesTable
        expenses={filteredExpenses}
        handleDelete={handleDelete}
        openModal={openModal}
      />
      <ExpenseTotals
        totalsByProperty={totalsByProperty}
        propertiesTotal={totals.propertiesTotal}
        propertyEmaTotal={totals.propertyEmaTotal}
        propertyAgusTotal={totals.propertyAgusTotal}
        personalTotal={totals.personalTotal}
        personalEmaTotal={totals.personalEmaTotal}
        personalAgusTotal={totals.personalAgusTotal}
        totalStoreTransactions={totals.totalStoreTransactions}
      />
      {isModalOpen && (
        <ExpenseModal expense={selectedExpense} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
