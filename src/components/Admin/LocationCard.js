import React from "react";
import { Link } from "react-router-dom";

function LocationCard({ location }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
      <img src={location.coverImage} alt={location.title} style={{ width: "100%" }} />
      <h3>{location.title}</h3>
      <p>{location.description.substring(0, 80)}...</p>
      <Link to={`/location/${location.slug}`}>View Details</Link>
    </div>
  );
}

export default LocationCard;
