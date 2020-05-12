import{
    GET_TIPOS, POST_TIPO
} from '../../types';

export default (state,action) =>{
    switch(action.type){
    case GET_TIPOS:
        return {
            ...state,
            tipos: action.payload
        }
    case POST_TIPO:
        return {
            ...state,
            tipos: [...state.tipos, action.payload],
        }
    default: return state;
}
}