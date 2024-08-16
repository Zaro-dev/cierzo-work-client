import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardCuenta(props) {

    const {name, cantidad, _id } = props.eachCuenta;
  return (
    <div >
        <Card style={{ width: '10vw' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Balance:</Card.Subtitle>
        <Card.Text>{cantidad}</Card.Text>
        <Link to={`/cuentas/${_id}`}><Button variant="dark">Info</Button></Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default CardCuenta