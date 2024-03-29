import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS,REGISTER_USER_FAIL,REGISTER_USER_SUCCESS,REGISTER_USER_REQUEST,LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS} from '../constants/userConstant'

export const userReducer = (state = { user:{}}, action)=>{
    switch (action.type){
        case REGISTER_USER_REQUEST:
        case LOGIN_REQUEST:
            case LOAD_USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
            };
            case  LOGIN_SUCCESS:
                case REGISTER_USER_SUCCESS:
                    case LOAD_USER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isAuthenticated:true,
                    user:action.payload,
                };

                case  LOGIN_FAIL:
                    case REGISTER_USER_FAIL:
                    return {
                        ...state,
                        loading:false,
                        isAuthenticated:false,
                        user:null,
                        error:action.payload,
                    };
                    case LOAD_USER_FAIL:
                        return {
                            loading:false,
                        isAuthenticated:false,
                        user:null,
                        error:action.payload,
                        }
                        case CLEAR_ERRORS:
                            return {
                                ...state,
                                error:null,
                            }

                default:
                    return state;
    }

}