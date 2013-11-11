window.BGroupTypeEnum = {
    ONE : {line:1,column:1,code:"O"},
    LINE2 : {line:2,column:1,code:"L2"},
    LINE3 : {line:3,column:1,code:"L3"},
    SQUARE2 : {line:2,column:2,code:"S2"},
    SQUARE3 : {line:3,column:3,code:"S3"}
};

(function(){
    var mouseTarget;    // the display object currently under the mouse, or being dragged
    var dragStarted;    // indicates whether we are currently in a drag operation

    var BlockGroup = function(grid,type) {
      this.initialize(grid,type);
    }

    var p = BlockGroup.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function(grid,type) { 
        this.Container_initialize();

        this.grid = grid;
        this.blockType = type;
        this.size = this.addBlocks();

        this.width = this.size.columns*this.children[0].width;
        this.height = this.size.lines*this.children[0].height;

        this.onPress = function(evt) { 
            if (this.lock == true) return;  
            this.dragging = true;        
            var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};

            // add a handler to the event object's onMouseMove callback
            // this will be active until the user releases the mouse button:
            evt.onMouseMove = function(ev) {                                
                this.target.x = ev.stageX+offset.x;
                this.target.y = ev.stageY+offset.y;
                // indicate that the stage should be updated on the next tick:
                shouldUpdate = true;
                this.target.grid.onDragging(this.target);
            }

            evt.onMouseUp = function(ev){
                console.log("ended"+ev,this);
                this.target.dragging = false;
                this.target.grid.onDrop(this.target);                                            
            }
        }
        this.onMouseOver = function() {
            // this.scaleX = this.scaleY = this.scale*1.2;
            shouldUpdate = true;
        }
        this.onMouseOut = function() {
            // this.scaleX = this.scaleY = this.scale;
            shouldUpdate = true;
        }
        // var test = this;
        // (function(target) {
        //         test.onPress = function(evt) {
        //             // bump the target in front of it's siblings:
        //             var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

        //             // add a handler to the event object's onMouseMove callback
        //             // this will be active until the user releases the mouse button:
        //             evt.onMouseMove = function(ev) {
        //                 target.x = ev.stageX+offset.x;
        //                 target.y = ev.stageY+offset.y;
        //                 // indicate that the stage should be updated on the next tick:
        //                 update = true;
        //             }
        //         }
        //         test.onMouseOver = function() {
        //             // target.scaleX = target.scaleY = target.scale*2.2;
        //             update = true;
        //         }
        //         test.onMouseOut = function() {
        //             // target.scaleX = target.scaleY = target.scale*2;
        //             update = true;
        //         }
                
        //     })(test);
    }

    BlockGroup.prototype.xMax = function() {
        return this.x + this.width;
    };

    BlockGroup.prototype.yMax = function() {
        return this.y + this.height;
    };

    BlockGroup.prototype.addBlocks = function () {
        var lines = columns = 1;
        if (this.blockType == BGroupTypeEnum.ONE) {            
            var b = new Block();
            this.addChild(b);
        }
        else if(this.blockType == BGroupTypeEnum.LINE2){
            var b = new Block();
            var b2 = new Block(b.imgType);           
            // b2.x = b.x + b.width;
            b2.y = b.y + b.height * b.scaleY;
            this.addChild(b);   
            this.addChild(b2);  

            lines = 2;
        }
        else if(this.blockType == BGroupTypeEnum.LINE3){
            var b = new Block();
            var b2 = new Block(b.imgType);           
            var b3 = new Block(b.imgType);
            // b2.x = b.x + b.width;
            b2.y = b.y + b.height * b.scaleY;
            b3.y = b2.y + b2.height * b2.scaleY;
            this.addChild(b);   
            this.addChild(b2);  
            this.addChild(b3);  

            lines = 3;
        }
        else if(this.blockType == BGroupTypeEnum.SQUARE2){
            var b = new Block();
            var b2 = new Block(b.imgType);           
            var b3 = new Block(b.imgType);
            var b4 = new Block(b.imgType);           
            b2.x = b.x + b.width;
            // b2.y = b.y + b.height * b.scaleY;
            // b2.x = b.x + b.width;
            b3.y = b.y + b.height * b.scaleY;
            b4.x = b.x + b.width;
            b4.y = b.y + b.height * b.scaleY;
            this.addChild(b);   
            this.addChild(b2);  
            this.addChild(b3);   
            this.addChild(b4);  

            lines = 2;
            columns = 2
        }
        return {lines:lines,columns:columns};
    }

    window.BlockGroup = BlockGroup;
}());