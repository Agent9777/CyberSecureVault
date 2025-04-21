import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinancialPasswordVault.css";
import { useLocation } from "react-router-dom";

function FinanacialPasswordVault() {
  const navigate = useNavigate();

  const location = useLocation();
  const { user_id } = location.state || {};

  return (
    <>
      <div className="back-container">
        <button
          className="back-button"
          onClick={() => navigate("/vaults", { state: { user_id: user_id } })}
        >
          ⬅ Back
        </button>
      </div>

      <div className="vault-container">
        <div className="form-container">
          <h2>Financial Password Vault</h2>
          <button
            onClick={() =>
              navigate("/financial-password-vault/modify", {
                state: { user_id: user_id },
              })
            }
          >
            ✏️ Modify Password
          </button>

          <button
            onClick={() =>
              navigate("/financial-password-vault/show", {
                state: { user_id: user_id },
              })
            }
          >
            📄 Show Passwords
          </button>
        </div>
      </div>
    </>
  );
}

export default FinanacialPasswordVault;
