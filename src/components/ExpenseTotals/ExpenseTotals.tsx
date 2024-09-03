import React from "react";
import { formatter } from "../../utils/expenseUtils";

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
  const grandTotalProperties =
    (totalsByProperty.casa || 0) +
    (totalsByProperty.depto || 0) +
    (totalsByProperty.french || 0);

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        {/* Total impuestos Propiedades */}
        <div className="col-md-6">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Total impuestos Propiedades</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  Casa:{" "}
                  <strong>
                    {formatter.format(totalsByProperty.casa || 0)}
                  </strong>
                </li>
                <li>
                  Depto:{" "}
                  <strong>
                    {formatter.format(totalsByProperty.depto || 0)}
                  </strong>
                </li>
                <li>
                  French:{" "}
                  <strong>
                    {formatter.format(totalsByProperty.french || 0)}
                  </strong>
                </li>
                <hr />
                <li>
                  <strong>{formatter.format(grandTotalProperties)}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Total Propiedades & Total Personal */}
        <div className="col-md-6">
          <div className="card border-secondary mb-3">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Totales Generales</h5>
            </div>
            <div className="card-body">
              <h6>Total Propiedades:</h6>
              <p>{formatter.format(propertiesTotal)}</p>
              <p>
                Total Ema en Propiedades: {formatter.format(propertyEmaTotal)}
              </p>
              <p>
                Total Agus en Propiedades: {formatter.format(propertyAgusTotal)}
              </p>
              <hr />
              <h6>Total Personal:</h6>
              <p>{formatter.format(personalTotal)}</p>
              <p>Total Ema en Personal: {formatter.format(personalEmaTotal)}</p>
              <p>
                Total Agus en Personal: {formatter.format(personalAgusTotal)}
              </p>
              <p>Total Tienda: {formatter.format(totalStoreTransactions)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTotals;
