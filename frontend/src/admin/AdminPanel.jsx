import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../admin/assets_admin/assets";

const AdminPanel = () => {
  
  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-md text-lg font-medium transition
     ${isActive ? "bg-gray-200 text-black" : "text-gray-700 hover:bg-gray-200"}`;

  return (
    <div className="w-full">
      {/* 🔹 Top Navbar */}
      <nav className="bg-orange-400 shadow-md px-20 py-5 flex items-center justify-between">
        {/* <h1 className="text-3xl font-bold text-white">YumQuick Admin</h1> */}
        <Link to='/admin'><img className='w-40' src={assets.yumquick_admin} alt="" /></Link>

        <div className="flex gap-3">
          <NavLink to="add" className={navLinkClasses}>
            Add
          </NavLink>
          <NavLink to="list" className={navLinkClasses}>
            List
          </NavLink>
          <NavLink to="orders" className={navLinkClasses}>
            Orders
          </NavLink>
          <NavLink to="analytics" className={navLinkClasses}>
            Analytics
          </NavLink>
        </div>
      </nav>

      {/* 🔹 Page Content */}
      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;