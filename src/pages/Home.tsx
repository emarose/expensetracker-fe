import React, { useEffect, useState } from "react";
import {
  createExpense,
  getAllExpenses,
  getAllExpensesByProperty,
  getAllExpensesByYearAndMonth,
} from "../services/expenseService";
import { Expense } from "../types/expenseTypes";

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [paidBy, setPaidBy] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    getAllExpenses().then((data) => setExpenses(data));
  }, []);

  const handleMonthClick = async (month: number) => {
    setSelectedMonth(month);
    const year = new Date().getFullYear();

    const expensesByMonth = await getAllExpensesByYearAndMonth(year, month);
    setFilteredExpenses(expensesByMonth);
  };

  const handlePropertyFilter = async (property: string) => {
    setSelectedProperty(property);

    if (property) {
      const expensesByProperty = await getAllExpensesByProperty(property);
      setFilteredExpenses(expensesByProperty);
    } else {
      setFilteredExpenses(expenses);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handlePropertyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProperty(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExpense = {
      property: selectedProperty,
      category: selectedCategory,
      paidBy,
      paymentMethod,
      date,
      description,
      amount: Number(amount),
    };
    createExpense(newExpense);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="form form-control d-flex flex-column gap-3 p-4 bg-light"
      >
        <h5>Nuevo gasto</h5>
        <div className="d-flex flex-column w-25">
          <label htmlFor="property">Propiedad</label>
          <select
            className="form-control"
            id="property"
            value={selectedProperty}
            onChange={handlePropertyChange}
          >
            <option value="">Selecciona</option>
            <option value="casa">Casa</option>
            <option value="depto">Depto</option>
            <option value="french">French</option>
          </select>
        </div>
        <div className="d-flex flex-column w-25">
          <label htmlFor="category">Categoría</label>
          <select
            className="form-control"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Selecciona</option>
            <option value="Expensas">Expensas</option>
            <option value="Luz">Luz</option>
            <option value="Gas">Gas</option>
            <option value="Agua">Agua</option>
            <option value="Internet">Internet</option>
          </select>
        </div>

        <div className="d-flex flex-column w-25">
          <label htmlFor="paidBy">Pagado Por</label>
          <input
            id="paidBy"
            type="text"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column w-25">
          <label htmlFor="paymentMethod">Método de Pago</label>
          <input
            id="paymentMethod"
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column w-25">
          <label htmlFor="date">Fecha</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column w-25">
          <label htmlFor="description">Descripción</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column w-25">
          <label htmlFor="amount">Monto</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <button className="my-4 btn btn-dark" type="submit">
            Guardar Gasto
          </button>
        </div>
      </form>
      <hr />

      <div className="form-control d-flex flex-column w-25">
        <label>Filtrar por Propiedad:</label>
        <select
          id="propertyFilter"
          value={selectedProperty}
          onChange={(e) => handlePropertyFilter(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="casa">Casa</option>
          <option value="depto">Depto</option>
          <option value="french">French</option>
        </select>
      </div>
      <div>
        {months.map((month, index) => (
          <button key={index} onClick={() => handleMonthClick(index + 1)}>
            {month}
          </button>
        ))}
      </div>
      <h4>Gastos</h4>
      <table>
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Categoría</th>
            <th>Pagado Por</th>
            <th>Método de Pago</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No hay gastos para este mes
              </td>
            </tr>
          ) : (
            filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.property}</td>
                <td>{expense.category}</td>
                <td>{expense.paidBy}</td>
                <td>{expense.paymentMethod}</td>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
