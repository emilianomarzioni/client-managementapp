import React , {useState,useEffect} from 'react';

import ListaMovimientos from '../movimientos/ListaMovimientos';
import FormularioAhorro from '../Formularios/FormularioAhorro';
import Balance from '../Resumenes/Balance';
import axios from 'axios';

const Ahorro = () => {

    const [cotizaciones,setCotizaciones] = useState({});
    const api = '3d6b1892ec063caa0743a85be8b45b62';
    const url = `http://data.fixer.io/api/latest?access_key=${api}&base=EUR&symbols=USD,DKK`;



    const consultarAPI = async () => {
        const resultado = await axios(url);
        setCotizaciones(resultado.data.rates)
        console.log(resultado.data.rates);
    }
    useEffect(
        () => {
           consultarAPI();
           // eslint-disable-next-line
        } ,[]
       )

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <h2 className="p-3">
                        Ahorros
                    </h2>
                </div>
                <div className="row">
                    <div className="col-4">
                        <Balance cotizaciones = {cotizaciones} />
                  </div>
                    <div className="col-8">
                        <FormularioAhorro />
          </div>
                </div>
            </div>
        <ListaMovimientos 
        />

        </React.Fragment>
    );
};

export default Ahorro;