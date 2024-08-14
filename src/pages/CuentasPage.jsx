import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import service from '../service/service.config';
import CardCuenta from '../components/CardCuenta';

function CuentasPage() {

  const [cuentas, setCuentas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    try {

      const response = await service.get(`/cuentas`);

      setCuentas(response.data);
      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  if(cuentas === null){
    return(
      <h1>...esperando la data</h1>
    )
  }
  return (
    <>
      <h2>Cuentas</h2>
      <div>
        {cuentas.map((eachCuenta) => {
          console.log(eachCuenta)
          return <CardCuenta key={eachCuenta._id} eachCuenta={eachCuenta} />
        })}
      </div>
    </>
  )
}

export default CuentasPage