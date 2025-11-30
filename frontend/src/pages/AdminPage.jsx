// frontend/src/pages/AdminPage.jsx
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [issues, setIssues] = useState([]);

  const loadIssues = () => {
    fetch("http://127.0.0.1:8000/api/issues/all")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error loading issues:", err));
  };

  const updateStatus = (id, status) => {
    fetch(`http://127.0.0.1:8000/api/issues/update-status/${id}?status=${status}`, {
      method: "PUT",
    })
      .then(() => loadIssues())
      .catch((err) => console.error("Status update error:", err));
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin — Issues</h2>

      {issues.map((issue) => (
        <div
          key={issue.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
            background: "#fff",
          }}
        >
          <b>ID:</b> {issue.id}<br/>
          <b>Description:</b> {issue.description}<br/>
          <b>Status:</b> {issue.status}<br/><br/>

          {/* ⭐ Buttons */}
          <button onClick={() => updateStatus(issue.id, "open")}>Open</button>
          <button onClick={() => updateStatus(issue.id, "in-progress")} style={{ marginLeft: 5 }}>
            In-Progress
          </button>
          <button onClick={() => updateStatus(issue.id, "rejected")} style={{ marginLeft: 5 }}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
