/*var menuState = function(game){}
	
menuState.prototype = {
	create: function(){
		var gameTitle = game.add.text(80,80, 'Pong Escalation', {font: '50px Arial', fill: '#ffffff'});
		gameTitle.anchor.setTo(0.5,0.5);
		var startTitle = game.add.text(80, game.world.height - 80, 'Press Spacebar to start', {font: '25px Arial', fill: '#ffffff'});
		startTitle.anchor.setTo(0.5,0.5);
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
		
		spaceKey.onDown.addOnce(this.start, this);
	},
	
	start: function(){
		game.state.start('play');
	}
}*/

"use strict";

BasicGame.menuState = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.menuState.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		
		
		var gameTitle = game.add.text(80,80, 'Pong Escalation', {font: '50px Arial', fill: '#ffffff'});
		gameTitle.anchor.setTo(0.5,0.5);
		var startTitle = game.add.text(80, game.world.height - 80, 'Press Spacebar to start', {font: '25px Arial', fill: '#ffffff'});
		startTitle.anchor.setTo(0.5,0.5);

		
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
		
		
		
	},

	update: function () {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACE)){
			this.state.start('play');
		}
		//spaceKey.onDown.addOnce(this.startGame, this);
		//game.input.keyboard.isDown(Phaser.Keyboard.DOWN
		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('play');

	}

};
