import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Expense } from "../../types/expenseTypes";

interface ExpensesTableProps {
  expenses: Expense[];
  handleDelete: (id: string) => void;
  openModal: (expense: Expense) => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  expenses,
  handleDelete,
  openModal,
}) => {
  return (
    <div className="table-responsive">
      <table className="mt-3 table table-stripped table-bordered">
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Categoría</th>
            <th>Pagado Por</th>
            <th>Método de Pago</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.property}</td>
              <td>{expense.category}</td>
              <td>{expense.paidBy}</td>
              <td>{expense.paymentMethod}</td>
              <td>
                {`${String(new Date(expense.date).getDate()).padStart(
                  2,
                  "0"
                )}/${String(new Date(expense.date).getMonth() + 1).padStart(
                  2,
                  "0"
                )}`}
              </td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => handleDelete(expense._id)}>
                  <FaTrash />
                </button>
                <button onClick={() => openModal(expense)}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
