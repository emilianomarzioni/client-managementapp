import React, { useEffect,useContext} from 'react';
import Spinner from '../layout/Spinner';

import movimientoContext from '../../context/movimientos/movimientoContext';

const Balance = ({cotizaciones}) => {
    
    const movimientosContext = useContext(movimientoContext);
    const { movimientos, getMovimientos,postMovimiento} = movimientosContext;
    useEffect(
        () => {
           getMovimientos();
           // eslint-disable-next-line
        }   , []    ) 
        if(!movimientos) return <Spinner />;

    
    if(!cotizaciones) return <Spinner />;    
    var cashUSD = 0;
    var cashDKK = 0;
    var cashEUR = 0;
    let DebitEmi = 0;
    let DebitCeci = 0;
    movimientos.forEach( movimiento => {        
        if(movimiento.modo === "CASH"){
            switch(movimiento.moneda){
                case "DKK" : cashDKK += movimiento.monto;break;
                case "EUR" : cashEUR += movimiento.monto;break;
                case "USD" : cashUSD += movimiento.monto;break;
                default:break;
            }
        } else { 
            switch(movimiento.modo){ 
                case "DEBIT-EMI": DebitEmi += movimiento.monto;break;
                case "DEBIT-CECI": DebitCeci += movimiento.monto;break;
                
                default:break;
            }
        } 
    }
    )


    const obtenerBalance = (movimientos) => {
        const balanceArray = movimientos.map(movimiento => {
            switch(movimiento.moneda){
                case "DKK" : return (movimiento.monto);
                case "EUR" : return(movimiento.monto*cotizaciones.DKK);
                case "USD" : return(movimiento.monto/cotizaciones.USD*cotizaciones.DKK);
                default : return (movimiento.monto);
            }
            });
        let balanceTotal = 0;
        balanceArray.forEach(movimiento => (
            balanceTotal += movimiento
        ));
        return balanceTotal;
    }

    const bDKK = (obtenerBalance(movimientos)).toFixed(2);
    //const bEUR = (obtenerBalance(movimientos)/cotizaciones.DKK).toFixed(2);
    //const bUSD = (obtenerBalance(movimientos)/cotizaciones.DKK*cotizaciones.USD).toFixed(2);

    let classConditional="";

    if(bDKK >0){
         classConditional="success"
    }else{
        classConditional="danger"
    }

    return (
        <div  className="">
            <div className="row">
                <div className="container">
                    <div className={`card text-white bg-${classConditional} mb-3`}>
                        <div className="card-header">
                            <i className="fas fa-balance-scale"></i>{''} Disponible
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">
                                DKK {bDKK} 
                            </h5>
                        </div>
                        
                    </div>
                    <div className={`card text-white bg-primary mb-2`}>

                        <div className="card-header">
                        <i className="fas fa-wallet"></i>{''} Efectivo
                        </div>
                        <div className="card-body">
                            <p className="card-text font-weight-bold">
                                DKK: {cashDKK} <br />
                                USD: {cashUSD}<br />
                                EUR: {cashEUR}<br />
                                Danske EMI: {DebitEmi}<br />
                                Danske Ceci: {DebitCeci}<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Balance;