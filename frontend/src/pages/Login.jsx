import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
     e.preventDefault();

     const fd = new FormData();
     fd.append("email", email);
     fd.append("password", password);

     const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
       method: "POST",
       body: fd,
     });

     if (!res.ok) {
        alert("Invalid login");
        return;
     }

     const data = await res.json();

     // ⭐ Debug message
     console.log("Login success, navigating…");

     // ⭐ Save token
     localStorage.setItem("token", data.access_token);

     // ⭐ Update state
     setLoggedIn(true);

     // ⭐ Redirect to dashboard
     navigate("/create");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Login</h1>

      <form onSubmit={loginUser} style={{ width: 400, margin: "auto" }}>
        <input
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <button style={{ width: "100%", padding: 10 }}>Login</button>
      </form>
    </div>
  );
}
