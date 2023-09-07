var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;


// Start Game
var keyPressed = false;

$(document).on("keydown", function() {
    if(!keyPressed) {
        $("#level-title").text("Level " + level);
        nextSequence();
        keyPressed = true;
    }
})


// Button clicked by User
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
    
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
        gameOver();
        startOver();
    }


}

function startOver() {
    level = 0;
    gamePattern = [];
    keyPressed = false;


}
function gameOver() {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 3.4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
}

function playSound(colour) {
    var audio = new Audio();
    audio.src = "./sounds/" + colour + ".mp3";
    audio.play();
}

function animatePress(currentColour) {
    var button = $("." + currentColour);
    button.addClass("pressed");

    setTimeout(function() {
        button.removeClass("pressed");
    }, 100);
}