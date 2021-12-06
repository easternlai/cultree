import React from "react";
import { connect } from "react-redux";
import { ModifyCartAction } from "../../redux/cart/cartActions";

const CartItem = ({ item, user, ModifyCartAction }) => {

const handleClick = () => {
    console.log('click');
    ModifyCartAction(user.token, item.productId, item.price, (-item.quantity));
}
  return (
    <div className="cart__products__item">
      <img src={item.image} className="cart__products__item--image" />
      <div className="heading-2">{item.productName}</div>
      <div className="heading-4">{item.description}</div>
      <div className="heading-4__bold">{item.orderPrice} Points</div>
      <div className="heading-4">Quantity: {item.quantity}</div>
      <div className="heading-5__bold cart__products__item--delete" onClick={handleClick}>
        Remove item from cart
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
    ModifyCartAction: (token, productId, price, quantity) => dispatch(ModifyCartAction(token, productId, price, quantity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
