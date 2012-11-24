// CLOUDS
var Clouds = function(){
	
	var size = cc.Director.sharedDirector().getWinSize();
	var node = new cc.Node();
	var tileSizeW = 80;
	var tileSizeH = 75;
	var cloudsPattern = [[1,0,0,0,2,3,3,0,0,0,0,0,0,0,2,3,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,3,2,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
						 [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,3,2,0,0,0,0,0,0,0],
						 [0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
						 [3,2,3,0,0,0,0,3,2,2,3,0,0,0,0,3,2,0,0,2,3,3,0,0,2,0,0,3,0,0,2,0,0,2,0,1]];
						 
	var maxi = cloudsPattern.length;
	var maxj = cloudsPattern[0].length;
	
	for(var i = 0; i < maxi; i++){
		
		var cloudNode = new cc.Node();
		
		for(var j = 0; j < maxj; j++){	
			var tileState = cloudsPattern[i][j];
			if(tileState){
				
				// CLOUD
				var cloudFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("cloud0"+tileState+".png");
			    var aCloud = new cc.Sprite();
			    aCloud.initWithSpriteFrame(cloudFrame);
			    aCloud.setPosition(cc.ccp(j*tileSizeW,0));
			    aCloud.setAnchorPoint(cc.ccp(0, 1));
			    cloudNode.addChild(aCloud);
			    
			}
		}
		
		cloudNode.setContentSize(cc.SizeMake(maxj*tileSizeW, tileSizeH));
		cloudNode.setPosition(cc.ccp(0,maxi*tileSizeH-i*tileSizeH));
		cloudNode.setAnchorPoint(cc.ccp(0, 0));
		cloudNode.setScale(1-(i*.08));
		
		var moveAction = cc.RepeatForever.create(
		cc.Sequence.create(
			cc.MoveBy.create(maxj*(2.0*(i+1)), cc.ccp((maxj*tileSizeW+size.width)*-1, 0)),
			cc.CallFunc.create(cloudNode, function(){
				this.setPosition(cc.ccp(size.width,this._position.y));
			})
			)
		);
	
		cloudNode.runAction(moveAction);
		node.addChild(cloudNode);
		
	}
	
	node.setContentSize(cc.SizeMake(maxj*tileSizeW, maxi*tileSizeH));
	
	return node;
	
}


// BOAT

var Boat = function(){

	var node = new cc.Node();
	var size = cc.Director.sharedDirector().getWinSize();
	
	// BOAT
	var boatFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("boat01.png");
    var boatSprite = new cc.Sprite();
    boatSprite.initWithSpriteFrame(boatFrame);
    boatSprite.setPosition(cc.ccp(0,0));
    boatSprite.setAnchorPoint(cc.ccp(0, 0));
    node.addChild(boatSprite);
    
    // SAIL
    var sail = new Sail();
    sail.setAnchorPoint(cc.ccp(0, 1));
    sail.setPosition(cc.ccp(0, size.height));
    node.addChild(sail);
    
    // CAPN
    var capn = Capn.spriteWithSpriteFrameName("capn_idle01.png");
    capn.setAnchorPoint(cc.ccp(0, 0));
    capn.setPosition(cc.ccp(380, 202));
    node.addChild(capn);
    
    capn.didDie = function(){
    
    	var capnPosition = capn.getPosition();
    	var capnSize = capn.getContentSize();
	    node.addChild(addWaterDrops(cc.ccp(capnPosition.x+capnSize.width/2,capnPosition.y+capnSize.height/2), 15+rnd(5)));
    }
    
    // PLANK
    var plankFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("plank01.png");
    var plankSprite = new cc.Sprite();
    plankSprite.initWithSpriteFrame(plankFrame);
    plankSprite.setPosition(cc.ccp(-90,188));
    plankSprite.setAnchorPoint(cc.ccp(0, 0));
    node.addChild(plankSprite);
    
    
    // REFERENCES
    node.capn = capn;
    node.sail = sail;
    node.boat = boatSprite;
    
    return node;
}

// SAIL
var Sail = function(){
	var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("sail01.png");
    var sprite = new SailSprite();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
}

SailSprite = cc.Sprite.extend({
	init: function(){
		this._super();
		var animationAction = setupSpriteAnimation("sail", 4);
		this.runAction(animationAction);
	}
});

// SKY

var Sky = function(){

	var size = cc.Director.sharedDirector().getWinSize();
        
    var sky = new RepeatXSprite();
    sky.setContentSize(cc.SizeMake(size.width, 450));
    sky.setAnchorPoint(cc.ccp(0, 0));
    sky.build("background_sky.png", SkyTile);

	return sky;
}

var SkyTile = cc.Sprite.extend({
	
});

SkyTile.spriteWithSpriteFrameName = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrameName);
    var sprite = new SkyTile();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
};


// FOREGROUND WAVES

var Water = function(){

	var size = cc.Director.sharedDirector().getWinSize();
        
    var waves = new RepeatXSprite();
    waves.setContentSize(cc.SizeMake(size.width, 32));
    waves.setAnchorPoint(cc.ccp(0, 0));
    waves.build("waterwave01.png", WaterTile);

	return waves;
}

var WaterTile = cc.Sprite.extend({
	init: function(){
		this._super();
		var animationAction = setupSpriteAnimation("waterwave", 4);
		this.runAction(animationAction);
	}
});

WaterTile.spriteWithSpriteFrameName = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrameName);
    var sprite = new WaterTile();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
};


// BACKGROUND WAVES

var WaterBG = function(){

	var size = cc.Director.sharedDirector().getWinSize();
        
    var waves = new RepeatXSprite();
    waves.setContentSize(cc.SizeMake(size.width, 68));
    waves.setAnchorPoint(cc.ccp(0, 0));
    waves.build("background_wave01.png", WaterTileBG);

	return waves;
}

var WaterTileBG = cc.Sprite.extend({
	init: function(){
		this._super();
		var animationAction = setupSpriteAnimationWithCustomDelay("background_wave", 6, .22);
		this.runAction(animationAction);
	}
});

WaterTileBG.spriteWithSpriteFrameName = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrameName);
    var sprite = new WaterTileBG();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
};



// WaterDrops
var addWaterDrops = function(origin, count){
	
	var node = cc.Node.create();
	
	for( var i = 0; i < count; i++){
		var drop = new WaterDrop(origin);
		node.addChild(drop);
	}
	
	var wait		= cc.DelayTime.create(1.2);
	var autoRemove  = cc.CallFunc.create(node, function(){
	   this._parent.removeChild(this);
    });
	
	node.runAction(cc.Sequence.create(wait,autoRemove));	
	return node;
}

var WaterDrop = function(origin){
	
	var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("waterdrop0"+rnd(2)+".png");
    var sprite = new cc.Sprite();
    sprite.initWithSpriteFrame(pFrame);
    sprite.setPosition(origin);
    
    var jump = cc.JumpBy.create(.6+(rnd(5)/10), cc.ccp((rnd(120)-20)*3,-60), 50+rnd(100), 1);
    sprite.runAction(jump);
	
	return sprite;
}