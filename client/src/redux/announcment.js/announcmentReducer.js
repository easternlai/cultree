import announcementTypes from "./announcementTypes";

const INITIAL_STATE ={
    announcements: [],
    fetching: true,
    error: false
};

const announcementReducer =( state = INITIAL_STATE, action) => {
    switch(action.type){
        case announcementTypes.GET_ANNOUNCEMENTS_START: {
            return {
                ...state,
                fetching: true,
                error: false
            }
        }
        case announcementTypes.GET_ANNOUNCEMENTS_SUCCESS: {
            return {
                ...state,
                announcements: [...action.payload ],
                fetching: false,
                error: false
            }
        }

        case announcementTypes.DELETE_ANNOUNCEMENT: {
            
            const announcements = state.announcements;
            const announcementIndex = announcements.findIndex((announcement => announcement._id == action.payload.announcementId));
            if(announcementIndex !== -1){
                announcements.splice(announcementIndex, 1);
            }
            return {
                ...state,
                announcements: [...announcements]
            }
        }
        default: {
            return state;
        }
    }
}

export default announcementReducer;