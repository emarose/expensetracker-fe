import React, { useState } from "react";
import { createEvent } from "../../services/calendarService";
import { PropertyType, CategoryType } from "../../types/expenseTypes";
interface EventFormProps {
  onEventAdded: () => void;
}
const EventForm: React.FC<EventFormProps> = ({ onEventAdded }) => {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [otherCategory, setOtherCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const properties: PropertyType[] = ["casa", "depto", "french"];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleOtherCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherCategory(e.target.value);
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProperty(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !selectedCategory || !selectedProperty) {
      setError("All fields are required.");
      return;
    }

    const event = {
      date,
      description,
      property: selectedProperty,
      category: selectedCategory === "otro" ? otherCategory : selectedCategory,
    };

    try {
      await createEvent(event);
      setSuccess("Event created successfully!");
      setDate("");
      setDescription("");
      setSelectedCategory("");
      setSelectedProperty("");
      setOtherCategory("");
      onEventAdded();
    } catch (error) {
      setError("Failed to create event.");
    }
  };

  return (
    <div className="event-form card p-3">
      <h2>Nuevo Vencimiento</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="selectedProperty" className="form-label">
            Propiedad
          </label>
          <select
            id="selectedProperty"
            value={selectedProperty}
            onChange={handlePropertyChange}
            className="form-select"
          >
            <option value="">Seleccionar propiedad</option>
            {properties.map((property) => (
              <option key={property} value={property}>
                {property.charAt(0).toUpperCase() + property.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="selectedCategory" className="form-label">
            Categoría
          </label>
          <select
            id="selectedCategory"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-select"
          >
            <option value="">Seleccionar categoría</option>
            {selectedProperty &&
              Object.keys(accounts[selectedProperty as PropertyType] || {}).map(
                (category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                )
              )}
            <option value="otro">Otro</option>
          </select>
          {selectedCategory === "otro" && (
            <input
              type="text"
              placeholder="Especificar"
              value={otherCategory}
              onChange={handleOtherCategoryChange}
              className="form-control mt-2"
              required
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-dark mt-4">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default EventForm;
