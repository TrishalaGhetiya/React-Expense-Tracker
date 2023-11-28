import React, { useContext, useRef, useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  Container,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import {
  userLogin,
  userSignUp,
} from "../../helper-functions/database-requesta";
import AuthContext from "../../store/auth-context";

const SignUp = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmailInput = emailInputRef.current.value;
    const enteredPasswordInput = passwordInputRef.current.value;

    if (isLogin) {
      userLogin(enteredEmailInput, enteredPasswordInput)
        .then((res) => {
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
          authCtx.login(data.idToken);
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      userSignUp(enteredEmailInput, enteredPasswordInput)
        .then((res) => {
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
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          setIsLogin(true);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Card className="my-auto" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title className="text-center">
              {isLogin ? "Login" : "SignUp"}
            </Card.Title>
            <Form onSubmit={formSubmitHandler}>
              <FloatingLabel label="Email" className="mb-3">
                <Form.Control type="email" ref={emailInputRef} />
              </FloatingLabel>
              <FloatingLabel label="Password" className="mb-3">
                <Form.Control type="password" ref={passwordInputRef} />
              </FloatingLabel>
              <div className="d-flex justify-content-center align-items-center">
                <Button className="float-end" type="submit" variant="warning">
                  {isLogin ? "Login" : "SignUp"}
                </Button>
              </div>
            </Form>
          </Card.Body>
          <CardFooter>
            <div className="d-flex justify-content-center align-items-center">
              <Button onClick={switchAuthModeHandler}>
                {isLogin
                  ? "Don't have an account? Signup"
                  : "Have an account? Login"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export default SignUp;
