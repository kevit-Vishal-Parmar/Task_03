const express = require('express');
const router = express.Router();
const batches = require('./analytics.model');

/*
OUTPUT:-
 [{
    year: 2018,
    totalStudents: 2500
    branches:{
        CE: 1000,
        ME: 1500
    }
 },
 {
    year: 2021,
    totalStudents: 2000
    branches:{
        CE: 1000,
        ME: 1000
    }
 }]
*/

router.get("/analytics", async (req, res) => {
    const data = await batches.aggregate([
        {
            $unwind: "$branches"
        },
        {
            $group: {
                _id: "$year",
                totalStudents: { $sum: "$branches.totalStudentsIntake" },
                branches: {
                    $push: { k: "$branches.name", v: "$branches.totalStudentsIntake" }
                },
            }
        },
        {
            $sort: {
                _id: 1
            }
        },
        {
            $project: {
                _id: 0,
                year: "$_id",
                totalStudents: 1,
                branches: { $arrayToObject: "$branches" }
            }
        }
    ]);
    res.send(data);
})

/*
OUTPUT:-
{
    "batch": 2020,
    "totalStudents": 1500,
    "totalStudentsIntake": 2000,
    "availableIntake": 500,
    "branches": {
        "CE": {
            "totalStudents": 1000,
            " totalStudentsIntake": 1000,
            " availableIntake": 0
        },
        "ME": {
            "totalStudents": 500,
            " totalStudentsIntake": 1000,
            " availableIntake": 500
        }
    }
}
 */
router.get("/vacantseats", async (req, res) => {
    const data = await batches.aggregate([
        {
            $unwind: "$branches"
        },
        {
            $group: {
                _id: "$year",
                totalStudents: { $sum: "$branches.totalStudentsIntake" },
                totalStudentsIntake: { $sum: "$branches.totalStudentsIntake" },
                availableIntake: { $sum: "$branches.availableIntake" },
                branches: {
                    $push: {
                        k: "$branches.name",
                        v: {
                            totalStudents: { $sum: "$branches.totalStudentsIntake" },
                            totalStudentsIntake: { $sum: "$branches.totalStudentsIntake" },
                            availableIntake: { $sum: "$branches.availableIntake" },
                        }
                    }
                },
            }
        },
        {
            $sort: { _id: 1 }
        },
        {
            $project: {
                _id: 0,
                batch: "$_id",
                totalStudents: 1,
                totalStudentsIntake: 1,
                availableIntake: 1,
                branches: { $arrayToObject: "$branches" }
            }
        }
    ])
    res.send(data)
})

module.exports = router;