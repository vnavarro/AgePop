(function(){
    var Piece = function(blockType) {
      this.initialize(blockType);
    }

    var p = Piece.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function(blockType) { 
        this.Container_initialize();

        this.blockType = blockType;
        this.createPiece();
    }

    Piece.prototype.createPiece = function(column,levelGrid) {
    	if(blockType == BlockTypeEnum.SQUARE){
	        if(column==this.gridColumns-1){
	            column--;
	        }

            var block = new Block(column,0);                 
            this.addChild(block);
            levelGrid[0][column] = {status:GridStatusEnum.BLOCK,element:block};

			block = new Block(column+1,0);                 
            this.addChild(block);                        
            levelGrid[0][column+1] = {status:GridStatusEnum.BLOCK,element:block};

            block = new Block(column,1);                 
            this.addChild(block);
            levelGrid[1][column] = {status:GridStatusEnum.BLOCK,element:block};

            block = new Block(column+1,1);                 
            this.addChild(block);
            levelGrid[1][column+1] = {status:GridStatusEnum.BLOCK,element:block};
    	}
    };

    window.Piece = Piece;
}());