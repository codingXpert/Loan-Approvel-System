const conn = require('../config/dbConnection');

function createLoanTable() {
    const checkExistingTable = "SHOW TABLEs LIKE 'loans'";
    conn.query(checkExistingTable, (err, existingTable) => {
        if(err) throw err;

        if(existingTable.length === 0){
            const createTable = `CREATE TABLE loans
            (
                customer_id INT NOT NULL,
                loan_id INT AUTO_INCREMENT PRIMARY KEY,
                loan_amount FLOAT NOT NULL,
                tenure INT NOT NULL,
                interest_rate FLOAT NOT NULL,
                monthly_payment FLOAT NOT NULL,
                \`EMIs paid on Time\` INT NOT NULL,     /*creating column with space separated*/
                start_date DATE NOT NULL,
                end_date DATE NOT NULL 
            )`;
            
            conn.query(createTable, (err, data) => {
                if(err) throw err;
                console.log('Table loans Is Created Successfully');
            });
        }
    });
} 

module.exports = createLoanTable();