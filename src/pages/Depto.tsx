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
      <h1>Departamento</h1>
      <div className="border w-25">
        <h5>Servicios asociados</h5>
        <p>
          <b>Luz:</b>
          <p>Próximo vencimiento:</p>
        </p>
        <p>
          <b>Gas</b>
          <p>Próximo vencimiento:</p>
        </p>
        <p>
          <b>Agua</b>
          <p>Próximo vencimiento:</p>
        </p>
        <p>
          <b>Internet</b>
        </p>
        <p>Próximo vencimiento:</p>Medio de pago recomendado: Claro Pay
        <div>
          <h5>Administrar servicios</h5>
          <h5>Administrar medios de pago</h5>
        </div>
      </div>
    </div>
  );
};

export default Depto;
