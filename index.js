const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use('/character', require('./routes/character'));
app.use('/enemy', require('./routes/enemy'));

app.get('/', (req,res)=>{
    
    res.render('index');
});




app.listen(8000);