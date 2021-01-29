//const dice = require('rpg-dice-roller')

function testAttack(){
    //console.log(name);
    let name=document.getElementById("attackname").innerHTML;
    let damage=document.getElementById("attackdamage").innerText;
    var numDice= damage.split("d");
    //console.log(numDice[0]);
    let numDamage=0;
    for(let i=0;i<parseInt(numDice[0]);i++){
        numDamage+=Math.floor(Math.random()*parseInt(numDice[1])+1);
    }
    document.getElementById("name").innerHTML=name;
    document.getElementById("damage").innerHTML=numDamage;
}