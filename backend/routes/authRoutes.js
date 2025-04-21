const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// REGISTER ROUTE
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ message: "Error creating user" });
    }
    res.status(200).json({ message: "User registered successfully" });
  });
});

// SIGN-IN ROUTE
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Sign-in error:", err);
      return res.status(500).json({ success: false });
    }

    if (results.length > 0) {
      res.status(200).json({
        success: true,
        user_id: results[0].id,
        message: "Sign-in successful",
      });
    } else {
      res.status(200).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// MODIFY PASSWORD ROUTE (Financial Vault)
router.post("/modify-password", (req, res) => {
    const { user_id, type, pin ,identification} = req.body;
  
    if (!user_id || !type || !pin ||!identification) {
      return res.status(400).json({ success:false,message: "All fields are required" });
    }
  
    const checkQuery = "SELECT * FROM financial_passwords WHERE user_id = ? AND type = ? and identification_value = ?";
    db.query(checkQuery, [user_id, type,identification], (err, checkResults) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({success:false, message: "Database error" });
      }
  
      if (checkResults.length > 0) {
        const updateQuery = "UPDATE financial_passwords SET pin = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND type = ? and identification_value = ?";
        db.query(updateQuery, [pin, user_id, type,identification], (err) => {
          if (err) {
            console.error("Error updating password:", err);
            return res.status(500).json({ success:false,message: "Error updating password" });
          }
          res.status(200).json({success:true, message: "Password updated successfully" });
        });
      } else {
        const insertQuery = "INSERT INTO financial_passwords (user_id, type, pin, created_at, updated_at, identification_value) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)";
        db.query(insertQuery, [user_id, type, pin,identification], (err) => {
          if (err) {
            console.error("Error adding password:", err);
            return res.status(500).json({ success:false , message: "Error adding password" });
          }
          res.status(200).json({success:true, message: "Password added successfully" });
        });
      }
    });
  });


// 📌 Show all saved financial passwords of a user
router.post("/get-passwords", (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  const query = `
    SELECT type, pin, updated_at, identification_value 
    FROM financial_passwords 
    WHERE user_id = ?
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    if (results.length > 0) {
      const latest = results.reduce((max, row) =>
        new Date(row.updated_at) > new Date(max) ? row.updated_at : max,
        results[0].updated_at
      );
      
      return res.status(200).json({
        success: true,
        data: results,
        lastModified: new Date(latest).toLocaleString(),
        message: "Passwords fetched successfully",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: [],
        lastModified: "",
        message: "No passwords found for this user",
      });
    }
  });
});

  

// GET ALL MONTHLY FINANCE FOR A USER
router.post("/get-all-monthly-finance", (req, res) => {
    const { user_id } = req.body;

    const query = "SELECT * FROM monthly_finance WHERE user_id = ? ORDER BY month DESC";
    db.query(query, [user_id], (err, result) => {
      if (err) {
        console.error("Fetch error:", err);
        return res.status(500).json({ success: false, message: "Error fetching data" });
      }
    
  
      if (result.length === 0) {
        return res.status(200).json({ success: true, data: [] });
      }
  
      res.status(200).json({ success: true, data: result });
    });
  });

  //monthly_finance
  router.post("/get-monthly-finance", (req, res) => {
    const { user_id, month } = req.body;
  
    console.log("Received user_id:", user_id);
    console.log("Received month:", month);
  
    const query = "SELECT * FROM monthly_finance WHERE user_id = ? AND month = ?";
    db.query(query, [user_id, month], (err, result) => {
      if (err) {
        console.error("Fetch error:", err);
        return res.status(500).json({ success: false, message: "Error fetching data" });
      }
  
      console.log("Query result:", result);
      if (result.length === 0) {
        return res.status(200).json({ success: true, data: [] });
      }
  
      res.status(200).json({ success: true, data: result });
    });
  });
  
  

//add to the money data
router.post("/save-monthly-finance", (req, res) => {
  const { user_id, month, income, expenditure, investment, savings } = req.body;

  // Basic validation
  if (!user_id || !month) {
    return res.status(400).json({ success: false, message: "User ID and month are required." });
  }

  // You can check if the entry already exists (optional)
  const checkQuery = "SELECT * FROM monthly_finance WHERE user_id = ? AND month = ?";
  db.query(checkQuery, [user_id, month], (err, results) => {
    if (err) {
      console.error("Error checking monthly finance:", err);
      return res.status(500).json({ success: false, message: "Database error." });
    }

    if (results.length > 0) {
      // Update existing record
      const updateQuery = `
        UPDATE monthly_finance 
        SET income = ?, expenditure = ?, investment = ?, savings = ?, created_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND month = ?
      `;
      db.query(
        updateQuery,
        [income, expenditure, investment, savings, user_id, month],
        (err) => {
          if (err) {
            console.error("Error updating:", err);
            return res.status(500).json({ success: false, message: "Failed to update record." });
          }
          return res.status(200).json({ success: true, message: "Monthly finance updated." });
        }
      );
    } else {
      // Insert new record
      const insertQuery = `
        INSERT INTO monthly_finance (user_id, month, income, expenditure, investment, savings)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [user_id, month, income, expenditure, investment, savings],
        (err) => {
          if (err) {
            console.error("Error inserting:", err);
            return res.status(500).json({ success: false, message: "Failed to insert record." });
          }
          return res.status(200).json({ success: true, message: "Monthly finance saved." });
        }
      );
    }
  });
});


  
  
module.exports = router;
