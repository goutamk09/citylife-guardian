// frontend/src/pages/VolunteerRegister.jsx
import { useState } from "react";

export default function VolunteerRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const trimmed = phone.trim();
    if (!/^\d{10}$/.test(trimmed)) {
      alert("Please enter a 10-digit phone number (digits only).");
      return;
    }
    const form = new FormData();
    form.append("name", name);
    form.append("phone", trimmed);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/issues/volunteers/register", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Register failed");
      const j = await res.json();
      alert("Registered volunteer id: " + j.volunteer_id + ". Save this ID to update your location.");
    } catch (err) {
      console.error(err);
      alert("Registration failed. See console for details.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Volunteer Register</h2>
      <form onSubmit={register}>
        <div>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <input placeholder="Phone (10 digits)" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
