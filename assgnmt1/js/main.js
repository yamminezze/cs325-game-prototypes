var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
    game.load.image('starfield', 'assets/misc/space2.jpg');

}

var ball;
var paddle;
var bricks;

var ballOnPaddle = true;

var lives = 3;
var score = 0;

var scoreText;
var livesText;
var introText;

var s;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //Creates group so can perform actions on all bricks (Like count or revive)
    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    var brick;

    //Creates 4 rows of bricks
    for (var y = 0; y < 4; y++)
    {   //Creates 15 columns of bricks
        for (var x = 0; x < 15; x++)
        {
            brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }   //^sets phyics of the bricks
    }

    //creates and centers paddle
    paddle = game.add.sprite(game.world.centerX, 500, 'breakout', 'paddle_big.png');
    paddle.anchor.setTo(0.5, 0.5);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    //Allows the ball to collide and bounce off the walls
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    //Calls ballLost function when ball goes of bounds on bottom of screen
    ball.events.onOutOfBounds.add(ballLost, this);

    //Adds all text           (x,  y)   actual text       size and font       color          alignment
    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '- click to start - \n You must start below the bricks!', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    //Calls releaseBall function when LMB is clicked
    game.input.onDown.add(releaseBall, this);

}

function update () {

    //  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

    //Paddle follows mouse on the horizonal axis
    paddle.x = game.input.x;
    paddle.y = game.input.y;

    //Keeps paddle on screen
    if (paddle.x < 24)
    {
        paddle.x = 24;
    }
    else if (paddle.x > game.width - 24)
    {
        paddle.x = game.width - 24;
    }

    //Keeps ball on paddle
    if (ballOnPaddle)
    {
        ball.body.x = paddle.x;
        ball.body.y = paddle.y - 20;
    }
    else
    {   //Causes ball to bounce off bricks and paddle(?)
        game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    }

}

function releaseBall () {

    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        //ball.body.velocity.y = -300;
        //ball.body.velocity.x = -75;
        ball.body.velocity.y = -550;  //Sets velocities
        ball.body.velocity.x = -325;
        ball.animations.play('spin'); //Start animation
        introText.visible = false;    //Gets rid of intro text
    }

}

function ballLost () {

    lives--;
    livesText.text = 'lives: ' + lives; //Updates and shows updated lives

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        //?????
        ball.reset(paddle.body.x + 16, paddle.y - 16);

        //Stops animations
        ball.animations.stop();
    }

}

function gameOver () {

    ball.body.velocity.setTo(0, 0);

    introText.text = 'Game Over!';
    introText.visible = true;

}

function ballHitBrick (_ball, _brick) {
    //Removes hit brick
    _brick.kill();

    //Increases score then displays updated score
    score += 100;
    scoreText.text = 'score: ' + score;

    //  Checks if the person won then updates score and resets
    if (bricks.countLiving() == 0)
    {
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Resets ball on paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        //  And bring the bricks back from the dead
        bricks.callAll('revive');
    }

}

function ballHitPaddle (_ball, _paddle) {

    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

}
