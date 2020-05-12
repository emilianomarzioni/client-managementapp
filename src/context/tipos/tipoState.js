import React, {useReducer} from 'react';

import tipoContext from './tipoContext';
import tipoReducer from './tipoReducer';

import {
    GET_TIPOS,
    POST_TIPO
} from '../../types';

import clienteAxios from '../../config/axios';

const TipoState = props => {

    const initialState = {
        tipos : [],
        tipo: null
    }

    const [state, dispatch] = useReducer(tipoReducer, initialState);
    const postTipos = async tipo => {
        try {
            const resultado = await clienteAxios.post('/api/tipos', tipo)

            dispatch({
                type: POST_TIPO,
                payload: resultado.data
            })
        } catch(error){
            console.log(error);
        }
    }
    //Obtener tipos.
    const getTipos = async () => {
        try{
            const resultado = await clienteAxios.get('/api/tipos');

             dispatch({
                type: GET_TIPOS,
                payload: resultado.data.tipos
            }) 
        } catch(error){
            console.log(error);
        }
    }
    return (
        <tipoContext.Provider
            value={{
                tipos: state.tipos,
                getTipos,
                postTipos
            }}
        >
            {props.children}
        </tipoContext.Provider>
        
    )
}
export default TipoState;