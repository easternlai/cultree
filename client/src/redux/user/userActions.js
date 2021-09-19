import { loginAuthentication } from '../../services/authService';
import userTypes from './userTypes';

export const loadUser = ({user, token}) => {
    localStorage.setItem('token', token);
    return({type:userTypes.LOGIN_SUCCESS, payload: {user, token }});
}

export const signout = () => dispatch=> {
    localStorage.removeItem('token');
    dispatch({type: userTypes.SIGN_OUT});
}

export const loginStart = (usernameOrEmail, password, token) => async (dispatch) => {
    try {
        const res = await loginAuthentication(usernameOrEmail, password, token);
        dispatch(loadUser(res));
    } catch (err) {
        dispatch(signout);
        console.log(err);
    }
}