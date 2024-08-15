import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../service/service.config';
import { Button } from 'react-bootstrap';


function CuentaDetails() {

    const params = useParams();
    const navigate = useNavigate();

    const [cuenta, setCuenta] = useState(null);
    const [gastos, setGastos] = useState(null);
    const [ingresos, setIngresos] = useState(null);


    useEffect(() => {
        getCuentas();
        getIngresos();
        getGastos();
    }, []);

    const getCuentas = async () => {
        
        try {
            
            const response = await service.get(
                `/cuentas/${params.cuentaId}`
            );

            setCuenta(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error)
        }
    };

    const getGastos = async () => {
       
        try {

            const response = await service.get(`/gastos/cuentas/${params.cuentaId}`);
            setGastos(response.data);
            console.log("gastos")
        } catch (error) {
            console.log(error)
        }
    }

    const getIngresos = async () => {
       
        try {

            const response = await service.get(`/ingresos/cuentas/${params.cuentaId}`);
            setIngresos(response.data);
            console.log("ingresos")
        } catch (error) {
            console.log(error)
        }
    }

     
    const handleDeleteButton = async () => {
        const isConfirmed = window.confirm(
        "¿Quieres borrar la cuenta? Perderás todo el registro"
        );
        if (isConfirmed) {
        try {
            await service.delete(
            `/cuentas/${params.cuentaId}`
            );
            navigate("/cuentas");
            alert("Tu cuenta ha sido eliminada de manera exitosa");
        } catch (error) {
            navigate("/error");
        }
        } else {
        alert("¿Lo has pensado mejor?");
        }
    };

    if(cuenta === null){
        return <h1>...esperando la data</h1>
    }

  return (
    <div>
        <h1>{cuenta.name}</h1>
        <h3>{cuenta.cantidad}</h3>
        <Button onClick={handleDeleteButton} variant="primary">Eliminar Cuenta</Button>
    </div>
  )
}

export default CuentaDetails