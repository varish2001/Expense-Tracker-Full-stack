import { Badge, Card, ProgressBar } from "react-bootstrap";
import { formatINR, INR_THRESHOLDS } from "../utils/currencyFormatter";

const categoryColors = {
  food: "success",
  transport: "info",
  shopping: "primary",
  health: "danger",
  utilities: "warning",
  entertainment: "dark",
  other: "secondary"
};

function ExpenseCard({ totalAmount, expenseCount, expenses }) {
  const averageAmount = expenseCount > 0 ? totalAmount / expenseCount : 0;
  const progress = Math.min((totalAmount / INR_THRESHOLDS.MODERATE) * 100, 100);

  const getExpenseStatus = () => {
    if (expenseCount === 0) return { text: "No expenses yet", variant: "secondary" };
    if (totalAmount < INR_THRESHOLDS.LOW) return { text: "Low spending", variant: "success" };
    if (totalAmount < INR_THRESHOLDS.MODERATE) return { text: "Moderate spending", variant: "warning" };
    return { text: "High spending", variant: "danger" };
  };

  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category || "other";
    totals[category] = (totals[category] || 0) + Number(expense.amount || 0);
    return totals;
  }, {});

  const status = getExpenseStatus();

  return (
    <Card className="app-card sticky-summary">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <span className="section-label">Overview</span>
            <h2 className="h5 fw-bold mb-1">Summary</h2>
            <p className="text-muted small mb-0">Your spending at a glance.</p>
          </div>
          <Badge bg={status.variant}>{status.text}</Badge>
        </div>

        <div className="summary-total mb-4">
          <span className="text-muted small">Total Spending</span>
          <div className="display-6 fw-bold text-primary">
            {formatINR(totalAmount)}
          </div>
        </div>

        <div className="summary-grid mb-4">
          <div>
            <span className="text-muted small">Transactions</span>
            <strong>{expenseCount}</strong>
          </div>
          <div>
            <span className="text-muted small">Average</span>
            <strong>{formatINR(averageAmount)}</strong>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between small mb-2">
            <span className="text-muted">Monthly guide</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar now={progress} variant={status.variant} />
        </div>

        <div className="mb-4">
          <h3 className="h6 fw-bold mb-3">Category Breakdown</h3>
          {Object.keys(categoryTotals).length === 0 ? (
            <p className="text-muted small mb-0">No categories to show yet.</p>
          ) : (
            Object.entries(categoryTotals).map(([category, amount]) => (
              <div className="category-row" key={category}>
                <Badge bg={categoryColors[category] || "secondary"}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
                <strong>{formatINR(amount)}</strong>
              </div>
            ))
          )}
        </div>

        <div className="recommendation-box">
          <strong>Quick note</strong>
          <p className="mb-0 small">
            Your summary updates automatically after every add, edit, or delete.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ExpenseCard;
