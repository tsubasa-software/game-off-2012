
var GameScene = cc.Layer.extend({

    helloLabel:null,
   
    
    init:function () {

        this._super();
        
        var size = cc.Director.sharedDirector().getWinSize();
        this.helloLabel = cc.LabelTTF.create("Game layarrr!", "Arial", 28);
        this.helloLabel.setPosition(cc.ccp(size.width / 2, size.height - 40));
        this.addChild(this.helloLabel);
        
        this.schedule(this.update);
        return true;
        
        
    },
    
    update:function(dt){
	    dpad.update();
	    
	    if(dpad.keys.up.state == dpad.stateKeyDown){
		    console.log("Up Down!");
	    }
	    
    }

});

GameScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = this.node();
    scene.addChild(layer);
    return scene;
};

GameScene.node = function () {
    var ret = new GameScene();
    if (ret && ret.init())  return ret;
    return null;
};

