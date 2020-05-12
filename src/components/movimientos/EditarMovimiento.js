import React, { useState,useContext,useEffect } from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner'

import movimientoContext from '../../context/movimientos/movimientoContext';
import tipoContext from '../../context/tipos/tipoContext'


const EditarMovimiento = ({match}) => {
    const idEdit = match.params.id;


    const movimientosContext = useContext(movimientoContext);
    const {movimiento, putMovimiento,currentMovimiento,clearCurrentMovimiento} = movimientosContext;
    
    const tiposContext = useContext(tipoContext);
    const {tipos, getTipos} = tiposContext;

    const [movState,setMovimiento] = useState({});
    
     useEffect(
        () => {
           getTipos();      
          currentMovimiento(idEdit);
          
        }   , []    )  
        useEffect ( () => {
            if(movimiento){
                setMovimiento(movimiento[0])
            }
        },[movimiento])
        
    if(!movimiento || !tipos) return null;
    

     const editarMovimiento = e => {
        e.preventDefault();

      putMovimiento(movState);

      clearCurrentMovimiento();
      
    }
    const leerDato = e => {
        setMovimiento({
            ...movState,
            [e.target.name] : e.target.value
        })
    }
   
    const leerInt = e => {
        setMovimiento({
            ...movState,
            [e.target.name] : parseInt(e.target.value,10)
        })
    }
    
        return (
            <div className="container">
                <div className="row">
                    <div className="mt-4 mb-4">
                        <Link to={'/ahorro'} className="btn btn-primary">
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Volver a Ahorro
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <form
                        onSubmit={editarMovimiento}
                    >
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Detalle:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="detalle"
                                        placeholder="Detalle del Movimiento"
                                        required
                                        defaultValue={movimiento[0].detalle}
                                        onChange={leerDato}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Fecha:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="fecha"
                                        placeholder="Fecha del Movimiento"
                                        required
                                        defaultValue={movimiento[0].fecha}
                                        onChange={leerDato}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                        <label>Modo:</label>
                                        <select name="modo" className="form-control" onChange={leerDato} defaultValue={movimiento[0].modo}>
                                            <option value ="CASH">CASH</option>
                                            <option value ="GUS">Card GUS</option>
                                            <option value ="EMI">Card EMI</option>
                                            <option value="DEBIT-EMI">DANSKE Emi</option>
                                        </select>
                                </div>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="text-primary font-weight-normal">
                            Monto:</label>
                            <input 
                                type="number"
                                className="form-control bg-secondary"
                                name="monto"
                                placeholder="Monto"
                                required
                                defaultValue={movimiento[0].monto}
                                onChange={leerInt}

                            />
                        </div>

                        <div className="row">
                            <div className="col">
                            <div className="form-group">
                                    <label>Moneda:</label>
                                    <select name="moneda" className="form-control"  defaultValue={movimiento[0].moneda} onChange={leerDato}>
                                        <option name="moneda" value ="USD">USD</option>
                                        <option name="moneda" value ="DKK">DKK</option>
                                        <option name="moneda" value ="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                            <div className="form-group">
                                    <label>Tipo:</label>
                                    <select name="tipo" className="form-control" defaultValue={movimiento[0].tipo} onChange={leerDato}>
                                    <option  value ="#">--Selecciona--</option>
                                        {
                                            tipos.map(tipo =>{
                                                return(
                                                    <option key={tipo.id} value={tipo.titulo}>{tipo.titulo}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                                
                                
                        </div>

                        <input 
                            type="submit"
                            value="Editar Movimiento"
                            className="btn btn-success"
                        />
                    </form>
                </div>
            </div>
                
        )
    }


export default EditarMovimiento;