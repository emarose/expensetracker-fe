import React, { useCallback, useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  getAllExpensesByYearAndMonth,
} from "../services/expenseService";
import { Expense } from "../types/expenseTypes";
import { FaTrash } from "react-icons/fa";

const Home: React.FC = () => {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [paidBy, setPaidBy] = useState<string>("Ema");
  const [otherPaidBy, setOtherPaidBy] = useState<string>("");
  const [otherCategory, setOtherCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [expenseType, setExpenseType] = useState<string>("property");

  const [totalStoreTransactions, setTotalStoreTransactions] = useState(0);
  useState("0.00");
  const [selectedExpensesPropertyFilter, setSelectedPropertyFilter] =
    useState<string>("");
  const [selectedExpensesTypeFilter, setSelectedExpensesTypeFilter] =
    useState<string>("");

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

  const [totalsByPayer, setTotalsByPayer] = useState<Record<string, number>>({
    ema: 0,
    Agus: 0,
    Otro: 0,
  });

  const [totalsByProperty, setTotalsByProperty] = useState<
    Record<string, number>
  >({
    casa: 0,
    depto: 0,
    french: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const year = new Date().getFullYear();
      const expensesByMonth = await getAllExpensesByYearAndMonth(
        year,
        selectedMonth
      );
      setFilteredExpenses(expensesByMonth);
    };
    fetchData();
  }, [selectedMonth]);

  const handleMonthClick = async (month: number) => {
    setSelectedMonth(month);
    const year = new Date().getFullYear();

    let expensesByMonth = await getAllExpensesByYearAndMonth(year, month);

    if (selectedExpensesPropertyFilter) {
      expensesByMonth = expensesByMonth.filter(
        (expense) => expense.property === selectedExpensesPropertyFilter
      );
    }

    if (selectedExpensesTypeFilter) {
      expensesByMonth = expensesByMonth.filter(
        (expense) => expense.type === selectedExpensesTypeFilter
      );
    }

    setFilteredExpenses(expensesByMonth);
  };

  const applyFilters = useCallback(
    async (month: number) => {
      const year = new Date().getFullYear();
      let expensesByMonth = await getAllExpensesByYearAndMonth(year, month);

      if (selectedExpensesPropertyFilter) {
        expensesByMonth = expensesByMonth.filter(
          (expense) => expense.property === selectedExpensesPropertyFilter
        );
      }
      if (selectedExpensesTypeFilter) {
        expensesByMonth = expensesByMonth.filter(
          (expense) => expense.type === selectedExpensesTypeFilter
        );
      }

      setFilteredExpenses(expensesByMonth);
    },
    [selectedExpensesPropertyFilter, selectedExpensesTypeFilter]
  );

  useEffect(() => {
    applyFilters(selectedMonth);
  }, [
    selectedMonth,
    selectedExpensesPropertyFilter,
    selectedExpensesTypeFilter,
    applyFilters,
  ]);

  const handlePropertyFilter = async (property: string) => {
    setSelectedPropertyFilter(property);

    const year = new Date().getFullYear();
    let expensesByMonth = await getAllExpensesByYearAndMonth(
      year,
      selectedMonth
    );

    if (property) {
      expensesByMonth = expensesByMonth.filter(
        (expense) => expense.property === property
      );
    }

    setFilteredExpenses(expensesByMonth);
  };

  const handleExpenseTypeFilter = async (type: string) => {
    setSelectedExpensesTypeFilter(type);

    const year = new Date().getFullYear();
    let expensesByMonth = await getAllExpensesByYearAndMonth(
      year,
      selectedMonth
    );

    if (type) {
      expensesByMonth = expensesByMonth.filter(
        (expense) => expense.type === type
      );
    }

    setFilteredExpenses(expensesByMonth);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedCategory !== "Tienda") {
      setPaidBy("Agus");
    }

    const newExpense = {
      property: expenseType === "Personal" ? null : selectedProperty,
      category: selectedCategory !== "Otro" ? selectedCategory : otherCategory,
      paidBy: paidBy === "Otro" ? otherPaidBy : paidBy,
      paymentMethod,
      date,
      description,
      amount: Number(amount),
      type: expenseType,
    };

    await createExpense(newExpense);
    setSelectedProperty("");
    handleMonthClick(selectedMonth);
  };

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    const updatedExpenses = filteredExpenses.filter(
      (expense) => expense._id !== id
    );
    setFilteredExpenses(updatedExpenses);
  };

  const handlePaidByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaidBy(event.target.value);
    if (event.target.value !== "Otro") {
      setOtherPaidBy("");
    }
  };

  const calculateTotalsByPayer = (expenses: Expense[]) => {
    return expenses.reduce(
      (acc, expense) => {
        if (expense.paidBy === "Ema") {
          acc.Ema += expense.amount;
        } else if (expense.paidBy === "Agus") {
          acc.Agus += expense.amount;
        } else {
          acc.Otro += expense.amount;
        }
        return acc;
      },
      { Ema: 0, Agus: 0, Otro: 0 }
    );
  };

  const calculateTotalsByProperty = (expenses: Expense[]) => {
    return expenses.reduce(
      (acc, expense) => {
        if (expense.property === "casa") {
          acc.casa += expense.amount;
        } else if (expense.property === "depto") {
          acc.depto += expense.amount;
        } else if (expense.property === "french") {
          acc.french += expense.amount;
        }
        return acc;
      },
      { casa: 0, depto: 0, french: 0 }
    );
  };

  useEffect(() => {
    const totals = calculateTotalsByPayer(filteredExpenses);
    setTotalsByPayer(totals);

    const propertyTotals = calculateTotalsByProperty(filteredExpenses);
    setTotalsByProperty(propertyTotals);

    const totalStore = filteredExpenses
      .filter((expense) => expense.category === "Tienda")
      .reduce((acc, expense) => acc + expense.amount, 0);

    setTotalStoreTransactions(totalStore);
  }, [filteredExpenses]);

  const totalExpenses = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const emaPercentage =
    totalExpenses > 0
      ? ((totalsByPayer.Ema / totalExpenses) * 100).toFixed(2)
      : "0.00";
  const agusPercentage =
    totalExpenses > 0
      ? ((totalsByPayer.Agus / totalExpenses) * 100).toFixed(2)
      : "0.00";
  const otroPercentage =
    totalExpenses > 0
      ? ((totalsByPayer.Otro / totalExpenses) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="container-fluid">
      {/* NEW EXPENSE FORM */}
      <div className="d-flex w-100 justify-content-between">
        <div className="border my-5 w-50">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="expenseType">Tipo de gasto</label>
              <select
                id="expenseType"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
              >
                <option value="property">Propiedad</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            {expenseType === "property" && (
              <div>
                <label htmlFor="property">Propiedad</label>
                <select
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
            )}

            <div>
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Selecciona</option>
                {selectedProperty === "depto" && (
                  <option value="Expensas">Expensas</option>
                )}
                {expenseType === "property" ? (
                  <>
                    <option value="Luz">Luz</option>
                    <option value="Gas">Gas</option>
                    <option value="Agua">Agua</option>
                    <option value="Internet">Internet</option>
                  </>
                ) : (
                  <>
                    <option value="Tienda">Tienda</option>
                    <option value="Otro">Otro</option>
                  </>
                )}
              </select>
              {selectedCategory === "Otro" && (
                <input
                  type="text"
                  placeholder="Especificar"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  required
                />
              )}
            </div>
            {selectedCategory !== "Tienda" && (
              <>
                <div>
                  <label>Pagado Por</label>
                  <div>
                    <input
                      type="radio"
                      id="ema"
                      name="paidBy"
                      value="Ema"
                      checked={paidBy === "Ema"}
                      onChange={handlePaidByChange}
                    />
                    <label htmlFor="ema">Ema</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="agus"
                      name="paidBy"
                      value="Agus"
                      checked={paidBy === "Agus"}
                      onChange={handlePaidByChange}
                    />
                    <label htmlFor="agus">Agus</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="otro"
                      name="paidBy"
                      value="Otro"
                      checked={paidBy === "Otro"}
                      onChange={handlePaidByChange}
                    />
                    <label htmlFor="otro">Otro</label>
                    {paidBy === "Otro" && (
                      <input
                        type="text"
                        placeholder="Especificar"
                        value={otherPaidBy}
                        onChange={(e) => setOtherPaidBy(e.target.value)}
                        required
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="paymentMethod">Método de Pago</label>
                  <input
                    id="paymentMethod"
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="date">Fecha</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description">Descripción</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="amount">Monto</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button type="submit">Agregar gasto</button>
          </form>
        </div>
      </div>

      {/* FILTERS */}
      <div className="d-flex flex-column w-50 gap-2">
        {/* FILTER BY EXPENSE TYPE */}
        <label>Filtrar por tipo:</label>
        <select
          value={selectedExpensesTypeFilter}
          onChange={(e) => handleExpenseTypeFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="property">Propiedad</option>
          <option value="personal">Personal</option>
        </select>
        {/* FILTER BY PROPERTY */}
        <label>Filtrar por propiedad:</label>
        <select
          value={selectedExpensesPropertyFilter}
          onChange={(e) => handlePropertyFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="casa">Casa</option>
          <option value="depto">Depto</option>
          <option value="french">French</option>
        </select>
      </div>

      {/* MONTH BUTTONS */}
      <div className="d-flex gap-2 my-3">
        {months.map((month, index) => (
          <button
            key={index}
            style={{
              backgroundColor: selectedMonth === index + 1 ? "darkgray" : "",
            }}
            onClick={() => handleMonthClick(index + 1)}
          >
            {month}
          </button>
        ))}
      </div>

      {/* EXPENSES TABLE */}
      <table className=" mt-3">
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
          {filteredExpenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.property}</td>
              <td>{expense.category}</td>
              <td>{expense.paidBy}</td>
              <td>{expense.paymentMethod}</td>
              <td>
                {`${String(new Date(expense.date).getDate()).padStart(
                  2,
                  "0"
                )}/${String(new Date(expense.date).getMonth() + 1)}`}
              </td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => handleDelete(expense._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <span className="d-flex gap-5">
        {/* TOTAL EXPENSES BY PROPERTY*/}
        <div className="mt-3">
          <h4>Total impuestos por propiedad:</h4>
          <p>Total Casa: {totalsByProperty.casa}</p>
          <p>Total Depto: {totalsByProperty.depto}</p>
          <p>Total French: {totalsByProperty.french}</p>
        </div>

        {/* TOTALS AND PERCENTAGES */}
        <div className="mt-3">
          <h4>Porcentajes:</h4>
          <p>
            Total Ema: {totalsByPayer.Ema} ({emaPercentage}%)
          </p>
          <p>
            Total Agus: {totalsByPayer.Agus} ({agusPercentage}%)
          </p>
          {totalsByPayer.Otro !== 0 && (
            <p>
              Total Otro: {totalsByPayer.Otro} ({otroPercentage}%)
            </p>
          )}
          <hr />
          <p>Total Transacciones de Tienda: {totalStoreTransactions}</p>
        </div>
      </span>
    </div>
  );
};

export default Home;
