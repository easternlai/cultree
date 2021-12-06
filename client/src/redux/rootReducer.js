import { combineReducers } from "redux";
import eventFeedReducer from './eventsFeed/eventsFeedReducer';
import userReducer from './user/userReducer';
import socketReducer from "./socket/socketReducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    eventsFeed: eventFeedReducer,
    socketConnect: socketReducer,
    cart: cartReducer,
});

export default rootReducer;