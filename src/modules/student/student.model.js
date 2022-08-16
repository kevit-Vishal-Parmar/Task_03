const mongoose = require("mongoose");
require("../../database/db")

const AddStudent = new mongoose.Schema({
    no : {
        type : Number,
        unique : true,
        required:true
    },
    name : {
        type:String,
        required:true,
    },
    mobile_number : {
        type :Number,
        min : 10,
        required : true
    },
    department:{
        type : String,
        required:true
    }, 
    batch:{
        type : String,
        required:true
    }, 
    current_sem:{
        type : Number,
        required:true
    }
})

const NewStudent = mongoose.model('student',AddStudent);

module.exports = {
    NewStudent
}