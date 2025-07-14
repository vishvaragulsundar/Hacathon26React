import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div>
          <h2>💬 ChatBot</h2>
          <nav>
            <button className="navbar-button" onClick={() => navigate("/chat")}>
              Chat
            </button>
          </nav>
        </div>
        <p className="sidebar-footer">
          © 2025 Your Company
        </p>
      </div>

      {/* Toggle button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "❮" : "❯"}
      </button>
    </>
  );
}
