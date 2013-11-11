var canvas;
var stage;
var level;
var stage_screen;
var screen_width;
var screen_height;
var current_music_handle;
window.shouldUpdate = false;
window.GameStatesEnum = {
	LOADING:0,
	GAMEOVER:1,
	PREPLAYING:2,
  PLAYING:3,
  PAUSED:4,
  MENU:5  
};
var SOUND_STATUS = true;

function switchSoundStatus(){
	SOUND_STATUS = !SOUND_STATUS;
}

function init(){
	canvas = document.getElementById("canvas");
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);

	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;

	// enabled mouse over / out events
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

	// var messageField = new createjs.Text("Loading...", "bold 42px MedievalSharp", "#000000");
	// messageField.maxWidth = 1000;
	// messageField.textAlign = "center";
	// messageField.x = canvas.width / 2;
	// messageField.y = canvas.height / 2;
	// stage.addChild(messageField);	

	loadMenu();
	stage.update();
	// this.level = new Level(stage);

	// var g = new Grid();
	// stage.addChild(g);
	// stage.update();

	// var bg = new BlockGroup(BGroupTypeEnum.SQUARE2);
	// stage.addChild(bg);	
	// bg = new BlockGroup(BGroupTypeEnum.LINE3);
	// bg.x = 128;
	// stage.addChild(bg);	
	// stage.update();

	// createjs.SoundJS.registerPlugins([createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	// createjs.SoundJS.checkPlugin(true);	
	// createjs.SoundJS.stop();

	/*var manifest = [
		//{id:"play", src:"/assets/snd_sword_atk.mp3",data:6},
		//{id:"ingame", src:"/assets/kumasigroove.mp3",data:6},
		{id:"ingame", src:"/assets/kumasigroove.mp3"}
		//{id:"endgame", src:"/assets/Danse Macabre - Finale.mp3",data:6},
		//{id:"menu", src:"/assets/Darkest Child.mp3",data:6}		
	];

	preload = new createjs.PreloadJS();
	preload.onComplete = doneLoading;
	preload.installPlugin(createjs.SoundJS);
	preload.loadManifest(manifest);*/
	doneLoading();
}

function doneLoading(){
	// stage.removeAllChildren();
	// //current_music_handle = createjs.SoundJS.play("/assets/earthprelude.mp3", createjs.SoundJS.INTERRUPT_ANY, 0, 1, -1, 1);
	// snd = new Audio("/assets/earthprelude.mp3");
 //    snd.loop = true;
       
	// snd.play();
	startGame();
}

function startGame() {		
	// loadMenu();

	// we want to do some work before we update the canvas,
	// otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);

}

function tick(event){	
	if(game_state != GameStatesEnum.PLAYING && game_state != GameStatesEnum.MENU) return;
	// console.log("update",stage_screen.update);
	if(stage_screen.update){			
		// if(game_state == GameStatesEnum.PLAYING){
			if (shouldUpdate) {		        
				shouldUpdate = false; // only update once
				stage_screen.update();
				stage.update(event);
			}
			else{
				stage_screen.update();
				stage.update();
			}
		// }
		// else{			
		// 	stage_screen.update();
		// 	stage.update();
		// }
	}
	else{
		stage.update();
	}
}

function unloadCurrentScreen(){
	if(stage_screen && stage_screen.unload) stage_screen.unload();	
	stage.removeAllChildren();
	stage_screen = null;
}

function loadMenu(){	
	unloadCurrentScreen();
	stage_screen  = new MainMenu();
	stage.addChild(stage_screen);
	game_state = GameStatesEnum.MENU;
}

function loadLevelSelection(){	
	unloadCurrentScreen();
	stage_screen = new LevelSelection();
	stage.addChild(stage_screen);
	game_state = GameStatesEnum.MENU;
}

function loadLevel(){
	unloadCurrentScreen();
	stage_screen = new Level(stage);
	// stage_screen.addBoardOnStage(stage);
	game_state = GameStatesEnum.PLAYING;
}

function loadEndGame(score){
	unloadCurrentScreen();
	stage_screen = new GameOverScreen(score);
	stage.addChild(stage_screen);
	game_state = GameStatesEnum.MENU;
}