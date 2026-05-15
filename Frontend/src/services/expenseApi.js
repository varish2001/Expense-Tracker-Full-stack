import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const expenseApi = axios.create({
  baseURL: API_URL
});

export const getExpenses = async () => {
  const response = await expenseApi.get("/expenses");
  return response.data.expenses || [];
};

export const createExpense = async (expense) => {
  const response = await expenseApi.post("/expenses", expense);
  return response.data.expense;
};

export const updateExpense = async (id, expense) => {
  const response = await expenseApi.put(`/expenses/${id}`, expense);
  return response.data.expense;
};

export const deleteExpense = async (id) => {
  const response = await expenseApi.delete(`/expenses/${id}`);
  return response.data;
};
