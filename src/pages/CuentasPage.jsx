import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service/service.config';
import CardCuenta from '../components/CardCuenta';
import { Button, Form } from 'react-bootstrap';

function CuentasPage() {
  const [cuentas, setCuentas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCuenta, setNewCuenta] = useState({ name: '', cantidad: '' }); // Cambiado a los nombres correctos
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/cuentas`);
      setCuentas(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCuenta({ ...newCuenta, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.post('/cuentas', {
        name: newCuenta.name,      // Enviamos el campo `name`
        cantidad: Number(newCuenta.cantidad)  // Convertimos `cantidad` a número
      });
      getData(); // Refrescamos la lista de cuentas
      setNewCuenta({ name: '', cantidad: '' }); // Limpiamos el formulario
      setShowForm(false); // Ocultamos el formulario
    } catch (error) {
      console.log(error);
    }
  };

  if (cuentas === null) {
    return <h1>...esperando la data</h1>;
  }

  return (
    <>
      <h2>Cuentas</h2>
      <Button onClick={toggleForm} variant="primary" style={{ display: 'flex' }}>
        {showForm ? 'Cerrar' : 'Añadir'}
      </Button>

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name" // Usamos `name` en lugar de `nombre`
              value={newCuenta.name}
              onChange={handleInputChange}
              placeholder="Introduce el nombre de la cuenta"
            />
          </Form.Group>

          <Form.Group controlId="formBalance" style={{ marginTop: '10px' }}>
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              name="cantidad" // Usamos `cantidad` en lugar de `balance`
              value={newCuenta.cantidad}
              onChange={handleInputChange}
              placeholder="Introduce el balance"
            />
          </Form.Group>

          <Button variant="success" type="submit" style={{ marginTop: '20px' }}>
            Guardar
          </Button>
        </Form>
      )}

      <div>
        {cuentas.map((eachCuenta) => (
          <div key={eachCuenta._id}>
            <CardCuenta eachCuenta={eachCuenta} />
          </div>
        ))}
      </div>
    </>
  );
}

export default CuentasPage;