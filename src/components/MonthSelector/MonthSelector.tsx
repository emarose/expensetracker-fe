import React from "react";

type MonthSelectorProps = {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
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

  return (
    <div className="d-flex gap-2 my-3">
      {months.map((month, index) => (
        <button
          key={index}
          style={{
            backgroundColor: selectedMonth === index + 1 ? "darkgray" : "",
          }}
          onClick={() => onMonthChange(index + 1)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default MonthSelector;
