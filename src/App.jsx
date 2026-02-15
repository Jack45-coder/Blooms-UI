import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
    return(
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}  />
                 <Route index element={<Login />} />


                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute role="USER">
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin-dashboard" element={
                    <ProtectedRoute role="ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                }/>

            <Route
              path="/create-blog"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />

                  <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
        </BrowserRouter>
    );
}

export default App;