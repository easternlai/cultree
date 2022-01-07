import React, {Fragment} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';

const StoreView = ({user}) => {

    const location = useLocation().pathname;
    console.log(location.includes("Shopping"));

    return (
        <div className="store__display">
        <div className="store__display--balance">
          <span className="heading-3__bold">
            points balance: <span>{user.currentUser.balance}</span>
          </span>
        </div>
        <div className="store__display__links heading-5 ">
          <Link className="no-dec store__display__links--item" to="/cart">
            <span className={location.includes('cart') && "bold"}>View Shopping Cart</span>
          </Link>
          <span className="store__display__links--item">|</span>
          <Link className="no-dec store__display__links--item" to="/vieworders">
          <span className={location.includes('view') && "bold"}>View Pending Orders</span>
          </Link>
          {user.currentUser.admin > 4 && (
            <Fragment>
              <span className="store__display__links--item">|</span>
              <Link
                to="/store/createitem"
                className="no-dec store__display__links--item"
              >
                <span className={location.includes('create') && "bold"}>Add Item</span>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect (mapStateToProps)(StoreView);