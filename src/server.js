const express = require("express");
const app = express();
const StudentRouter = require("./modules/student/student.routes");
const BatchRouter = require("./modules/analytics/analytics.routes");
const AttendanceRouter = require("./modules/attendance/attendance.routes");
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(StudentRouter);
app.use(BatchRouter);
app.use(AttendanceRouter);

app.listen(PORT,()=>{
    console.log(`App is Listen On http://localhost:${PORT}`);
})