const express = require("express");
const app = express();
//include app routers.
const StudentRouter = require("./modules/student/student.routes");
const BatchRouter = require("./modules/analytics/analytics.routes");
const AttendanceRouter = require("./modules/attendance/attendance.routes");
// setup a port to app is listen on this port.
const PORT = process.env.PORT || 3000;

app.use(express.json());

//use a routers.

app.use(StudentRouter);
app.use(BatchRouter);
app.use(AttendanceRouter);

//app is listen.

app.listen(PORT, () => {
    console.log(`App is Listen On http://localhost:${PORT}`);
})