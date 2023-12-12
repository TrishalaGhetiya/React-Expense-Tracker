import React from "react";

import { useEffect, useState, useRef } from "react";

import { CSVLink } from "react-csv";

import {
  Button,
  Card,
  FloatingLabel,
  Form,
  Collapse,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, sendExpenses } from "../../store/actions/expense-actions";
import { addExpenses, deleteExpense } from "../../store/slices/expense-slice";
import { authActions } from "../../store/slices/auth-slice";

const Home = () => {
  const expenses = useSelector((state) => state.expense.items);
  const totalExpenses = useSelector((state) => state.expense.totalExpenses);
  const finalExpense = useSelector((state) => state.expense);
  const isChanged = useSelector((state) => state.expense.changed);
  const userName = localStorage.getItem("userName");
  const isPremium = localStorage.getItem("premium");
  const [open, setOpen] = useState(false);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (isChanged) {
      dispatch(sendExpenses(finalExpense, userName));
    }
  }, [dispatch, isChanged, finalExpense, userName]);

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expense = {
      id: Math.random().toString(),
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

    dispatch(addExpenses(expense));
    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  const deleteExpenseHandler = async (expense) => {
    dispatch(deleteExpense(expense));
  };

  const editExpenseHandler = async (expense) => {
    amountInputRef.current.value = expense.amount;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
    dispatch(deleteExpense(expense));
    setOpen(true);
  };

  const activatePremiumHandler = () => {
    dispatch(authActions.setPremium());
  };

  return (
    <>
      <Container style={{ textAlign: "center", marginTop: 20 }}>
        <h4>Welcome To Expense Tracker!</h4>
      </Container>

      <Container style={{ position: "relative" }} className="p-4">
        {userName && (
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="expense-form"
            aria-expanded={open}
            style={{
              backgroundColor: "#445069",
              border: 0,
              outline: 0,
              marginBottom: 7,
            }}
          >
            {!open ? "Add Expense" : "Cancel"}
          </Button>
        )}
        {totalExpenses >= 10000 && !isPremium && (
          <Button
            style={{
              backgroundColor: "#445069",
              border: 0,
              position: "absolute",
              right: 20,
            }}
            onClick={activatePremiumHandler}
          >
            Activate Premium
          </Button>
        )}

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
            <Button
              style={{
                backgroundColor: "#445069",
                border: 0,
                position: "absolute",
                left: 300,
                width: "20vw",
              }}
              type="submit"
            >
              Add Expense
            </Button>
          </Form>
        </Collapse>
      </Container>

      {expenses && (
        <Container style={{ paddingTop: "30px" }}>
          <Card
            style={{ position: "relative", opacity: 0.9, border: 0 }}
            className="p-2"
          >
            <ul style={{ listStyle: "none" }}>
              {expenses.map((expense) => (
                <Card
                  style={{ position: "relative", border: 0, opacity: 0.8 }}
                  className="p-2"
                >
                  <li key={expense.id}>
                    <div>
                      <div
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          float: "left",
                          paddingRight: 20,
                        }}
                      >
                        {expense.description}
                      </div>
                      <div style={{ float: "left" }}>{expense.category}</div>
                      <div
                        style={{
                          position: "absolute",
                          right: 170,
                          fontWeight: "bold",
                        }}
                      >
                        {expense.amount}
                      </div>
                    </div>

                    <Button
                      style={{
                        backgroundColor: "#ADC4CE",
                        border: 0,
                        position: "absolute",
                        right: 100,
                      }}
                      onClick={() => editExpenseHandler(expense)}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#ADC4CE",
                        border: 0,
                        position: "absolute",
                        right: 25,
                      }}
                      onClick={() => deleteExpenseHandler(expense)}
                    >
                      Delete
                    </Button>
                  </li>
                </Card>
              ))}
            </ul>
          </Card>
        </Container>
      )}

      {userName && (
        <Container>
          <div
            style={{
              position: "relative",
              textAlign: "right",
              fontWeight: "bold",
            }}
            className="p-4"
          >
            Total Expense: {totalExpenses}
          </div>
        </Container>
      )}

      {totalExpenses >= 10000 && isPremium && (
        <Container>
          <div>
            <CSVLink data={expenses}>Download Expenses</CSVLink>
          </div>
        </Container>
      )}
      {totalExpenses >= 10000 && isPremium && (
        <Container>
          <Button
            style={{
              backgroundColor: "#445069",
              border: 0,
              position: "absolute",
              right: 20,
            }}
          >
            Dark Theme
          </Button>
        </Container>
      )}
    </>
  );
};

export default Home;
