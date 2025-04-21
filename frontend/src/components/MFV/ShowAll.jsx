import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SignIn.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ShowAll() {
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const { user_id } = location.state || {};

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/get-all-monthly-finance",
        {
          user_id,
        }
      );

      if (res.data.success && res.data.data && res.data.data.length > 0) {
        setAllData(res.data.data);
      } else {
        setError("No data available.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="back-container">
        <button
          className="back-button"
          onClick={() =>
            navigate("/monthly-finance-vault", { state: { user_id: user_id } })
          }
        >
          ⬅ Back
        </button>
      </div>
      <div className="table-container">
        <h2>📊 All Monthly Finance Records</h2>

        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : allData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expenditure</th>
                <th>Investment</th>
                <th>Savings</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.month || "N/A"}</td>
                  <td>{item.income || "N/A"}</td>
                  <td>{item.expenditure || "N/A"}</td>
                  <td>{item.investment || "N/A"}</td>
                  <td>{item.savings || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </>
  );
}

export default ShowAll;
