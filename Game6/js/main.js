// "use strict";

window.onload = function() {

    var game = new Phaser.Game( 1000, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'ship1', './assets/ship1.png' );
        game.load.image( 'meteor', './assets/meteor3.png');
        game.load.image( 'background', './assets/SpaceBackground.jpg');
        game.load.audio('music', './assets/music_shorter.wav');
        game.load.audio('aw', './assets/aw.wav');
    }

    var player1;
    var meteor;

    //var laserTime = 0;
    var done = false;
    var currSpeedY = 90;
    var numMeteors = 8;
    var killCounter = 0;
    var distance = 0;
    var played = false;

    function create() {

        music = game.add.audio('music');
        music.play();

        aw = game.add.audio('aw');


        // Create a sprite at the center of the screen using the 'logo' image.
        background = game.add.sprite(-20, 50, 'background' );
        background.scale.setTo(1, 1);
        //background.angle =+ 90;
        player1 = game.add.sprite( game.world.width - 500, game.world.height - 120, 'ship1' );


        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player1, Phaser.Physics.ARCADE );

        // Make it bounce off of the world bounds.
        player1.body.collideWorldBounds = true;

        //Adjusts hitbox
        player1.body.setSize(15,25,30,20);

        distanceText = game.add.text(16, 16, 'Distance: 0', { fontSize: '32px', fill: '#FFF' });
        botsText = game.add.text(340, 10, 'Reach 10,000 to get back home!', { fontSize: '24px', fill: '#FFF' });


        meteors = game.add.group();
        meteors.enableBody = true;
        meteors.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < numMeteors; i++)
        {
            var b = meteors.create(50 + (Math.random() * (game.world.width - 100)), 0, 'meteor');
            b.scale.setTo(.5, .5);
            b.body.velocity.y = currSpeedY + (Math.random() * 90);
            b.checkWorldBounds = true;
            //b.events.onOutOfBounds.add(endGame, this);
            b.events.onOutOfBounds.add(meteorFall, this);
        }



        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        //game.physics.arcade.overlap(lasers, enemies, enemyKill, null, this);
        game.physics.arcade.overlap(player1, meteors, endGame, null, this);


        player1.body.velocity.x = 0;
        // // player1.body.velocity.y = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player1.body.velocity.x = -250;
        }
        if (cursors.right.isDown) {
            //  Move to the right
            player1.body.velocity.x = 250;
        }

    }





    //  Called if meteor hits bottom of screen
    function meteorFall (meteor) {
        meteor.kill();

        killCounter++;
        distance += 20;
        distanceText.text = 'Distance: ' + distance;
        if (killCounter % 10 == 0) {currSpeedY += 10;}
        var b = meteors.create(50 + (Math.random() * (game.world.width - 100)), 0, 'meteor');
        b.body.velocity.y = currSpeedY + (Math.random() * 95);
        b.scale.setTo(.5, .5);
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(meteorFall, this);

    }

    function endGame (meteor) {
        game.add.text(game.world.centerX-225, game.world.centerY-25, 'GAME OVER', { fontSize: '75px', fill: '#FF0000' });
        game.add.text(game.world.centerX-115, game.world.centerY+50, 'Final Distance: ' + distance, { fontSize: '30px', fill: '#FFF' });
        music.pause();

        if(played == false){
            aw.play();
        }
        played = true;

        if (distance <= 5000) {
            game.add.text(game.world.centerX - 70, game.world.centerY+150, 'You dead bro', { fontSize: '25px', fill: '#FFF' });
        }

        if (distance > 5000) {
            game.add.text(game.world.centerX-70, game.world.centerY+150, "So close... yet so far", { fontSize: '25px', fill: '#FFF' });
        }
        game.physics.arcade.isPaused = true;
    }
};
