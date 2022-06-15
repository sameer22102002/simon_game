let userClickPattern = [];
let gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
}
});

$("button").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    animate($(this).attr("id"));
    sound($(this).attr("id"));
    checkans(userClickPattern.length-1);
});

function checkans(currentlevel){
        if(userClickPattern[currentlevel] === gamePattern[currentlevel]){
            if (userClickPattern.length === gamePattern.length){
                setTimeout(function () {nextSequence();}, 1000);
        }}
        else{
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            setTimeout(function () {$("body").removeClass("game-over");}, 200);
            
            startover();
        }
}
function nextSequence(){
    userClickPattern = [];
    level++;
    $("h1").text("level "+ level);  //userClickPattern.length
    var randomChosenColour = buttonColors[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomChosenColour);      
} 



function animate(id){
    $("button." + id).animate({width:"200px",height:"200px"}).animate({width:"220px",height:"220px"});
    $("button." + id).addClass('pressed');
    setTimeout(()=>{$("button." + id).removeClass("pressed")},300);
}
function sound(id){
    var audio = new Audio("sounds/"+ id +".mp3");
    audio.play();
}
function startover(){
    level = 0;
    gamePattern = [];
    started = false
}