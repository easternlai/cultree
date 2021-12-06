import { getCart, ModifyCart } from "../../services/cartServices";
import { placeOrderService } from "../../services/orderServices";
import cartTypes from "./cartTypes";

export const getCartAction = (token) => async (dispatch) => {
  try {
    dispatch({type: cartTypes.GET_CART_START});

    const res = await getCart(token);
    dispatch({ type: cartTypes.GET_CART_SUCCESS, payload: res });
  } catch (err) {
    return console.log(err);
  }
};

export const ModifyCartAction = (token, productId, price, quantity) => async (dispatch) => {
    try {
      const response = await ModifyCart(token, productId, price, quantity);
      console.log(response);
      dispatch({type: cartTypes.MODIFY_CART, payload: response});
      
    } catch (err) {
      return console.log(err);
    }
  };

  export const emptyCartAction = () => async(dispatch) => {
    try {
      dispatch({type: cartTypes.EMPTY_CART});
    } catch (err) {
      return console.log(err);
    }
  }