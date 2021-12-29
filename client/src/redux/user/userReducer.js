import userTypes from './userTypes';

const INITIAL_STATE = {
    currentUser: null,
    error: false,
    token: null,
    fetching: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case userTypes.LOGIN_START:
            return {
                ...state,
                error: false,
                fetching: true,
            }
        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                error: false,
                currentUser: action.payload.user,
                token: action.payload.token,
                fetching: false,
            }
        case userTypes.SIGN_OUT:
            console.log('test33');
            return {
                ...state,
                error: false,
                currentUser:null,
                token: null,
                fetching: false,
            }
        
        case userTypes.UPDATE_BALANCE:
            console.log(action.payload);
            return {
                ...state,
                currentUser: {...state.currentUser, balance: action.payload}
            }
        default:
            return state;
    }
}

export default userReducer;