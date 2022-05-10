const express = require('express');
const path = require("path");

const app = express();


app.listen(3030, console.log("Server index running"))
app.use((req, res, next) =>{
    console.log(__dirname+'/public')
    next();
})
app.use('/', express.static(__dirname+ '/public'))

// app.get('/', (req, res) =>{

//     let init = path.join(__dirname, 'public', )
//     console.log(init);
//     res.send("Página inicial")

// })