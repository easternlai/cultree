import axios from 'axios';

const apiUrl = "http://localhost:8080";

export const createUserService = async (fullName, email,password,startDate,admin, token) => {
    try {
        const res = await axios(apiUrl + `/api/admin/user`, {
            method:'POST',
            data:{
                fullName, email,password,startDate,admin
            },
            headers:{token}
        });
        return (res.data);
    } catch (err) {
        console.log(err);
    }
}

export const getUsersService = async (token) => {
    try {
        const response = await axios(apiUrl + '/api/admin/user', {
            method: 'GET',
            headers: {token},
        });
        return response.data;

    } catch (err) {
        console.log(err);
    }
}

export const editUserService = async (token, userId, points, privileges) => {
    try {
        const response = await axios(apiUrl+ '/api/admin/user', {
            method: 'PUT',
            headers: {token },
            data: { userId, points, privileges},
        });

        return response.data;
    } catch (err) {
        console.log(err);
    }

}