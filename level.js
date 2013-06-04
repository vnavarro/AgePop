(function(){
    var Level = function(stage) {
        this.stage = stage;
    	this.time_limit = 120;
		this.time_consumed = 0;
		this.time_since_last_update = 0;
		this.level_time  = 0;

		currentGameState = GameStatesEnum.PLAYING;

		this.score = 0;

		this.g = new Grid();
		this.g.level = this;
		this.g.y = 50;
		this.stage.addChild(this.g);

		this.dropper = new BlockDropper();

		this.stage.addChild(this.dropper);
		this.stage.update();

		this.txtTime = new createjs.Text("Remaining time:0", "bold 26px MedievalSharp", "#000000");
		this.txtTime.maxWidth = 1000;		
		stage.addChild(this.txtTime);

		this.txtScore = new createjs.Text("0", "bold 26px MedievalSharp", "#000000");
		this.txtScore.maxWidth = 1000;
		this.txtScore.y = 25;
		stage.addChild(this.txtScore);
    }

    Level.prototype.addBoardOnStage = function(stage) {
		// stage.addChild(this.bg);
		// for (var i = 0;i<this.rows; i++) {
		// 	for (var j = 0;j<this.columns;j++) {
		// 		stage.addChild(this.blocks[i][j]);		
		// 	};
		// };		
		// this.current_game_state = GameStatesEnum.PLAYING;
		// stage.addChild(this.title);
		// stage.addChild(this.clock);
		// stage.addChild(this.btn_back);
		// stage.addChild(this.btn_pause);
	};

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
		    currentGameState = GameStatesEnum.ENDED
		    // this.callLoadEndGame();
		}
		else this.txtTime.text = "Remaining Time:"+Math.floor(this.time_limit-(this.level_time));
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
        this.txtScore.text = this.score; 
    };

    window.Level = Level;
}());