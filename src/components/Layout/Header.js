import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import Notifications from "./Notifications";

const Header = (props) => {
const [IsNotificationShown, setIsNotificationShown] = useState(false);

const showNotificationHandler = () => {
  setIsNotificationShown(true);
}

const hideNotificationHandler = () => {
  setIsNotificationShown(false);
}

  return (
    <header style={{width: "100%"}}>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/home">Expense Tracker</Navbar.Brand>
          <Button onClick={showNotificationHandler} className="rounded-circle">N</Button>
        </Container>
      </Navbar>
      {IsNotificationShown && <Notifications show={IsNotificationShown} onHide={hideNotificationHandler} />}
    </header>
  );
};

export default Header;
