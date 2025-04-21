const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12774451",
  password: "5j4rIBVf3n",
  database: "sql12774451",
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the FreeSQLDatabase successfully");
});

module.exports = connection;
