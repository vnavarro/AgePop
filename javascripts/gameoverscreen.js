(function(){
    var GameOverScreen = function(score) {
      this.initialize(score);
    }

    var p = GameOverScreen.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function(score) { 
        this.Container_initialize();

        var highscore = localStorage.getItem('br.com.vnavarro.games.candyfestival.score');
        if (score > highscore){
            localStorage.setItem('br.com.vnavarro.games.candyfestival.score',score);
        }

        this.title = new createjs.Text("Scored "+score+" in sweeties","35px Slackey","#6866A2");
        this.title.x = screen_width/2 - this.title.getMeasuredWidth()/2;
        this.title.y = 45;

        this.addChild(this.title);

        this.continue_text = new createjs.Text("Eat more candies","18px Slackey","#B9E5F7");
        this.continue_text.x = 74 + screen_width/2 - this.continue_text.getMeasuredWidth()/2;
        this.continue_text.y = 180 + 20;
        this.addChild(this.continue_text);

        this.back_text = new createjs.Text("Give up?","18px Slackey","#B9E5F7");
        this.back_text.x = 74 +  screen_width/2 - this.back_text.getMeasuredWidth()/2;
        this.back_text.y = 276 + 20;        
        this.addChild(this.back_text);

        this.btn_play = new createjs.Bitmap("assets/red_round_candy.png");
        this.btn_play.x = screen_width/2 - 96;
        this.btn_play.y = 180;
        this.btn_play.parent = this;
        this.btn_play.onClick = function (event){
            console.log("play!");
            // createjs.SoundJS.play("play", createjs.SoundJS.INTERRUPT_NONE);
            // loadLevelSelection();
          loadLevel();
        };

        this.addChild(this.btn_play);        

        this.btn_back = new createjs.Bitmap("assets/orange_round_candy.png");
        this.btn_back.x = screen_width/2 - 96;
        this.btn_back.y = 276;
        this.btn_back.parent = this;
        this.btn_back.onClick = function (event){
            console.log("back!");
            // createjs.SoundJS.play("play", createjs.SoundJS.INTERRUPT_NONE);
            // loadLevelSelection();
          loadMenu();
        };

        this.addChild(this.btn_back);        
  }

  GameOverScreen.prototype.unload = function() {
        this.removeAllChildren();
    };  
    window.GameOverScreen = GameOverScreen;
}());