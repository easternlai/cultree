import io from 'socket.io-client';

export const connect = () => {
    const socket = io('http://localhost:8080',{
        query: {
            token: localStorage.getItem('token')
        }
    });

    return socket;
}