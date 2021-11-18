import {connect} from '../../services/socketServices';
import { addEvent, deleteEvent } from '../eventsFeed/eventsFeedActions';
import socketTypes from './socketTypes';

export const connectSocket = () => (dispatch) => {
    const socket = connect();

    dispatch({type: socketTypes.CONNECT, payload: socket});

    socket.on('newEvent', (data) => {
        dispatch(addEvent(data));
    });

    socket.on('deleteEvent', (data) => {
        console.log(data);
        dispatch(deleteEvent(data));
    })

};