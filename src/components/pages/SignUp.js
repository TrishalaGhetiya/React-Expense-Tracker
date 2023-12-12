import React, { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardFooter,
  Container,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import {
  passwordReset,
  userLogin,
  userSignUp,
} from "../../helper-functions/database-requests";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/auth-slice";

const SignUp = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
          console.log(data);
          dispatch(
            authActions.login({
              token: data.idToken,
              userName: data.displayName,
            })
          );
          history.replace("/home");
          toast.success("successfully logged In", {
            position: toast.POSITION.TOP_RIGHT,
          });
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
              console.log(data.error.message);
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

  const passwordResetHandler = (e) => {
    e.preventDefault();

    const enteredEmailInput = emailInputRef.current.value;
    if (enteredEmailInput.length === 0) {
      alert("Please enter valid email to get password reset link");
    } else {
      passwordReset(enteredEmailInput)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "password reset failed";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
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
                <Button
                  style={{ width: "100vw" }}
                  className="float-end"
                  type="submit"
                  variant="dark"
                >
                  {isLogin ? "Login" : "SignUp"}
                </Button>
              </div>
            </Form>
          </Card.Body>
          <CardFooter>
            <div className="d-flex justify-content-center align-items-center">
              <a href="#forgotPassword" onClick={passwordResetHandler}>
                Forgot Password?
              </a>
            </div>
            <div className="p-2 d-flex justify-content-center align-items-center">
              <Button variant="dark" onClick={switchAuthModeHandler}>
                {isLogin
                  ? "Don't have an account? Signup"
                  : "Have an account? Login"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
      <ToastContainer />
    </>
  );
};

export default SignUp;
