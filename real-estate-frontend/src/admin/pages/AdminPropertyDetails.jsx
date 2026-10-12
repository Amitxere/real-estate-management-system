import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    Building2,
    Check,
    X,
    User,
    Mail,
    Home,
    Tag
} from "lucide-react";

import "../styles/AdminPropertyDetails.css";

const AdminPropertyDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const fetchProperty = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/admin/properties/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load property");
            }

            const data = await response.json();

            setProperty(data);

        } catch (err) {
            console.error(err);
            setError("Unable to load property details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const updatePropertyStatus = async (action) => {
        try {
            setActionLoading(true);
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
                throw new Error(
                    message || "Failed to update property"
                );
            }

            const updatedProperty = await response.json();

            setProperty(updatedProperty);

        } catch (err) {
            console.error(err);
            setError(
                err.message || "Unable to update property"
            );
        } finally {
            setActionLoading(false);
        }
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) {
            return "N/A";
        }

        return `₹${Number(price).toLocaleString("en-IN")}`;
    };

    if (loading) {
        return (
            <div className="property-details-loading">
                Loading property details...
            </div>
        );
    }

    if (!property) {
        return (
            <div className="property-details-error">
                {error || "Property not found"}
            </div>
        );
    }

    return (
        <div className="admin-property-details">

            {/* BACK BUTTON */}

            <button
                className="back-button"
                onClick={() => navigate("/admin/properties")}
            >
                <ArrowLeft size={18} />
                Back to Properties
            </button>

            {error && (
                <div className="property-details-error">
                    {error}
                </div>
            )}

            {/* PROPERTY IMAGE */}

            <div className="property-hero">

                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                    alt={property.title}
                />

                <div className="hero-overlay">

                    <div className="hero-status">
                        {property.status}
                    </div>

                    <div className="hero-content">
                        <h1>{property.title}</h1>

                        <div className="hero-location">
                            <MapPin size={19} />
                            {property.city}, {property.state}
                        </div>
                    </div>

                </div>

            </div>

            {/* MAIN CONTENT */}

            <div className="property-details-layout">

                <main className="property-details-main">

                    {/* PRICE */}

                    <section className="property-price-section">

                        <div>
                            <span className="details-label">
                                Property Price
                            </span>

                            <h2>
                                {formatPrice(property.price)}
                            </h2>
                        </div>

                        <div className="property-tags">

                            <span>
                                <Building2 size={16} />
                                {property.propertyType}
                            </span>

                            <span>
                                <Tag size={16} />
                                {property.listingType}
                            </span>

                        </div>

                    </section>

                    {/* DESCRIPTION */}

                    <section className="details-section">

                        <h2>Description</h2>

                        <p className="property-description">
                            {property.description ||
                                "No description available."}
                        </p>

                    </section>

                    {/* PROPERTY FEATURES */}

                    <section className="details-section">

                        <h2>Property Details</h2>

                        <div className="property-feature-grid">

                            <div className="feature-item">
                                <BedDouble size={24} />
                                <div>
                                    <span>Bedrooms</span>
                                    <strong>
                                        {property.bedrooms ?? 0}
                                    </strong>
                                </div>
                            </div>

                            <div className="feature-item">
                                <Bath size={24} />
                                <div>
                                    <span>Bathrooms</span>
                                    <strong>
                                        {property.bathrooms ?? 0}
                                    </strong>
                                </div>
                            </div>

                            <div className="feature-item">
                                <Maximize size={24} />
                                <div>
                                    <span>Area</span>
                                    <strong>
                                        {property.area ?? 0} sq.ft
                                    </strong>
                                </div>
                            </div>

                            <div className="feature-item">
                                <Home size={24} />
                                <div>
                                    <span>Listing Type</span>
                                    <strong>
                                        {property.listingType}
                                    </strong>
                                </div>
                            </div>

                        </div>

                    </section>

                    {/* LOCATION */}

                    <section className="details-section">

                        <h2>Location</h2>

                        <div className="location-box">

                            <MapPin size={25} />

                            <div>
                                <strong>
                                    {property.address}
                                </strong>

                                <p>
                                    {property.city},{" "}
                                    {property.state},{" "}
                                    {property.country}
                                </p>
                            </div>

                        </div>

                    </section>

                </main>

                {/* OWNER SIDEBAR */}

                <aside className="property-details-sidebar">

                    <div className="owner-card">

                        <h2>Property Owner</h2>

                        <div className="owner-info">

                            <div className="owner-icon">
                                <User size={28} />
                            </div>

                            <div>
                                <span>Owner ID</span>
                                <strong>
                                    #{property.ownerId}
                                </strong>
                            </div>

                        </div>

                        <div className="owner-contact">

                            <div>
                                <Mail size={18} />
                                <span>
                                    {property.ownerEmail ||
                                        "No email available"}
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* ADMIN ACTIONS */}

                    {property.status === "PENDING_APPROVAL" && (

                        <div className="admin-action-card">

                            <h2>Admin Actions</h2>

                            <p>
                                Review this property before
                                publishing it on the platform.
                            </p>

                            <button
                                className="approve-property-button"
                                disabled={actionLoading}
                                onClick={() =>
                                    updatePropertyStatus("approve")
                                }
                            >
                                <Check size={18} />

                                {actionLoading
                                    ? "Processing..."
                                    : "Approve Property"}
                            </button>

                            <button
                                className="reject-property-button"
                                disabled={actionLoading}
                                onClick={() =>
                                    updatePropertyStatus("reject")
                                }
                            >
                                <X size={18} />
                                Reject Property
                            </button>

                        </div>

                    )}

                </aside>

            </div>

        </div>
    );
};

export default AdminPropertyDetails;