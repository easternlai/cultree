import axios from 'axios';

const apiUrl = "http://localhost:8080";

export const getAlbumsService = async (token) => {

    try {
        const response = await axios(apiUrl+ '/api/photoalbums', {
            method: 'GET',
            headers: {token},
        });

        return(response.data);
    } catch (err) {
        console.log(err);
    }
};

export const createAlbumService = async (token, formData) => {

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            token
        }
    };
    try {
        const response = await axios.post(apiUrl + '/api/photoalbums', formData, config);

        return response.data;
        
    } catch (err) {
        console.log(err);
    }
}

export const getAlbumService = async (token, albumId) => {
    try {
        const response = await axios(apiUrl+`/api/photoalbums/` + albumId, {
            method: 'GET',
            headers: {token}
        });

        return response.data;

    } catch (err) {
        console.log(err);
    }
}

export const deleteAlbumService = async (token, albumId) => {
    try {

        const response = await axios(apiUrl + '/api/photoalbums/' + albumId, {
            method: 'DELETE',
            headers: {token}
        });

        return response.data;
        
    } catch (err) {
        console.log(err);
    }
}

export const deletePhotoService = async ( token, photoId) => {
    try {
        const response = await axios(apiUrl + `/api/photoalbums/photo/${photoId}`, {
            method: 'DELETE',
            headers: {token},

           
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const addPhotosService = async (token, albumId, formData) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            token
        }
    };
    try {
        const response = await axios.put(apiUrl + `/api/photoalbums/photo/${albumId}`, formData, config);
        return response.data;
        
    } catch (err) {
        console.log(err);
    }
}