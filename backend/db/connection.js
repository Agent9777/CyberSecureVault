const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",  // MySQL server host
  user: "root",       // MySQL username
  password: "Sssddd1@2345",  // Correct password for MySQL
  database: "fdb",  // Your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

module.exports = connection;  // Export the connection
