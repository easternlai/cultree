import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import StoreView from "../../components/StoreView/StoreView";
import { emptyCartAction, getCartAction } from "../../redux/cart/cartActions";
import { updateBalanceAction } from "../../redux/user/userActions";
import { placeOrderService } from "../../services/orderServices";

const ShoppingCartPage = ({
  user,
  cart,
  getCartAction,
  updateBalanceAction,
  emptyCartAction,
}) => {
  useEffect(() => {
    getCartAction(user.token);
  }, [getCartAction]);

  const history = useHistory();

  let totalPrice = 0;

  if (!cart.fetching && cart.items && cart.items.length) {
    cart.items.map((item) => {
      totalPrice += item.orderPrice;
    });
  }
  const handleSubmitOrder = async () => {
    let items = [];
    cart.items.map((item) => {
      items.push({
        product: item.productId,
        quantity: item.quantity,
        price: item.orderPrice,
      });
    });
    if (user.currentUser.balance > totalPrice) {
      emptyCartAction();
      updateBalanceAction(user.currentUser.balance - totalPrice);
      const {currentOrderNumber} = await placeOrderService(user.token, items);
      console.log(currentOrderNumber);
      history.push(`/orderconfirmation/${currentOrderNumber}`);
    }
  };
  console.log(totalPrice);
  console.log(user.currentUser.balance);
  console.log(totalPrice < user.currentUser.balance);

  return (
    <Fragment>
      <div className="layout-w-sidebar__center cart">
        <div className="heading-2__bold">Your Shopping Cart</div>
        <StoreView />
        <div className="cart__products">
          {!cart.fetching && cart.items && cart.items.length ? (
            cart.items.map((item) => <CartItem item={item} />)
          ) : (
            <div className="heading-3">Your card is empty</div>
          )}
        </div>
      </div>
      <div className="layout-w-sidebar__sidebar cart__sidebar">
        {!cart.fetching &&
        cart.items &&
        cart.items.length &&
        totalPrice < user.currentUser.balance ? (
          <Fragment>
            <div onClick={handleSubmitOrder} className="cart__sidebar--submit">
              Order
            </div>
          </Fragment>
        ) : (
          <Fragment>
          <div className="cart__sidebar--submit cart__sidebar--submit__grayed">
            Order
          </div>
          {totalPrice > user.currentUser.balance && <div className="heading-5" style={{color: 'red'}}>*insufficient points</div>}
          </Fragment>
        )}
        

        <div className="heading-3__bold">Summary</div>
        <div className="heading-3__bold">
          <span>{totalPrice} Points</span>
        </div>
        {cart.items &&
          cart.items.map((item) => (
            <Fragment>
              <div>
                <span className="cart__sidebar--quantity heading-3__bold">
                  {item.quantity}
                </span>
                <span className="heading-4">{item.productName}</span>
              </div>
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCartAction: (token) => dispatch(getCartAction(token)),
  emptyCartAction: () => dispatch(emptyCartAction()),
  updateBalanceAction: (newBalance) =>
    dispatch(updateBalanceAction(newBalance)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);
