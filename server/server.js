require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Initialize the Application
const port = process.env.PORT;
var app = express();

var register = require('./controllers/register');
var login = require('./controllers/login');
var profile = require('./controllers/profile');

//Use Handlebars
app.set('view engine','hbs');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Static folder
app.use(express.static(path.join(__dirname,'public')));

//Static folder
app.use(express.static(path.join(__dirname,'public')));

//Express Session
app.use(session({
    secret:'Brentford4Fulham0',
    saveUninitialized:true,
    resave:true
}));

//Init Passport
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
    errorFormatter:function(param,message,value){
        var namespace = param.split('.')
        ,root = namespace.shift()
        ,formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            error : message,
            value : value
        };
    }
}))

//Connect Flash
app.use(flash());

//Global Vars
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req,res) =>{
    res.status(200).send('User Management API');
});

app.use('/register', register);
app.use('/login', login);
app.use('/profile', profile);

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});

module.exports = {app};