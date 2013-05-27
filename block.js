(function(){
    var Block = function() {
      this.initialize();
    }

    var p = Block.prototype = new createjs.Bitmap("block.png");
     
    p.Bitmap_initialize = p.initialize;
    p.initialize = function() { 
        this.Bitmap_initialize("block.png");
        this.height = this.image.height;
        this.width = this.image.width;
        // this.scaleX = this.scaleY = 2;
    }

    window.Block = Block;
}());