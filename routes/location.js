const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post('/addlocation',function(req,res,next){
    const data = {
        locationID : req.body.locationID,
        locationName : req.body.locationName
    }
    database.addNewLocation(data,function(err,result){
        if(err){
            res.json({success : false , massage : "Error something wrong"});
        }
        else{
            res.json({success : true , massage : "Location Added"});
        }
    })
});
router.post('/deleteLocation',function(req,res,next){
    const locationID =req.body.locationID
})

module.exports = router;