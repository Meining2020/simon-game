const simon = {};

simon.buttonColors = ['red', "blue", "green", "yellow"];
simon.gamePattern = [];
simon.userClickedPattern =[];
simon.level = 0;
simon.started = false;

simon.nextSequence = function() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = simon.buttonColors[randomNumber]
    
    simon.gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
    
    const audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play();

    //update level
    simon.level++;
    $('h1').text(`Level ${simon.level}`);
    
}


simon.playSound = (name) => {
    const audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

simon.animatePress = (currentColor) => {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}


simon.checkAnswer = (currentLevel) => {
    if (simon.gamePattern[currentLevel] != simon.userClickedPattern[currentLevel]) {
        const audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text("Game Over, Press Any Key to Restart.");
        
        simon.startOver();
    }

    if (currentLevel === simon.gamePattern.length -1) {
        setTimeout(function() {
            simon.nextSequence();
        }, 1000)

        simon.userClickedPattern = [];
    } 
}


simon.startOver = () => {
    simon.gamePattern = [];
    simon.level = 0;
    simon.started = false;
}


$(document).ready(function() {

    $('div[type=button]').on('click', function () {
        let userChosenColor = this.id;
        simon.userClickedPattern.push(userChosenColor)
        simon.playSound(userChosenColor);
        simon.animatePress(userChosenColor);
        simon.checkAnswer(simon.userClickedPattern.length -1);
    })
    
    $(document).keypress(function () {
        if (!simon.started) {
            simon.nextSequence();
            $('h1').text(`Level ${simon.level}`);
            simon.started = true;
        }
    });

})













