import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = props => {
    return (
        <footer style={{width: "100%"}}>
            <Navbar bg="light" data-bs-theme="light"> 
                <Container className="align-content-center">
                <h5 href="/home" style={{fontWeight: 'bold'}}>Expense Tracker | Copyright 2023 | All Rights Reserved</h5>
                </Container>
            </Navbar>
        </footer>
    )
}

export default Footer;