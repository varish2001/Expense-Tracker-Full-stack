import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { formatINR } from "../utils/currencyFormatter";

const categoryColors = {
  food: "success",
  transport: "info",
  shopping: "primary",
  health: "danger",
  utilities: "warning",
  entertainment: "dark",
  other: "secondary"
};

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (expenses.length === 0) {
    return (
      <Card className="app-card">
        <Card.Body className="empty-state text-center p-5">
          <div className="empty-state-icon mb-3">+</div>
          <h2 className="h5 fw-bold">No expenses yet</h2>
          <p className="text-muted mb-0">
            Add your first expense above. The list will stay empty until you save real data.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="app-card">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="section-label">Transactions</span>
            <h2 className="h5 fw-bold mb-1">Expense History</h2>
            <p className="text-muted small mb-0">
              Newest expenses are shown first.
            </p>
          </div>
          <Badge bg="light" text="dark" className="summary-pill">
            {expenses.length} records
          </Badge>
        </div>

        <div className="expense-list">
          {expenses.map((expense) => (
            <div className="expense-row" key={expense._id}>
              <Row className="align-items-center g-3">
                <Col md={5}>
                  <div className="fw-semibold">{expense.title}</div>
                  <div className="text-muted small">{formatDate(expense.date)}</div>
                </Col>

                <Col sm={6} md={3}>
                  <Badge bg={categoryColors[expense.category] || "secondary"}>
                    {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                  </Badge>
                </Col>

                <Col sm={6} md={2} className="text-md-end">
                  <div className="fw-bold text-primary">
                    {formatINR(expense.amount)}
                  </div>
                </Col>

                <Col md={2}>
                  <div className="d-flex gap-2 justify-content-md-end">
                    <Button
                      className="row-action"
                      variant="light"
                      size="sm"
                      onClick={() => onEditExpense(expense)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="row-action danger"
                      variant="light"
                      size="sm"
                      onClick={() => onDeleteExpense(expense._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ExpenseList;
