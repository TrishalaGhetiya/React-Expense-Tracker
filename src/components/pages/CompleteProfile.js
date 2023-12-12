import React from "react";
import { useRef } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import {
  emailVerification,
  getUserData,
  userUpdateProfile,
} from "../../helper-functions/database-requests";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/auth-slice";

const CompleteProfile = () => {
  const history = useHistory();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const dispatch = useDispatch();

  const nameInputRef = useRef();
  const photoInputref = useRef();
  const emailInputRef = useRef();

  useEffect(() => {
    getUserData()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "No Data Found";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.users);
        if (data.users[0].emailVerified === true) {
          setIsEmailVerified(true);
        }
        if(data.users[0].displayName && data.users[0].photoUrl){
          nameInputRef.current.value = data.users[0].displayName;
          photoInputref.current.value = data.users[0].photoUrl;
        }
        emailInputRef.current.value = data.users[0].email;
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const verifyEmailHandler = (e) => {
    e.preventDefault();

    emailVerification()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "email verification failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.email);
        setIsEmailVerified(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoURL = photoInputref.current.value;

    userUpdateProfile(enteredName, enteredPhotoURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "profile updation failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(authActions.updateProfile(data.displayName));
        history.replace("/home");
        nameInputRef.current.value = "";
        photoInputref.current.value = "";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const backToExpensePageHandler = () => {
    history.replace("/home");
  };

  return (
    <>
      <Container className="mt-5">
        <Card className="my-auto">
          <Card.Body>
            <Card.Title className="text-center">Update Profile</Card.Title>
            <Button
              style={{ marginBottom: 7 }}
              onClick={backToExpensePageHandler}
              variant="outline-danger"
            >
              Cancel
            </Button>
            {isEmailVerified ? (
              <Badge variant="success">Email Verified</Badge>
            ) : (
              <Badge variant="danger">Not Verified</Badge>
            )}
            <Button
              style={{
                backgroundColor: "#445069",
                border: 0,
                position: "absolute",
                right: 20,
                marginBottom: 7,
              }}
              onClick={verifyEmailHandler}
            >
              Verify Your Email
            </Button>
            <Form onSubmit={formSubmitHandler}>
              <FloatingLabel label="Email" className="mb-3">
                <Form.Control type="email" ref={emailInputRef} disabled />
              </FloatingLabel>
              <FloatingLabel label="Full Name" className="mb-3">
                <Form.Control type="text" ref={nameInputRef} />
              </FloatingLabel>
              <FloatingLabel label="Profile Photo URL" className="mb-3">
                <Form.Control type="text" ref={photoInputref} />
              </FloatingLabel>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  style={{ width: "100vw" }}
                  className="float-end"
                  type="submit"
                  variant="dark"
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CompleteProfile;
