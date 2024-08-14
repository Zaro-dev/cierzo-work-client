import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../service/service.config';


function CuentaDetails() {

    const params = useParams();
    const navigate = useNavigate();

    const [cuenta, setCuenta] = useState(null);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        
        try {
            
            const response = await service.get(
                `${import.meta.env.VITE_SERVER}/cuentas/${params.cuentaId}`
            );

            setCuenta(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error)
        }
    };

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