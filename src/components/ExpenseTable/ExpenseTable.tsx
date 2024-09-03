import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Expense } from "../../types/expenseTypes";
import { formatPaidBy, formatter } from "../../utils/expenseUtils";
import { getTotalByProperty } from "../../services/expenseService";

const groupExpensesByProperty = (expenses: Expense[]) => {
  return expenses.reduce((acc, expense) => {
    const property = expense.property || "Sin Propiedad";
    if (property !== "Sin Propiedad") {
      if (!acc[property]) {
        acc[property] = [];
      }
      acc[property].push(expense);
    }
    return acc;
  }, {} as Record<string, Expense[]>);
};

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
  const groupedExpenses = groupExpensesByProperty(expenses);
  const [totals, setTotals] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const getTotals = async () => {
      const data = await getTotalByProperty();
      const totalsMap = data.reduce((acc, { total, property }) => {
        if (property !== "") acc[property] = total;
        return acc;
      }, {} as { [key: string]: number });
      setTotals(totalsMap);
    };

    getTotals();
  }, []);

  return (
    <div className="table-container">
      {Object.entries(groupedExpenses).map(([property, propertyExpenses]) => (
        <div className="table-wrapper" key={property}>
          <h3>{property}</h3>
          <table className="mt-3 table table-striped table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
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
              {propertyExpenses.map((filteredExpense) => (
                <tr key={filteredExpense._id}>
                  <td>{filteredExpense.category}</td>
                  <td>
                    {formatPaidBy({
                      payer: filteredExpense.paidBy,
                      isDivided: filteredExpense.isDivided,
                      paidByEma: filteredExpense.paidByEma,
                      paidByAgus: filteredExpense.paidByAgus,
                    })}
                  </td>
                  <td>{filteredExpense.paymentMethod}</td>
                  <td>
                    {`${String(
                      new Date(filteredExpense.date).getDate()
                    ).padStart(2, "0")}/${String(
                      new Date(filteredExpense.date).getMonth() + 1
                    ).padStart(2, "0")}`}
                  </td>
                  <td>{filteredExpense.description}</td>
                  <td className="text-end">
                    {formatter.format(filteredExpense.amount)}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm mr-2"
                      onClick={() => handleDelete(filteredExpense._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="btn btn-dark btn-sm ms-2"
                      onClick={() => openModal(filteredExpense)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-end">
                  Total:
                </td>
                <td className="text-end fw-bold">
                  {totals[property]
                    ? formatter.format(totals[property])
                    : "$0.00"}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ExpensesTable;
