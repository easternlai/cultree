import axios from 'axios';

import {apiUrl} from './servicesTypes';

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