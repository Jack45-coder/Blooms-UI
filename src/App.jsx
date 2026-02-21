import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Layout ko Main Parent banayein */}
        <Route path="/" element={<Layout />}>
          
          {/* 2. Login ko index route banayein (taaki "/" par Login dikhe) */}
          <Route index element={<Login />} />

          {/* 3. Baki saare pages Layout ke andar nesting karein */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          <Route path="dashboard/*" element={
            <ProtectedRoute role="USER">
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="admin-dashboard" element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;