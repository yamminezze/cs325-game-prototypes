"use strict";
var background;
var paddle1;
var paddle2;
var ball;
var p1Score = 0;
var p2Score = 0;
var scoreText;
var instText;
var bounce;
var randVelocity;
var randVelocity2;

var ball_launched;
var ball_velocity;

BasicGame.playState = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.bouncy = null;
};

BasicGame.playState.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        var field = this.game.add.tileSprite(-80, -50, 800, 800, 'field');
		background = this.game.add.tileSprite(-80, -50, 800, 800, 'backgroundIMG');
		background.alpha = 0.2;
		paddle1 = this.create_paddle(0,this.game.world.centerY);
		paddle2 = this.create_paddle(this.game.world.width - 16, this.game.world.centerY);
	
		ball_launched = false;
		ball_velocity = 400;
	
		ball = this.create_ball(this.game.world.centerX, this.game.world.centerY +25);
	
		this.game.input.onDown.add(this.launch_ball, this);
		scoreText = this.add.text(16, 16, 'Score: 0 | 0', { fontSize: '32px', fill: '#922' });
		instText = this.add.text(540, 16, 'Click to launch ball', { fontSize: '24px', fill: '#922' });
	
		bounce = this.game.add.audio('bounce');
		bounce.volume = .1;
        
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //control_paddle(paddle1,game.input.y);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
		{
			paddle1.y -=13;
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
			paddle1.y += 13;
		}
		if(paddle1.y < paddle1.height / 2){
		paddle1.y = paddle1.height/2;
		} else if(paddle1.y > this.game.world.height - paddle1.height/2){
			paddle1.y = this.game.world.height - paddle1.height/2;
		}	
	
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			paddle2.y -= 13;
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			paddle2.y += 13;
		}
		if(paddle2.y < paddle1.height / 2){
			paddle2.y = paddle1.height/2;
		} else if(paddle2.y > this.game.world.height - paddle2.height/2){
				paddle2.y = this.game.world.height - paddle2.height/2;
		}	
   
		this.game.physics.arcade.collide(paddle1, ball, this.collision);
		this.game.physics.arcade.collide(paddle2, ball, this.collision);
	
		if(ball.body.blocked.left){
			console.log('Player 2 Scored!');
			p2Score+=1;
			scoreText.setText('Score: ' + p1Score + ' | ' + p2Score);
			ball.x = this.game.world.centerX;
			ball.y = this.game.world.centerY;
			ball.body.velocity.setTo(0,0);
			ball_launched = false;
			
		}
		else if(ball.body.blocked.right){
			console.log('Player 1 Scored!');
			p1Score+=1;
			scoreText.setText('Score: ' + p1Score + ' | ' + p2Score);
			ball.x = this.game.world.centerX;
			ball.y = this.game.world.centerY;
			ball.body.velocity.setTo(0,0);
			ball_launched = false;
		}
		
		if(p1Score == 5 || p2Score == 5){
			this.Win(p1Score, p2Score);
		}
    },
	
	
	collision: function(paddle, ball){
		bounce.play();
	},

	create_paddle: function(x,y){
		var paddle = this.game.add.sprite(x,y, 'paddle');
		paddle.anchor.setTo(0.5,0.5);
		this.game.physics.arcade.enable(paddle);
		paddle.body.collideWorldBounds = true;
		paddle.body.immovable = true;
	
		return paddle;   
	},

	create_ball: function(x,y){
		var ball = this.game.add.sprite(x,y,'ball');
		ball.anchor.setTo(0.5,0.5);
		this.game.physics.arcade.enable(ball);
		ball.body.collideWorldBounds = true;
		ball.body.bounce.setTo(1.1,1.1);
	
		return ball;
	
	},

	launch_ball: function(){
		if(ball_launched){
			ball.x = this.game.world.centerX;
			ball.y = this.game.world.centerY;
			ball.body.velocity.setTo(0,0);
			ball_launched = false;
		}
		else{
			randVelocity = this.game.rnd.realInRange(-400, -200);
			randVelocity2 = this.game.rnd.realInRange(400, 200);
			ball.body.velocity.x =  randVelocity2+20;
			ball.body.velocity.y = 2 + Math.random() * 680;
			ball_launched = true;
		}
	},

    Win: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('menu');

    }

};






