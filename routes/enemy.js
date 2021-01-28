const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/',(req,res) =>{
    axios.get('https://www.dnd5eapi.co/api/monsters/adult-black-dragon/').then(response=>{
        console.log(response.data);
        res.render('enemy/index', {result: response.data});
        //res.send(response.data);
    });
});

module.exports=router;