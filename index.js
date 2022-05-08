const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./src/database/connect')

dotenv.config();
connectToDatabase();

const app = express();


app.get('/', (req, res) =>{

    res.contentType("application/html")
    res.status(200).send("<h3>Home page</h3>")

})

app.get('/users', (req, res) =>{

    const user = [
        {
            name:"Jonas",
            saldo: 1500
        },
        {
            name:"Francisco",
            saldo:2000
        }
]

    res.status(200).json(user);


})

app.listen(3000, console.log("Server is running (3000)..."));