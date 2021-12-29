import { getAnnouncementsService } from "../../services/announcementService";
import announcementTypes  from "./announcementTypes";

export const getAnnouncementsAction = (token) => async(dispatch) => {

    try {
        dispatch({type: announcementTypes.GET_ANNOUNCEMENTS_START});
        const response = await getAnnouncementsService(token);
        console.log(response);
        dispatch({type: announcementTypes.GET_ANNOUNCEMENTS_SUCCESS, payload: response});
        
    } catch (err) {
        console.log(err)
    }
};

export const deleteAnnouncementAction = ({announcementId}) => ({
    type: announcementTypes.DELETE_ANNOUNCEMENT,
    payload: {announcementId}
});

export const createAnnouncementAction = (announcement) => ({
    type: announcementTypes.CREATE_ANNOUNCEMENT,
    payload: announcement,
});