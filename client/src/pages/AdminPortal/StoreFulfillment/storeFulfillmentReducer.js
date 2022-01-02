export const INITIAL_STATE = {
    orders: [],
    fetching: false,
    error: false,
};

export const storeFulfillmentReducer = (state, action) => {
    switch(action.type){
        case 'GET_ORDERS_START':
            return {
                ...state,
                fetching: true,
            }
        case 'GET_ORDERS_SUCCESS':
            return {
                ...state,
                fetching: false,
                orders: [...action.payload]
            }

        default: {
            throw new Error ("Invalid action type passed to the storeFulfillment Reducer.");
        }
    }
}