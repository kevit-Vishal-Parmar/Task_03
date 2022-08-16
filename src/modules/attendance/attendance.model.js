const mongoose = require("mongoose");
require("../../database/db")

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

const studentAttendance = mongoose.model('student_Attendance', Student);

module.exports = {
    studentAttendance
}