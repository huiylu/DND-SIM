//const dice = require('rpg-dice-roller')

//const db = require("../../models");

function testAttack(name,damage){
    //console.log(name);
    
    //let name=document.getElementById("attackname").innerHTML;
    //let damage=document.getElementById("attackdamage").innerText;
    console.log(damage);
    var numDice= damage.split("d");
    //console.log(numDice[0]);
    let numDamage=0;
    let attackDie=Math.floor(Math.random()*20+1);
    let crit=1;
    if(attackDie==20){
        crit=2;
    }else if(attackDie==1){
        crit=0;
    }
    for(let i=0;i<parseInt(numDice[0]);i++){
        numDamage+=Math.floor(Math.random()*parseInt(numDice[1])+1.5);
    }
    document.getElementById("name").innerHTML=name+" Attack";
    document.getElementById("attack").innerHTML="Attack Roll: "+attackDie.toString();
    document.getElementById("damage").innerHTML="Damage: "+ (numDamage*crit).toString();
}