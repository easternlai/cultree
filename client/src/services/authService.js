import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const loginAuthentication = async (usernameOrEmail, password, token) => {
    try {
        const request = token ? {headers: {token}} : {data: {usernameOrEmail, password}};

        const res = await axios(apiUrl+'/api/auth/login', {
            method:'POST',
            ...request
        });

        return res.data;

    } catch (err) {
        throw new Error(err.response.data.error);
    }
}