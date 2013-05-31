(function(){
    var Grid = function() {
      this.initialize();
    }

    var p = Grid.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function() { 
        this.Container_initialize();

   //      var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
         // var shape = new createjs.Shape(graphics);

         //Alternatively use can also use the graphics property of the Shape class to renderer the same as above.
        this.lines = 7;
        this.columns = 5;
        this.width = this.columns * 64;
        this.height = this.lines *64;

        this.field = new Array(this.lines);
         

         for (var i = 0; i < this.lines; i++) {
            this.field[i] = new Array(this.columns);
            for (var j = 0; j < this.columns; j++) {
                this.field[i][j] = 0;
                var shape = new createjs.Shape();
                var red = Math.floor(Math.random()*255);
                var green= Math.floor(Math.random()*255);
                var blue = Math.floor(Math.random()*255);
                // console.log("rgba("+red+","+green+","+blue+",1)");
                shape.graphics.beginFill("rgba("+red+","+green+","+blue+",1)").drawRect(64*j, 64*i, 64, 64);
                this.addChild(shape);
            };
         };
    }

    Grid.prototype.isInside = function(blockGroup) {
        if(blockGroup.x < this.x-32) return false;
        else if((blockGroup.x >= this.x + this.width) || (blockGroup.xMax() >  this.x + this.width + 32)) return false;
        else if((blockGroup.y < this.y - 32) || (blockGroup.y >= this.y+this.height)) return false;
        else if(blockGroup.yMax() > this.y+this.height+64) return false;
        return true;
    };

    Grid.prototype.onDrop = function(blockGroup) {
        var inside = this.isInside(blockGroup);
        console.log("Inside?"+inside);
        if(inside){
            if(this.placeBlock(blockGroup)){
                //TODO: check all grid and give points
                if(this.checkGrid()){
                    this.givePoints();
                    this.cleanGrid();
                }
            }
            else{
                //TODO: Destroy block
            }
        }
        else{
            //TODO: Destroy block
        }
    };

    Grid.prototype.pickSector = function(blockGroup){
        for (var i = 0; i < this.children.length; i++) {
            var hit = this.children[i].hitTest(blockGroup.x+blockGroup.width/2,blockGroup.y+blockGroup.height/2);
            console.log("Position hit",blockGroup.x,blockGroup.y,blockGroup.x+blockGroup.width/2,blockGroup.y+blockGroup.height/2);
            console.log("HIT?"+hit+" "+i);
            if (hit) return i;
        };
        return -1;
    }

    Grid.prototype.placeBlock = function(blockGroup) {
        var sector = this.pickSector(blockGroup);
        if (sector == -1) return false;
        else{
            var line = Math.floor(sector / this.columns);
            var column = (sector  % this.columns);
            if(this.cantInsertBlockOnField(line,column,blockGroup.blockType)) return false;

            blockGroup.x = column * 64 - ((blockGroup.size.columns-1)*64);
            blockGroup.y = line * 64 - ((blockGroup.size.lines-1)*64);
            console.log(sector+"."+line+"."+column+".")
            shouldUpdate = true;
            blockGroup.lock = true;
            this.insertBlockOnField(line,column,blockGroup.blockType);
            return true;            
        }
    };

    Grid.prototype.cantInsertBlockOnField = function(line,column,blockType) {
        //(line-1<this.lines)?line:
        var one = blockType == BGroupTypeEnum.ONE && this.field[line][column]==1;
        var two = blockType == BGroupTypeEnum.LINE2 && (this.field[line][column] == 1 || this.field[line-1][column] == 1);
        var three = blockType == BGroupTypeEnum.LINE3 && (this.field[line][column] == 1
         || this.field[line-1][column] == 1 || this.field[line-2][column] == 1);
        var square = blockType == BGroupTypeEnum.SQUARE2 && (this.field[line][column] == 1 || this.field[line-1][column] == 1 
         || this.field[line][column-1] == 1 || this.field[line-1][column-1] == 1);
        return one || two || three || square;
    };

    Grid.prototype.insertBlockOnField = function(line,column,blockType) {
        if (blockType == BGroupTypeEnum.ONE) {            
            this.field[line][column] = 1;
        }
        else if(blockType == BGroupTypeEnum.LINE2){
            this.field[line][column] = 1;
            this.field[line-1][column] = 1;
        }
        else if(blockType == BGroupTypeEnum.LINE3){
            this.field[line][column] = 1;
            this.field[line-1][column] = 1;
            this.field[line-2][column] = 1;
        }
        else if(blockType == BGroupTypeEnum.SQUARE2){
            this.field[line][column] = 1;
            this.field[line][column-1] = 1;
            this.field[line-1][column] = 1;
            this.field[line-1][column-1] = 1;
        }
    };

    Grid.prototype.checkGrid = function() {        
        var isFull = true;
        for (var i = 0; i < this.lines; i++) {
            isFull = this.field[i].indexOf(0) == -1
            if(isFull == false) return false;
        }
        return isFull;
    };

    Grid.prototype.givePoints = function() {
        
    };

    Grid.prototype.cleanGrid = function() {
        for (var i = 0; i < this.lines; i++) {
            for (var j = 0; j < this.lines; j++) {
                this.field[i][j] = 0;
            }
        }        
    };

    window.Grid = Grid;
}());