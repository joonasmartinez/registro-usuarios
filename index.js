const express = require('express');
const cors = require('cors');
const UserModel = require('./src/models/user.model')
const dotenv = require('dotenv');
const connectToDatabase = require('./src/database/connect');
//const { json } = require('express/lib/response');

dotenv.config();

connectToDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) =>{ // MIDDLEWARE (função a ser executada antes de qualquer requisição.)

    console.log(`Information: Used method '${req.method}' in your project.`);
    if(req.method == "POST"){
        console.log(`Information Body: 
        ==== INNIT BODY =====

        'Novo cadastro: 
        user: ${JSON.stringify(req.body.user)}
        saldo: ${JSON.stringify(req.body.saldo)}'

        ==== ENDS BODY =====.`);
    }
    
    next();

}); 

 


app.get('/', (req, res) =>{

    res.send("Welcome to API RESTful");

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

app.listen(3000, console.log("Server back end is running (3000)..."));