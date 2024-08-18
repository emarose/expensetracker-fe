import React, { useState } from 'react';

const ExpenseTable = ({ expenses:  }) => {
  const [selectedType, setSelectedType] = useState("property");

  const filteredExpenses = expenses.filter((expense) => {
    return selectedType ? expense.type === selectedType : true;
  });

  return (
    <div>
      <label htmlFor="typeFilter">Tipo</label>
      <select
        id="typeFilter"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="property">Propiedad</option>
        <option value="personal">Personal</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Categoria</th>
            <th>Descripción</th>
            <th>Pagado por</th>
            <th>Método de pago</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.property}</td>
              <td>{/* Format the date here as needed */}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.paidBy}</td>
              <td>{expense.paymentMethod}</td>
              {/* Add other columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
