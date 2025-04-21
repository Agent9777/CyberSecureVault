import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SignIn.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function Show1() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = location.state || {};

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setMonth(currentMonth);
    fetchData(currentMonth);
  }, []);

  const fetchData = async () => {
    setError("");

    try {
      const res = await axios.post(`${apiUrl}/api/auth/get-monthly-finance`, {
        user_id,
        month,
      });
      if (res.data.success && res.data.data) {
        console.log("success");
        console.log(res.data.data[0]);
        setData(res.data.data[0]);
      } else {
        setError(res.data.message || "No data found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching data.");
    }
  };

  const handleFetch = () => {
    if (!month) {
      setError("Please select a month.");
      return;
    }
    fetchData();
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
        <h2>📆 Monthly Finance Details</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>Select Month: </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <button onClick={handleFetch} style={{ marginLeft: "10px" }}>
            Show
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Directly check if `data` is available */}
        {!data ? (
          <p>No data available.</p>
        ) : (
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
              <tr>
                <td>{data.month || "N/A"}</td>
                <td>{data.income || "N/A"}</td>
                <td>{data.expenditure || "N/A"}</td>
                <td>{data.investment || "N/A"}</td>
                <td>{data.savings || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Show1;
