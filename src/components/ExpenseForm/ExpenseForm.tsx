import React, { useState } from "react";
import {
  CategoryType,
  ExpenseFormData,
  PropertyType,
} from "../../types/expenseTypes";

interface ExpenseFormProps {
  onSubmit: (formData: ExpenseFormData) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const [expenseType, setExpenseType] = useState<string>("property");
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [otherCategory, setOtherCategory] = useState<string>("");
  const [paidBy, setPaidBy] = useState<string>("Ema");
  const [otherPaidBy, setOtherPaidBy] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

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

  const handleExpenseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpenseType(e.target.value);
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProperty(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handlePaidByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaidBy(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      expenseType,
      selectedProperty,
      selectedCategory,
      otherCategory,
      paidBy,
      otherPaidBy,
      paymentMethod,
      date,
      description,
      amount,
    });
  };

  return (
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
              {expenseType === "property" ? (
                // Asegúrate de ajustar esto según la estructura de tus cuentas
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
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <button type="submit">Agregar gasto</button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
