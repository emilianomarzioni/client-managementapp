import React, {useContext,useEffect }from 'react';
import Spinner from '../layout/Spinner';

import movimientoContext from '../../context/movimientos/movimientoContext';
import tipoContext from '../../context/tipos/tipoContext'


const ResumenTabla = () => {

        const movimientosContext = useContext(movimientoContext);
        let { movimientos, getMovimientos} = movimientosContext;

        
        const tiposContext = useContext(tipoContext);
        let {tipos, getTipos} = tiposContext;
        useEffect(
            () => {
               getTipos();
               getMovimientos();
               // eslint-disable-next-line
            }   , []    ) 
    
        
        if(!movimientos) return <Spinner />;
        if(!tipos) return <Spinner />;
        //Ordenar alfabeticamente 
        tipos = tipos.sort ((a, b) => a.tipo.localeCompare (b.tipo));
        //Agrego propiedad mes
        movimientos.forEach((mov) => {
                var ar = mov.fecha.split("/");
                mov.mes = ar[1];
        })
        movimientos = movimientos.filter(mov => ((mov.moneda === "DKK") && (mov.modo === "CASH" || mov.modo ==="DEBIT-EMI" || mov.modo ==="DEBIT-CECI")));
        // Funcion Agrupadora 
        const groupBy = (array, key) => {
            return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
            }, {}); 
        };
        //GroupByType obtengo objeto de movimientos agrupados por mes
        var groupByMes = groupBy(movimientos, 'mes');
        var array = [];
        var arraygroupByMesandTipo = []
        //paso el objeto a un array para poder iterarlo
        Object.keys(groupByMes).forEach(
            function(key){
                array.push(
                    groupByMes[key]
                )
            }
    )
    array.forEach(mes =>{
        arraygroupByMesandTipo.push(groupBy(mes,"tipo"))
    })
    var arrayMesTipoconTotales = [];
    arraygroupByMesandTipo.forEach(
        mes => {
            Object.keys(mes).forEach( tipo => {

                 mes[tipo].total = mes[tipo].reduce((x, y) => ( {
                    monto: x.monto + y.monto})
                    ,{monto:0})
                 })
                 
            arrayMesTipoconTotales.push(mes);
        }

    )
    console.log(arrayMesTipoconTotales);
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Diciembre"];
    return (
        <div className="container">
            <h3 className="mt-4 text-center">Resumen CASH and Danske Bank</h3>
             <table className="table-responsive table table-striped table-sm mt-4" >
                <thead className="text-light bg-dark">
                    <tr>
                        <th></th>
                        {months.map(m =>{
                            return (
                                <th key={m}>{m}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tipos.map(tipo => {
                        let clase=""
                        if(tipo.tipo === "Ingreso"){clase="table-success"}
                        return (
                                <tr key = {tipo._id} className={clase}>
                                    <th scope="row">{tipo.titulo}</th>
                                    {arrayMesTipoconTotales.map(mes =>{
                                        return (
                                                <td key={mes.id}>
                                                    { Object.keys(mes).map(tip => {
                                                        if(tip === tipo.titulo){
                                                            return (mes[tip].total.monto)
                                                        }
                                                        return null;
                                                    }
                                                    )
                                                    }
                                                </td>
                                                )
                                            } 
                                        ) 
                                    }
                                </tr>
                                )
                    })}
                    <tr className="table-danger">
                        <th>EGRESOS</th>
                        {arrayMesTipoconTotales.map(mes =>{
                            var sum = 0;
                            Object.keys(mes).forEach(tipo => {
                                if(mes[tipo].total.monto<0){
                                sum+=mes[tipo].total.monto;}
                            }) 
                                        return (
                                                <td>
                                                    {sum}
                                                </td>
                                                )
                                            } 
                                        ) 
                                    }
                    </tr>
                    <tr className="table-info">
                        <th scope="row">BALANCES</th>
                        {arrayMesTipoconTotales.map(mes =>{
                            var sum = 0;
                            Object.keys(mes).forEach(tipo => {
                                
                                sum+=mes[tipo].total.monto;
                            }) 
                                        return (
                                                <td>
                                                    {sum}
                                                </td>
                                                )
                                            } 
                                        ) 
                                    }
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ResumenTabla;