import socketTypes from "./socketTypes";

const INITIAL_STATE = {
    socket: null
};

const socketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case socketTypes.CONNECT:
            return {
                ...state,
                socket: action.payload
            };
        case socketTypes.DISCONNECT:{
            return INITIAL_STATE;
        }
        default: {
            return state;
        }
    }
}

export default socketReducer;