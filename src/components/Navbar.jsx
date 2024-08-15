import React, { useContext} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import { AuthContext } from "../context/auth.context.jsx";

function MyNavbar() {

  const navigate = useNavigate();

  const {isLoggedIn, authenticateUser} = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser()
    navigate("/login")
  }

  return (
    <>
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>Cierzo Finances</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedIn && <Nav.Link as={Link} to={"/cuentas"}>Cuentas</Nav.Link>}
            <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
            {isLoggedIn && <NavLink><button onClick={handleLogout}><span>Log Out</span></button></NavLink>}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  )
}

export default MyNavbar