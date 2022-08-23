const mongoose = require("mongoose");
require("../../database/db")

//schema for Student information to insert a correct information about the student.
const Student = new mongoose.Schema({
    no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: Number,
        min: 10,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    current_sem: {
        type: Number,
        required: true
    },
    isAbsent: {
        type: Boolean,
        required: true
    },
    attattendanceDate: {
        type: String,
        default: new Date().toLocaleDateString(),
        required: true
    }
})
//model for Student to insert a student details in database.
const studentAttendance = mongoose.model('student_Attendance', Student);


//export a model.
module.exports = {studentAttendance};