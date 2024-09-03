import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Expense } from "../../types/expenseTypes";
import "./ExpensesCards.css";

interface ExpensesCardsProps {
  expenses: Expense[];
  handleDelete: (id: string) => void;
  openModal: (expense: Expense) => void;
}

const ExpensesCards: React.FC<ExpensesCardsProps> = ({
  expenses,
  handleDelete,
  openModal,
}) => {
  const filteredExpenses = expenses.filter((expense) => expense.property);

  // Group expenses by property
  const groupedExpenses = filteredExpenses.reduce((acc, expense) => {
    const { property } = expense;
    if (!acc[property!]) {
      acc[property!] = [];
    }
    acc[property!].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  return (
    <div className="grouped-cards-container">
      {Object.keys(groupedExpenses).map((property) => (
        <div key={property} className="property-card card">
          <div className="card-header">
            <h3 className="property-title">{property}</h3>
          </div>
          <div className="card-body">
            {groupedExpenses[property].map((expense) => (
              <div key={expense._id} className="expense-detail">
                <h5 className="card-title">Categoría: {expense.category}</h5>
                <p className="card-text">
                  Fecha:{" "}
                  {`${String(new Date(expense.date).getDate()).padStart(
                    2,
                    "0"
                  )}/${String(new Date(expense.date).getMonth() + 1).padStart(
                    2,
                    "0"
                  )}`}
                </p>
                <p className="card-text">Monto: {expense.amount}</p>
                <div className="card-actions">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(expense._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal(expense)}
                  >
                    <FaEye />
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpensesCards;
