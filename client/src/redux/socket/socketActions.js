import {connect} from '../../services/socketServices';
import { addEvent } from '../eventsFeed/eventsFeedActions';
import socketTypes from './socketTypes';

export const connectSocket = () => (dispatch) => {
    const socket = connect();

    dispatch({type: socketTypes.CONNECT, payload: socket});

    socket.on('newEvent', (data) => {
        console.log(data);
        dispatch(addEvent(data));
    });

};