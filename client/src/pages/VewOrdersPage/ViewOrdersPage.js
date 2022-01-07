import React, { useEffect, useReducer, useState } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "./ViewOrdersPageReducer";
import { getUserOrdersService } from "../../services/orderServices";
import { ViewOrdersPageReducer } from "./ViewOrdersPageReducer";
import Moment from "react-moment";
import StoreView from "../../components/StoreView/StoreView";

const ViewOrdersPage = ({ token }) => {
  const [state, dispatch] = useReducer(ViewOrdersPageReducer, INITIAL_STATE);

  useEffect(() => {
    (async function () {
      dispatch({ type: "FETCH_ORDERS_START" });
      const orders = await getUserOrdersService(token);
      dispatch({ type: "FETCH_ORDERS_SUCCESS", payload: orders });
    })();
  }, []);
  console.log(state);
  return (
    <div className="layout-flat__body view-order">
      <div>
        <span className="heading-2__bold">Orders</span>
      </div>
      <StoreView />
      {state.orders.length ? (
        <div className="view-order__orders">
          {!state.fetching &&
            state.orders.map((order) => (
              <div className="view-order__orders__order">
                <div className="view-order__orders__order--heading">
                  <div className="heading-4__bold">
                    Order #: {order.orderNumber}
                  </div>
                  <Moment className="heading-4" format="MM/DD/YYYY">
                    {order.orderItems[0].date}
                  </Moment>
                </div>
                {order.orderItems.map((item) => (
                  <div className="view-order__orders__order__item">
                    <div className="view-order__orders__order__item__body">
                    <div className="heading-3__bold">{item.productName}</div>
                    <div className="heading-4">Status: {item.status}</div>
                    <div className="heading-4">qty: {item.quantity}</div>
                    <div className="heading-4">{item.price} points</div>
                    </div>

                    <img
                      className="view-order__orders__order__item--image"
                      src={item.image}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        <div className="heading-3">You have no previous orders</div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(ViewOrdersPage);
