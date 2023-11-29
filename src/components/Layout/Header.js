import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import Notifications from "./Notifications";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [IsNotificationShown, setIsNotificationShown] = useState(false);

  const showNotificationHandler = () => {
    setIsNotificationShown(true);
  };

  const hideNotificationHandler = () => {
    setIsNotificationShown(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
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
          {authCtx.isLoggedIn && (
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
