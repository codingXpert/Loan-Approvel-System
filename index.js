const express = require('express');
const dotenv = require('dotenv/config');
const db = require('./config/dbConnection');
const app = express();
const PORT = process.env.port || 8000;
const table = require('./models/customer');
const routes = require('./routes')

app.use(express.json());
app.use("/", routes);


app.listen(PORT, (err) => {
    if(err){
        console.log(`Error while running the server ${err}`);
    }else{
        console.log(`Server is running on the port ${PORT}`);
    }
});