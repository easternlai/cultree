import axios from 'axios';

const apiUrl = "http://localhost:8080";

export const createUser = async (fullName, email,password,startDate,admin, token) => {
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