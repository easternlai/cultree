import { loginAuthentication } from '../../services/authService';
import userTypes from './userTypes';

export const loadUser = ({user, token}) => {
    localStorage.setItem('token', token);
    return({type:userTypes.LOGIN_SUCCESS, payload: {user, token }});
}

export const signout = () => async dispatch=> {
    await localStorage.removeItem('token');
    console.log('test1');
    dispatch({type: userTypes.SIGN_OUT});
}

export const loginStart = (email, password, token) => async (dispatch) => {
    try {
        dispatch({type: userTypes.LOGIN_START});
        const res = await loginAuthentication(email, password, token);
        console.log(res);
        dispatch(loadUser(res));
    } catch (err) {
        dispatch(signout());
        console.log(err);
    }
}

export const updateBalanceAction = (newBalance) => async (dispatch) => {
    try {
        console.log('test');
        dispatch({type: userTypes.UPDATE_BALANCE, payload: newBalance});
    } catch (err) {
        console.log(err)
    }
}