import { useState } from "react";

const CATEGORIES = ["auto", "Pothole", "Streetlight", "Garbage", "Water Leak", "Other"];

export default function CreateIssue() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("auto");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        alert("Location captured");
      },
      (err) => {
        alert("Unable to get location: " + err.message);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description) {
      alert("Please select an image and enter a description");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);        // ✅ FIXED (image not file)
    formData.append("description", description);
    formData.append("category", category);
    formData.append("lat", lat);
    formData.append("lng", lng);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/issues/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Created:", data);

      // ✅ SAFETY CHECK
      if (!data.id) {
        alert("Server error: No issue ID returned");
        return;
      }

      alert("Issue Submitted! ID: " + data.id);

      // reset form
      setDescription("");
      setFile(null);
      setCategory("auto");
      setLat("");
      setLng("");
      document.querySelector('input[type="file"]').value = "";

    } catch (err) {
      console.error("Submit failed:", err);
      alert("Failed to submit issue");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Issue</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Image</label><br />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div style={{ marginTop: 8 }}>
          <label>Description</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{ width: 400 }}
          />
        </div>

        <div style={{ marginTop: 8 }}>
          <label>Category</label><br />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "auto" ? "Auto (detect)" : c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 8 }}>
          <button type="button" onClick={useMyLocation}>Use my location</button>
          <div style={{ marginTop: 6 }}>
            <input placeholder="lat" value={lat} readOnly style={{ marginRight: 6 }} />
            <input placeholder="lng" value={lng} readOnly />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit">Submit Issue</button>
        </div>
      </form>
    </div>
  );
}
