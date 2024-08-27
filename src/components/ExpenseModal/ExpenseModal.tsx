import React from "react";
import { Expense } from "../../types/expenseTypes";

interface ExpenseModalProps {
  expense: Expense | null;
  onClose: () => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ expense, onClose }) => {
  if (!expense) return null;

  return (
    <dialog open className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Expense Details</h2>
        <p>
          <strong>Property:</strong> {expense.property}
        </p>
        <p>
          <strong>Category:</strong> {expense.category}
        </p>
        <p>
          <strong>Paid By:</strong> {expense.paidBy}
        </p>
        <p>
          <strong>Payment Method:</strong> {expense.paymentMethod}
        </p>
        <p>
          <strong>Date:</strong> {expense.date}
        </p>
        <p>
          <strong>Description:</strong> {expense.description}
        </p>
        <p>
          <strong>Amount:</strong> {expense.amount}
        </p>
      </div>
    </dialog>
  );
};

export default ExpenseModal;
