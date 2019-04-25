window.onload = function() {

    var game = new Phaser.Game( 1000, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'ship1', './assets/ship1.png' );
        game.load.image( 'meteor', './assets/meteor3.png');
        game.load.image( 'city', './assets/city.jpg');
        game.load.image( 'background', './assets/SpaceBackground.jpg');
        game.load.audio('music', './assets/music_shorter.wav');
        game.load.audio('aw', './assets/aw.wav');
        game.load.audio('victory', './assets/victory2.wav');
        game.load.audio('expload', './assets/explosion.wav');
        game.load.audio('engine', './assets/engine.wav');
    }

    var player1;
    var meteor;

    var done = false;
    var currSpeedY = 95;
    var numMeteors = 8;
    var killCounter = 0;
    var distance = 0;
    var played = false;
    var playedVictory = false;
    var hit = false;

    function create() {

        music = game.add.audio('music');
        music.volume = 0.07;
        music.play();

        aw = game.add.audio('aw');
        aw.volume = 0.3;

        victory = game.add.audio('victory');
        victory.volume = 0.1;

        expload = game.add.audio('expload');
        expload.volume = 0.05;

        engine = game.add.audio('engine');
        engine.volume = 0.04;
        engine.play();

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
        //while(hit == false){
          game.physics.arcade.overlap(player1, meteors, endGame, null, this);
          //hit = true;
        //}



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

        if(distance >= 1000){
          win();
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

    function win() {
        meteors.kill();
        player1.kill();
        engine.stop();
        music.stop();

        if(playedVictory == false){
            victory.play();
        }
        playedVictory = true;

        city = game.add.sprite(0, 0, 'city' );
        city.scale.setTo(.7, .7);

        game.add.text(game.world.centerX-445, game.world.centerY-25, 'You Survived! Welcome Home!', { fontSize: '60px', fill: '#FFFFFF' });
        game.add.text(game.world.centerX-235, game.world.centerY+50, 'Refresh page to go on another adventure!', { fontSize: '25px', fill: '#FFF' });
    }

    function endGame (meteor) {
        game.add.text(game.world.centerX-225, game.world.centerY-25, 'GAME OVER', { fontSize: '75px', fill: '#FF0000' });
        game.add.text(game.world.centerX-115, game.world.centerY+50, 'Final Distance: ' + distance, { fontSize: '30px', fill: '#FFF' });
        music.pause();
        engine.stop();
        if(played == false){
            expload.play();
            aw.play();
        }
        played = true;

        if (distance <= 7000) {
            game.add.text(game.world.centerX - 60, game.world.centerY+150, 'You dead bro', { fontSize: '25px', fill: '#FFF' });
        }

        if (distance > 7000) {
            game.add.text(game.world.centerX-70, game.world.centerY+150, "So close... yet so far", { fontSize: '25px', fill: '#FFF' });
        }
        game.physics.arcade.isPaused = true;
    }
};
