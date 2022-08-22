const express = require('express');
const router = express.Router();
const { studentAttendance } = require("./attendance.model");
require("../../database/db")

//routes for add a student attendance into database.
router.post("/attendance", async (req, res) => {
    try {
        const Student = new studentAttendance(req.body);
        await Student.save();
        res.send(Student);
    } catch (e) {
        res.send(e.message)
    }
})

//routes for get a date,department,semester,year wish absent student list.
router.post("/absent", async (req, res) => {
    try {
        const data = await studentAttendance.find({
            "department": req.body.department,
            "batch": req.body.batch,
            "current_sem": req.body.current_sem,
            "attattendanceDate": req.body.attattendanceDate,
            "isAbsent": true
        })
        res.send(data)
    } catch (e) {
        res.send(e.message)
    }
})

//routes for get a student list this attendance is less then 75% for year,semester,department wise.
router.post("/absent/75", async (req, res) => {
    const TotalDays = 30;
    const StudentList = [];
    try {
        const data = await studentAttendance.aggregate([
            {
                $match: {
                    department: req.body.department,
                    batch: req.body.batch + "",
                    current_sem: req.body.sem
                }
            },
            {
                $group: {
                    _id: {
                        no: "$no",
                        name: "$name",
                        current_sem: "$current_sem",
                        "mobile_number": "$mobile_number",
                        "department": "$department",
                        "batch": "$batch",
                    },
                    PresentDay: {
                        "$sum": {
                            "$cond": {
                                "if": {
                                    "$eq": [
                                        "$isAbsent",
                                        false
                                    ]
                                },
                                "then": 1,
                                "else": 0
                            }
                        }
                    },
                    AbsentDay: {
                        "$sum": {
                            "$cond": {
                                "if": {
                                    "$eq": [
                                        "$isAbsent",
                                        true
                                    ]
                                },
                                "then": 1,
                                "else": 0
                            }
                        }
                    }
                }
            }, {
                $sort: { _id: 1 }
            }, {
                $project: {
                    _id: 0,
                    StudentDetails: "$_id",
                    PresentDay: 1,
                    AbsentDay: 1,
                }
            }
        ])
        data.forEach(element => {
            if (((element.PresentDay / TotalDays) * 100) < 75) {
                //add new propertie for show a studnent attendance in persentage for every student.
                element["Attendance(%)"] = Math.round(((element.PresentDay / TotalDays) * 100));
                StudentList.push(element)
            }
        });
        res.send(StudentList) 
    } catch (e) {
        res.send(e.message)
    }
})

//export a router.
module.exports = router;