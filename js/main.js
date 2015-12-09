$(document).ready(function(){
	const numberOfLevels = 10;
	var levels = []; 
	startNewGame();  
	var sound1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
	var sound2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
	var sound3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
	var sound4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

	var game = {
	  currentLevel: 0,
	  currentStep: 0,
	  gameOver: false
	}

	function Level(levelNumber, startDelay) {
	  this.levelNumber = levelNumber;
	  this.startDelay = startDelay;
	  this.stopDelay = startDelay + 500;
	  this.color = setColor();
	  this.levelReached = false;
	  this.stepReached = false;
	}

	function startNewGame() {
	  for (var i = 0; i < numberOfLevels; i++) {
	    levels[i] = new Level(i, (1000 * (i + 1) - 500));
	  }
	  levels[0].levelReached = true;
	  demoLevels();
	}

	function setColor() {
	  var x = Math.floor(Math.random() * 4);
	  switch (x){
	    case 0: return 'red'; break;
	    case 1: return 'blue'; break;
	    case 2: return 'green'; break;
	    case 3: return 'yellow'; break;
	  }
	}

	function lightUp(color) {
	  var dotColor = '.' + color;
	  switch (color){
	    case 'red': $(dotColor).css('background-color',"#f44"); sound1.play(); break;
	    case 'blue': $(dotColor).css('background-color',"#46f"); sound2.play(); break;
	    case 'green': $(dotColor).css('background-color',"#6c0"); sound3.play(); break;
	    case 'yellow': $(dotColor).css('background-color',"#ee5"); sound4.play(); break;      
	  }
	}

	function dimLight(color) {
	  var dotColor = '.' + color;
	  switch (color){
	    case 'red': $(dotColor).css('background-color',"red"); break;
	    case 'blue': $(dotColor).css('background-color',"blue"); break;
	    case 'green': $(dotColor).css('background-color',"green"); break;
	    case 'yellow': $(dotColor).css('background-color',"yellow"); break;      
	  }  
	}

	$('.button').mousedown(function(){
	  if ($(this).hasClass('red')){ currLight = 'red'; lightUp('red'); } 
	  else if ($(this).hasClass('blue')){ currLight = 'blue'; lightUp('blue'); } 
	  else if ($(this).hasClass('green')){ currLight = 'green'; lightUp('green'); } 
	  else if ($(this).hasClass('yellow')){ currLight = 'yellow'; lightUp('yellow'); }
	}).mouseup(function(){
	  dimLight(currLight);
	});

	function youWin() {
	  // task: build me
	  alert('You win!');
	  game.currentLevel = 0;
	  game.currentStep = 0;
	  startNewGame();
	  updateDisplay(1);
	}

	function youLose() {
	  alert('Try Again!');
	  demoLevels();
	}

	function updateDisplay(x){
	  var textLevel = game.currentLevel + x;
	  $('.level').text('Level ' + textLevel);
	}

	function demoLevels() {
	  levels
	    .filter(function(level){
	      return level.levelReached;
	    })
	    .forEach(function(level){
	      setTimeout(function(){
	        lightUp(level.color); 
	      }, level.startDelay);
	      setTimeout(function(){
	        dimLight(level.color);
	      }, level.stopDelay);
	  });
	}

	$('.reset').on('click',function(){
	  game.currentLevel = 0;
	  game.currentStep = 0;
	  startNewGame(); 
	  updateDisplay(1);
	});

	$('.button').on('click',function(){
	  game.currentLevel = levels.filter(function(level){
	    return level.levelReached;
	  }).length - 1;
	  var correctButton = levels[game.currentStep].color;
	  if ($(this).hasClass(correctButton)){
	    if (game.currentStep == game.currentLevel) {
	      if (game.currentLevel == numberOfLevels - 1) {
	        youWin();
	      } else {
	        levels[game.currentLevel + 1].levelReached = true; 
	        updateDisplay(2);
	        game.currentStep = 0;
	        demoLevels();
	      }
	    } else {
	      game.currentStep++;
	    }
	  } else {
	    youLose();
	  }
	});
});