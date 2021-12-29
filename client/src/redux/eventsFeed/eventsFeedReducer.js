import eventsFeedTypes from "./eventsFeedTypes";

const INITIAL_STATE = {
    events: [],
    fetching: true,
    error: false,
};

const eventsFeedReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){

        case eventsFeedTypes.FETCH_EVENTS_START:{
            return {
                ...state,
                fetching: true,
                error: false,
            }
        }

        case eventsFeedTypes.FETCH_EVENTS_SUCCESS: {
            return {
                ...state,
                fetching: false,
                error: false,
                events:[...action.payload],
            }
        }

        case eventsFeedTypes.FETCH_EVENTS_FAILURE:{
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        }

        case eventsFeedTypes.ADD_EVENT: {
            return{
                ...state,
                events:[action.payload, ...state.events ]
            }
        }

        case eventsFeedTypes.DELETE_EVENT: {
            const events = state.events;
            const eventIndex = events.findIndex((event)=> event._id == action.payload.eventId);
            if(eventIndex != -1){
                events.splice(eventIndex,1);
            }
            return {
                ...state,
                events: [...events]
            }
        }

        case eventsFeedTypes.ATTEND_EVENT: {
            const {eventId, userId} = action.payload;
            const events = state.events;
            const eventIndex = events.findIndex(event => event._id == eventId);
            
            
            if(eventIndex != -1){
                let participantsList = events[eventIndex].participantsList;
                //find out if user is current attendee
                const currentAttendee = !!participantsList.find((participant) => participant.attendee==userId);
            
                if(currentAttendee) {
                    
                    events[eventIndex].participantsList = participantsList.filter((participant => participant.attendee !== userId));

                }else{
                    events[eventIndex].participantsList.push({attendee: userId});

                }
            }
            return {
                ...state,
                events: [...events],
            }


        }

        default: {
            return state;
        }
    }
}

export default eventsFeedReducer;