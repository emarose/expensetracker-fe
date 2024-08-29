import React from "react";

interface TotalsProps {
  totalsByProperty: Record<string, number>;
  propertiesTotal: number;
  propertyEmaTotal: number;
  propertyAgusTotal: number;
  personalTotal: number;
  personalEmaTotal: number;
  personalAgusTotal: number;
  totalStoreTransactions: number;
}

const ExpenseTotals: React.FC<TotalsProps> = ({
  totalsByProperty,
  propertiesTotal,
  propertyEmaTotal,
  propertyAgusTotal,
  personalTotal,
  personalEmaTotal,
  personalAgusTotal,
  totalStoreTransactions,
}) => {
  // Formatter for currency, in your desired format
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  return (
    <div>
      {/* TOTALS */}
      <div>
        <div className="border p-4 mt-4">
          <h3>Total impuestos Propiedades</h3>
          <span className="d-flex gap-4">
            <p>
              Casa: <b>{formatter.format(totalsByProperty.casa)}</b>
            </p>
            <p>
              Depto: <b>{formatter.format(totalsByProperty.depto)}</b>
            </p>
            <p>
              French: <b>{formatter.format(totalsByProperty.french)}</b>
            </p>
          </span>
        </div>
        <hr />
        <div className="d-flex gap-4">
          <div>
            <h3>Total Propiedades: {formatter.format(propertiesTotal)}</h3>
            <p>
              Total Ema en Propiedades: {formatter.format(propertyEmaTotal)}
            </p>
            <p>
              Total Agus en Propiedades: {formatter.format(propertyAgusTotal)}
            </p>
          </div>
          <div>
            <h3>Total Personal: {formatter.format(personalTotal)}</h3>
            <p>Total Ema en Personal: {formatter.format(personalEmaTotal)}</p>
            <p>Total Agus en Personal: {formatter.format(personalAgusTotal)}</p>
            <p>Total Tienda: {formatter.format(totalStoreTransactions)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTotals;
