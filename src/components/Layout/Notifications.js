import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const Notifications = (props) => {
  return (
    <Offcanvas onHide={props.onClose} placement="end" {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          Your Profile is Incomplete <a href="/completeProfile">Complete now</a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Notifications;
