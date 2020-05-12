import {
    LOGIN_OK,
    GET_USER,
    LOG_OUT,
    NEW_USER_OK
} from '../../types';

export default (state,action) => {
    switch(action.type){
        case NEW_USER_OK:
        case LOGIN_OK:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                autenticado:true
            }
        case GET_USER:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload, 
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                usuario:null,
                autenticado:null,
            }
        

        default: return state;
    }
}