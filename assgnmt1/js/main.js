// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        //Load bird sprite
        game.load.image('bird','assets/bird.png');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        //Change background color to blue
        game.stage.backgroundColor = '#71c5cf';

        //set physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Display bird at x=100, y=245
        this.bird = game.add.sprite(100,245,'bird');

        //Apply phyics to the Bird
        game.phyics.arcade.enable(this.bird);

        //Add gravity to the bird to make it fall
        this.bird.body.gravity.y=1000;

        //Call jump function when spacekey is hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic

        //If bird out of screen, restart game
        if(this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
    },

    jump: function() {

      //adds vertical velocity to bird
      this.bird.body.velocity.y = -350;
    }

    restartGame: function(){

    //Start the main state, which restarts the game.
    game.state.start('main');
    }
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
