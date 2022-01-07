import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddToCartButton from "../../components/Buttons/AddToCartButton";
import { getProducts } from "../../services/storeServices";
import spinner from "../../images/spinner1.gif";
import StoreView from "../../components/StoreView/StoreView";

const StorePage = ({ user }) => {
  const [products, setProducts] = useState();
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    (async function () {
      setFetching(true);
      setProducts(await getProducts(user.token));
      setFetching(false);
    })();
  }, []);

  return (
    <div className="layout-flat__body store">
      <div className="heading-2__bold">Store</div>
      <StoreView />
      {fetching ? (
        <div className="spinner-wrapper-2">
          <img src={spinner} className="spinner-1 " />
        </div>
      ) : (
        <div className="store__products">
          {products &&
            products.map((product) => (
              <div className="store__products__item">
                <img
                  className="store__products__item--image"
                  src={product.image}
                />
                <div className="store__products__item--title heading-3">
                  {product.productName}
                </div>
                <div className="store__products__item--price heading-4">
                  {product.price} points
                </div>
                <div className="store__products__item--description heading-5">
                  {product.description}
                </div>
                <AddToCartButton product={product} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(StorePage);
