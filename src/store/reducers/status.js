
import { SET_DELETE, SET_LOADING, SET_SUCCESS } from "../type"

const initialState = {
    loading: false,
    success: false,
    delete: false,
}

const status = (state = initialState, aciton) => {
    switch (aciton.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
        case SET_SUCCESS:
            return{
                ...state,
                success: aciton.payload,
            }
            case SET_DELETE:
                return{
                    ...state,
                    delete: aciton.payload,
                }
        default:
            return state;
    }
}
export default status;