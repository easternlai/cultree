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

        default: {
            return state;
        }
    }
}

export default eventsFeedReducer;