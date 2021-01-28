const { default: axios } = require('axios');
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/',(req,res) =>{
    db.character.findAll().then(characters=>{
        
            res.render('character/index',{characters: characters});
    });
        
   
});

router.post('/',(req,res)=>{
    console.log(req.body.name);
    db.character.create({
        name: req.body.name,
        job: req.body.job,
        health: req.body.health,
        acStack: req.body.acStack
    }).then(dndChar=>{
        //console.log(req.params.name);
        db.attribute.create({
            str: req.body.str,
            dex: req.body.dex,
            con: req.body.con,
            int: req.body.int,
            wis: req.body.wis,
            cha: req.body.cha,
            characterId: dndChar.id
        }).then(()=>{
            console.log(dndChar.name+' has been made.');
            res.redirect('/character');
        });
        
    })
});

router.get('/new',(req,res)=>{
    res.render('character/new',(req,res));
});

router.get('/:id',(req,res)=>{
    db.character.findOne({
        where: { id: req.params.id}
    }).then(characters=>{
        db.attribute.findOne({
            where: { characterId: req.params.id}
        }).then((attributes)=>{
            res.render('character/char',{characters: characters,attributes: attributes});
        });
        
    })
})


module.exports=router;