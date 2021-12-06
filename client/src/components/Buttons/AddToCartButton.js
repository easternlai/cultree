import React, {Fragment, useState} from "react";
import { connect } from "react-redux";
import { ModifyCart } from "../../services/cartServices";


const AddToCartButton = ({product, token }) => {

    const [quantity, setQuantity] = useState(1);

    const handleAddCart = () => {
        console.log(parseInt(quantity));
        ModifyCart(token, product._id, product.price, parseInt(quantity));
        setQuantity(1);
    }

  return (
    <div className="store__products__item__button">
      {product.maxOrder != 1 && 
        <Fragment>
        <span className="heading-3">Qty</span>
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="store__products__item__button--input"/>
        </Fragment>
      }
      <span
        onClick={handleAddCart}
        className="store__products__item__button--label heading-5"
      >
        Add to Cart
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(AddToCartButton);