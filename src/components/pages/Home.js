import React from "react";

import { useEffect, useState, useRef} from "react";

import {
  Button,
  Card,
  FloatingLabel,
  Form,
  Collapse,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenseAction } from "../../store/actions/fetch-action";
import { addExpenseAction } from "../../store/actions/add-action";
import { deleteExpenseAction } from "../../store/actions/delete-action";

const Home = () => {
  const totalExpense = useSelector(state => state.expense.totalExpenses);
  const expenses = useSelector((state) => state.expense.expenses);
 
  //console.log(expenses);

  const [open, setOpen] = useState(false);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenseAction());
    
  }, [dispatch]);

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    console.log(expense);

    dispatch(addExpenseAction(expense));
    //window.location.reload();
  };

  const deleteExpenseHandler = async (id) => {
    console.log(id);
    dispatch(deleteExpenseAction(id));
    window.location.reload();
  };

  const editExpenseHandler = async (expense) => {

    dispatch(deleteExpenseAction(expense.id));
    console.log(expense);
    setOpen(true);
    amountInputRef.current.value = expense.amount;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
   // window.location.reload();
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
      <div>
        Total Expense: {totalExpense}
      </div>
    </>
  );
};

export default Home;
