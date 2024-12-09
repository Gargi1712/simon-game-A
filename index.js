
var buttonColours=["red", "blue", "green", "yellow"];

var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;

$(document).keypress(function() {
  if (!started) {

    $("h1").html("Level " + level);
    started = true;
    nextSeq();
   
  }
});

function nextSeq()
{
  userClickedPattern=[];
  level++;
  $("h1").html("Level " + level);
    var randomVariable=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomVariable];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   play(randomChosenColour);
  
  

};
function play(chosenColor)
{
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}



$(".btn").click(function()
{
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  play(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel)
{
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel])
  {
    console.log("success");
  
  if(gamePattern.length===userClickedPattern.length)
  {
    setTimeout(function () {
      nextSeq();
    }, 1000);
  }
}
  else{
    console.log("wrong");

    play("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");

    //2. Call startOver() if the user gets the sequence wrong.
    startOver();
  }


}
function startOver()
{
     level=0;
     gamePattern=[];
     userClickedPattern=[];
     started=false;
}


function animatePress(ChosenColor)
{
    $("#"+ChosenColor).addClass("pressed");
    setTimeout(function()
  {
    $("#" + ChosenColor).removeClass("pressed");
  },100);
    
}



