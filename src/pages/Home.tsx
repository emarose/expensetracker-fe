import React, { useState } from "react";
import ExpenseModal from "../components/ExpenseModal/ExpenseModal";
import MonthSelector from "../components/MonthSelector/MonthSelector";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import ExpenseFilters from "../components/ExpenseFilters/ExpenseFilters";
import ExpensesTable from "../components/ExpenseTable/ExpenseTable";
import ExpenseTotals from "../components/ExpenseTotals/ExpenseTotals";
import { useExpenses } from "../hooks/useExpenses";
import { Expense } from "../types/expenseTypes";
import Calendar from "../components/Calendar/Calendar";

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
    totalsByProperty,
    totalStoreTransactions,
    propertiesTotal,
    personalTotal,
    propertyEmaTotal,
    propertyAgusTotal,
    personalEmaTotal,
    personalAgusTotal,
  } = useExpenses(new Date().getMonth() + 1);

  const openModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  return (
    <div className="container-fluid d-flex flex-column">
      {/*  <ExpenseForm onSubmit={handleFormSubmit} /> */}
      <Calendar />
      {/* <MonthSelector
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
        propertiesTotal={propertiesTotal}
        propertyEmaTotal={propertyEmaTotal}
        propertyAgusTotal={propertyAgusTotal}
        personalTotal={personalTotal}
        personalEmaTotal={personalEmaTotal}
        personalAgusTotal={personalAgusTotal}
        totalStoreTransactions={totalStoreTransactions}
      />

      {isModalOpen && (
        <ExpenseModal expense={selectedExpense} onClose={closeModal} />
      )} */}
    </div>
  );
};

export default Home;
