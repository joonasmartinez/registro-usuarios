const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    saldo:{
        type: Number,
        required: true,
    }
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;