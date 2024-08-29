import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Expense } from "../types/expenseTypes";

// Define the context type with additional properties and functions
interface ExpenseContextType {
  filteredExpenses: Expense[];
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedExpensesTypeFilter: string; // Adjust type as needed
  setSelectedExpensesTypeFilter: (filter: string) => void; // Adjust type as needed
  selectedExpensesPropertyFilter: string; // Adjust type as needed
  setSelectedExpensesPropertyFilter: (filter: string) => void; // Adjust type as needed
  setFilteredExpenses: (expenses: Expense[]) => void; // Added setFilteredExpenses
  applyFilters: (month: number) => void; // Updated to take an argument
}

// Create the context with default values
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Create a provider component
export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedExpensesTypeFilter, setSelectedExpensesTypeFilter] =
    useState<string>("");
  const [selectedExpensesPropertyFilter, setSelectedExpensesPropertyFilter] =
    useState<string>("");

  // Function to apply filters
  const applyFilters = useCallback(
    (month: number) => {
      // Implement filtering logic here based on selectedExpensesTypeFilter and selectedExpensesPropertyFilter
      // Example: setFilteredExpenses(filteredExpenses.filter(expense => ...));
    },
    [
      selectedExpensesTypeFilter,
      selectedExpensesPropertyFilter,
      filteredExpenses,
    ]
  );

  return (
    <ExpenseContext.Provider
      value={{
        filteredExpenses,
        selectedMonth,
        setSelectedMonth,
        selectedExpensesTypeFilter,
        setSelectedExpensesTypeFilter,
        selectedExpensesPropertyFilter,
        setSelectedExpensesPropertyFilter,
        setFilteredExpenses,
        applyFilters,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use the context
export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
