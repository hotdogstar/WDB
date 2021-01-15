(function(){
var code = []

var colors = {1:'green',2:'purple',3:'red',4:'yellow', 5:'blue', 6:'brown'}

//Store all color choice balls into an array
var choices = document.getElementsByClassName('choice');

var secretSockets = document.getElementsByClassName("secret socket");

//Store all input slots into an array
var inputSlots = document.getElementsByClassName("guess");

//The counter for amount of guesses entered. Goes up by 1 each time a guess is entered
var counter = 0;

var guess = [];

function startGame(){
    //We have 6 colors as options. So if the code is code = [1, 1, 2, 6 ], then the secret code is [green, green, purple, brown]
    createCode(1, 7);

    //Add event listeners to every color choice that add the color to the Guess Tablet with the enterGuess function()
    for(var i=0; i<choices.length;i++){
        choices[i].addEventListener("click", enterGuess);
    }
    alert("woop");
        
 }

//After the entire code is submitted, enter it.
function enterGuess(){
    alert("noob");
    
    //color chosen = .this
    thecolor = this;
    
    
}
//Compare the guess to the secret code and see if a) it matches the color b) it is in the right place
function isCorrect(){

}
//Enter one color ball into the code
function insertColor(){

}

// Random code sequence generator of 4 colors. Temporarily until we use sockets for multiplayer
function createCode (min, max) {
    for (var i = 0; i < 4; i++)
      code[i] = Math.floor(Math.random() * (max - min)) + min;
}
//Reveal the code after a gameOver (win or lose)
function revealCode(){
    for (var i=0; i<secretSockets.length; i++){
        secretSockets[i].className+= ' '+ pegs[code][i];
        secretSockets[i].innerHTML = '';
    }
}
// Game over code
function gameOver(){
    revealCode();

}
//Reset after game over/manual reset
function resetGame(){

}

startGame();
}());