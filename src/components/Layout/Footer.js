import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = props => {
    return (
        <footer style={{width: "100%"}}>
            <Navbar bg="light" data-bs-theme="light"> 
                <Container className="text-center">
                    <h4>Expense Tracker App</h4>
                </Container>
            </Navbar>
        </footer>
    )
}

export default Footer;