const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    email : String,
    role : {
    type : String,
    enum : [ "user", "admin" ], // Define allowed roles
    default : "user", // Default role is 'user'
    }
})

const user = mongoose.model("user", userSchema);

module.exports = {user}