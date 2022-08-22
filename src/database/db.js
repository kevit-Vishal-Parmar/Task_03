const mongoose = require("mongoose");

//connect a database using connection string.
mongoose.connect('mongodb://localhost:27017/clg-wizbiz',()=>{
    console.log("Database Connect");
})