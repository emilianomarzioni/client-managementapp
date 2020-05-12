import React, {useReducer} from 'react';

import movimientoContext from './movimientoContext';
import movimientoReducer from './movimientoReducer';

import {
    GET_MOVIMIENTOS,
    POST_MOVIMIENTO,
    DELETE_MOVIMIENTO,
    CURRENT_MOVIMIENTO,
    PUT_MOVIMIENTO,
    CLEAR_CURRENT_MOVIMIENTO
} from '../../types';

import clienteAxios from '../../config/axios';

const MovimientoState = props => {

    const initialState = {
        movimientos : [],
        movimiento: null
    }

    const [state, dispatch] = useReducer(movimientoReducer, initialState);

    const postMovimiento = async movimiento => {
        try {
            const resultado = await clienteAxios.post('/api/movimientos', movimiento)
            dispatch({
                type: POST_MOVIMIENTO,
                payload: resultado.data
            })
        } catch(error){
            console.log(error);
        }
    }
    //Obtenermovimientos
    const getMovimientos = async () => {
        try{
            const resultado = await clienteAxios.get('/api/movimientos');

             dispatch({
                type: GET_MOVIMIENTOS,
                payload: resultado.data.movimientos
            }) 
            if(resultado.data.movimientos.length === 0) {
                postMovimiento({
                    monto:0,
                    modo:"CASH",
                    detalle:'Cree su primer movimiento',
                    tipo:'Inicial',
                    moneda:'DKK',
                    fecha:"12/12/2000"
                });
            };
        } catch(error){
            console.log(error);
        }
    }
    const deleteMovimiento = async id => {
        try{
            const resultado = await clienteAxios.delete(`/api/movimientos/${id}`);
            dispatch({
                type: DELETE_MOVIMIENTO,
                payload: id
            })
        }catch(error){
            console.log(error);
        }
    }
    // Edita o modifica un movimiento
    const putMovimiento = async movimiento => {

        try {
            const resultado = await clienteAxios.put(`/api/movimientos/${movimiento._id}`, movimiento);
            
            dispatch({
                type: PUT_MOVIMIENTO,
                payload: resultado.data.movimiento
            })
        } catch (error) {
            console.log(error);
        }
    }
    const currentMovimiento = movId => {
        dispatch({
            type: CURRENT_MOVIMIENTO,
            payload: movId
        })
    }
    const clearCurrentMovimiento = () => {
        dispatch({
            type:CLEAR_CURRENT_MOVIMIENTO
        })
    }
    return (
        <movimientoContext.Provider
            value={{
                movimientos: state.movimientos,
                movimiento:state.movimiento,
                getMovimientos,
                postMovimiento,
                putMovimiento,
                deleteMovimiento,
                currentMovimiento,
                clearCurrentMovimiento
            }}
        >
            {props.children}
        </movimientoContext.Provider>
        
    )
}
export default MovimientoState;