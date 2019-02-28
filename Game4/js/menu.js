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
		
		var menuBackground = this.game.add.tileSprite(0, -50, 800, 800, 'menuImg');
		var gameTitle = this.game.add.text(400,80, 'Pong Escalation', {font: '50px Arial', fill: '#ffffff'});
		gameTitle.anchor.setTo(0.5,0.5);
		var startTitle = this.game.add.text(400, this.game.world.height - 80, 'First Player to 5 points wins\n      Press *Up* to start', {font: '25px Arial', fill: '#ffffff'});
		startTitle.anchor.setTo(0.5,0.5);

		
		//var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
		
		
		
	},

	update: function () {
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.state.start('play');
			console.log("Test");
		}
		//spaceKey.onDown.addOnce(this.startGame, this);
		//game.input.keyboard.isDown(Phaser.Keyboard.DOWN
		//	Do some nice funky main menu effect here

	},


};
