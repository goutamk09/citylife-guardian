// frontend/src/pages/ViewIssues.jsx
import { useEffect, useState } from "react";

export default function ViewIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/issues/all")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      })
      .catch((err) => console.error("Failed to load issues", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reported Issues</h2>

      {issues.length === 0 && <p>No issues found.</p>}

      {issues.map((issue) => (
        <div key={issue.id} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px", borderRadius: 8 }}>
          <p><strong>ID:</strong> {issue.id}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Category:</strong> {issue.category}</p>
          <p><strong>Status:</strong> {issue.status}</p>
          {issue.lat && issue.lng && (
            <p><strong>Location:</strong> {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}</p>
          )}
          <img
          src={`http://127.0.0.1:8000${issue.image_url}`}
          alt="issue"
          width="220"
          style={{ marginTop: 10 }}
         />


        </div>
      ))}
    </div>
  );
}
