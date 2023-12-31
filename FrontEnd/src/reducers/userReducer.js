import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS} from '../constants/userConstant'

export const userReducer = (state = { user:{}}, action)=>{
    switch (action.type){
        case LOGIN_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
            };
            case  LOGIN_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isAuthenticated:true,
                    user:action.payload,
                };

                case  LOGIN_FAIL:
                    return {
                        ...state,
                        loading:false,
                        isAuthenticated:false,
                        user:null,
                        error:action.payload,
                    };
                        case CLEAR_ERRORS:
                            return {
                                ...state,
                                errlor:null,
                            }

                default:
                    return state;
    }

}