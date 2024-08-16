import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../service/service.config";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      name,
      password
    }

    try {
      
      await service.post("/auth/signup", newUser)
      navigate("/login")

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
       <Form onSubmit={handleSignup}>
       <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="name" placeholder="Nombre"  onChange={handleNameChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={handleEmailChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recuerdame" />
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>

      {errorMessage && <p>{errorMessage}</p>}

    </Form>
    </>
  )
}

export default Signup