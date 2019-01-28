const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addPatient", function (req, res) {

    const patientData = [
        req.body.patientId,
        req.body.dob,
        req.body.occupation,
        req.body.bloodType,
        req.body.maritalState,
        req.body.height,
        req.body.weight,
        req.body.NIC,
       
    ]
    database.addPatient(patientData, function (err, result) {
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Patient added" });
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var patientId= req.body.patientId;
    console.log(req.body.patientId)

    database.getUser(patientId,(err,data)=>{
        if (err) throw err;
            //console.log(patientbasichealthinfo);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "patient not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});

module.exports = router;