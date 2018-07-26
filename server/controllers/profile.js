var express = require('express');
var router = express.Router();
const response = require('./response.js');
const User = require('../models/user.js');

router.post('/' , (req,res) =>{
    var sessionid = req.body.sessionid;
    var id = req.body.id;
    req.checkBody('sessionid', 'Session ID is required').notEmpty();
    req.checkBody('id', 'User ID is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
        return res.status(400).send(errors);
    }else{
        var profileDate = req.body;
        User.updateProfile(profileDate,function(err,user){
            if(err) throw err;
            if(user){
                res.status(200).send(response.profileSuccess);
            }else{
                res.status(400).send(response.profileFailure);
            }
        });
    }
});

module.exports = router;