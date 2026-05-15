import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Navbar from "./Components/Navbar";
import ExpenseCard from "./Components/ExpenseCard";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense
} from "./services/expenseApi";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch only user-created expenses from MongoDB.
  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Unable to load expenses."
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleSaveExpense = async (expenseData) => {
    if (editingExpense) {
      const updatedExpense = await updateExpense(editingExpense._id, expenseData);

      setExpenses((currentExpenses) =>
        currentExpenses.map((expense) =>
          expense._id === updatedExpense._id ? updatedExpense : expense
        )
      );
      setMessage({ type: "success", text: "Expense updated successfully." });
    } else {
      const newExpense = await createExpense(expenseData);
      setExpenses((currentExpenses) => [newExpense, ...currentExpenses]);
      setMessage({ type: "success", text: "Expense added successfully." });
    }

    setEditingExpense(null);
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense._id !== id)
      );
      setMessage({ type: "success", text: "Expense deleted successfully." });
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Unable to delete expense."
      });
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  }, [expenses]);

  return (
    <div className="app-shell min-vh-100">
      <Navbar />

      <Container className="py-4 py-lg-5">
        <div className="dashboard-header mb-4">
          <div>
            <p className="eyebrow mb-2">
              Personal finance dashboard
            </p>
            <h1 className="dashboard-title mb-2">Expense Tracker</h1>
            <p className="text-muted mb-0">
              Add, edit, and review your real MongoDB expenses in one place.
            </p>
          </div>
          <Button className="refresh-button" variant="light" onClick={fetchExpenses}>
            Refresh
          </Button>
        </div>

        {message.text && (
          <Alert
            variant={message.type}
            dismissible
            onClose={() => setMessage({ type: "", text: "" })}
          >
            {message.text}
          </Alert>
        )}

        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3 mb-0">Loading expenses...</p>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={4}>
              <ExpenseCard
                totalAmount={totalAmount}
                expenseCount={expenses.length}
                expenses={expenses}
              />
            </Col>
            <Col lg={8}>
              <ExpenseForm
                editingExpense={editingExpense}
                onSaveExpense={handleSaveExpense}
                onCancelEdit={() => setEditingExpense(null)}
                setMessage={setMessage}
              />
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
                onEditExpense={handleEditExpense}
              />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
