import React, { useEffect, useState } from "react";
import { getAllDeptoExpenses } from "../services/deptoService";
import { Expense } from "../types/expenseTypes";

const Depto: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllDeptoExpenses();
        console.log("🚀 ~ fetchExpenses ~ data:", data);
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Depto Page</h1>
    </div>
  );
};

export default Depto;
