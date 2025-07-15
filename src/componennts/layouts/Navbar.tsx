import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/UPS_Logo.svg";
import logout from "../../assets/Logout.svg";
import ProfilePanel from "../ProfilePanel"; // we'll create this

export default function Navbar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>

        <div className="navbar-right">
          <button className="navbar-button" onClick={() => setShowProfile(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
            </svg>
          </button>
          <button className="navbar-button">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
    style={{ marginRight: '8px' }} // ✅ correct inline style
  >
    <path d="M16 13v-2H7V8l-5 4 5 4v-3h9z" />
    <path d="M20 3H10c-1.1 0-2 .9-2 2v4h2V5h10v14H10v-4H8v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
</button>

        </div>
      </header>

      {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}
    </>
  );
}
