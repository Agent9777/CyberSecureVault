import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SignIn.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Show() {
  const [passwords, setPasswords] = useState([]);
  const [lastModified, setLastModified] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { user_id } = location.state || {};

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.post(
          "https://cyber-secure-vault-ko89.vercel.app//api/auth/get-passwords",
          {
            user_id,
          }
        );
        if (res.data.success) {
          setPasswords(res.data.data);
          setLastModified(res.data.lastModified);
        }
      } catch (err) {
        console.error("Error fetching passwords:", err);
      }
    };

    fetchPasswords();
  }, []);

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

      <div className="table-container">
        <h2>Your Saved Financial Passwords</h2>
        {passwords.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Password / PIN</th>
                  <th>ID</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {passwords.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.type}</td>
                    <td>{item.pin}</td>
                    <td>{item.identification_value}</td>
                    <td>{new Date(item.updated_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="last-modified">Last Modified: {lastModified}</p>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </>
  );
}

export default Show;
