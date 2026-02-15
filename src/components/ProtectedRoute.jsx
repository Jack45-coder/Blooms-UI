import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    console.log("Checking Protection - Token:", token, "Role:", userRole);

    if (!token || token === "undefined") {
            return <Navigate to="/" replace />;
    }

    if (role && userRole !== role) {
           const home = userRole === "ADMIN" ? "/admin-dashboard" : "/dashboard";
           return <Navigate to={home} replace />;
    }
    return children;
}

export default ProtectedRoute;