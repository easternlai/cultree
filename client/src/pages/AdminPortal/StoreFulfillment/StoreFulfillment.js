import React, { useEffect, useState, useReducer } from "react";
import { connect } from "react-redux";
import OrderDetails from "../../../components/OrderDetails/OrderDetails";
import { getOrdersService } from "../../../services/adminService";
import {
  INITIAL_STATE,
  storeFulfillmentReducer,
} from "./storeFulfillmentReducer";

const StoreFulfillment = ({ token }) => {
  const [state, dispatch] = useReducer(storeFulfillmentReducer, INITIAL_STATE);
  const [viewOrderStatus, setViewOrderStatus] = useState("pending");
  useEffect(() => {
    (async function () {
      const orders = await getOrdersService(token, viewOrderStatus);
      dispatch({ type: "GET_ORDERS_START" });
      dispatch({ type: "GET_ORDERS_SUCCESS", payload: orders });
    })();
  }, [viewOrderStatus]);
  console.log(state);
  return (
    <div className="heading-2__bold layout-flat__body fulfillment">
      <div className="heading-2__bold">Orders</div>
      <select onChange={(e) => setViewOrderStatus(e.target.value)}>
        <option value="pending">pending orders</option>
        <option value="canceled">canceled orders</option>
        <option value="filled">filled orders</option>
      </select>
      <div>
        <div className="fulfillment__order-list">
          <div className="heading-3__bold fulfillment__order-list--header">
            date
          </div>
          <div className="heading-3__bold fulfillment__order-list--header">
            order #
          </div>
          <div className="heading-3__bold fulfillment__order-list--header">
            product
          </div>
          <div className="heading-3__bold fulfillment__order-list--header">
            price
          </div>
          <div className="heading-3__bold fulfillment__order-list--header">
            qty
          </div>
          <div className="heading-3__bold fulfillment__order-list--header">
            user
          </div>
          <div className="heading-3__bold fulfillment__order-list--header">
            status
          </div>
        </div>
      </div>

      {!state.fetching &&
        (state.orders.length > 0 ? (
          state.orders.map((order) => (
            <OrderDetails order={order} token={token} dispatch={dispatch} />
          ))
        ) : (
          <div>no orders</div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(StoreFulfillment);
