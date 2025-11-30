import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default function Heatmap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("heatmap").setView([20, 78], 5);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    fetch("http://127.0.0.1:8000/api/issues/all")
      .then(r => r.json())
      .then(issues => {
        const points = issues
          .filter(i => i.lat && i.lng)
          .map(i => [i.lat, i.lng, i.severity ? i.severity / 5 : 0.5]);

        L.heatLayer(points, { radius:30 }).addTo(map);
      });
  }, []);

  return (
    <div style={{ padding:20 }}>
      <h2>Heatmap</h2>
      <div id="heatmap" style={{ height:"500px" }}></div>
    </div>
  );
}
