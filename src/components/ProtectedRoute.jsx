import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token || token === "undefined") {
    console.log("No token");
    return <Navigate to="/login" replace />;
  }

  let normalizedRole = userRole;

  try {
    const parsed = JSON.parse(userRole);
    if (Array.isArray(parsed)) {
      normalizedRole = parsed[0];
    }
  } catch(err) {
    normalizedRole = userRole;
  }

  if (normalizedRole?.startsWith("ROLE_")) {
    normalizedRole = normalizedRole.replace("ROLE_", "");
  }

  if (role && normalizedRole !== role) {
    const home =
      normalizedRole === "ADMIN"
        ? "/admin-dashboard"
        : "/dashboard";

    return <Navigate to={home} replace />;
  }

  console.log("✅ ProtectedRoute PASSED");

  return children;
};

export default ProtectedRoute;