import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div style={{
      background: "#ccc",
      padding: "10px",
      display: "flex",
      gap: "10px"
    }}>

      {!loggedIn && (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}

      {loggedIn && (
        <>
          <Link to="/create"><button>Create Issue</button></Link>
          <Link to="/issues"><button>View Issues</button></Link>
          <Link to="/map"><button>Map</button></Link>
          <Link to="/heatmap"><button>Heatmap</button></Link>
          <Link to="/admin"><button>Admin</button></Link>
          <Link to="/volunteer-reg"><button>Volunteer Reg</button></Link>
          <Link to="/volunteer-panel"><button>Volunteer Panel</button></Link>

          <button onClick={logout} style={{ background: "red" }}>Logout</button>
        </>
      )}
    </div>
  );
}
