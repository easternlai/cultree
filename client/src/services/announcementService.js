import axios from 'axios';
const apiUrl = "http://localhost:8080";

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
