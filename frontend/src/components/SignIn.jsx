import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
const apiUrl = import.meta.env.VITE_API_URL;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    // Email pattern check for Gmail or .ac.in domain

    try {
      const res = await axios.post(`${apiUrl}/api/auth/signin`, {
        email,
        password,
      });

      if (res.data.success) {
        navigate("/vaults", { state: { user_id: res.data.user_id } }); // Redirect to the vaults page on successful sign-in
      } else {
        setError("Invalid email or password.");
        console.log("else");
      }
    } catch (err) {
      setError("Invalid email or password.");
      console.log("error");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="inputs">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
            />
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle show/hide
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Sign In</button>
          <button type="button" onClick={() => navigate("/create-account")}>
            Not Registered? Create new Account
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
