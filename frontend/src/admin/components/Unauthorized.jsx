import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h2>

      <p className="text-gray-600 text-center max-w-md p-4">
        You do not have permission to access this page.  
        If you believe this is a mistake, please contact the administrator.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>

        <button
          onClick={() => window.location.replace("http://localhost:5173")}
          className="px-6 py-2 rounded-md bg-gray-600 text-white cursor-pointer hover:bg-gray-700 transition"
        >
          Go to User App
        </button>
      </div>
    </div>
  );
};

export default UnAuthorized;