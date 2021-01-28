const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/',(req,res) =>{
    db.character.findAll().then(characters=>{
        res.render('character/index',{characters: characters})
    })
});

router.post('/',(req,res)=>{
    db.character.create({
        name: req.params.name,
        health: req.params.health,
        acStack: req.params.acStack
    }).then(dndChar=>{
        console.log(dndChar+' has been made.');
        res.redirect('/');
    })
});

router.get('/new',(req,res)=>{
    res.render('character/new',(req,res));
});


module.exports=router;