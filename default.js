(function(){
var code = [];
var guess = [];

var inputRows = document.getElementsByClassName("guess");
var hintRows = document.getElementsByClassName("hint");

var secretSockets = document.getElementsByClassName("secret socket");

//The counter for amount of guesses entered. Goes up by 1 each time a guess is entered
var rowIncrement = 1;
var hintIncrement = 1;

//Needed for revealCode() to link code numbers to the colors
var colors = {1:'green',2:'purple',3:'red',4:'yellow', 5:'blue', 6:'brown'}

//Store all color choice balls into an array
var choices = document.getElementsByClassName('choice');


function startGame(){
    //We have 6 colors as options. So if the code is code = [1, 1, 2, 6 ], then the secret code is [green, green, purple, brown]
    createCode(1, 7);

    //Add event listeners to every color choice that add the color to the Guess Tablet with the enterGuess function()
    for(var i=0; i<choices.length;i++){
        choices[i].addEventListener("click", enterGuess);
    }
    document.getElementById("delete").addEventListener("click", deleteLast)
        
 }

//Submit a color and if 4 colors have been submitted, check if correct
function enterGuess(){
    //color chosen = .this
    chosencolor = this;

    var socketstoenter = inputRows[inputRows.length-rowIncrement].getElementsByClassName("socket");

    socketstoenter[guess.length].className = socketstoenter[guess.length].className + " choice  "+ chosencolor.id ;

    guess.push(+(this.value));

    if(guess.length==4){
        if(isCorrect()){
            gameOver("won");
        }else{
            rowIncrement += 1;
        }
    }
    if(rowIncrement==inputRows.length+1){
        gameOver("lost")
    }
}
function deleteLast(){
    if(guess.length>0){
        var socketstoenter = inputRows[inputRows.length-rowIncrement].getElementsByClassName("socket");

        //We do the exact opposite of what we did at EnterGuess()
        socketstoenter[guess.length-1].className = "socket" ;
        
        guess.pop();
    }
}
//Compare the guess to the secret code and see if a) it matches the color b) it is in the right place
function isCorrect(){
    var correctguess = true;

    //make a copy of the code + the guess
    codeCopy = code.slice(0);
    guessCopy = guess.slice(0);
    alert(codeCopy[0]);

    //Check if position and color match 
    for(var i=0;i<code.length;i++){
        if(code[i]==guess[i]){
            insertHint("positionmatch")
            codeCopy[i] = 0;
            guess[i] = -1;
        }else{
            correctguess=false;
        }
    }

    //Check if just color matches
    for(var x=0;x<code.length;x++){
        if(codeCopy.indexOf(guess[x])>-1){
            insertHint("colormatch");
            codeCopy[codeCopy.indexOf(guess[x])] = 0;
        }
    }
    hintIncrement += 1;

    //Reset the guess
    guess = [];

    return correctguess;


}
//Enter the hint. Black = color match.  White = positionmatch
function insertHint(matchtype){
    
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
        secretSockets[i].className+= ' '+ colors[code[i]];

        //Clear the question mark
        secretSockets[i].innerHTML = '';
    }
}
// Game over code
function gameOver(reason){
    if(reason=="won"){
        alert("Congratulations comrade, you decoded the American imperialist code!");
    }
    if(reason=="lost"){
        alert("You failed comrade! Now, imperialist swines will take over world!");
    }
    revealCode();

}
//Reset after game over/manual reset
function resetGame(){

}

startGame();
}());