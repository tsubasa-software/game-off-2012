
var GameScene = cc.Layer.extend({

    waves: null,
    wavesBG: null,
    sky: null,
    boat: null,
    
    init:function () {

        this._super();
        
        var size = cc.Director.sharedDirector().getWinSize();
        
        this.sky = new Sky();
        this.sky.setPosition(cc.ccp(0, 30));
        this.addChild(this.sky);
        
        this.wavesBG = new WaterBG();
        this.wavesBG.setPosition(cc.ccp(0, -12));
        this.addChild(this.wavesBG);
        
        this.boat = new Boat();
        this.boat.setPosition(cc.ccp(0,0));
        this.addChild(this.boat);
        
        var upDownAction = cc.RepeatForever.create(
        						cc.Sequence.create(
        							cc.EaseOut.create(cc.MoveBy.create(.92, cc.ccp(0,10)),1.2),
        							cc.EaseOut.create(cc.MoveBy.create(.92, cc.ccp(0,-10)),1.2)
        						));
        this.boat.runAction(upDownAction);
        
        this.waves = new Water();
        this.waves.setPosition(cc.ccp(0, 0));
        this.addChild(this.waves);
        
        this.schedule(this.update);
        return true;
        
    },
    
    update:function(dt){
	    
	    
	    if(dpad.keys.left.state == dpad.stateKeyPressed){
		    this.boat.capn.setPosition(cc.ccp(this.boat.capn._position.x-1,this.boat.capn._position.y));
	    }else if(dpad.keys.right.state == dpad.stateKeyPressed){
		    this.boat.capn.setPosition(cc.ccp(this.boat.capn._position.x+1,this.boat.capn._position.y));
	    }
	    
	    
	    dpad.update();
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

