const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', (req,res)=>{
    axios.get('https://www.dnd5eapi.co/api/monsters/adult-black-dragon/').then(response=>{
        console.log(response.data);
        res.render('index', {result: response.data});
        //res.send(response.data);
    });
    //res.send('Test');
});

app.listen(8000);