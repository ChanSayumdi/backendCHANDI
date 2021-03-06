const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addAppointment",function(req,res){
    
    const appointmentData = [
        
        req.body.appId,
        req.body.appDate,
        req.body.appTime,
        req.body.appStatus,
        req.body.patientId,
        req.body.doctorRegNo,
    ]

    database.addAppointment(appointmentData,function(err,result){
        if(err){
            console.log (err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({success : false , msg : "something wrong please try again"});
        }
        else{
            res.json({success : true , msg : "Appointment Done"});
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var appId= req.body.appId;
    console.log(req.body.appId)

    database.getUser(appId,(err,data)=>{
        if (err) throw err;
            //console.log(appointment);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "appointment not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});


module.exports = router;