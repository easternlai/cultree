import React, {useState} from "react";
import Moment from 'react-moment';
import { ChangeOrderStatusService } from "../../services/adminService";

const OrderDetails = ({ token, order, dispatch }) => {
    

    const [status, setStatus] = useState(order.status);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        ChangeOrderStatusService(token, order._id, newStatus);
    }
  console.log(order.status);
  return (
    <div id={order._id} className="fulfillment__order-list">
      <div className="heading-3 fulfillment__order-list__item">
        <Moment format="MM/DD/YY">{order.date}</Moment>
      </div>
      <div className="heading-3 fulfillment__order-list__item">
        {order.orderNumber}
      </div>
      <div className="heading-3 fulfillment__order-list__item">
        {order.product.productName}
      </div>
      <div className="heading-3 fulfillment__order-list__item">
        {order.price}
      </div>
      <div className="heading-3 fulfillment__order-list__item">
        {order.quantity}
      </div>
      <div className="heading-3 fulfillment__order-list__item">
        {order.user.fullName}
      </div>
      <div className="heading-3 fulfillment__order-list__item">
          <select defaultValue={order.status} onChange={(e)=>handleStatusChange(e.target.value)} className="heading-3 fulfillment__order-list__item--select">
            <option value="pending">pending</option>
            <option value="filled">filled</option>
            <option value="canceled">canceled</option>
          </select>
      </div>
    </div>
  );
};

export default OrderDetails;
