const express = require('express');

const app = express();

app.get('/', (req, res) =>{

    res.send('HOME');

})

app.get('/users', (req, res) =>{

    res.send('USERS');

})

app.listen(3000, console.log("Server is running (3000)..."));