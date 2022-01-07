import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { ModifyCart } from "../../services/cartServices";
import spinner from "../../images/spinner1.gif";

const AddToCartButton = ({ product, token }) => {
  const [quantity, setQuantity] = useState(1);
  const [addState, setAddState] = useState("unadded");

  const handleAddCart = async () => {
    setAddState("fetching");
    const response = await ModifyCart(
      token,
      product._id,
      product.price,
      parseInt(quantity)
    );
    
    setAddState("added");
    setQuantity(1);
  };

  return (
    <div className="store__products__item__button">
      {product.maxOrder != 1 && (
        <Fragment>
          <span className="heading-3">Qty</span>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="store__products__item__button--input"
          />
        </Fragment>
      )}

      {addState === " fetching" ? (
        <img src={spinner}/>
      ) : addState === "added" ? (
        <div
          className="store__products__item__button--label heading-5 store__products__item__button--label__added heading-5"
        >
          added to cart
        </div>
      ) : (
        <div
          onClick={handleAddCart}
          className="store__products__item__button--label heading-5"
        >
          add to cart
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(AddToCartButton);
