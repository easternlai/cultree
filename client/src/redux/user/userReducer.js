import userTypes from './userTypes';

const INITIAL_STATE = {
    currentUser: null,
    error: false,
    token: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                error: false,
                currentUser: action.payload.user,
                token: action.payload.token,
            }
        case userTypes.SIGN_OUT:
            console.log('test')
            return {
                ...state,
                error: false,
                currentUser:null,
                token: null,
            }
        default:
            return state;
    }
}

export default userReducer;