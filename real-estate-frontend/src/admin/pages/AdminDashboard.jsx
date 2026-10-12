import { useEffect, useState } from "react";
import {
    Users,
    Building2,
    ShieldCheck,
    UserRound
} from "lucide-react";

import "../styles/AdminDashboard.css";

const AdminDashboard = () => {

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalProperties: 0,
        pendingApprovals: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/admin/dashboard",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load dashboard");
            }

            const data = await response.json();

            setDashboard(data);

        } catch (error) {
            console.error(error);
            setError("Unable to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        {
            title: "Total users",
            value: dashboard.totalUsers,
            icon: Users,
            className: "blue"
        },
        {
            title: "Properties",
            value: dashboard.totalProperties,
            icon: Building2,
            className: "orange"
        },
        {
            title: "Pending approvals",
            value: dashboard.pendingApprovals,
            icon: ShieldCheck,
            className: "purple"
        },
        
    ];

    return (
        <div className="admin-dashboard">

            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Platform overview and management.</p>
            </div>

            {error && (
                <div className="dashboard-error">
                    {error}
                </div>
            )}

            <div className="dashboard-stats">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (
                        <div
                            className="admin-stat-card"
                            key={stat.title}
                        >

                            <div className={`stat-icon ${stat.className}`}>
                                <Icon size={40} strokeWidth={2} />
                            </div>

                            <div className="stat-value">
                                {loading ? "..." : stat.value}
                            </div>

                            <div className="stat-title">
                                {stat.title}
                            </div>

                        </div>
                    );
                })}

            </div>

            <div className="dashboard-actions">

                <button
                    className="primary-button"
                    onClick={() => {
                        window.location.href = "/admin/users";
                    }}
                >
                    Manage users
                </button>

                <button
                    className="secondary-button"
                    onClick={() => {
                        window.location.href = "/admin/properties";
                    }}
                >
                    View properties
                </button>

            </div>

        </div>
    );
};

export default AdminDashboard;