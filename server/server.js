const express = require('express');
const app = express();


app.listen(3030, console.log("Client server rodando :3030"))

app.use('/', express.static(__dirname+ '/public'))

// app.get('/', (req, res) =>{

//     let init = path.join(__dirname, 'public', )
//     console.log(init);
//     res.send("Página inicial")

// })