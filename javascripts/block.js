(function(){
    var Block = function(imgType) {
        if(imgType == null) imgType = -1;
        this.initialize(imgType);
    }

    var p = Block.prototype = new createjs.Bitmap("assets/blue_round_candy.png");
     
    p.Bitmap_initialize = p.initialize;
    p.initialize = function(imgType) {  
        if(imgType == -1){
            this.imgType = Math.floor(Math.random()*4);        
        }else{
            this.imgType = imgType;
        }
        var candy_image = "";
        if(this.imgType==0){
            candy_image = "assets/blue_round_candy.png";
        }
        else if(this.imgType==1){
            candy_image = "assets/red_round_candy.png";   
        }
        else if(this.imgType==2){
            candy_image = "assets/yellow_round_candy.png";
        }
        else if(this.imgType==3){
            candy_image = "assets/orange_round_candy.png";
        }
        this.Bitmap_initialize(candy_image);
        this.height = this.image.height;
        this.width = this.image.width;
        this.scaleX = this.scaleY = 1;
    }

    window.Block = Block;
}());