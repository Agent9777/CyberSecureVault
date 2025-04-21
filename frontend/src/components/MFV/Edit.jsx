import React, { useState } from "react";
import axios from "axios";
import "../SignIn.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function Edit() {
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expenditure, setExpenditure] = useState("");
  const [investment, setInvestment] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = location.state || {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const savings = income - expenditure - investment;

    try {
      const res = await axios.post(`${apiUrl}/api/auth/save-monthly-finance`, {
        user_id,
        month,
        income,
        expenditure,
        investment,
        savings,
      });

      if (res.data.success) {
        setMessage("Finance details saved successfully.");
      } else {
        setMessage("Error saving details.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
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
      <div className="form-container">
        <h2>Monthly Finance Edit</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Month:</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />

            <label>Income:</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />

            <label>Expenditure:</label>
            <input
              type="number"
              value={expenditure}
              onChange={(e) => setExpenditure(e.target.value)}
              required
            />

            <label>Investment:</label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              required
            />
            <button type="submit">Save</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Edit;
