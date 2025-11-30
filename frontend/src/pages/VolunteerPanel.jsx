// frontend/src/pages/VolunteerPanel.jsx
import { useState } from "react";

export default function VolunteerPanel() {
  const [volId, setVolId] = useState("");
  const [status, setStatus] = useState("");

  const updateLoc = () => {
    if (!volId || isNaN(Number(volId))) {
      alert("Enter a valid volunteer ID (number).");
      return;
    }
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    setStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(async (p) => {
      const form = new FormData();
      form.append("lat", p.coords.latitude);
      form.append("lng", p.coords.longitude);
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/issues/volunteers/${volId}/location`, {
          method: "POST",
          body: form,
        });
        if (!res.ok) throw new Error("Update failed");
        setStatus("Location updated successfully.");
        alert("Location updated.");
      } catch (err) {
        console.error(err);
        setStatus("Update failed.");
        alert("Failed to update location. See console.");
      }
    }, (err) => {
      setStatus("Geolocation permission denied or error.");
      alert("Geolocation error: " + err.message);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Volunteer Panel</h2>
      <div>
        <input placeholder="Volunteer ID" value={volId} onChange={(e) => setVolId(e.target.value)} />
        <button onClick={updateLoc} style={{ marginLeft: 8 }}>Update My Location</button>
      </div>
      <div style={{ marginTop: 8 }}>{status}</div>
    </div>
  );
}
