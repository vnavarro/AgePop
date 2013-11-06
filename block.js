(function(){
    var Block = function() {
      this.initialize();
    }

    var p = Block.prototype = new createjs.Bitmap("blue_round_candy.png");
     
    p.Bitmap_initialize = p.initialize;
    p.initialize = function() { 
        this.Bitmap_initialize("blue_round_candy.png");
        this.height = this.image.height;
        this.width = this.image.width;
        this.scaleX = this.scaleY = 1;
    }

    window.Block = Block;
}());