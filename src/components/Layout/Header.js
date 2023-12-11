import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/auth-slice";

const Header = () => {
  const dispatch = useDispatch();

  const isToken = localStorage.getItem("token");

  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };

  return (
    <header style={{ width: "100%" }}>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/home" style={{ fontWeight: "bold" }}>
            Expense Tracker
          </Navbar.Brand>
          {isToken && (
            <Button
              style={{
                backgroundColor: "#445069",
                border: 0,
                outline: 0,
              }}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
          {isToken && (
            <div
              className="p-2"
              style={{ backgroundColor: "#ADC4CE", borderRadius: "5px" }}
            >
              Your Profile is Incomplete{" "}
              <a href="/completeProfile">Complete now</a>
            </div>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
