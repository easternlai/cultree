import {connect} from '../../services/socketServices';
import { addEvent, attendEvent, deleteEvent } from '../eventsFeed/eventsFeedActions';
import { createAnnouncementAction, deleteAnnouncementAction } from '../announcment.js/announcementActions';
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

    socket.on('newAnnouncement', (data) => {
        dispatch(createAnnouncementAction(data));
    })

    socket.on('deleteAnnouncement', (data) => {
        dispatch(deleteAnnouncementAction(data));
    });

};