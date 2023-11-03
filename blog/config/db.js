const mongoose = require('mongoose');
require("dotenv").config();

const connection = async()=>{
    let url = process.env.DB_URL;
    await mongoose.connect(url);
    console.log("Database Connected")
}

module.exports={connection}