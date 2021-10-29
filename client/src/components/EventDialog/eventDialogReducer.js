export const INITIAL_STATE = {
    id: null,
    fetching: true,
    error: false,
    data: {
        participantsList: []
    },
};

export const EventDialogReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_EVENT_SUCCESS':{
            return{
                ...state,
                fetching: false,
                id: action.payload.eventData._id,
                data:{
                    participantsList: [...action.payload.eventData.participantsList]
                }

            }
        }
        case 'ADD_ATTENDEE':{
            const attendeeId = action.payload.attendeeId;
            let participantsList = state.data.participantsList;
            const currentAttendee = !!participantsList.find((participant) => participant.attendee == attendeeId);
            if(!currentAttendee){
                participantsList.push({attendee: attendeeId});
            } else {
                participantsList = participantsList.filter((participant) => participant.attendee != attendeeId)
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    participantsList
                }
            }
        }
        default: {
            throw new Error(
                'Invalid action type passed to the eventDialog Reducer'
            )
        }
    }
}