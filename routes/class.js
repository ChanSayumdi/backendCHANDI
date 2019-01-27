const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.get("/getClassDetails", function(req,res,next){
    database.getClassDetails(function(err,result){
        if(err){
            res.json({success : false , massage : "Error something wrong"});
        }
        else{
            res.json({success : true , data:result});
        }
    });
});

router.post('/enrol',function(req,res,next){
    const data = {
        userId : req.body.userId,
        classID : req.body.classId
    }
    database.enrolStudents(data,function(err,result){
        if(err){
            res.json({success : false , massage : "Error something wrong"});
        }
        else{
            res.json({ success: true, msg: 'Student enrolment success'});
        }
    })

});

router.post('/addClasses',function(req,res,next){
    const data = {
        ClassID     : req.body.ClassID,
	    subjectID   : req.body.subjectID,
        locationID  : req.body.locationID,
        teacherID   : req.body.teacherID,
        dateOfWeek  : req.body.dateOfWeek,
        halfFee     : req.body.halfFee,
        fullFee     : req.body.fullFee,
        startTime   : req.body.startTime,
        endTime     : req.body.endTime,
        description : req.body.description,
    }
    database.addNewClass(data,function(err,result){
        if(err){
            res.json({success : false , massage : "Error something wrong"}); 
        }
        else{
            res.json({ success: true, msg: 'Class Added'});
        }
    });
});

router.post("/deleteClass",function(req,res,next){
    const classID = req.body.ClassID;
    database.deleteClasse(classID,function(err,result){
        if(err){
            res.json({success : false , massage : "Error something wrong"}); 
        }
        else{
            res.json({ success: true, msg: 'Class Deleted'});
        }
    });
});
module.exports = router;