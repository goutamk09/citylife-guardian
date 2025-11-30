// frontend/src/pages/Admin.jsx
import { useEffect, useState } from "react";

export default function Admin() {
  const [issues, setIssues] = useState([]);

  const load = () => {
    fetch("http://127.0.0.1:8000/api/issues/all")
      .then(res => res.json())
      .then(data => setIssues(data));
  };

  useEffect(load, []);

  const changeStatus = async (id, status) => {
    const form = new FormData();
    form.append("status", status);
    const res = await fetch(`http://127.0.0.1:8000/api/issues/admin/issues/${id}/status`, {
      method: "PATCH",
      body: form,
    });
    if (res.ok) load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin — Issues</h2>
      {issues.map(i => (
        <div key={i.id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
          <div><strong>{i.id}</strong> — {i.description}</div>
          <div>Category: {i.category} | Status: {i.status}</div>
          <div style={{ marginTop: 6 }}>
            <button onClick={() => changeStatus(i.id, "in_progress")}>In Progress</button>
            <button onClick={() => changeStatus(i.id, "fixed")} style={{ marginLeft: 6 }}>Mark Fixed</button>
            <button onClick={() => changeStatus(i.id, "rejected")} style={{ marginLeft: 6 }}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
