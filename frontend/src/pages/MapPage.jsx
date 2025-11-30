import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [issues, setIssues] = useState([]);

  // Load issues + create map
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/issues/all")
      .then(res => res.json())
      .then(data => setIssues(data))
      .catch(err => console.error("Error loading issues:", err));

    const map = L.map("map").setView([20.0, 78.0], 5);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    return () => map.remove();
  }, []);

  // Add markers when issues load
  useEffect(() => {
    if (!mapRef.current) return;

    issues.forEach(issue => {
      if (issue.lat && issue.lng) {
        const marker = L.marker([issue.lat, issue.lng])
          .addTo(mapRef.current)
          .bindPopup(`<b>ID: ${issue.id}</b><br>${issue.description}`);

        markersRef.current[issue.id] = marker;
      }
    });
  }, [issues]);

  const zoomToIssue = (issue) => {
    const marker = markersRef.current[issue.id];
    if (marker) {
      mapRef.current.setView([issue.lat, issue.lng], 15);
      marker.openPopup();
    }
  };

  return (
    <div style={{ display: "flex", height: "90vh" }}>
      
      {/* LEFT LIST */}
      <div style={{
        width: "28%",
        borderRight: "2px solid #ccc",
        padding: "15px",
        overflowY: "scroll",
        background: "#f3f3f3"
      }}>
        <h2>Issues</h2>

        {issues.map(issue => (
          <div
            key={issue.id}
            onClick={() => zoomToIssue(issue)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              background: "white"
            }}
          >
            <b>ID:</b> {issue.id} <br />
            <b>Description:</b> {issue.description} <br />
            <b>Category:</b> {issue.category} <br />
            {issue.lat && issue.lng && (
              <div><b>Location:</b> {issue.lat}, {issue.lng}</div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT MAP */}
      <div style={{ width: "72%", height: "100%" }}>
        <div id="map" style={{ height: "100%", width: "100%" }}></div>
      </div>

    </div>
  );
}
