import eventsFeedTypes from "./eventsFeedTypes";
import { retrieveFeedEvents } from "../../services/eventsFeedService";

export const fetchFeedEventsStart = (authToken) => async (dispatch) => {
    try {
        dispatch({ type: eventsFeedTypes.FETCH_EVENTS_START});
        const response = await retrieveFeedEvents(authToken);
        dispatch({ type: eventsFeedTypes.FETCH_EVENTS_SUCCESS, payload: response});

    } catch (err) {
        dispatch({type: eventsFeedTypes.FETCH_EVENTS_FAILURE, payload: err});
    }
}

export const addEvent = (event) => ({
    type: eventsFeedTypes.ADD_EVENT,
    payload: event,
})