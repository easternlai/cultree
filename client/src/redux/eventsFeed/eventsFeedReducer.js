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
            console.log(eventIndex);
            if(eventIndex != -1){
                events.splice(eventIndex,1);
            }
            return {
                ...state,
                events: [...events]
            }
        }

        default: {
            return state;
        }
    }
}

export default eventsFeedReducer;