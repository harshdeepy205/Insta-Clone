import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">🅸🅽🆂🆃🅰🅶🆁🅰🅼</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="row-reverse" />
                <Navbar.Collapse id="basic-navbar-nav" className="row-reverse">

                    <div className="nav__buttons">
                        <Link to="/signin" ><Button size="lg" variant="outline-primary" style={{ color: "black", fontSize: "1rem" }}>LogIn</Button></Link>
                        <Link to="/signup" ><Button variant="outline-primary " className="mx-2" style={{ color: "black" }}>SignUp</Button></Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

// export default Navbar