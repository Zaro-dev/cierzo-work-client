import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service/service.config';
import CardCuenta from '../components/CardCuenta';
import { Button, Form } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CuentasPage() {
  const [cuentas, setCuentas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCuenta, setNewCuenta] = useState({ name: '', cantidad: '' });
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
        name: newCuenta.name,
        cantidad: Number(newCuenta.cantidad)
      });
      getData();
      setNewCuenta({ name: '', cantidad: '' });
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const repartoBalanceCuentas = () => {
    const labels = cuentas.map(cuenta => cuenta.name);
    const data = cuentas.map(cuenta => cuenta.cantidad);

    return {
      labels,
      datasets: [
        {
          label: 'Distribución de Balance por Cuenta',
          data,
          backgroundColor: [
            '#8B0000',
            '#00008B',
            '#8B8B00',
            '#006400',
            '#4B0082',
            '#8B4513',
          ],
        },
      ],
    };
  };

  if (cuentas === null) {
    return <h1>...esperando la data</h1>;
  }

  return (
    <div>
      <h2>Cuentas del Usuario</h2>
      <Button onClick={toggleForm} variant="dark" style={{ display: 'flex' }}>
        {showForm ? 'Cerrar' : 'Añadir'}
      </Button>

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newCuenta.name}
              onChange={handleInputChange}
              placeholder="Introduce el nombre de la cuenta"
            />
          </Form.Group>

          <Form.Group controlId="formBalance" style={{ marginTop: '10px' }}>
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
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

      <hr />

      <h3>Gráfico reparto balance</h3>
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <Pie data={repartoBalanceCuentas()} />
      </div>
    <div/>
  );
}

export default CuentasPage;
