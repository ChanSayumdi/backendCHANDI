const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.get('/getNotification', function (req, res, next) {

    database.getNotification(function (err, result) {
        if (err) {
            res.json({ success: false, msg: 'Something went wrong' });
        }
        else {
            res.json({ success: true, data:result });
        }
    });
});

router.post('/addNotification', function (req, res, next) {
    const UserId = req.body.UserId
    const ClassID = req.body.ClassID
    const atDate = req.body.atDate
    const atTime = req.body.atTime
    const title = req.body.title
    const msg = req.body.msg

    const data = [
        UserId,
        ClassID,
        atDate,
        atTime,
        title,
        msg
    ]
    database.addNotification(data,function (err, result) {
        if (err) {
            console.log(err);
            
            res.json({ success: false, msg: 'Something went wrong' });
        }
        else {
            res.json({ success: true, msg: 'Notification Added' });
        }
    });
});

module.exports = router;