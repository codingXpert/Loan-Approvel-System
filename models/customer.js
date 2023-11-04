const conn = require("../config/dbConnection");

function createCustomerTable() {
  const checkExistingTableSql = "SHOW TABLES LIKE 'customers'";
  conn.query(checkExistingTableSql, (err, existingTAble) => {
    if (err) throw err;

    if (existingTAble.length === 0) {
      const createTableSql = `Create TABLE customers
            (
                customer_id INT,
                first_name VARCHAR(30), 
                last_name VARCHAR(30), 
                age INT,
                monthly_income INT,
                approved_limit INT,
                phone_number INT
            )`;
      conn.query(createTableSql, (err, data) => {
        if (err) throw err;
        console.log("Table customers Is Created Successfully");
      });
    }
  });
}
module.exports = createCustomerTable(); 
