import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";

const PlaceOrder = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const { getTotalCartAmount, token, food_list, cartItems } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          const itemInfo = {
            ...item,
            quantity: cartItems[item._id],
          };
          orderItems.push(itemInfo);
        }
      });
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 50,
      };
      console.log("orderData: ", orderData);

      let response = await axiosInstance.post("/api/order/place", orderData);
      console.log("response: ", response);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get("/api/user/profile-data");

      setData({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        phone: res.data.data.phone || "",
        street: res.data.data.street || "",
        city: res.data.data.city || "",
        state: res.data.data.state || "",
        zipcode: res.data.data.zipcode || "",
        country: res.data.data.country || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("to place an order sign in first");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          placeholder="Name"
          required
        />

        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
          required
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
          required
        />
        <div className="multi-field">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-field">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                &#8377;
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
              </b>
            </div>
          </div>
        </div>
        <button className="place-order-submit" type="submit">
          Proceed To Payment
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
