import React, { useState,useContext,useEffect } from 'react';

import Spinner from '../layout/Spinner'

import movimientoContext from '../../context/movimientos/movimientoContext';
import tipoContext from '../../context/tipos/tipoContext'


const FormularioAhorro = () => {

    const [movimiento,setMovimiento] = useState({
        monto:0,
        modo:"CASH",
        detalle:'',
        tipo:'',
        moneda:'DKK'
    });
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    const movimientosContext = useContext(movimientoContext);
    const { postMovimiento} = movimientosContext;

    
    const tiposContext = useContext(tipoContext);
    const {tipos, getTipos} = tiposContext;

    useEffect(
        () => {
           getTipos();
           // eslint-disable-next-line
      
           setMovimiento({
            //Setting the value of the date time
            ...movimiento,
            fecha:
                date + '/' + month + '/' + year ,
            });
        }   , []    ) 

    useEffect(() => {
        console.log(movimiento.tipo);
        if(movimiento.tipo !== ''){
        var eoi = tipos.find(tipo => tipo.titulo === movimiento.tipo);
        console.log(eoi);
        if(eoi.tipo === "Egreso"){
            console.log("llegp a egreso");
        movimiento.monto= Math.abs(movimiento.monto)*-1;
        }else{
            movimiento.monto = Math.abs(movimiento.monto);
        }}
    },[movimiento.tipo])
    
    const onSubmit = e => {
        e.preventDefault();
        
        postMovimiento(movimiento);
        setMovimiento({
            monto:0,
            modo:"CASH",
            detalle:'',
            tipo:'',
            moneda:'DKK',
            fecha:date + '/' + month + '/' + year ,
        });
    }

    
    
    const leerDato = e => {
        setMovimiento({
            ...movimiento,
            [e.target.name] : e.target.value
        })
    }
   
    const leerInt = e => {
        setMovimiento({
            ...movimiento,
            [e.target.name] : parseInt(e.target.value,10)
        })
    }
        
    return (
        <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form
                                onSubmit={onSubmit}
                            >
                               <div className="row">
                                    <div className="col">
                                <div className="form-group">
                                    <label className="text-primary font-weight-normal">Monto:</label>
                                    <input 
                                        type="number"
                                        className="form-control"
                                        name="monto"
                                        placeholder="Monto"
                                        required
                                        value={movimiento.monto}
                                        step=".01"
                                        onChange={leerInt}
                                    />
                                </div></div>
                                <div className="col">
                                <div className="form-group">
                                            <label>Modo:</label>
                                            <select name="modo" className="form-control" onChange={leerDato}>
                                                <option value ="CASH">CASH</option>
                                                <option value ="GUS">Card GUS</option>
                                                <option value ="EMI">Card EMI</option>
                                                <option value="DEBIT-EMI">DANSKE Emi</option>
                                                <option value="DEBIT-CECI">DANSKE Ceci</option>
                                            </select>
                                        </div>
                                        </div>
                                </div>

                                <div className="form-group">
                                    <label>Detalle:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={movimiento.detalle}

                                        name="detalle"
                                        placeholder="Detalle del monto"
                                        required
                                        onChange={leerDato}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <div className="form-group">
                                            <label>Moneda:</label>
                                            <select name="moneda" className="form-control" onChange={leerDato}>
                                                <option name="moneda" value ="DKK">DKK</option>
                                                <option name="moneda" value ="USD">USD</option>
                                                <option name="moneda" value ="EUR">EUR</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                    <div className="form-group">
                                            <label>Tipo:</label>
                                            <select name="tipo" className="form-control" onChange={leerDato}>
                                            <option  value ="#">--Selecciona--</option>
                                            <option value="#">--Egresos--</option>

                                                {
                                                    tipos.map(tipo =>{
                                                        if(tipo.tipo === "Egreso"){
                                                        return(
                                                            <option key={tipo._id} value={tipo.titulo}>{tipo.titulo}</option>
                                                        )}
                                                    })
                                                }
                                            <option value="#">--Ingresos--</option>
                                            {
                                                    tipos.map(tipo =>{
                                                        if(tipo.tipo === "Ingreso"){
                                                        return(
                                                            <option key={tipo._id} value={tipo.titulo}>{tipo.titulo}</option>
                                                        )}
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                        
                                        
                                </div>
                                <input 
                                    type="submit"
                                    value="Agregar Movimiento"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
    );}


 
export default FormularioAhorro;