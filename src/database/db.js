const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/clg-wizbiz',()=>{
    console.log("Database Connect");
})