const conn = require("../config/dbConnection");

function createCustomerTable() {
  const checkExistingTableSql = "SHOW TABLES LIKE 'customers'";
  conn.query(checkExistingTableSql, (err, existingTable) => {
    if (err) throw err;

    if (existingTable.length === 0) {
      const createTableSql = `Create TABLE customers
            (
                customer_id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                age INT NOT NULL,
                monthly_income INT NOT NULL,
                approved_limit INT NOT NULL DEFAULT 0,
                phone_number BIGINT NOT NULL 
            )`;
      conn.query(createTableSql, (err, data) => {
        if (err) throw err;
        console.log("Table customers Is Created Successfully");
      });
    }
  });
}
module.exports = createCustomerTable(); 
