const conn = require('../config/dbConnection');

//Register Customer
const register = async(req, res) => {
    const { first_name, last_name, age, monthly_income, phone_number } = req.body;

    // Checking if the customer already exist
    const checkExistingCustomerSql = 'SELECT * FROM customers WHERE phone_number = ?';
    conn.query(checkExistingCustomerSql, [phone_number], (err, result) => {
        if(err){
            console.log('Error checking customer!', err);
            return res.status(500).send({error: 'User check failed!'});
        }else if(result.length > 0) {
            return res.status(400).send({error: 'User with the same phone number already exist'});

    // creating new customer
        }else{
            const approved_limit = 36*monthly_income;
            const insertCustomerSql = 'INSERT INTO customers (first_name, last_name, age, monthly_income,approved_limit, phone_number) VALUES (?, ?, ?, ?, ?, ?)';
            conn.query(insertCustomerSql,[first_name, last_name, age, monthly_income,approved_limit, phone_number], async(err, data) => {
                if(err){
                    console.log('Error Registering Customer',err);
                    return res.status(500).send({error: 'Customer Registration Failed'});
                }else{
                    console.log('Customer Registered Successfully');

                    //fetching the details of the new registered customer
                    const getCustomerSql = checkExistingCustomerSql;
                    conn.query(getCustomerSql, [phone_number], (err, result) => {
                        if(err){
                            console.log('error getting customer data', err);
                            return res.status(500).send({error: 'Error getting customer data'});
                        }else{
                            return res.status(201).send({message: 'Customer Registered Successfully', customerData: result});
                        }
                    })
                }
            })  
        }
    })
}

module.exports = {
    register
}