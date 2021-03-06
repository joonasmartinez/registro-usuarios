const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    saldo:{
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;