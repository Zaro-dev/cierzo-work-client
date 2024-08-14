import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../service/service.config';


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

    if(cuenta === null){
        return <h1>...esperando la data</h1>
    }

  return (
    <div>
        <h1>{cuenta.name}</h1>
        <h3>{cuenta.cantidad}</h3>
    </div>
  )
}

export default CuentaDetails