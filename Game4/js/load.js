"use strict";

BasicGame.loadState = function (game) {

	this.background = null;
	this.loadingBar = null;

	this.ready = false;

};

BasicGame.loadState.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.loadingBar = this.add.sprite(512, 512, 'loadingBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.loadingBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		game.load.image('paddle', 'assets/paddle.png');
		game.load.image('ball', 'assets/ball1.png');
		game.load.audio('bounce', 'assets/bounce.wav');
		game.load.image('backgroundIMG', 'assets/background2.png');
		game.load.image('menuImg', 'assets/menu.jpg');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.loadingBar.cropEnabled = false;
		this.state.start('menu');

	},

};
