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
        }).then((attri)=>{
            db.attack.create({
                name: "Fist",
                attackbonus: 0,
                damage: "1d4",
                savingDc: false,
                characterId: dndChar.id
            }).then(()=>{
                console.log(dndChar.name+' has been made.');
                res.redirect('/character');
            })
            
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
            db.attack.findAll({
                where: { characterId: req.params.id}
            }).then(attacks=>{
                res.render('character/char',{characters: characters,attributes: attributes, attacks:attacks});
            })
        });
        
    });
});

router.get('/:id/attack',(req,res)=>{
    //axios.get(`https://www.dnd5eapi.co/api/spells/?name=${req.body.search}`).then((response)=>{
        res.render('character/attacks', {id:req.params.id});
    //})
    
});

router.post('/:id',(req,res)=>{
    console.log(req.body.name);
    db.attack.create({
        name: req.body.name,
        attackbonus: req.body.attackbonus,
        damage: req.body.damage,
        characterId: req.params.id,
        savingDc: req.body.savingDc
    }).then((attacks)=>{
        console.log(attacks.name + ' was made');
        res.redirect(`/character/${req.params.id}`);
    })
});

module.exports=router;