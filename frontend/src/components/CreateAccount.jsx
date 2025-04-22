import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../app.css";

const apiUrl = import.meta.env.VITE_API_URL;

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [setPassword, setSetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (setPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Email pattern check for Gmail or .ac.in domain
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError(
        "Invalid email formaOops! That doesn't look like a valid email address. Please try again"
      );
      return;
    }

    try {
      // Sending POST request to register user
      await axios.post(`${apiUrl}/api/auth/register`, {
        email,
        password: setPassword,
      });

      console.log("Account created, navigating to sign in page...");

      // Navigate to Sign In page
      navigate("/sign-in"); // Ensure this route is correct and exists in your router
    } catch (err) {
      setError("Failed to create account.");
      console.error(err);
    }
  };

  return (
    <div className="create-account-wrapper">
      <div className="create-account-container">
        <h2 className="create-account-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="create-account-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <br />

          {/* Password Input with Show/Hide Toggle */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Set Password"
              value={setPassword}
              onChange={(e) => setSetPassword(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <br />

          {/* Confirm Password Input with Show/Hide Toggle */}
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-password-btn"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          <br />

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
