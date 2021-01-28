const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');


router.get('/signup', (req,res)=>{
    res.render('auth/signup');
});

router.post('/signup',(req,res)=>{
  db.username.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        
        password: req.body.password
      }
    }).then(([user, created]) => {
      // if the user WAS created
      if (created) {
        // redirect to homepage or profile
        console.log(user.name+' made');
        passport.authenticate('local', {
          successRedirect: '/',
          successFlash: 'Successful Account creation'
        })(req, res);
      } else { // else (there is a user at that email so they can't sign up)
          
        //req.flash('error', 'email already exists');
        // redirect to /auth/signup 
        res.redirect('/auth/signup');s
      }
    }).catch(err => {
        
      console.log(err);
      //req.flash('error',err.message);
      // if there is an error, it's probably a validation error, so we'll return to /auth/signup
      res.redirect('/auth/signup');
    })
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});
  
// make passport do the login stuff
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Invalid login',
    successFlash: 'Successful login'
}));
  
router.get('/logout', (req, res)=>{
    req.logout();
    //req.flash('success', 'Thanks');
    res.redirect('/');
})
  
  module.exports = router;