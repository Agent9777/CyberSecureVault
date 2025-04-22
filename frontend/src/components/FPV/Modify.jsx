import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function Modify() {
  const [type, setType] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false); // Toggle for PIN visibility
  const [identification, setIdentidication] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = location.state || {};

  const handleModify = async (e) => {
    e.preventDefault();
    setError("");

    // Check if type or pin fields are empty
    if (!type || !pin) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/api/auth/modify-password`, {
        type,
        pin,
        user_id,
        identification,
      });
      console.log(res.message);

      if (res.data.success) {
        setType("");
        setPin("");
        setIdentidication(""); // Clear pin field
        navigate("/financial-password-vault", { state: { user_id: user_id } }); // Redirect to the vault page
      } else {
        setError(res.data.message); // Show error message if any
      }
    } catch (err) {
      setError("Failed to save password. Please try again.");
      console.error("Error modifying password:", err);
    }
  };

  return (
    <>
      <div className="back-container">
        <button
          className="back-button"
          onClick={() =>
            navigate("/financial-password-vault", {
              state: { user_id: user_id },
            })
          }
        >
          ⬅ Back
        </button>
      </div>
      <div className="form-container">
        <h2>Modify or Add Password</h2>
        <form onSubmit={handleModify}>
          {/* Select Type */}
          <label htmlFor="type">Select Type: </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="BankAccount">Bank Account</option>
            <option value="GooglePay">Google Pay</option>
            <option value="PhonePePIN">PhonePe PIN</option>
            <option value="CreditCardPIN">Credit Card PIN</option>
            <option value="DebitPin">Debit PIN</option>
          </select>

          <div>
            <input
              type="text"
              placeholder={`Enter ${type} ID`}
              value={identification}
              onChange={(e) => setIdentidication(e.target.value)}
              required
            />
            <input
              type={showPin ? "text" : "password"} // Toggle pin visibility
              placeholder="Enter Password / PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)} // Toggle show/hide
            >
              {showPin ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="error">{error}</p>}

          {/* Submit Button */}
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default Modify;
