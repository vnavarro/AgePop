(function(){
    var GameOverScreen = function() {
      this.initialize();
    }

    var p = GameOverScreen.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function() { 
        this.Container_initialize();

        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgba(255,234,45,1)").drawRect(0, 0, 200, 200);
        this.addChild(shape);
    }

    window.GameOverScreen = GameOverScreen;
}());