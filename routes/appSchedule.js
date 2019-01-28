const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addAppSchedule", function (req, res) {

    const appScheduleData = [
        req.body.appScheduleId,
        req.body.noOfAppointments,
        req.body.dateTimeIn,
        req.body.dateTimeOut,
        req.body.doctorRegNo

    ]

    
    database.addAppSchedule(appScheduleData, function (err, result) {
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "AppSchedule Done" });
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var appScheduleId= req.body.appScheduleId;
    console.log(req.body.appScheduleId)

    database.getUser(appScheduleId,(err,data)=>{
        if (err) throw err;
            //console.log(appSchedule);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "appSchedule not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});


module.exports = router;