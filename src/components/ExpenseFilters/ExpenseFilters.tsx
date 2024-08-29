import React from "react";

interface FiltersProps {
  selectedExpensesTypeFilter: string;
  selectedExpensesPropertyFilter: string;
  onExpenseTypeFilterChange: (type: string) => void;
  onPropertyFilterChange: (property: string) => void;
}

const ExpenseFilters: React.FC<FiltersProps> = ({
  selectedExpensesTypeFilter,
  selectedExpensesPropertyFilter,
  onExpenseTypeFilterChange,
  onPropertyFilterChange,
}) => {
  return (
    <div className="d-flex w-50 gap-2">
      {/* FILTER BY EXPENSE TYPE */}
      <label>Filtrar por tipo:</label>
      <select
        value={selectedExpensesTypeFilter}
        onChange={(e) => onExpenseTypeFilterChange(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="property">Propiedad</option>
        <option value="personal">Personal</option>
      </select>

      {/* FILTER BY PROPERTY */}
      <label>Filtrar por propiedad:</label>
      <select
        value={selectedExpensesPropertyFilter}
        onChange={(e) => onPropertyFilterChange(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="casa">Casa</option>
        <option value="depto">Depto</option>
        <option value="french">French</option>
      </select>
    </div>
  );
};

export default ExpenseFilters;
