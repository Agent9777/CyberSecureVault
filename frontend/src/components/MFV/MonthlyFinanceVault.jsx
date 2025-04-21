import React from "react";
import { useNavigate } from "react-router-dom";
import "../SignIn.css";
import { useLocation } from "react-router-dom";

function MonthlyFinanceVault() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = location.state || {};

  return (
    <>
      <div className="back-container">
        <button className="back-button" onClick={() => navigate("/vaults")}>
          ⬅ Back
        </button>
      </div>
      <div className="mfv-container">
        <h2>🧾 Monthly Finance Vault</h2>
        <div className="mfv-buttons">
          <button
            onClick={() =>
              navigate("/monthly-finance-vault/edit", {
                state: { user_id: user_id },
              })
            }
          >
            Edit
          </button>
          <button
            onClick={() =>
              navigate("/monthly-finance-vault/show1", {
                state: { user_id: user_id },
              })
            }
          >
            Show
          </button>
          <button
            onClick={() =>
              navigate("/monthly-finance-vault/showall", {
                state: { user_id: user_id },
              })
            }
          >
            Show All
          </button>
        </div>
      </div>
    </>
  );
}

export default MonthlyFinanceVault;
