(function(){
    var BlockDropper = function() {
      this.initialize();
    }

    var p = BlockDropper.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function() { 
        this.Container_initialize();

        this.x = 400;

        this.blockSpeed = 1.5;

        this.blocks = new Array();

        // var shape = new createjs.Shape();
        // shape.graphics.beginFill("rgba(255,234,45,1)").drawRect(0, 0, 200, screen_height);
        // this.addChild(shape);

        this.bg = new createjs.Bitmap("assets/esteira.png");
        this.bg.x = this.x;
        stage.addChild(this.bg);

        this.bgMachine = new createjs.Bitmap("assets/machine.png");
        this.bgMachine.x = this.x;
        stage.addChild(this.bgMachine);

  //       var bg = new BlockGroup(g,BGroupTypeEnum.SQUARE2);
		// stage.addChild(bg);	
		// bg = new BlockGroup(g,BGroupTypeEnum.LINE3);
		// bg.x = 128;
		// stage.addChild(bg);	
		// stage.update();
    }

    BlockDropper.prototype.update = function() {    	    	
		for (var i = 0; i < this.blocks.length; i++) {
			if(this.blocks[i].remove == true){
				stage.removeChild(this.blocks[i]);
				this.blocks.splice(i,1);
				i--;
			}
		}

    	for (var i = 0; i < this.blocks.length; i++) {
    		if(!this.blocks[i].dragging && !this.blocks[i].lock){    			
	    		this.blocks[i].y += this.blockSpeed;
	    		if(this.blocks[i].y > screen_height){
	    			this.blocks[i].remove = true;
	    		}
	    	}
    	};
    };

    BlockDropper.prototype.getBlockType = function(){
    	var rnd = Math.floor(Math.random()*4);
    	if(rnd == 0) return BGroupTypeEnum.ONE;
    	else if(rnd == 1) return BGroupTypeEnum.LINE2;
    	else if(rnd == 2) return BGroupTypeEnum.LINE3;
    	else if(rnd == 3) return BGroupTypeEnum.SQUARE2;
    }

    BlockDropper.prototype.drop = function(grid,stage) {    	    	
    	var blockGroup = new BlockGroup(grid,this.getBlockType());
    	blockGroup.x = this.x+100-blockGroup.width/2;
    	blockGroup.y = -blockGroup.height/2;
		stage.addChild(blockGroup);	
		this.blocks.push(blockGroup);
        stage.swapChildren(this.bgMachine,blockGroup);
    };

    BlockDropper.prototype.reDrop = function(blockGroup) {                
        blockGroup.x = this.x+100-blockGroup.width/2;
    };

    window.BlockDropper = BlockDropper;
}());