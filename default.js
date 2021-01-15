(function(){
var code = [];
var guess = [];
var inputRows = document.getElementsByClassName("guess");
var hintRows = document.getElementsByClassName("hint");

//The counter for amount of guesses entered. Goes up by 1 each time a guess is entered
var rowIncrement = 1;

var colors = {1:'green',2:'purple',3:'red',4:'yellow', 5:'blue', 6:'brown'}

//Store all color choice balls into an array
var choices = document.getElementsByClassName('choice');

var secretSockets = document.getElementsByClassName("secret socket");

//Store all input slots into an array
var inputSlots = document.getElementsByClassName("guess");

var countercorrect = 0;
var guess = [];

function startGame(){
    //We have 6 colors as options. So if the code is code = [1, 1, 2, 6 ], then the secret code is [green, green, purple, brown]
    createCode(1, 7);

    //Add event listeners to every color choice that add the color to the Guess Tablet with the enterGuess function()
    for(var i=0; i<choices.length;i++){
        choices[i].addEventListener("click", enterGuess);
    }
        
 }

//Submit a color and if 4 colors have been submitted, check if correct
function enterGuess(){
    //color chosen = .this
    chosencolor = this;

    var slotstoenter = inputRows[inputRows.length-rowIncrement].getElementsByClassName("socket");

    slotstoenter[guess.length].className = slotstoenter[guess.length].className + " choice  "+ chosencolor.id ;

    guess.push(+(this.value));

    if(guess.length==4){
        if(isCorrect()){
            gameOver();
        }else{
            rowIncrement += 1;
        }
    }
    
    
}
//Compare the guess to the secret code and see if a) it matches the color b) it is in the right place
function isCorrect(){
    //make a copy of the code + the guess
    codeCopy = code.slice(0);
    guessCopy = guess.slice(0);

    guess = [];

    return false;


}
//Enter the hint. Black = color match.  White = positionmatch
function insertHint(matchtype){
    var hintIncrement = rowIncrement - 1;
    var hintsockets = hintRows[hintRows.length-hintIncrement].getElementsByClassName("hint-socket");

    //We change the hint socket's class name so that it no longer includes "hint-socket" meaning that the most recent hintsocket is always the next
    hintsockets[0].className='socket '+ matchtype;

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