import React from "react";

import ExpenseList from "../expenses/ExpenseList";
import AddExpense from "../expenses/AddExpense";
import { useEffect, useState, useRef} from "react";
import {
  addExpenses,
  deleteExpense,
  editExpense,
  fetchExpenses,
} from "../../store/expense-slice";

import {
  Button,
  Card,
  FloatingLabel,
  Form,
  Collapse,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const [open, setOpen] = useState(false);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const addExpenseHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

    dispatch(addExpenses(expense));
  };

  const deleteExpenseHandler = async (id) => {
    console.log(id);
    dispatch(deleteExpense(id));
  };

  const editExpenseHandler = async (expense) => {
    dispatch(deleteExpense(expense.id));
    console.log(expense);
    setOpen(true);
    amountInputRef.current.value = expense.amount;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
  };

  return (
    <>
      <Container>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="expense-form"
          aria-expanded={open}
        >
          {!open ? "Add Expense" : "Cancel"}
        </Button>
        <Collapse in={open}>
          <Form id="expense-form" onSubmit={addExpenseHandler}>
            <FloatingLabel label="Amount" className="mb-3">
              <Form.Control type="text" ref={amountInputRef} />
            </FloatingLabel>
            <FloatingLabel label="Desciption" className="mb-3">
              <Form.Control type="text" ref={descriptionInputRef} />
            </FloatingLabel>
            <Form.Select ref={categoryInputRef}>
              <option>Select Category</option>
              <option>Food</option>
              <option>Health</option>
              <option>Fun</option>
              <option>Travel</option>
              <option>Clothing</option>
              <option>Cosmetics</option>
              <option>Education</option>
            </Form.Select>
            <Button type="submit">Add Expense</Button>
          </Form>
        </Collapse>
      </Container>
      <Card>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.category} ({expense.description}) {expense.amount}
              <Button onClick={() => editExpenseHandler(expense)}>
                Edit
              </Button>
              <Button onClick={() => deleteExpenseHandler(expense.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default Home;
