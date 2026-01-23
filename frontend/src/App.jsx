import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPopup from "./components/LoginPopup/LoginPopup";
import UserLayout from "./layouts/UserLayout";
import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute";
import AdminPanel from "./admin/AdminPanel";
import UnAuthorized from "./admin/components/Unauthorized";

// User pages
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import Verify from "./pages/Verify/Verify";
import Profile from "./pages/Profile/Profile";

// Admin pages
import Add from "./admin/pages/Add/Add";
import List from "./admin/pages/List/List";
import Orders from "./admin/pages/Orders/Orders";
import Analytics from "./admin/pages/Analytics/Analytics";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
        {/* 🔵 USER LAYOUT */}
        <Route element={<UserLayout setShowLogin={setShowLogin} />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
        </Route>

        {/* 🔴 ADMIN LAYOUT (PROTECTED) */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<Add />} />
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path="orders" element={<Orders />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnAuthorized />} />
      </Routes>
    </>
  );
};

export default App;