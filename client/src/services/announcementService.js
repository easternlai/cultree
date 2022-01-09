import axios from 'axios';
const apiUrl = "http://localhost:5000";

export const getAnnouncementsService = async (token) => {
    try {
        const response = await axios(apiUrl + '/api/announcement', {
            method: 'GET',
            headers: {token}
        });

        return response.data;
        
    } catch (err) {
        console.log(err);
    }
}

export const deleteAnnouncementService = async (token, announcementId) => {

    try {
        const response = await axios.delete(apiUrl+ `/api/announcement/${announcementId}`, {
            method: 'DELETE',
            headers: {token},
        });
        console.log(response.data);
        return response.data;
        
    } catch (err) {
        console.log(err);
    }
};

export const createAnnouncementService = async (token, bulletin) => {
    try {
        const response = await axios(apiUrl + '/api/announcement/', {
            method: 'POST',
            headers: { token},
            data: {bulletin}
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};