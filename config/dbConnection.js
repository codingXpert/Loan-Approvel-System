const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.LOCALHOST,
  port: process.env.DB_PORT,
  database:process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected with DB creditApproval");
});

module.exports = con;
