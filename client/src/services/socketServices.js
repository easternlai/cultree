import io from 'socket.io-client';

import {apiUrl} from './servicesTypes';

export const connect = () => {
    const socket = io(apiUrl,{
        path: "/socket/",
        query: {
            token: localStorage.getItem('token')
        }
    });

    return socket;
}