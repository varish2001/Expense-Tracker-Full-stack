import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

const initialFormState = {
  title: "",
  amount: "",
  category: "other",
  date: ""
};

const categories = [
  "food",
  "transport",
  "shopping",
  "health",
  "utilities",
  "entertainment",
  "other"
];

function ExpenseForm({
  editingExpense,
  onSaveExpense,
  onCancelEdit,
  setMessage
}) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title || "",
        amount: editingExpense.amount || "",
        category: editingExpense.category || "other",
        date: editingExpense.date ? editingExpense.date.slice(0, 10) : ""
      });
      return;
    }

    setFormData(initialFormState);
  }, [editingExpense]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.amount || !formData.date) {
      setMessage({ type: "warning", text: "Please fill all required fields." });
      return;
    }

    if (Number(formData.amount) <= 0) {
      setMessage({ type: "warning", text: "Amount must be greater than 0." });
      return;
    }

    const expenseData = {
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date
    };

    try {
      setIsSubmitting(true);
      await onSaveExpense(expenseData);
      setFormData(initialFormState);
    } catch (error) {
      setMessage({
        type: "danger",
        text:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to save expense. Please make sure the backend is running."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="app-card mb-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <span className="section-label">Expense details</span>
            <h2 className="h5 fw-bold mb-1">
              {editingExpense ? "Update Expense" : "Add Expense"}
            </h2>
            <p className="text-muted small mb-0">
              Enter the details you want to store
            </p>
          </div>
          {editingExpense && (
            <Button variant="outline-secondary" size="sm" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="app-input"
                  name="title"
                  type="text"
                  placeholder="Grocery shopping"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  className="app-input"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="1200"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  className="app-input"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  className="app-input"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid d-sm-flex justify-content-sm-end mt-4">
            <Button className="primary-action" type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              {editingExpense ? "Save Changes" : "Add Expense"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ExpenseForm;
