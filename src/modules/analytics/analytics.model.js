const mongoose = require("mongoose");
require("../../database/db");

//create a schema. 
const analyticsSchema = new mongoose.Schema({});

// set schema to model and add a database collection name to add in dataabase.
const batches = mongoose.model('batches', analyticsSchema);


//export this batches to use in other file`s and routers.
module.exports = batches;