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
    capn.setPosition(cc.ccp(280, 202));
    node.addChild(capn);
    
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
		var animationAction = setupSpriteAnimation("background_wave", 6);
		this.runAction(animationAction);
	}
});

WaterTileBG.spriteWithSpriteFrameName = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrameName);
    var sprite = new WaterTileBG();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
};