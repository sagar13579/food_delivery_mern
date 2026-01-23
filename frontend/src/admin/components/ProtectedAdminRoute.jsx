import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedAdminRoute = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    
    console.log("Role: ", decoded);
    
    if (decoded.role !== "admin") {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
  
};

export default ProtectedAdminRoute;