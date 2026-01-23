import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = ({ setShowLogin }) => {
  return (
    <>
    <div className="p-5">
      <Navbar setShowLogin={setShowLogin} />
    </div>
      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;