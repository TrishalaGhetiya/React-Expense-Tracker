import React, { useRef } from "react";
import {
  Button,
  Card,
  CardFooter,
  Container,
  FloatingLabel,
  Form,
} from "react-bootstrap";

const SignUp = (props) => {

const emailInputRef = useRef();
const passwordInputRef = useRef();
const confirmPasswordInputRef = useRef();

const formSubmitHandler = e => {
    e.preventDefault();

    const enteredEmailInput = emailInputRef.current.value;
    const enteredPasswordInput = passwordInputRef.current.value;
    const enteredConfirmPasswordInput = confirmPasswordInputRef.current.value;

    if(enteredPasswordInput !== enteredConfirmPasswordInput){
        alert('Please enter same password in both inputs');
    }

    fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmailInput,
            password: enteredPasswordInput,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        confirmPasswordInputRef.current.value = '';
      })
      .catch((err) => {
        alert(err.message);
      });
}

  return (
    <>
      <Container className="mt-5">
        <Card className="my-auto" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title className="text-center">SignUp</Card.Title>
            <Form onSubmit={formSubmitHandler}>
              <FloatingLabel label="Email" className="mb-3">
                <Form.Control type="email" ref={emailInputRef} />
              </FloatingLabel>
              <FloatingLabel label="Password" className="mb-3">
                <Form.Control type="password" ref={passwordInputRef} />
              </FloatingLabel>
              <FloatingLabel label="Confirm Password" className="mb-3">
                <Form.Control type="password" ref={confirmPasswordInputRef} />
              </FloatingLabel>
              <div className="d-flex justify-content-center align-items-center">
                <Button className="float-end" type="submit" variant="warning">
                  SignUp
                </Button>
              </div>
            </Form>
          </Card.Body>
          <CardFooter>
            <div className="d-flex justify-content-center align-items-center">
              <Button>Have an account? Login</Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export default SignUp;
