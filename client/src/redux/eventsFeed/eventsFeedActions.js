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
});

export const deleteEvent = (eventId) =>({
    type: eventsFeedTypes.DELETE_EVENT,
    payload: eventId,
});

export const attendEvent = ({eventId, userId}) => ({
    type: eventsFeedTypes.ATTEND_EVENT,
    payload: { eventId, userId}
});