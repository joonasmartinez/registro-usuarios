const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nodeprojectjonas.texk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    (error) =>{
        if(error){
            return console.log("Error on connect: ",error)
        }

        return console.log("Connection sucessfull!");

    })

}

module.exports = connectToDatabase;