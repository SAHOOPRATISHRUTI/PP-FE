import React, { useState, useEffect } from "react";
import { getLocations } from "../api/location";
import LocationCard from "../components/LocationCard";

function Home() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then(res => setLocations(res.data));
  }, []);

  return (
    <div>
      <h1>All Locations</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {locations.map(loc => <LocationCard key={loc._id} location={loc} />)}
      </div>
    </div>
  );
}

export default Home;
