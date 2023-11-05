const conn = require("../config/dbConnection");

// Inserting loan data
const loanData = (req, res) => {
  const {
    customer_id,
    loan_amount,
    tenure,
    interest_rate,
    monthly_payment,
    "EMIs paid on Time": EMIs_paid_on_Time,
    start_date,
    end_date,
  } = req.body;

  //checking if the customer loan data already exist
  const checkExistingLoanData = "SELECT * FROM loans WHERE customer_id = ?";
  conn.query(checkExistingLoanData, [customer_id], (err, existingLoan) => {
    if (err) {
      console.log("Error checking existing loan!", err);
      return res.status(500).send({ error: "Check For Existing Loan failed!" });
    } else if (existingLoan.length > 0) {
      return res.status(400).send({ message: "User loan data already exist" ,existingLoan});

      // saving loan data in db
    } else {
      const insertLoan = "INSERT INTO loans(customer_id,loan_amount,tenure,interest_rate,monthly_payment,\`EMIs paid on Time\`,start_date, end_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
      conn.query(insertLoan, [customer_id, loan_amount, tenure, interest_rate, monthly_payment, EMIs_paid_on_Time, start_date, end_date], (err, data) => {
        if(err){
            console.log("Error saving customer's loan data", err);
            return res.status(500).send({error: 'Saving Loan Data Failed'});
        }else{
            console.log("Loan data saved successfully");

            //fetching customer's loan data
            const customerLoanData = checkExistingLoanData;
            conn.query(customerLoanData, [customer_id], (err, data) => {
                if(err){
                    console.log("error getting customer's loan data", err);
                    return res.status(500).send({error: "Error getting customer's loan data"});
                }else{
                    return res.status(201).send({message: 'Loan data saved successfully', loanData: data});
                }
            })
        }
      });
    }
  });
};

module.exports = {loanData};