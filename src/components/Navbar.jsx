import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import { AuthContext } from "../context/auth.context.jsx"; // Asegúrate de que AuthContext esté importado correctamente

function MyNavbar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/login");
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" variant="dark">

          <Navbar.Brand as={Link} to={"/"}>Cierzo Finances</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && <Nav.Link as={Link} to={"/cuentas"}>Cuentas</Nav.Link>}
              <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
              <NavDropdown title="Accesos" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={"/signup"}>Signup</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/login"}>Login</NavDropdown.Item>
                
                {isLoggedIn&&
                <>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item>
                </>
                }
                
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

      </Navbar>
    </>
  );
}

export default MyNavbar;