var winState = function(game){}

var winText;

winState.prototype = {
	create: function(){
		if(p1Score == 5){
			var winText = game.add.text('Player 1 wins! Press *Spacebar* to play again');
		}
		else{
			var winText = game.add.text('Player 2 wins! Press *Spacebar* to play again');
		}
		
		spaceKey.onDown.addOnce(this.restart, this);
	},
	
	restart: function(){
		game.state.start('menu')
	}	
}