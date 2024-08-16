import React from 'react'
import { Button } from 'react-bootstrap'

function WelcomePage() {
  return (
    <div className='container-welcome'>
      <h1 className='elemento-welcome'>Bienvenidx a Cierzo Finances</h1>
      <h3 className='elemento-welcome'>Donde tu dinero no se lo lleva el viento</h3>
      <p className='elemento-welcome'>Cierzo Finances es un gestor de gastos sencillo y eficiente donde puedes gestionar todo tu dinero de manera simple e intuitiva.</p>
      <div>
        <Button>Login</Button>
        <Button>Signup</Button>
      </div>
    </div>
  )
}

export default WelcomePage