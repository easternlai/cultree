import cartTypes from "./cartTypes";

const INITIAL_STATE = {
    items: [],
    error: false,
    fetching: false,
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case cartTypes.GET_CART_START:
            return {
                ...state,
                fetching: true,
            }

        case cartTypes.GET_CART_SUCCESS:
            return {
                ...state,
                fetching: false,
                items: action.payload.cartItems,
            }
        
        case cartTypes.MODIFY_CART: 
        const items = state.items;
        const index = items.findIndex(
            (item) => item.productId == action.payload.productId
        );
        if (items[index].quantity + action.payload.quantity == 0){
            items.splice(index, 1);
        }else{
            items[index].quality = items[index].quality + action.payload.quantity;
        }

        return {
            ...state,
            items: [ ...items]
        }

        case cartTypes.EMPTY_CART:
            return {
                ...state,
                items: []
            }

        default:
            return state;
    }
}

export default cartReducer;