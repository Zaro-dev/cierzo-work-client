import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className='container-welcome'>
      <h1 className='elemento-welcome'>Bienvenidx a Cierzo Finances</h1>
      <h3 className='elemento-welcome'>Donde tu dinero no se lo lleva el viento</h3>
      <p className='elemento-welcome'>Cierzo Finances es un gestor de gastos sencillo y eficiente donde puedes gestionar todo tu dinero de manera simple e intuitiva.</p>
      <div>
        <Link to="/login">
          <Button variant='dark' className='btn-inicio'>Login</Button>
        </Link>
        <Link to="/signup" style={{ marginLeft: '10px' }}>
          <Button variant='dark' className='btn-inicio'>Signup</Button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;