import React, { useState } from "react";
import {
  CategoryType,
  ExpenseFormData,
  PaidByObject,
  PropertyType,
} from "../../types/expenseTypes";

interface ExpenseFormProps {
  onSubmit: (formData: ExpenseFormData) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const initialFormState = {
    expenseType: "property",
    selectedProperty: "",
    selectedCategory: "",
    otherCategory: "",
    paidBy: "Ema",
    otherPaidBy: "",
    paymentMethod: "",
    date: "",
    description: "",
    amount: 0,
    dividedPayAgus: 0,
    dividedPayEma: 0,
  };

  const [formState, setFormState] = useState(initialFormState);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    if (target.type === "radio" || target.type === "checkbox") {
      const { name, value, checked } = target as HTMLInputElement;
      setFormState((prevState) => ({
        ...prevState,
        [name]: checked ? value : "",
      }));
    } else {
      const { id, value } = target as HTMLSelectElement;
      setFormState((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleDividedPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newValue = Number(value);

    setFormState((prevState) => {
      if (id === "dividedPayAgus") {
        return {
          ...prevState,
          dividedPayAgus: newValue,
          dividedPayEma:
            prevState.amount - newValue >= 0 ? prevState.amount - newValue : 0,
        };
      } else if (id === "dividedPayEma") {
        return {
          ...prevState,
          dividedPayEma: newValue,
          dividedPayAgus:
            prevState.amount - newValue >= 0 ? prevState.amount - newValue : 0,
        };
      } else {
        return prevState;
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isDivided = formState.paidBy === "dividedPay";
    const paidByEma = isDivided
      ? formState.dividedPayEma
      : formState.paidBy === "Ema"
      ? formState.amount
      : 0;
    const paidByAgus = isDivided
      ? formState.dividedPayAgus
      : formState.paidBy === "Agus"
      ? formState.amount
      : 0;

    const expenseData: ExpenseFormData = {
      type: formState.expenseType,
      property: formState.selectedProperty,
      category: formState.selectedCategory,
      paidBy: isDivided
        ? /* { Ema: paidByEma, Agus: paidByAgus } */ undefined
        : formState.paidBy,
      paidByEma,
      paidByAgus,
      isDivided,
      paymentMethod: formState.paymentMethod,
      date: formState.date,
      description: formState.description,
      amount: formState.amount,
      otherCategory: formState.otherCategory || undefined,
      otherPaidBy: formState.otherPaidBy || undefined,
    };

    onSubmit(expenseData);
    setFormState(initialFormState);
  };

  return (
    <div className="container my-5">
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          {formState.expenseType === "property" && (
            <div className="mb-3">
              <label htmlFor="selectedProperty" className="form-label">
                Propiedad
              </label>
              <select
                id="selectedProperty"
                value={formState.selectedProperty}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Seleccionar propiedad</option>
                <option value="casa">Casa</option>
                <option value="depto">Depto</option>
                <option value="french">French</option>
              </select>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="selectedCategory" className="form-label">
              Categoría
            </label>
            <select
              id="selectedCategory"
              value={formState.selectedCategory}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Seleccionar categoría</option>
              {Object.keys(
                accounts[formState.selectedProperty as PropertyType] || {}
              ).map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {formState.selectedCategory === "otro" && (
              <input
                type="text"
                placeholder="Especificar"
                value={formState.otherCategory}
                onChange={handleChange}
                className="form-control mt-2"
                required
              />
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Monto
            </label>
            <input
              id="amount"
              type="number"
              placeholder="$"
              value={formState.amount || "$"}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pagado Por</label>
            <div className="form-check">
              <input
                type="radio"
                id="paidBy"
                name="paidBy"
                value="Ema"
                checked={formState.paidBy === "Ema"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="paidBy" className="form-check-label">
                Ema
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="paidBy"
                name="paidBy"
                value="Agus"
                checked={formState.paidBy === "Agus"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="paidBy" className="form-check-label">
                Agus
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                type="radio"
                id="paidBy"
                name="paidBy"
                value="dividedPay"
                checked={formState.paidBy === "dividedPay"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="paidBy" className="form-check-label ms-2 me-5">
                Pago dividido
              </label>
              {formState.paidBy === "dividedPay" && (
                <>
                  <div>
                    <label
                      htmlFor="dividedPayAgus"
                      className="form-check-label small"
                    >
                      Parte de Agus
                    </label>
                    <input
                      id="dividedPayAgus"
                      type="number"
                      value={formState.dividedPayAgus}
                      onChange={handleDividedPayChange}
                      className="form-control me-2"
                      required
                      style={{ width: "150px" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dividedPayEma"
                      className="form-check-label small"
                    >
                      Parte de Ema
                    </label>
                    <input
                      id="dividedPayEma"
                      type="number"
                      value={formState.dividedPayEma}
                      onChange={handleDividedPayChange}
                      className="form-control"
                      required
                      style={{ width: "150px" }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="paidBy"
                name="paidBy"
                value="Otro"
                checked={formState.paidBy === "Otro"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="paidBy" className="form-check-label">
                Otro
              </label>
              {formState.paidBy === "Otro" && (
                <input
                  type="text"
                  placeholder="Especificar"
                  value={formState.otherPaidBy}
                  onChange={handleChange}
                  className="form-control mt-2"
                  required
                />
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">
              Método de Pago
            </label>
            <input
              id="paymentMethod"
              type="text"
              value={formState.paymentMethod}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Fecha
            </label>
            <input
              id="date"
              type="date"
              value={formState.date}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <input
              id="description"
              type="text"
              value={formState.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Guardar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
