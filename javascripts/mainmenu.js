(function(){
	var MainMenu = function() {
    this.initialize();
  }

  var p = MainMenu.prototype = new createjs.Container();
   
  p.Container_initialize = p.initialize;
  p.initialize = function() {	
    this.Container_initialize();

    // this.bg = new createjs.Bitmap("assets/bgBig.png");
    //this.bg.x = 320-220;
    //this.bg.y = 240 - 150;

    // this.addChild(this.bg);

    this.row1 = new createjs.Bitmap("assets/candies.png");
    this.row1.x = -35;
    this.row1.y = 380;
    this.row2 = new createjs.Bitmap("assets/candies2.png");
    this.row2.x = -64;
    this.row2.y = 420;

    createjs.Tween.get(this.row1,{loop:true})
    .to({y:390},1000)
    .to({y:380},1000);
    createjs.Tween.get(this.row2,{loop:true})
    .to({y:410},1000)
    .to({y:420},1000);

    this.addChild(this.row1);
    this.addChild(this.row2);

    // this.title = new createjs.Text("Candy Festival","60px Slackey","#d4a00f");
    this.title = new createjs.Bitmap("assets/title.png");
		this.title.x = 60;
		this.title.y = 25;

		this.addChild(this.title);

		var credits_text = "Created by Vitor Navarro	www.vnavarro.com.br";
        this.credits = new createjs.Text(credits_text,"18px Slackey","#784421");
		this.credits.x = 380;
		this.credits.y = 540;
		this.credits.lineWidth = 220;

		this.addChild(this.credits);


    var spriteSheet = new createjs.SpriteSheet({
    "animations": {
        "on": [0, 0],
        "off": [1, 1],
    }, 
    "images": ["assets/btn_sound.png","assets/btn_sound_disabled.png"],
     "frames": { "width": 64, "height": 64, "count": 2}
    });
    this.btn_sound = new createjs.BitmapAnimation(spriteSheet);
    // this.btn_sound = new createjs.Bitmap("btn_sound.png");
    this.btn_sound.x = screen_width/2 + 64;
    this.btn_sound.y = screen_height/2 - 80;
    this.btn_sound.parent = this;
    this.btn_sound.onClick = function (event){
      console.log("sound switch!");
      switchSoundStatus();
      var animation_name;
      if(SOUND_STATUS){ 
        animation_name = "on";
      }
      else{
        animation_name = "off";
      }
      this.gotoAndPlay(animation_name);
      // createjs.SoundJS.play("play", createjs.SoundJS.INTERRUPT_NONE);
    };

    this.btn_sound.gotoAndPlay("on");
    // this.addChild(this.btn_sound);

    this.btn_play = new createjs.Bitmap("assets/btn_play2.png");
		this.btn_play.x = screen_width/2 - 128;
		this.btn_play.y = screen_height/2 - 105;
		this.btn_play.parent = this;
		this.btn_play.onClick = function (event){
			console.log("play!");
			// createjs.SoundJS.play("play", createjs.SoundJS.INTERRUPT_NONE);
			// loadLevelSelection();
      loadLevel();
		};

		this.addChild(this.btn_play);   

    var highscore = localStorage.getItem('br.com.vnavarro.games.candyfestival.score');     
    if(highscore > 0){
      highscore = "Sweetest Score: "+ highscore;
      this.highscore_text = new createjs.Text(highscore,"18px Slackey","#F0E510");
      this.highscore_text.x = screen_width/2 - this.highscore_text.getMeasuredWidth()/2;
      this.highscore_text.y = screen_height/2 +20;

      this.addChild(this.highscore_text);
    }
  }

  MainMenu.prototype.unload = function() {
  		this.removeAllChildren();
	};	

	window.MainMenu = MainMenu;
}());