const mongoose = require("mongoose");
require("../../database/db")

//schema for Student information to insert a correct information about the student.
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

//model for Student to insert a student details in database.
const NewStudent = mongoose.model('student',AddStudent);

//export a model.
module.exports = {NewStudent};