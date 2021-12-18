import axios from 'axios';

const apiUrl = "http://localhost:8080";

export const getAlbumsService = async (token) => {

    try {
        const response = await axios(apiUrl+ '/api/photoalbums', {
            method: 'GET',
            headers: {token},
        });

        console.log(response.data);
        return(response.data);
    } catch (err) {
        console.log(err);
    }
};

export const createAlbumService = async (token, name) => {
    try {
        const response = await axios(apiUrl + '/api/photoalbums', {
            method: 'POST',
            headers: {token},
            data: { name }
        });

        return response.data;
        
    } catch (err) {
        console.log(err);
    }
}