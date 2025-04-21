import React from "react";
import { useNavigate } from "react-router-dom";
import "./vaultsection.css";
import { useLocation } from "react-router-dom";

function VaultSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = location.state || {};

  return (
    <>
      <div className="back-container">
        <button className="back-button" onClick={() => navigate("/sign-in")}>
          ⬅ Back
        </button>
      </div>
      <div className="vault-container">
        <div className="form-container">
          <h2>Vault Section</h2>
          <button
            onClick={() =>
              navigate("/financial-password-vault", {
                state: { user_id: user_id },
              })
            }
          >
            🔐 Financial Passwords Vault
          </button>
          <button
            onClick={() =>
              navigate("/monthly-finance-vault", {
                state: { user_id: user_id },
              })
            }
          >
            📅 Monthly Finance Vault
          </button>
        </div>
      </div>
    </>
  );
}

export default VaultSection;
