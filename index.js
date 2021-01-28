require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const passport =require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use('/character', require('./routes/character'));
app.use(express.static(__dirname + '/public'));
app.use('/enemy', require('./routes/enemy'));
app.use('/auth', require('./routes/auth'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req,res,next)=>{
    res.locals.alerts = req.flash();
    res.locals.currentUser=req.user;
    next();
});

app.get('/', (req,res)=>{
    
    res.render('index');
});

/*
app.post('/',(req,res)=>{
    db.username.create({
        name: req.params.name,
        password: req.params.password
    }).then(()=>{
        res.redirect('/');
    })
});
*/
app.get('/new',(req,res)=>{
    res.render('new');
});



//app.listen(8000);

var server = app.listen(process.env.PORT || 8000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 8000}🎧`));

module.exports = server;
