var Rebels = function(_world){
	
	var self = {};
	
	self.world 	= _world;
	self.node 	= new cc.Node();
	
	self.update = function(){
		
		var capn = self.world.boat.capn;
		var capnBox = capn.hitArea.boundingBoxToWorld();
		var list = self.node.getChildren();
		
		for(var aRebelIndex in list){
			var aRebel = list[aRebelIndex];
			aRebel.update();
			
			if(aRebel.live){
				var hitArea = cc.Rect.CCRectIntersection(capnBox, aRebel.hitArea.boundingBoxToWorld());
				
				if(hitArea.size.width > 0 && hitArea.size.height > 0){
					aRebel.hit();
					capn.hit();
				}
			}
		}
		
	}
	
	self.addRandomRebel = function(){
		
		var type = PM.REBEL_TYPE.BOTTLE;
		var aRebel = null;
		
		if(type == PM.REBEL_TYPE.BOTTLE){
			aRebel = new BottleRebel.create();
		}
		
		if(aRebel){
			self.node.addChild(aRebel);
		}
	}
	
	return self;
	
}


var BaseRebel = cc.Sprite.extend({
	
	live: true,
	
	update: function(){
		// do nothing
	},
	
	hit: function(){
		this.live = false; 
	}
	
});


var BottleRebel = BaseRebel.extend({
	update: function(){
		if(this.live){
			this._rotation += 10;
			this.setPosition(cc.ccp(this._position.x+12, this._position.y));
		}
	},
	
	hit: function(){
		this.live = false; 
		
		this.stopAllActions();
		var jump = cc.JumpBy.create(0.7, cc.ccp(120,-400), 220, 1);
		this.runAction(jump);
		
	}
	
});

BottleRebel.create = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("bootle.png");
    var sprite = new BottleRebel();
    sprite.initWithSpriteFrame(pFrame);
    sprite.setPosition(cc.ccp(-120, 90));
    addHitArea(sprite,20,30,0,-10);
    return sprite;
};
