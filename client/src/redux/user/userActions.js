import { loginAuthentication } from '../../services/authService';
import userTypes from './userTypes';

export const loadUser = ({user, token}) => {
    localStorage.setItem('token', token);
    return({type:userTypes.LOGIN_SUCCESS, payload: {user, token }});
}

export const signout = () =>  dispatch=> {
    localStorage.removeItem('token');

    dispatch({type: userTypes.SIGN_OUT});
}

export const loginStart = (email, password, token) => async (dispatch) => {
    try {
        dispatch({type: userTypes.LOGIN_START});
        const res = await loginAuthentication(email, password, token);
        dispatch(loadUser(res));

    } catch (err) {
        console.log(err.message);
        dispatch(signout());
        dispatch({type: userTypes.LOGIN_ERROR, payload: err.message})
        
        return (err);
    }
}

export const updateBalanceAction = (newBalance) => async (dispatch) => {
    try {

        dispatch({type: userTypes.UPDATE_BALANCE, payload: newBalance});
    } catch (err) {
        dispatch({type: userTypes.LOGIN_ERROR, payload: err});
    }
}