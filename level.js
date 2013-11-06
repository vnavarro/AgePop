(function(){
    var Level = function(stage) {
        this.stage = stage;
    	this.time_limit = 121;
		this.time_consumed = 0;
		this.time_since_last_update = createjs.Ticker.getTime(false)/1000;
		this.level_time  = 0;

		game_state = GameStatesEnum.PLAYING;

		this.score = 0;

    this.bg = new createjs.Bitmap("bg.png");
    this.bg.y = 124;
    this.stage.addChild(this.bg);    

		this.g = new Grid();
		this.g.level = this;
		this.g.y = 128;
    this.g.x = 5;
		this.stage.addChild(this.g);

		this.dropper = new BlockDropper();

		this.stage.addChild(this.dropper);
		this.stage.update();

		this.txtTime = new createjs.Text("Remaining time: 0", "bold 26px Slackey", "#6A5ACD");
		this.txtTime.maxWidth = 1000;		
    this.txtTime.y = 10;
		stage.addChild(this.txtTime);

		this.txtScore = new createjs.Text("Score: 0", "bold 26px Slackey", "#F0E510");
		this.txtScore.maxWidth = 1000;
		this.txtScore.y = this.txtTime.getMeasuredHeight()+15;
		stage.addChild(this.txtScore);
    }

	Level.prototype.isLevelCompleted = function(){
		return false;
	}

	Level.prototype.update = function(){		
		
		// if(this.isLevelCompleted()){
			// this.current_game_state = GameStatesEnum.ENDED;
			// this.callLoadEndGame(true);
		// }
		this.time_consumed += (createjs.Ticker.getTime(false)/1000)-this.time_since_last_update;
		this.level_time += (createjs.Ticker.getTime(false)/1000)-this.time_since_last_update;
		this.time_since_last_update = createjs.Ticker.getTime(false)/1000;				

		this.dropper.update();
		if(this.time_consumed >= 3){
			// console.log("Drop block");
			this.time_consumed = 0;		
			this.dropper.drop(this.g,this.stage);
		}

		if (this.level_time >= this.time_limit)
		{		   
		    console.log("2 Minutes");
		    game_state = GameStatesEnum.ENDED
        loadEndGame(this.score)
		}
		else this.txtTime.text = "Remaining Time: "+Math.floor(this.time_limit-(this.level_time));
	};

	Level.prototype.callLoadEndGame = function(){

	};

	Level.prototype.onCleanGrid = function() {
		for (var i = 0; i < this.dropper.blocks.length; i++) {
    		if(!this.dropper.blocks[i].dragging && this.dropper.blocks[i].lock){    			
    			stage.removeChild(this.dropper.blocks[i]);
    			this.dropper.blocks[i].remove = true;
	    	}
		};
		this.givePoints();
	};

  Level.prototype.givePoints = function() {
        this.score += 132 * this.g.lines*this.g.columns;
        this.txtScore.text = this.score; 
    };

    Level.prototype.updatePoints = function(score) {
      this.score += score;
        this.txtScore.text = "Score: "+this.score; 
    };

  Level.prototype.unload = function() {
  };  

    window.Level = Level;
}());