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
  const expenseTypes = ["", "property", "personal"];
  const properties = ["", "casa", "depto", "french"];

  return (
    <div className="d-flex flex-wrap gap-2">
      {/* FILTER BY EXPENSE TYPE */}
      {/* <div className="d-flex flex-column me-3">
        <label className="form-label mb-2">Filtrar por tipo:</label>
        <div className="d-flex gap-2">
          {expenseTypes.map((type) => (
            <button
              key={type}
              className={`btn ${
                selectedExpensesTypeFilter === type
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => onExpenseTypeFilterChange(type)}
            >
              {type === ""
                ? "Todos"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div> */}

      {/* FILTER BY PROPERTY */}
      <div className="d-flex flex-column card p-4 my-3">
        <h5 className="mb-3">Filtrar por propiedad:</h5>
        <div className="d-flex gap-2">
          {properties.map((property) => (
            <button
              key={property}
              className={`btn ${
                selectedExpensesPropertyFilter === property
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() => onPropertyFilterChange(property)}
            >
              {property === ""
                ? "Todos"
                : property.charAt(0).toUpperCase() + property.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilters;
