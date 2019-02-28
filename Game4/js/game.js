var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');




game.state.add('boot', BasicGame.bootState);
game.state.add('load', BasicGame.loadState);
game.state.add('menu', BasicGame.menuState);
game.state.add('play', BasicGame.playState);
game.state.add('win', BasicGame.winState);

game.state.start('boot');