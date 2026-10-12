import {
    Building2,
    UserRound,
    LogOut
} from "lucide-react";

import {
    useNavigate
} from "react-router-dom";

import "./AdminNavbar.css";


const AdminNavbar = () => {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username") || "Admin";


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        navigate("/login");
    };


    return (
        <header className="admin-navbar">

            {/* Logo */}
            <div className="admin-brand">

                <div className="admin-brand-icon">
                    <Building2 size={28} />
                </div>

                <span>
                    RealEstate
                </span>

            </div>


            {/* Navigation */}
            <nav className="admin-nav">

                <button
                    className="admin-nav-link"
                    onClick={() =>
                        navigate("/admin")
                    }
                >
                    Dashboard
                </button>


                <button
                    className="admin-nav-link"
                    onClick={() =>
                        navigate("/admin/users")
                    }
                >
                    Users
                </button>


                <button
                    className="admin-nav-link"
                    onClick={() =>
                        navigate("/admin/properties")
                    }
                >
                    Properties
                </button>


                <div className="admin-user">

                    <UserRound size={21} />

                    <span>
                        {username}
                    </span>

                </div>


                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >

                    <LogOut size={20} />

                    <span>
                        Sign Out
                    </span>

                </button>

            </nav>

        </header>
    );
};

export default AdminNavbar;