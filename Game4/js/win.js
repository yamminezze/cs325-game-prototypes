var winState = function(game){}

var winText;

winState.prototype = {
	init: function(p1Score, p2Score){
		if(p1Score > p2Score){
			alert("Player 1 wins!");
		}
		else{
			alert("Player 2 Wins!");
		}
	},
	create: function(){
		var text = this.game.add.text('Press *Up* to play again');
		//spaceKey.onDown.addOnce(this.restart, this);
	},
	
	update: function(){
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.state.start('menu');
		}
	}
	
	//restart: function(){
	//	game.state.start('menu')
	//}	
}