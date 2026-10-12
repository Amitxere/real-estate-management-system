import { useEffect, useState } from "react";
import {
    Search,
    Building2,
    Check,
    X,
    Eye,
    MapPin,
    BedDouble,
    Bath,
    Maximize
} from "lucide-react";

import "../styles/AdminProperties.css";

const AdminProperties = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [actionLoading, setActionLoading] = useState(null);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/admin/properties",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load properties");
            }

            const data = await response.json();
            setProperties(data);

        } catch (err) {
            console.error(err);
            setError("Unable to load properties");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const updatePropertyStatus = async (id, action) => {
        try {
            setActionLoading(id);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/admin/properties/${id}/${action}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to update property");
            }

            const updatedProperty = await response.json();

            setProperties((current) =>
                current.map((property) =>
                    property.id === updatedProperty.id
                        ? updatedProperty
                        : property
                )
            );

        } catch (err) {
            console.error(err);
            setError(err.message || "Unable to update property");
        } finally {
            setActionLoading(null);
        }
    };

    const filteredProperties = properties.filter((property) => {

        const searchText = search.toLowerCase();

        const matchesSearch =
            property.title?.toLowerCase().includes(searchText) ||
            property.city?.toLowerCase().includes(searchText) ||
            property.ownerEmail?.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "ALL" ||
            property.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatPrice = (price) => {
        if (price === null || price === undefined) {
            return "N/A";
        }

        return `₹${Number(price).toLocaleString("en-IN")}`;
    };

    return (
        <div className="admin-properties">

            <div className="properties-header">
                <div>
                    <h1>Properties</h1>
                    <p>Manage and review all properties on the platform.</p>
                </div>
            </div>

            {error && (
                <div className="properties-error">
                    {error}
                </div>
            )}

            <div className="properties-toolbar">

                <div className="property-search">
                    <Search size={20} />

                    <input
                        type="text"
                        placeholder="Search by title, city or owner..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="property-status-filter"
                >
                    <option value="ALL">All statuses</option>
                    <option value="DRAFT">Draft</option>
                    <option value="PENDING_APPROVAL">
                        Pending approval
                    </option>
                    <option value="ACTIVE">Active</option>
                    <option value="REJECTED">Rejected</option>
                </select>

            </div>

            {loading ? (

                <div className="properties-loading">
                    Loading properties...
                </div>

            ) : filteredProperties.length === 0 ? (

                <div className="properties-empty">
                    <Building2 size={48} />
                    <h3>No properties found</h3>
                    <p>
                        There are no properties matching your search.
                    </p>
                </div>

            ) : (

                <div className="properties-grid">

                    {filteredProperties.map((property) => (

                        <div
                            className="admin-property-card"
                            key={property.id}
                        >

                            <div className="property-card-header">

                                <div className="property-type">
                                    {property.propertyType}
                                </div>

                                <span
                                    className={`property-status ${property.status?.toLowerCase()}`}
                                >
                                    {property.status}
                                </span>

                            </div>

                            <h2>{property.title}</h2>

                            <div className="property-price">
                                {formatPrice(property.price)}
                            </div>

                            <div className="property-location">
                                <MapPin size={17} />
                                {property.city}, {property.state}
                            </div>

                            <div className="property-details">

                                <span>
                                    <BedDouble size={17} />
                                    {property.bedrooms ?? 0} Beds
                                </span>

                                <span>
                                    <Bath size={17} />
                                    {property.bathrooms ?? 0} Baths
                                </span>

                                <span>
                                    <Maximize size={17} />
                                    {property.area ?? 0} sq.ft
                                </span>

                            </div>

                            <div className="property-owner">
                                <strong>Owner</strong>
                                <span>
                                    {property.ownerUsername || "N/A"}
                                </span>
                            </div>

                            <div className="property-actions">

                                <button
                                    className="view-button"
                                    onClick={() =>
                                        window.location.href =
                                            `/admin/properties/${property.id}`
                                    }
                                >
                                    <Eye size={17} />
                                    View
                                </button>

                                {property.status ===
                                    "PENDING_APPROVAL" && (
                                    <>
                                        <button
                                            className="approve-button"
                                            disabled={
                                                actionLoading === property.id
                                            }
                                            onClick={() =>
                                                updatePropertyStatus(
                                                    property.id,
                                                    "approve"
                                                )
                                            }
                                        >
                                            <Check size={17} />
                                            {actionLoading === property.id
                                                ? "..."
                                                : "Approve"}
                                        </button>

                                        <button
                                            className="reject-button"
                                            disabled={
                                                actionLoading === property.id
                                            }
                                            onClick={() =>
                                                updatePropertyStatus(
                                                    property.id,
                                                    "reject"
                                                )
                                            }
                                        >
                                            <X size={17} />
                                            Reject
                                        </button>
                                    </>
                                )}

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default AdminProperties;