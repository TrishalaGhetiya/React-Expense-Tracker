import React, { useState } from "react";
import { Navbar, Container, Button, Form, Dropdown } from "react-bootstrap";
import Notifications from "./Notifications";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/auth-slice";
import { useRef } from "react";
import { CSVDownload } from "react-csv";

const Header = () => {
  const dispatch = useDispatch();

  const [premium, setPremium] = useState(false);

  const expenses = useSelector((state) => state.expense.expenses);
  const totalExpenses = useSelector((state) => state.expense.totalExpenses);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
    history.replace("/");
  };

  const activatePremiumHandler = () => {
    setPremium(true);
  };

  const downloadHandler = (e) => {
    e.preventDefault();

    <CSVDownload data={expenses} target="_blank">
      Download File
    </CSVDownload>;
  };

  return (
    <header style={{ width: "100%" }}>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/home">Expense Tracker</Navbar.Brand>
          <Button onClick={showNotificationHandler} className="rounded-circle">
            N
          </Button>
          {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
          {totalExpenses >= 10000 && !premium && (
            <Button onClick={activatePremiumHandler}>Activate Premium</Button>
          )}
          {premium && (
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">Premium</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Dark Theme</Dropdown.Item>
                <Dropdown.Item>
                  Download File{" "}
                  <CSVDownload data={expenses} target="_blank">
                    Download File
                  </CSVDownload>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
