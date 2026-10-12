import { useState } from "react";
import { Building2, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Login.css";


const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (event) => {

        event.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed."
                );
            }


            

            if (data.role !== "ADMIN") {

                setError(
                    "Access denied. Admin account required."
                );

                return;
            }


            // Store JWT
            localStorage.setItem(
                "token",
                data.accessToken
            );


            // Store user information
            localStorage.setItem(
                "role",
                data.role
            );

            localStorage.setItem(
                "userId",
                data.userId
            );

            localStorage.setItem(
                "username",
                data.username
            );

            localStorage.setItem(
                "email",
                data.email
            );


            // Go to dashboard
            navigate("/admin");

        } catch (error) {

            console.error(error);

            setError(
                error.message || "Something went wrong."
            );

        } finally {

            setLoading(false);
        }
    };
        
const handleGoogleLogin = () => {
    window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
};


    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-logo">
                    <Building2 size={30} />
                </div>


                <h1>Admin Login</h1>

                <p className="admin-login-subtitle">
                    Sign in to manage your RealEstate platform.
                </p>


                {error && (
                    <div className="admin-login-error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleLogin}>

                    <div className="admin-input-group">

                        <label>Email</label>

                        <div className="admin-input-wrapper">

                            <Mail size={19} />

                            <input
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />

                        </div>

                    </div>


                    <div className="admin-input-group">

                        <label>Password</label>

                        <div className="admin-input-wrapper">

                            <Lock size={19} />

                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>

                </form>

                
<div className="admin-google-login">
    <div className="admin-login-divider">
        <span>OR</span>
    </div>

    <button
        type="button"
        className="admin-google-button"
        onClick={handleGoogleLogin}
    >
        <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
            width="20"
            height="20"
        />
        Continue with Google
    </button>
</div>


            </div>

        </div>
    );
};


export default Login;