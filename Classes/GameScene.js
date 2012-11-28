
var GameScene = cc.Layer.extend({

    waves: null,
    wavesBG: null,
    sky: null,
    clouds: null,
    boat: null,
    rebels: null,
    
    init:function () {

        this._super();
        
        var size = cc.Director.sharedDirector().getWinSize();
        
        this.sky = new Sky();
        this.sky.setPosition(cc.ccp(0, 30));
        this.addChild(this.sky);
        
        this.clouds = new Clouds();
        this.clouds.setAnchorPoint(cc.ccp(0, 1));
        this.clouds.setPosition(cc.ccp(0, size.height-10));
        this.addChild(this.clouds);        
        
        this.wavesBG = new WaterBG();
        this.wavesBG.setPosition(cc.ccp(0, -16));
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
        
        this.rebels = Rebels(this);
        this.rebels.node.setPosition(cc.ccp(0,220));
        this.rebels.node.setAnchorPoint(cc.ccp(0,0.5));
        this.addChild(this.rebels.node);
        
        this.waves = new Water();
        this.waves.setPosition(cc.ccp(0, 0));
        this.addChild(this.waves);
        
        this.schedule(this.update);
        
        return true;
        
    },
    
    update:function(dt){
	    
	    this.rebels.update();
	    
	    if(dpad.keys.up.state == dpad.stateKeyDown){
			this.boat.capn.jump();	    	
	    }else if(dpad.keys.down.state == dpad.stateKeyPressed){
	    	this.boat.capn.crouch();
	    }else if(dpad.keys.left.state == dpad.stateKeyPressed){
		    this.boat.capn.walkLeft();
	    }else if(dpad.keys.right.state == dpad.stateKeyPressed){
		    this.boat.capn.walkRight();
	    }else{
		    this.boat.capn.wait();
	    }
	    
	    dpad.update();
	    
	    if(rnd(100) == 4){
		   this.rebels.addRandomRebel();
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

