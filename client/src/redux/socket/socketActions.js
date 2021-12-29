import {connect} from '../../services/socketServices';
import { addEvent, attendEvent, deleteEvent } from '../eventsFeed/eventsFeedActions';
import { deleteAnnouncement } from '../announcment.js/announcementActions';
import socketTypes from './socketTypes';

export const connectSocket = () => (dispatch) => {
    const socket = connect();

    dispatch({type: socketTypes.CONNECT, payload: socket});

    socket.on('newEvent', (data) => {
        dispatch(addEvent(data));
    });

    socket.on('deleteEvent', (data) => {
        dispatch(deleteEvent(data));
    });

    socket.on('attendEvent', (data)=> {
        dispatch(attendEvent(data));
    });

    socket.on('deleteAnnouncement', (data) => {
        console.log(data);
        dispatch(deleteAnnouncement(data));
    });

};