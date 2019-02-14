var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var paddle1;
var paddle2;
var ball;
var p1Score = 0;
var p2Score = 0;
var scoreText;
var bounce;

var ball_launched;
var ball_velocity;

function preload() {

	game.load.image('paddle', 'assets/paddle.png');
	game.load.image('ball', 'assets/ball1.png');
	game.load.audio('bounce', 'assets/bounce.wav');
}

function create() {
	paddle1 = create_paddle(0,game.world.centerY);
	paddle2 = create_paddle(game.world.width - 16, game.world.centerY);

	ball_launched = false;
	ball_velocity = 400;
	
	ball = create_ball(game.world.centerX, game.world.centerY);
	
	game.input.onDown.add(launch_ball, this);
	scoreText = this.add.text(16, 16, 'Score: 0 | 0', { fontSize: '32px', fill: '#922' });
	
	bounce = game.add.audio('bounce');
	bounce.volume = .1;
}

function update () {
	//control_paddle(paddle1,game.input.y);
	if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        paddle1.y -= 8;
    }
	else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
		paddle1.y += 8;
	}
	if(paddle1.y < paddle1.height / 2){
		paddle1.y = paddle1.height/2;
	} else if(paddle1.y > game.world.height - paddle1.height/2){
			paddle1.y = game.world.height - paddle1.height/2;
	}	
   
   if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        paddle2.y -= 9;
    }
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		paddle2.y += 9;
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
	
	//game.physics.arcade.collide(ball, paddle1, collision);
	//game.physics.arcade.collide(ball, paddle2, collision);
	//bounce.play();
}

function collision(paddle, ball){
	bounce.play();
}

function create_paddle(x,y){
	var paddle = game.add.sprite(x,y, 'paddle');
	paddle.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(paddle);
	paddle.body.collideWorldBounds = true;
	paddle.body.immovable = true;
	
	return paddle;   
}

function create_ball(x,y){
	var ball = game.add.sprite(x,y,'ball');
	ball.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(ball);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.setTo(1.1,1.1);
	
	return ball;
	
}

function launch_ball(){
	if(ball_launched){
		ball.x = game.world.centerX;
		ball.y = game.world.centerY;
		ball.body.velocity.setTo(0,0);
		ball_launched = false;
	}
	else{
		ball.body.velocity.x = -ball_velocity;
		ball.body.velocity.y = ball_velocity;
		ball_launched = true;
	}
}