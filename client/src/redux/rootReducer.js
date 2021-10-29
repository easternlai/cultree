import { combineReducers } from "redux";
import eventFeedReducer from './eventsFeed/eventsFeedReducer';
import userReducer from './user/userReducer';
import socketReducer from "./socket/socketReducer";

const rootReducer = combineReducers({
    user: userReducer,
    eventsFeed: eventFeedReducer,
    socketConnect: socketReducer,
});

export default rootReducer;