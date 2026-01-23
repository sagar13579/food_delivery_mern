import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import "./Orders.css";
import { toast } from "react-toastify";
import { assets, url } from "../../assets_admin/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axiosInstance.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());

    } else {
      toast.error("Error");
    }
  };

  const formatDateToIST = (utcDate) => {
    return new Date(utcDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusHandler = async (event, orderId) => {
    const response = await axiosInstance.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h2>Order Page</h2>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.name}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>
              {"\u20B9"}
              {order.amount}
            </p>
            <p className="order-date">
              Ordered on: {formatDateToIST(order.date)}
            </p>
            {order.status === "Placed" && (
              <div className="order-actions">
                <button
                  className="confirm-btn"
                  onClick={() =>
                    statusHandler({ target: { value: "Confirmed" } }, order._id)
                  }
                >
                  Confirm
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    statusHandler({ target: { value: "Cancelled" } }, order._id)
                  }
                >
                  Cancel
                </button>
              </div>
            )}
            {order.status === "Confirmed" && (
              <select
                defaultValue=""
                onChange={(e) => statusHandler(e, order._id)}
              >
                <option value="" disabled>
                  Select next status
                </option>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
              </select>
            )}
            {["Food Processing", "Out for delivery"].includes(order.status) && (
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            )}
            {["Cancelled", "Delivered"].includes(order.status) && (
              <p className="order-status">{order.status}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
