import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';
import adm from "../../assets/ADMLOGO.svg";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div>
          <h2 className="sidebar-title">
            <img src={adm} alt="ADM" className="adm-logo" />
            {isOpen && <span className="adm-title">ADM ASSIST</span>}
          </h2>

          <nav>
            <button className="navbar-button" onClick={() => navigate("/chat")}>
              💬 Chat
            </button>
          </nav>

          {/* Static Project Overview */}
          {isOpen && (
            <div className="sidebar-info">
              <h4>📊 Project Features</h4>
              <ul>
                <li>Discrepancy Reports</li>
                <li>Leave Summaries</li>
                <li>HR Query Assistant</li>
                <li>Auto Chart Generation</li>
              </ul>
              <hr />
            </div>
          )}
        </div>

        <p className="sidebar-footer">© 2025 Your Company</p>
      </div>

      {/* Toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>
    </>
  );
}

