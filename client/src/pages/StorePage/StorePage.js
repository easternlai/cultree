import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddToCartButton from "../../components/Buttons/AddToCartButton";
import { getProducts } from "../../services/storeServices";

const StorePage = ({ user }) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    (async function () {
      setProducts(await getProducts(user.token));
    })();
  }, []);
  
  return (
    <div className="layout-flat__body store">
      <div className="heading-2">Store</div>
      <div className="store__display">
        <div className="store__display--balance">
          <span className="heading-3__bold">points balance: <span>{user.currentUser.balance}</span></span>
        </div>
        <div className="store__display__links heading-4 ">
        <Link className="no-dec store__display__links--item" to="/cart">View Shopping Cart</Link>
        <span className="store__display__links--item">|</span>
        <Link className="no-dec store__display__links--item" to="/vieworders">View Pending Orders</Link>
        {user.currentUser.admin > 4 && (
          <Fragment>
            <span className="store__display__links--item">|</span>
        <Link to="/store/createitem" className="no-dec store__display__links--item">Create Store Item</Link>
          </Fragment>
        )

        }

        </div>

      </div>
      <div className="store__products">
        {products &&
          products.map((product) => (
            <div className="store__products__item">
              <img className="store__products__item--image" src={product.image} />
              <div className="store__products__item--title heading-3">{product.productName}</div>
              <div className="store__products__item--price heading-4">{product.price} points</div>
              <div className="store__products__item--description heading-5">{product.description}</div>
              <AddToCartButton product={product}/>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(StorePage);
