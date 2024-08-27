import React, { useCallback, useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  getAllExpensesByYearAndMonth,
} from "../services/expenseService";
import { Expense } from "../types/expenseTypes";
import { FaEye, FaTrash } from "react-icons/fa";
import ExpenseModal from "../components/ExpenseModal/ExpenseModal";

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

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalStoreTransactions, setTotalStoreTransactions] = useState(0);
  useState("0.00");
  const [selectedExpensesPropertyFilter, setSelectedPropertyFilter] =
    useState<string>("");
  const [selectedExpensesTypeFilter, setSelectedExpensesTypeFilter] =
    useState<string>("");

  type CategoryType = "luz" | "gas" | "agua" | "internet";

  type PropertyType = "casa" | "depto" | "french";
  type ExpenseType = "property" | "personal";

  const accounts: Record<PropertyType, Record<CategoryType, string>> = {
    casa: {
      luz: "123",
      gas: "456",
      agua: "789",
      internet: "",
    },
    depto: {
      luz: "654",
      gas: "987",
      agua: "321",
      internet: "",
    },
    french: {
      luz: "978",
      gas: "654",
      agua: "564",
      internet: "",
    },
  };

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
    const category = event.target.value as CategoryType;
    setSelectedCategory(category);

    if (selectedProperty && expenseType !== "personal") {
      const accountNumber =
        accounts[selectedProperty as PropertyType][category];
      setDescription(`Cta: ${accountNumber}`);
    } else {
      setDescription("");
    }
  };

  const handleExpenseTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const expenseType = event.target.value as ExpenseType;
    setExpenseType(expenseType);

    if (expenseType === "personal") {
      setDescription("");
    }
  };

  const handlePropertyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProperty(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedCategory);

    if (selectedCategory !== "tienda") {
      setPaidBy("Agus");
    }
    const newExpense = {
      property: expenseType === "personal" ? null : selectedProperty,
      category: selectedCategory !== "otro" ? selectedCategory : otherCategory,
      paidBy: paidBy === "otro" ? otherPaidBy : paidBy,
      paymentMethod,
      date,
      description,
      amount: Number(amount),
      type: expenseType,
    };
    try {
      await createExpense(newExpense);
      setSelectedProperty("");
      handleMonthClick(selectedMonth);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      const updatedExpenses = filteredExpenses.filter(
        (expense) => expense._id !== id
      );
      setFilteredExpenses(updatedExpenses);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaidByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaidBy(event.target.value);
    if (event.target.value !== "otro") {
      setOtherPaidBy("");
    }
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

  const calculateTotalsByTypeAndPayer = (expenses: Expense[]) => {
    return expenses.reduce(
      (acc, expense) => {
        if (expense.type === "property") {
          acc.propertiesTotal += expense.amount;
          if (expense.paidBy === "Ema") {
            acc.propertyEmaTotal += expense.amount;
          } else if (expense.paidBy === "Agus") {
            acc.propertyAgusTotal += expense.amount;
          }
        } else if (expense.type === "personal") {
          acc.personalTotal += expense.amount;
          if (expense.paidBy === "Ema") {
            acc.personalEmaTotal += expense.amount;
          } else if (expense.paidBy === "Agus") {
            acc.personalAgusTotal += expense.amount;
          }
        }
        return acc;
      },
      {
        propertiesTotal: 0,
        personalTotal: 0,
        propertyEmaTotal: 0,
        propertyAgusTotal: 0,
        personalEmaTotal: 0,
        personalAgusTotal: 0,
      }
    );
  };

  const {
    propertiesTotal,
    personalTotal,
    propertyEmaTotal,
    propertyAgusTotal,
    personalEmaTotal,
    personalAgusTotal,
  } = calculateTotalsByTypeAndPayer(filteredExpenses);

  const openModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  useEffect(() => {
    const propertyTotals = calculateTotalsByProperty(filteredExpenses);
    setTotalsByProperty(propertyTotals);

    const totalStore = filteredExpenses
      .filter((expense) => expense.category === "tienda")
      .reduce((acc, expense) => acc + expense.amount, 0);

    setTotalStoreTransactions(totalStore);
  }, [filteredExpenses]);

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
                onChange={handleExpenseTypeChange}
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
                  <>
                    <option value="">Selecciona</option>
                    <option value="casa">Casa</option>
                    <option value="depto">Depto</option>
                    <option value="french">French</option>
                  </>
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

                {expenseType === "property" ? (
                  <>
                    {Object.keys(
                      accounts[selectedProperty as PropertyType] || {}
                    ).map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value="tienda">Tienda</option>
                    <option value="otro">Otro</option>
                  </>
                )}
              </select>
              {selectedCategory === "otro" && (
                <input
                  type="text"
                  placeholder="Especificar"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  required
                />
              )}
            </div>
            {selectedCategory !== "tienda" && (
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
                      value="otro"
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
      <table className="mt-3">
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
              <td className="ps-3">
                <button onClick={() => openModal(expense)}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div>
        <div className="border">
          <h3>Total Propiedades</h3>
          <span className="d-flex gap-4">
            <p>Casa: ${totalsByProperty.casa.toFixed(2)}</p>
            <p>Depto: ${totalsByProperty.depto.toFixed(2)}</p>
            <p>French: ${totalsByProperty.french.toFixed(2)}</p>
          </span>
        </div>
        <hr />
        <h2>Totales por Tipo y Pagador</h2>
        <div className="d-flex gap-4">
          <div>
            <h3>Total Propiedades: {propertiesTotal.toFixed(2)}</h3>
            <p>Total Ema en Propiedades: {propertyEmaTotal.toFixed(2)}</p>
            <p>Total Agus en Propiedades: {propertyAgusTotal.toFixed(2)}</p>
          </div>
          <div>
            <h3>Total Personal: {personalTotal.toFixed(2)}</h3>
            <p>Total Ema en Personal: {personalEmaTotal.toFixed(2)}</p>
            <p>Total Agus en Personal: {personalAgusTotal.toFixed(2)}</p>
            <p>Total Tienda: {totalStoreTransactions.toFixed(2)}</p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ExpenseModal expense={selectedExpense} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
