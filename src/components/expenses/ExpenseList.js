import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const ExpenseList = (props) => {
  const expenses = useSelector(state => state.expense.expenses);
  return (
    <Card>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} ({expense.description}) {expense.amount}
            <Button onClick={() => {props.onEdit(expense.id)}}>Edit</Button>
            <Button onClick={() => {props.onDelete(expense.id)}}>Delete</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExpenseList;
