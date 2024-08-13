import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";

function Login() {


  const { authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password
    }

    // ... contactar al backend para validar credenciales de usuario aqui

    try {
      

      const response = await service.post("/auth/login", userCredentials)
      console.log(response)


      localStorage.setItem("authToken", response.data.authToken)

      authenticateUser()

      navigate("/")

    } catch (error) {

      if(error.response.status === 400){
        setErrorMessage(error.response.data.errorMessage)
      } else {
        console.log(error)
        navigate("/error")
      }
    }
  };


  return (
    <>
    
    <Form  onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>

      {errorMessage && <p>{errorMessage}</p>}

    </Form>

    </>
  )
}

export default Login