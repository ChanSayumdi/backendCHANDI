const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addUsers", function (req, res) {

    const usersData = [
        req.body.NIC,
        req.body.firstName,
        req.body.lastName,
        req.body.contactNo,
        req.body.email,
        req.body.password,
        req.body.addNo,
        req.body.addStreet,
        req.body.addCity,
        req.body.roleId
    ]

    database.addUsers(usersData, function (err, result) {
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Users added" });
        }
    });
})
 //get
router.post("/getuser", function (req, res) {
    console.log("getting");
    var nic= req.body.nic;
    console.log(req.body.nic)

    database.getUser(nic,(err,data)=>{
        if (err) throw err;
            //console.log(user);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "User not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});


router.post("/addPatient", function (req, res) {

    const usersData = [
        req.body.NIC,
        req.body.firstName,
        req.body.lastName,
        req.body.contactNo,
        req.body.email,
        req.body.password,
        req.body.addNo,
        req.body.addStreet,
        req.body.addCity,
        req.body.roleId
    ]

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

    database.addUsers(usersData, function (err, result) {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            database.addPatient(patientData, function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: "something wrong please try again" });
                }
                else {
                    res.json({ success: true, msg: "Patient added" });
                }
            });
        }
    });
})





module.exports = router;