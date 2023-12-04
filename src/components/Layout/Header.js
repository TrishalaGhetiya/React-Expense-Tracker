import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import Notifications from "./Notifications";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Header = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  const history = useHistory();

  const [IsNotificationShown, setIsNotificationShown] = useState(false);

  const showNotificationHandler = () => {
    setIsNotificationShown(true);
  };

  const hideNotificationHandler = () => {
    setIsNotificationShown(false);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace('/');
  };

  return (
    <header style={{ width: "100%" }}>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/home">Expense Tracker</Navbar.Brand>
          <Button onClick={showNotificationHandler} className="rounded-circle">
            N
          </Button>
          {isLoggedIn && (
            <Button onClick={logoutHandler}>Logout</Button>
          )}
        </Container>
      </Navbar>

      {IsNotificationShown && (
        <Notifications
          show={IsNotificationShown}
          onHide={hideNotificationHandler}
        />
      )}
    </header>
  );
};

export default Header;
