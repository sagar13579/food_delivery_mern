/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axiosInstance from "../axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axiosInstance.post("/api/cart/add", { itemId });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axiosInstance.post("/api/cart/remove", { itemId });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id.toString() === item
        );

        if (!itemInfo) continue; // 🔒 safety check

        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axiosInstance.get("/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async () => {
    const response = await axiosInstance.post("/api/cart/get");
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
