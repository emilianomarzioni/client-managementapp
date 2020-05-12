import React , { useEffect,useState} from 'react';
import ListaMovimientos from './movimientos/ListaMovimientos';
import clienteAxios from '../config/axios';
import tokenAuth from '../config/token';
import axios from 'axios';
import Balance from './Resumenes/Balance';
import Grafico from './Resumenes/Grafico';
//import Cotizaciones from './Resumen/Cotizaciones';

const Home = () => {
    const [cotizaciones,setCotizaciones] = useState({});
    const api = '3d6b1892ec063caa0743a85be8b45b62';
    const url = `http://data.fixer.io/api/latest?access_key=${api}&base=EUR&symbols=USD,DKK`;
    
    const consultarAPI = async () => {
        const resultado = await axios(url);
        setCotizaciones(resultado.data.rates)
    }
    useEffect(
        () => {
           consultarAPI();
           // eslint-disable-next-line
        } ,[]
       )

    
    
    
    
        return (
            <div className="container mt-4">
            <div className="row">
                <div className="col-7">
                     <Grafico 
                        cotizaciones={cotizaciones}
                    /> 
                </div>  
                <div  className="col-5">
                    <div className="row">
                        <div className="col">
                            <Balance 
                                cotizaciones={cotizaciones}
                            />
                        <div className="w-100"></div>
                            {/* <Cotizaciones 
                                cotizaciones={cotizaciones} 
                            /> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;