import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const goToSignIn = () => navigate("/sign-in");
  const goToCreateAccount = () => navigate("/create-account");
  const goToFinancialNews = () => navigate("/financial-news");
  const goToThreatIntelligence = () => navigate("/threat-intelligence");
  const goToMalwareDetection = () => navigate("/malware-detection");
  const goToAbout = () => navigate("/about");
  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            className="glitch-header"
          >
            <span className="left">Cyber</span>
            <span className="middle">Secure</span>
            <span className="right">Vault</span>
          </h1>
        </div>

        <nav className="nav">
          <ul>
            <li onClick={goToAbout} style={{ cursor: "pointer" }}>
              About Us
            </li>
            <li onClick={goToFinancialNews} style={{ cursor: "pointer" }}>
              Financial News
            </li>
            <li onClick={goToThreatIntelligence} style={{ cursor: "pointer" }}>
              Threat Intelligence
            </li>
            <li onClick={goToMalwareDetection} style={{ cursor: "pointer" }}>
              Malware Detection
            </li>
            <li onClick={goToSignIn} style={{ cursor: "pointer" }}>
              Sign In
            </li>
            <li onClick={goToCreateAccount} style={{ cursor: "pointer" }}>
              Create Account
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
