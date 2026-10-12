import { useEffect, useState } from "react";
import {
  Search,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  ShieldOff,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminUsers.css";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserStatus = async (id, enabled) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/admin/users/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            enabled: !enabled,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      const updatedUser = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.username?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.mobileNumber?.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="admin-users-page">
      {/* Header */}
      <div className="admin-users-header">
        <div>
          <h1>Users</h1>
          <p>Manage registered users and their account status.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-users-filters">
        <div className="admin-users-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by username, email or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="OWNER">Owner</option>
          <option value="BUYER">Buyer</option>
          <option value="AGENT">Agent</option>
          <option value="RENTER">Renter</option>
        </select>
      </div>

      {/* User Count */}
      <div className="admin-users-count">
        Showing <strong>{filteredUsers.length}</strong> users
      </div>

      {/* Loading */}
      {loading ? (
        <div className="admin-users-loading">
          Loading users...
        </div>
      ) : (
        <div className="admin-users-table-wrapper">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {/* User */}
                    <td>
                      <div className="admin-user-info">
                        <div className="admin-user-avatar">
                          <UserRound size={20} />
                        </div>

                        <div>
                          <strong>{user.username}</strong>
                          <span>ID: {user.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td>
                      <div className="admin-user-contact">
                        <span>
                          <Mail size={15} />
                          {user.email}
                        </span>

                        <span>
                          <Phone size={15} />
                          {user.mobileNumber || "Not provided"}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td>
                      <span
                        className={`admin-role-badge ${user.role?.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`admin-status-badge ${
                          user.enabled ? "active" : "disabled"
                        }`}
                      >
                        {user.enabled ? "Active" : "Disabled"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="admin-user-actions">
                        <button
                          className="admin-view-user-btn"
                          onClick={() =>
                            navigate(`/admin/users/${user.id}`)
                          }
                        >
                          <Eye size={16} />
                          View
                        </button>

                        <button
                          className={
                            user.enabled
                              ? "admin-disable-btn"
                              : "admin-enable-btn"
                          }
                          onClick={() =>
                            updateUserStatus(user.id, user.enabled)
                          }
                        >
                          {user.enabled ? (
                            <>
                              <ShieldOff size={16} />
                              Disable
                            </>
                          ) : (
                            <>
                              <ShieldCheck size={16} />
                              Enable
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="admin-no-users">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;