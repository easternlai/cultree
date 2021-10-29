import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const attendEvent = async (eventId, token) => {
    try {
        const response = await axios(
            apiUrl + `/api/event/${eventId}/attend`,
            {
                method: 'POST',
                headers: { token }
            }
        );
        console.log(response.data);
        return response;
    } catch (err) {

        throw new Error({ err: err.response.data })
    }
}

export const getEvent = async (eventId, token) => {
    try {
        const response = await axios(apiUrl +`/api/event/${eventId}`,
            {
                method: 'GET',
                headers: {token}
            });
        
            return response.data;
    } catch (err) {
        console.log( err.response.data );
    }
}