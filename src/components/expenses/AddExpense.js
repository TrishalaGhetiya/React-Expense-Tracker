import React, { useRef, useState } from "react";
import {useHistory} from 'react-router-dom';
import {
  Button,
  Collapse,
  Container,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { addExpense } from "../../helper-functions/database-requests";

const AddExpense = (props) => {
    const history = useHistory();
  const [open, setOpen] = useState(false);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

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

      props.onAddExpense(expense);
      
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
            </Form.Select>
            <Button type="submit">Add Expense</Button>
          </Form>
        </Collapse>
      </Container>
    </>
  );
};

export default AddExpense;
