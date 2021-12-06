import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import { emptyCartAction, getCartAction } from "../../redux/cart/cartActions";
import { updateBalanceAction } from "../../redux/user/userActions";
import { placeOrderService } from "../../services/orderServices";

const ShoppingCartPage = ({ user, cart, getCartAction, updateBalanceAction, emptyCartAction }) => {
  useEffect(() => {
    getCartAction(user.token);
  }, [getCartAction]);

  let totalPrice = 0;

  if (!cart.fetching && cart.items && cart.items.length) {
    cart.items.map((item) => {
      totalPrice += item.orderPrice;
    });
  }
  const handleSubmitOrder = () => {
    let items = [];
    cart.items.map((item) => {
      items.push({
        product: item.productId,
        quantity: item.quantity,
        price: item.orderPrice,
      });
    });
    if (user.currentUser.balance > totalPrice){
    emptyCartAction();
    updateBalanceAction((user.currentUser.balance - totalPrice));
    placeOrderService(user.token, items);

    }else{
      console.log('You do not have enough points to complete this purchase.');
    }
  };

  return (
    <Fragment>
      <div className="layout-w-sidebar__center cart">
        <div className="heading-2">Your Shopping Cart</div>
        <div className="cart__products">
          {!cart.fetching && cart.items && cart.items.length ? (
            cart.items.map((item) => <CartItem item={item} />)
          ) : (
            <div className="heading-3">Your card is empty</div>
          )}
        </div>
      </div>
      <div className="layout-w-sidebar__sidebar cart__sidebar">
        {!cart.fetching && cart.items && cart.items.length ? (
          <Fragment>
            <div onClick={handleSubmitOrder} className="cart__sidebar--submit">
              Submit Order
            </div>
            <div className="heading-2__bold">Order Summary</div>
            <div className="heading-3__bold">
              <span>{totalPrice} Points</span>
            </div>
            {cart.items.map((item) => (
              <Fragment>
                <div>
                  <span className="cart__sidebar--quantity heading-3__bold">
                    {item.quantity}
                  </span>
                  <span className="heading-4">{item.productName}</span>
                </div>
              </Fragment>
            ))}
          </Fragment>
        ) : (
          <div className="cart__sidebar--submit cart__sidebar--submit__grayed">
            Submit Order
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCartAction: (token) => dispatch(getCartAction(token)),
  emptyCartAction: () => dispatch(emptyCartAction()),
  updateBalanceAction: (newBalance) => dispatch(updateBalanceAction(newBalance)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);
