import React from "react";
import "./styles.css";
import { Button, Card, Row } from "antd";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  currentBalance,
  onResetBalance,
}) => {
  return (
    <div>
      <Row className="card-row container">
        {/* Current Balance Card */}
        <Card className="mycard current-balance">
          <h2 className="title">Current Balance</h2>
          <p className="current-balance-text">₱ {currentBalance}</p> {/* Ensure proper styling for balance */}
        </Card>

        {/* Total Income Card */}
        <Card className="mycard">
          <h2 className="title">Total Income</h2>
          <p className="amount-text">₱ {income}</p>
          <Button className="btn reset-balance-btn" onClick={showIncomeModal}>
            Add Income
          </Button>
        </Card>

        {/* Total Expenses Card */}
        <Card className="mycard">
          <h2 className="title">Total Expenses</h2>
          <p className="amount-text">₱ {expense}</p>
          <Button className="btn reset-balance-btn" onClick={showExpenseModal}>
            Add Expense
          </Button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
