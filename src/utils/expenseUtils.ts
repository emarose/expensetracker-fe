import { Expense } from "../types/expenseTypes";

export const calculateTotalsByProperty = (expenses: Expense[]) => {
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

export const calculateTotalsByTypeAndPayer = (expenses: Expense[]) => {
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

export const calculateTotalStoreTransactions = (expenses: Expense[]) => {
  return expenses.reduce((total, expense) => {
    if (expense.category === "tienda") {
      total += expense.amount;
    }
    return total;
  }, 0);
};

export const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
});

export const formatPaidBy = (paidBy?: {
  isDivided?: boolean;
  paidByAgus?: number;
  paidByEma?: number;
  payer?: string;
}) => {
  console.log(paidBy);

  if (!paidBy) {
    return "Unknown";
  }

  const { isDivided = false, paidByAgus = 0, paidByEma = 0, payer } = paidBy;

  if (isDivided) {
    return `Agus: ${formatter.format(paidByAgus)} - Ema: ${formatter.format(paidByEma)}`;
  } else {
    return payer;
  }
};
