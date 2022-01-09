import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const retrieveFeedEvents = async (token) => {
    try {
        const response = await axios(apiUrl + `/api/event/feed`,{
            method: 'GET',
            headers: {token}
        });

        return response.data;

    } catch (err) {
        throw new Error(err.response.data);
    }
}