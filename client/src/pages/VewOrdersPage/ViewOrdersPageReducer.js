export const INITIAL_STATE = {
    fetching: false,
    error: null,
    orders: []
};

export const ViewOrdersPageReducer = (state, action) => {

    switch(action.type) {
        case 'FETCH_ORDERS_START':
            return{
               ...state,
               fetching: true 
            }
        
        case 'FETCH_ORDERS_SUCCESS':
            return{
                ...state,
                fetching: false,
                orders: action.payload.orders,
            }

        default: {
            return state;
        }
    }
}