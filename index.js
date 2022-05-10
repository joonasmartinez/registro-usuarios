const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require('./src/models/user.model')
const path = require('path');

const dotenv = require('dotenv');
const connectToDatabase = require('./src/database/connect');
//const { json } = require('express/lib/response');

dotenv.config();

connectToDatabase();

const app = express();

app.use(express.json());

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next) => {
    const {user, saldo} = req.body
    console.log({user, saldo})
    res.header("Access-Control-Allow-Origin", "*")
    next();
  })
// app.use((req, res, next) =>{ // MIDDLEWARE (função a ser executada antes de qualquer requisição.)

//     console.log(`Information: Used method '${req.method}' in your project.`);
//     if(req.method == "POST"){
//         console.log(`Information Body: 
//         ==== INNIT BODY =====

//         'OBJETO: ${JSON.stringify(req.body)}'

//         ==== ENDS BODY =====.`);
//     }
    
//     next();

// }); 

 


app.get('/', (req, res) =>{

    try {
        res.redirect(200, "http://localhost:3030/")
    } catch (error) {
        res.status(500).send("Erro: "+error.message)
    }

})


app.get('/users', async (req, res) =>{


    try{
        
        const user = await UserModel.find()
        res.status(200).json(user)

    } catch(error){

        return res.status(500).send(error,message);

    }


})

app.get('/users/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const user = await UserModel.findById(id);
        return res.status(200).send(user);
    } catch ( error ){
        res.status(500).send(error.message);
    }

})

app.post('/users', async (req, res) =>{

    try{
        
        const user = await UserModel.create(req.body);
        res.status(201).json(user);

    } catch(error){
        res.status(500).send(error.message);
    };

})

app.patch('/users/:id', async (req, res) =>{

    try {

        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate(id, req.body, {new:true})

        res.status(200).json(user);
        
    } catch (error) {

        res.status(500).send(error.message);
        
    }
})

app.delete('/users/:id', async (req, res) =>{

    try {

        const id = req.params.id;
        const user = await UserModel.findByIdAndRemove(id);

        res.status(200).json(user);
        
    } catch (error) {

        res.status(500).send(error.message);
        
    }
})

app.listen(3000, console.log("Server is running (3000)..."));