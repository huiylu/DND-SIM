const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/',(req,res) =>{
    //res.send('Test');
    res.render('enemy/index');
});



router.get('/search', (req,res)=>{
    console.log(req.query.search);
    axios.get(`https://www.dnd5eapi.co/api/monsters/${req.query.search}`).then(response=>{
        res.send(response.data);
    })
    //res.render('enemy/search');
})


module.exports=router;