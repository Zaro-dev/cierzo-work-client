import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../service/service.config';
import { Button, Form } from 'react-bootstrap';

function CuentaDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [cuenta, setCuenta] = useState(null);
  const [movimientos, setMovimientos] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCuenta, setEditedCuenta] = useState({
    name: '',
    cantidad: 0,
  });

  useEffect(() => {
    getCuentas();
    getMovimientos();
  }, []);

  const getCuentas = async () => {
    try {
      const response = await service.get(`/cuentas/${params.cuentaId}`);
      setCuenta(response.data);
      setEditedCuenta({
        name: response.data.name,
        cantidad: response.data.cantidad,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMovimientos = async () => {
    try {
      const response = await service.get(`/movimientos/cuentas/${params.cuentaId}`);
      setMovimientos(response.data);
      console.log('movimientos');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButton = async () => {
    const isConfirmed = window.confirm(
      '¿Quieres borrar la cuenta? Perderás todo el registro'
    );
    if (isConfirmed) {
      try {
        await service.delete(`/cuentas/${params.cuentaId}`);
        navigate('/cuentas');
        alert('Tu cuenta ha sido eliminada de manera exitosa');
      } catch (error) {
        navigate('/error');
      }
    } else {
      alert('¿Lo has pensado mejor?');
    }
  };

  const handleEditButton = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/cuentas/${params.cuentaId}`, editedCuenta);
      setIsEditing(false);
      getCuentas();
    } catch (error) {
      navigate('/error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCuenta({
      ...editedCuenta,
      [name]: value,
    });
  };

  if (cuenta === null) {
    return <h1>...esperando la data</h1>;
  }

  return (
    <div>
    <h1>Detalles de cuenta</h1>
      <h3>{cuenta.name}</h3>
      <h5><span>Balance: </span>{cuenta.cantidad}</h5>

      <h3>Movimientos recientes</h3>
      {movimientos.map((eachMovimiento) => {
        <p>{`${eachMovimiento.tipo} Cuantía: ${eachMovimiento.cantidad} Categoría: ${eachMovimiento.categoria}`}</p>
      })}

      {isEditing ? (
        <Form onSubmit={handleEditButton} style={{ marginTop: '20px' }}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedCuenta.name}
              onChange={handleInputChange}
              placeholder="Introduce el nombre de la cuenta"
            />
          </Form.Group>

          <Form.Group controlId="formCantidad" style={{ marginTop: '10px' }}>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              value={editedCuenta.cantidad}
              onChange={handleInputChange}
              placeholder="Introduce la cantidad"
            />
          </Form.Group>

          <Button variant="success" type="submit" style={{ marginTop: '20px' }}>
            Guardar cambios
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsEditing(false)}
            style={{ marginTop: '20px', marginLeft: '10px' }}
          >
            Cancelar
          </Button>
        </Form>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          variant="primary"
          style={{ marginTop: '20px' }}
        >
          Editar Cuenta
        </Button>
      )}

      <Button onClick={handleDeleteButton} variant="danger" style={{ marginTop: '20px', marginLeft: '10px' }}>
        Eliminar Cuenta
      </Button>
    </div>
  );
}

export default CuentaDetails;