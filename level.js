window.GameStatesEnum = {
	LOADING:0,
	ENDED:1,
	PREPLAYING:2,
    PLAYING:3,
    PAUSED:4
};

(function(){
    var Level = function(stage) {
        this.stage = stage;
    	this.time_limit = 60;
		this.time_consumed = 0;
		this.time_since_last_update = 0;

		this.current_game_state = GameStatesEnum.PLAYING;

		this.g = new Grid();
		this.stage.addChild(this.g);

		this.dropper = new BlockDropper();
		this.stage.addChild(this.dropper);

		this.stage.update();

		// this.bg = new createjs.Bitmap("assets/boardBg.png");
		// this.bg.x = 15;
		// this.bg.y = 70;
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
		if(this.current_game_state != GameStatesEnum.PLAYING) return;
		
		// if(this.isLevelCompleted()){
			// this.current_game_state = GameStatesEnum.ENDED;
			// this.callLoadEndGame(true);
		// }
		this.time_consumed += (createjs.Ticker.getTime(false)/1000)-this.time_since_last_update;
		this.level_time += (createjs.Ticker.getTime(false)/1000)-this.time_since_last_update;
		this.time_since_last_update = createjs.Ticker.getTime(false)/1000;				

		this.dropper.update();
		if(this.time_consumed >= 5){
			// console.log("Drop block");
			this.time_consumed = 0;		
			this.dropper.drop(this.g,this.stage);
		}

		if (this.level_time >= this.time_limit)
		{		   
		    // console.log("Minute");
		}
		// if (this.time_consumed >= this.time_limit*(createjs.Ticker.getFPS()))
		// {
		// 	this.current_game_state = GameStatesEnum.ENDED;			    
		//     this.callLoadEndGame(false);
		// }
		// else this.clock.text = "Remaining Time:"+Math.floor(this.time_limit-(this.time_consumed/this.time_limit));
	};

	Level.prototype.callLoadEndGame = function(){

	};

    window.Level = Level;
}());