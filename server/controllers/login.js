var express = require('express');
var router = express.Router();
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const response = require('./response.js');
const User = require('../models/user.js');
var bcrypt = require('bcryptjs');


router.get('/error', (req,res) =>{
    var sess = req.session;
    var d = new Date();
    var n = d.getTime();
    if(sess.firstFail){
        var difference = n - sess.firstFail;
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24
    
        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60
    
        var minutesDifference = Math.floor(difference/1000/60);
 
        console.log(minutesDifference);

        if(minutesDifference >= 3){
            sess.loginFailedAttempts = 3;
            res.status(200).send(response.loginMultipleFail);
        }
    }else{
        sess.firstFail = n;
        res.status(200).send(response.loginFail);
    }
    
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    },
    function(username, password, cb) {
        User.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            bcrypt.compare(password,user.password, function(err, hasres) {
                if(hasres){
                    return cb(null, user)
                }else{
                    return cb(null, false);
                }
            });
        });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    //   });
});

router.post('/', 
    passport.authenticate('local', ({ failureRedirect: '/login/error' })),
(req,res) =>{
    var sess = req.session;
    if(sess.loginFailedAttempts){
        res.status(200).send(response.loginMultipleFail);
    }else{
        User.updateSession(req.sessionID,req.user.id,function(err,user){
            if (err) throw err;
            if(user){
                response.loginSuccess.sessionid = req.sessionID;
                response.loginSuccess.id = req.user.id;
                res.status(200).send(response.loginSuccess);
            }else{
                res.status(200).send(response.loginError);
            }
        });
    }
});
  
module.exports = router;