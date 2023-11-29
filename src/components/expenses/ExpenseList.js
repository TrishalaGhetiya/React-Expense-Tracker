import React from "react";
import { Card } from "react-bootstrap";

const ExpenseList = (props) => {
  return (
    <Card>
      <ul>
        {props.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} ({expense.description}) {expense.amount}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExpenseList;
