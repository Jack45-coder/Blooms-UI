import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  console.log("🔥 PROTECTED ROUTE");
  console.log("Token:", token);
  console.log("User Role:", userRole);
  console.log("Required Role:", role);

  if (!token || token === "undefined") {
    console.log("❌ No token");
    return <Navigate to="/login" replace />;
  }

  let normalizedRole = userRole;

  try {
    const parsed = JSON.parse(userRole);
    if (Array.isArray(parsed)) {
      normalizedRole = parsed[0];
    }
  } catch {
    // userRole is already a normal string
  }

  if (normalizedRole?.startsWith("ROLE_")) {
    normalizedRole = normalizedRole.replace("ROLE_", "");
  }

  console.log("🔥 Normalized Role:", normalizedRole);

  if (role && normalizedRole !== role) {
    console.log("❌ Role mismatch");

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