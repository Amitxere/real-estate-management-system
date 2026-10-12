import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuth2Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.hash.substring(1)
    );

    const token = params.get("token");
    const role = params.get("role");

    // Remove the token from the visible URL.
    window.history.replaceState(
      null,
      "",
      window.location.pathname
    );

    if (!token || !role) {
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    if (role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if (role === "OWNER") {
      navigate("/owner-dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
}
