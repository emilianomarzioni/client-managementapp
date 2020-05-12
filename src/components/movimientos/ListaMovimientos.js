import React, { useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import movimientoContext from '../../context/movimientos/movimientoContext';

const ListaMovimientos = () => {

    const movimientosContext = useContext(movimientoContext);
    let { movimientos, getMovimientos, deleteMovimiento} = movimientosContext;

   

     useEffect(
        () => {
           getMovimientos();
           // eslint-disable-next-line
        }   , []    ) 
       //Reparar con los tipos o quitar la sección Gastos
    movimientos = movimientos.sort((a, b) => new Date(...a.fecha.split('/').reverse()) - new Date(...b.fecha.split('/').reverse())).reverse();

   
    /* movimientos.forEach((mov) => {
        var ar = mov.fecha.split("/");
        mov.mes = ar[1];
    }) */

    const eliminarMovimiento = id => {
        // eliminar
       deleteMovimiento(id);
    }
    return (
        <div className="container">
             <table className="table-responsive table table-striped table-sm mt-4" >
                <thead className="text-light bg-dark">
                    <tr>
                        <th>Fecha</th>
                        <th>Detalle</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {movimientos.map(movimiento => {
                        let condiotionalClass="";
                        let icono = "";
                        switch(movimiento.modo){
                            case "CASH": icono = <i className="fas fa-money-bill"></i>;break;
                            case "GUS": icono =<i className="fas fa-credit-card"></i>;break;
                            case "EMI": icono =<i className="far fa-credit-card"></i>;break;
                            case "DEBIT-EMI": case "DEBIT-CECI": icono= <i className="fas fa-money-check-alt"></i> ;break;
                            default: icono = null;
                        }
                        if(movimiento.monto<0){condiotionalClass="table-danger text-primary"}else{condiotionalClass="table-success"}
                        if (movimiento.detalle.length > 25) {
                            movimiento.detalle = movimiento.detalle.substring(0, 24)+ "...";
                          }
                        return(
                            <tr className={`${condiotionalClass}`} key={movimiento._id}>
                                <td >{movimiento.fecha}</td>
                                <td >{movimiento.detalle}</td>
                                <td >{movimiento.tipo}</td>
                                <td className="font-weight-normal">{movimiento.monto} {movimiento.moneda}{' '}{icono}</td>
                                <td >
                                    <div className="container">
                                            <Link to={`/movimiento/editar/${movimiento._id}`} className="btn btn-warning btn-sm">
                                                Editar
                                            </Link>
                                        
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>{ eliminarMovimiento(movimiento._id)} }
                                            >
                                                Eliminar
                                            </button>
                                            </div>
                                </td>
                            </tr> )}
                    )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListaMovimientos;