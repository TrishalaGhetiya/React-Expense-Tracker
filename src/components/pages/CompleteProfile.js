import React from "react";
import { useRef } from "react";
import { Badge, Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import {
  emailVerification,
  getUserData,
  userUpdateProfile,
} from "../../helper-functions/database-requests";
import { useEffect } from "react";
import { useState } from "react";


const CompleteProfile = (props) => {
const [isEmailVerified, setIsEmailVerified] = useState(false);

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
        if(data.users[0].emailVerified === true){
          setIsEmailVerified(true);
        }
        nameInputRef.current.value = data.users[0].displayName;
        photoInputref.current.value = data.users[0].photoUrl;
        emailInputRef.current.value = data.users[0].email;
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const verifyEmailHandler = e => {
    e.preventDefault();

    emailVerification().then((res) => {
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
  }

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
        nameInputRef.current.value = "";
        photoInputref.current.value = "";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Container className="p-3" fluid>
        <h4>Update Profile</h4>
        <Button variant="outline-danger">X</Button>
        {isEmailVerified ? <Badge variant="success">Email Verified</Badge> : <Badge variant="danger">Not Verified</Badge>}
        <Button onClick={verifyEmailHandler}>Verify Your Email</Button>
      </Container>
      <Card className="my-auto" style={{ width: "18rem" }}>
        <Card.Body>
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
    </>
  );
};

export default CompleteProfile;
