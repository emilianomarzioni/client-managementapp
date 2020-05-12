import {
    LOGIN_OK,
    LOG_OUT,
    GET_USER,
    NEW_USER_OK
} from '../../types';

import authContext from './authContext';
import authReducer from './authReducer';
import React , {useReducer} from 'react';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null
    }
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    const userAutenticated = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: respuesta.data.usuario
            });
        }catch(error){
            console.log(error);
        }

    }
    const logIn = async userData => {
        try{
            const respuesta = await clienteAxios.post('/api/auth', userData);
            dispatch({
                type:LOGIN_OK,
                payload: respuesta.data
            })
            userAutenticated();
        }catch(error){
            console.log(error);
            console.log("ERROR DE logIN");
        }
    }
    const logOut = async () => {
        localStorage.removeItem('token');
        dispatch({
            type:LOG_OUT,
        })
        
    }
    const createUser = async userData => {
        try{
            const respuesta = await clienteAxios.post('/api/usuarios',userData);

            dispatch({
                type:NEW_USER_OK,
                payload: respuesta.data
            })

            userAutenticated();

        }catch(error){
            console.log(error);
        }
    }
    
    return (
        <authContext.Provider
        value = {{
            token:state.token,
            autenticado:state.autenticado,
            usuario:state.usuario,
            logIn,
            logOut,
            userAutenticated,
            createUser,
        }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;