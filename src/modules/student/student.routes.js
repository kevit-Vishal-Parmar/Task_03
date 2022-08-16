const express = require('express');
const router = express.Router();
const { NewStudent } = require("./student.model");
require("../../database/db")

router.post("/Student/Add", async (req, res) => {
  try{
    const Student = new NewStudent(req.body);
    await Student.save();
    res.send(Student);
  }catch(e){
    res.send(e.message)
  }
})

module.exports = router;