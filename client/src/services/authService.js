import axios from 'axios';

const apiUrl = 'http://localhost:5000';

export const loginAuthentication = async (email, password, token) => {
    try {
        const request = token ? {headers: {token}} : {data: {email, password}};

        const res = await axios(apiUrl+'/api/auth/login', {
            method:'POST',
            ...request
        });
        return res.data;

    } catch (err) {
        throw new Error (err.response.data.error);
    }
}