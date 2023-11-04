const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.LOCALHOST,
  user: process.env.USER,
  password: process.env.PASSWORD
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
  con.query("CREATE DATABASE creditApproval", (err, result) => {
    if (err) throw err;
    console.log("Database Created!");
  });
});

module.exports = con;