/*
//=================================================================================

var background;
var paddle1;
var paddle2;
var ball;
var p1Score = 0;
var p2Score = 0;
var scoreText;
var bounce;
var randVelocity;
var randVelocity2;

var ball_launched;
var ball_velocity;

var playState = {



function preload() {

	game.load.image('paddle', 'assets/paddle.png');
	game.load.image('ball', 'assets/ball1.png');
	game.load.audio('bounce', 'assets/bounce.wav');
	game.load.image('backgroundIMG', 'assets/background2.png');
},

function create() {
	background = game.add.tileSprite(-80, -50, 800, 800, 'backgroundIMG');
	paddle1 = create_paddle(0,game.world.centerY);
	paddle2 = create_paddle(game.world.width - 16, game.world.centerY);

	ball_launched = false;
	ball_velocity = 400;
	
	ball = create_ball(game.world.centerX, game.world.centerY +25);
	
	game.input.onDown.add(launch_ball, this);
	scoreText = this.add.text(16, 16, 'Score: 0 | 0', { fontSize: '32px', fill: '#922' });
	
	bounce = game.add.audio('bounce');
	bounce.volume = .1;
},

function update () {
	//control_paddle(paddle1,game.input.y);
	if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        paddle1.y -=13;
    }
	else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
		paddle1.y += 13;
	}
	if(paddle1.y < paddle1.height / 2){
		paddle1.y = paddle1.height/2;
	} else if(paddle1.y > game.world.height - paddle1.height/2){
			paddle1.y = game.world.height - paddle1.height/2;
	}	
   
   if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        paddle2.y -= 13;
    }
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		paddle2.y += 13;
	}
	if(paddle2.y < paddle1.height / 2){
		paddle2.y = paddle1.height/2;
	} else if(paddle2.y > game.world.height - paddle2.height/2){
			paddle2.y = game.world.height - paddle2.height/2;
	}	
   
	game.physics.arcade.collide(paddle1, ball, collision);
	game.physics.arcade.collide(paddle2, ball, collision);
	
	if(ball.body.blocked.left){
		console.log('Player 2 Scored!');
		p2Score+=1;
		scoreText.setText('Score: ' + p1Score + ' | ' + p2Score);
		ball.x = game.world.centerX;
		ball.y = game.world.centerY;
		ball.body.velocity.setTo(0,0);
		ball_launched = false;
		
	}
	else if(ball.body.blocked.right){
		console.log('Player 1 Scored!');
		p1Score+=1;
		scoreText.setText('Score: ' + p1Score + ' | ' + p2Score);
		ball.x = game.world.centerX;
		ball.y = game.world.centerY;
		ball.body.velocity.setTo(0,0);
		ball_launched = false;
	}
	
	if(p1Score == 5 || p2Score == 5){
		Win();
	}
},

function collision(paddle, ball){
	bounce.play();
},

function create_paddle(x,y){
	var paddle = game.add.sprite(x,y, 'paddle');
	paddle.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(paddle);
	paddle.body.collideWorldBounds = true;
	paddle.body.immovable = true;
	
	return paddle;   
},

function create_ball(x,y){
	var ball = game.add.sprite(x,y,'ball');
	ball.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(ball);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.setTo(1.1,1.1);
	
	return ball;
	
},

function launch_ball(){
	if(ball_launched){
		ball.x = game.world.centerX;
		ball.y = game.world.centerY;
		ball.body.velocity.setTo(0,0);
		ball_launched = false;
	}
	else{
		randVelocity = game.rnd.realInRange(-400, -200);
		randVelocity2 = game.rnd.realInRange(400, 200);
		ball.body.velocity.x =  randVelocity2+20;
		ball.body.velocity.y = 2 + Math.random() * 680;
		ball_launched = true;
	}
},

function Win(){
	game.state.start('win');
	
},
};
*/