import{
    GET_MOVIMIENTOS, POST_MOVIMIENTO, DELETE_MOVIMIENTO,
    CURRENT_MOVIMIENTO, PUT_MOVIMIENTO,CLEAR_CURRENT_MOVIMIENTO
} from '../../types';

export default (state,action) =>{
    switch(action.type){
    case GET_MOVIMIENTOS:
        return {
            ...state,
            movimientos: action.payload
        }
    case POST_MOVIMIENTO:
        return {
            ...state,
            movimientos: [...state.movimientos, action.payload],
        }
    case DELETE_MOVIMIENTO:
        return{
            ...state,
            movimientos: state.movimientos.filter(mov => mov._id !== action.payload ),
           // movimiento: null
        }
        case CURRENT_MOVIMIENTO:
            return{
                ...state,
                movimiento:state.movimientos.filter(movimiento => movimiento._id === action.payload )
            }
            case PUT_MOVIMIENTO:
                return {
                    ...state,
                    movimientos: state.movimientos.map(tarea => tarea._id === action.payload._id ? action.payload : tarea )
                }
                case CLEAR_CURRENT_MOVIMIENTO:
            return {
                ...state,
                movimiento: null
            }
    default: return state;
}
}