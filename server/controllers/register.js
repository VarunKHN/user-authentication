var express = require('express');
var router = express.Router();
const User = require('../models/user.js');
const response = require('./response.js');

router.post('/' , (req,res) =>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email Address is required').notEmpty();
    if(email){
        req.checkBody('email', 'Email Address is not valid').isEmail();
    }
    req.checkBody('password', 'Password is required').notEmpty();
    if(password){
        req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);
    }

    var errors = req.validationErrors();

    if(errors){
        return res.status(400).send(errors);
    }else{
        var userData = {
            name,
            email,
            password
        }

        User.addUser(userData,function(err,user){
            if(err) throw err;
            if(user){
                res.status(200).send(response.successRegistration);
            }else{
                res.status(400).send(response.userExists);
            }
        });
    }
    
});

module.exports = router;