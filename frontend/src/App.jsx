import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreateIssue from "./pages/CreateIssue";
import ViewIssues from "./pages/ViewIssues";
import MapPage from "./pages/MapPage";
import Heatmap from "./pages/Heatmap";
import AdminPage from "./pages/AdminPage";
import VolunteerRegister from "./pages/VolunteerRegister";
import VolunteerPanel from "./pages/VolunteerPanel";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Routes>

        {/* LOGIN ALWAYS AVAILABLE */}
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

        {/* PROTECTED ROUTES */}
        {loggedIn ? (
          <>
            <Route path="/" element={<CreateIssue />} />
            <Route path="/create" element={<CreateIssue />} />
            <Route path="/issues" element={<ViewIssues />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/heatmap" element={<Heatmap />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/volunteer-reg" element={<VolunteerRegister />} />
            <Route path="/volunteer-panel" element={<VolunteerPanel />} />
          </>
        ) : (
          <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
        )}

      </Routes>
    </BrowserRouter>
  );
}
