const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addMedicine",function(req,res){
    
    const roleData = [
        req.body.madicineName,
        req.body.medicineNo
    ]

    database.addRole(roleData,function(err,result){
        if(err){
            console.log (err);
            res.json({success : false , msg : "something wrong please try again"});
        }
        else{
            res.json({success : true , msg : "Role added"});
        }
    });
})

/*router.post("/getuser", function (req, res) {
    console.log("getting");
    var roleId= req.body.roleId;
    console.log(req.body.roleId)

    database.getUser(roleId,(err,data)=>{
        if (err) throw err;
            //console.log(role);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "Role not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});*/


module.exports = router;