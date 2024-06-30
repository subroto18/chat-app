import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return <Outlet />;
};

export default ProtectedRoute;
