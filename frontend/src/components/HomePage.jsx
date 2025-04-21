import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToSignIn = () => navigate("/sign-in");
  const goToCreateAccount = () => navigate("/create-account");
  const goToFinancialNews = () => navigate("/financial-news");
  const goToThreatIntelligence = () => navigate("/threat-intelligence");
  const goToMalwareDetection = () => navigate("/malware-detection");
  const goToAbout = () => navigate("/about");

  return (
    <div className="home-container">
      <div className="content">
        <h2 className="animated-text">
          <span className="left">Welcome </span>
          <span className="middle">to</span>
          <span className="right"> CyberSecure Vault</span>
        </h2>

        <p>
          Protect your financial data with cutting-edge security tools, malware
          detection, and real-time cyber threat monitoring.
        </p>
      </div>

      <div className="button-container">
        <button onClick={goToSignIn}>Sign In</button>
        <button onClick={goToCreateAccount}>Create Account</button>
      </div>

      <section className="cards">
        <div className="card" onClick={goToAbout} style={{ cursor: "pointer" }}>
          <h3>About Us</h3>
          <p>
            We are a leading cybersecurity platform dedicated to financial data
            safety using military-grade encryption and intelligent threat
            detection systems.
          </p>
        </div>

        <div
          className="card"
          onClick={goToFinancialNews}
          style={{ cursor: "pointer" }}
        >
          <h3>Financial News</h3>
          <p>
            Stay updated with the latest financial cybersecurity news, data
            breaches, and protection tips curated by industry experts.
          </p>
        </div>

        <div
          className="card"
          onClick={goToMalwareDetection}
          style={{ cursor: "pointer" }}
        >
          <h3>Malware Detection</h3>
          <p>
            Use our AI-powered malware scanner to detect and quarantine threats
            before they compromise your data.
          </p>
        </div>

        <div
          className="card"
          onClick={goToThreatIntelligence}
          style={{ cursor: "pointer" }}
        >
          <h3>Threat Intelligence</h3>
          <p>
            Gain insights into current cyber threats using real-time feeds and
            alerts on suspicious activity worldwide.
          </p>
        </div>

        <div className="card">
          <h3>📞 Contact Support</h3>
          <p>
            Need help? Reach out to us via phone: +1 123-456-7890 or email:
            support@financedata.com
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-nav">
          <ul className="list">
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
          </ul>
        </div>
        <div className="contact-info">
          <p>📞 Contact Support: +1 123-456-7890</p>
          <p>📧 Email: support@financedata.com</p>
        </div>
        <p>© 2025 CyberSecure Vault. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
