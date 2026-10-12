import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./login/Login";
import OAuth2Callback from "./login/OAuth2Callback";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLayout from "./admin/components/AdminLayout";
import AdminProperties from "./admin/pages/AdminProperties";
import AdminPropertyDetails from "./admin/pages/AdminPropertyDetails";
import AdminUsers from "./admin/pages/AdminUsers";

const AdminProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // User is not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in but is not an admin
    if (role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
};


function App() {

    return (
        <Routes>

            {/* =========================
                Normal Login
            ========================= */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/oauth2/callback"
                element={<OAuth2Callback />}
            />


            {/* =========================
                Admin Routes
            ========================= */}
            <Route
                path="/admin"
                element={
                    <AdminProtectedRoute>
                        <AdminLayout />
                    </AdminProtectedRoute>
                }
            >

                {/* /admin */}
                <Route
                    index
                    element={<AdminDashboard />}
                />
                 <Route path="users" element={<AdminUsers />} />
                <Route
        path="properties"
        element={<AdminProperties />}
    />
    
             <Route path="properties/:id" element={<AdminPropertyDetails />} />

            </Route>


            {/* =========================
                Default Route
            ========================= */}
            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />


            {/* =========================
                Unknown Route
            ========================= */}
            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
}

export default App;