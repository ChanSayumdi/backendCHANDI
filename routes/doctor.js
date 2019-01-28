const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addDoctor", function (req, res) {

    const doctorData = [
        req.body.doctorRegNo,
        req.body.doctorField,
        req.body.doctorDesignation,
        req.body.workAddress,
        req.body.NIC,

    ]
    database.addDoctor(doctorData, function (err, result) {
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Doctor added" });
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var doctorRegNo= req.body.doctorRegNo;
    console.log(req.body.doctorRegNo)

    database.getUser(doctorRegNo,(err,data)=>{
        if (err) throw err;
            //console.log(doctor);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "Doctor not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});

module.exports = router;