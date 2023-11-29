import React from "react";
import { Button, Card } from "react-bootstrap";

const ExpenseList = (props) => {

  return (
    <Card>
      <ul>
        {props.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} ({expense.description}) {expense.amount}
            <Button onClick={() => {props.onEdit(expense)}}>Edit</Button>
            <Button onClick={() => {props.onDelete(expense.id)}}>Delete</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExpenseList;
