const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/',(req,res) =>{
    //res.send('Test');
    db.enemy.findAll().then(enemy=>{
        res.render('enemy/index', {enemy: enemy});
    })
    
});

router.post('/', (req,res)=>{
    db.enemy.create({
        name: req.body.name,
        ac: req.body.ac,
        health: req.body.health
    }).then(enemy=>{
        res.redirect('/');
    })
});



router.get('/search', (req,res)=>{
    console.log(req.query.search);
    axios.get(`https://www.dnd5eapi.co/api/monsters/${req.query.search}`).then(response=>{
        res.render('enemy/search', {enemy: response.data});
    })
    //res.render('enemy/search');
})


module.exports=router;