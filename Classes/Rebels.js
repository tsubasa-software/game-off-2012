var Rebels = function(_world){
	
	var self = {};
	
	self.world 		= _world;
	self.node 		= new cc.Node();
	self.cooldown 	= 0;
	self.frame 		= 0;
	self.update 	= function(dt){
		
		var capn = self.world.boat.capn;
		var capnBox = capn.hitArea.boundingBoxToWorld();
		var list = self.node.getChildren();
		var level = (~~(self.frame/300.0))+1;
		
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
		
		var capnpos = capn.getPosition().x+capn.getContentSize().width;
		var rdnss 	= capnpos > 100 ? capnpos/10 : 1;
		rdnss += 100 - level*2;
		rdnss = rdnss > 1 ? rdnss : 1;
		
		if(self.cooldown == 0){
			if(rnd(rdnss) == 1){
				self.addRandomRebel(3);
				self.cooldown = 35;
			}
	    }else{
		    self.cooldown -= 1;
	    }
	    
	    self.frame += 1;
		
	}
	
	self.addRandomRebel = function(_level){
		
		var type = rnd(_level);
		var aRebel = null;
		
		if(type == PM.REBEL_TYPE.BOTTLE){
			aRebel = new BottleRebel.create();
		}else if(type == PM.REBEL_TYPE.EARL){
			aRebel = new EarlRebel.create();
		}else if(type == PM.REBEL_TYPE.CARL){
			aRebel = new CarlRebel.create();
		}
		
		if(aRebel){
			aRebel.gang = self;
			self.node.addChild(aRebel);
		}
	}
	
	// preload animations
	addFBFSpriteAnimationToCache("carl_jump", 1,.10,"carlJump");
    addFBFSpriteAnimationToCache("carl_fall", 1,.10,"carlFall");
	addFBFSpriteAnimationToCache("earl_fall", 1,.10,"earlFall");
	
	return self;
	
}


var BaseRebel = cc.Sprite.extend({
	
	live: true,
	gang: null,
	
	update: function(){
		// do nothing
	},
	
	hit: function(){
		this.live = false; 
	}
	
});

// CARL

var CarlRebel = BaseRebel.extend({
	jumping: false,
	update: function(){	
		if(this.live && !this.jumping){
		
			var capn = this.gang.world.boat.capn;
			if(capn.getPosition().x - this._position.x > 70){
				this.setPosition(cc.ccp(this._position.x+5, this._position.y));
			}else{
				this.jump();
			}
			
		}
	},
	
	hit: function(){
		this.live = false;
		this.jump();
	},
	
	jump: function(){
		
		if(this.jumping) return;
		this.jumping = true;
		
		var animCache 	= cc.AnimationCache.sharedAnimationCache();
		var jumpAnm 	= cc.JumpBy.create(1.2, cc.ccp(310,-310), 230, 1);
		var jumpSprite1	= cc.Animate.create(.6, animCache.animationByName("carlJump"), false);
		var jumpSprite2	= cc.Animate.create(.6, animCache.animationByName("carlFall"), false);
		var jumpAndRotateAnm = cc.Spawn.create(jumpAnm,cc.Sequence.create(jumpSprite1, jumpSprite2));
		
		var endCallback = cc.CallFunc.create(this,function(){
			this.gang.world.boat.addChild(addWaterDrops(cc.ccp(this.getPosition().x,0), 15+rnd(5)));
		});
		
		var goDown = cc.MoveBy.create(.3, cc.ccp(0,-86));
		var sequence = cc.Sequence.create(jumpAndRotateAnm, endCallback, goDown);
		
		this.stopAllActions();
		this.runAction(sequence);
	}
	
});

CarlRebel.create = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("carl_run01.png");
    var sprite = new CarlRebel();
    sprite.initWithSpriteFrame(pFrame);
    sprite.setPosition(cc.ccp(-120, 40));
    addHitArea(sprite,30,40,-10,0);
    
    var animationAction = setupSpriteAnimationWithCustomDelay("carl_run", 6, .12);
	sprite.runAction(animationAction);
	
    return sprite;
};

// EARL

var EarlRebel = BaseRebel.extend({

	update: function(){
	
		if(this.live){
			this.setPosition(cc.ccp(this._position.x+5, this._position.y));
			if(this._position.x > 494){
				this.jump(180);
			}
		}
		
		
	},
	
	hit: function(){		
		this.jump(-90);
	},
	
	jump: function(_jx){
		
		this.live = false;
		
		var animCache 	= cc.AnimationCache.sharedAnimationCache();
		var jumpAnm 	= cc.JumpBy.create(.8, cc.ccp(_jx,-300), 130, 1);
		var rotateAnm	= cc.RotateBy.create(.8,-20);
		var jumpSprite	= cc.Animate.create(animCache.animationByName("earlFall"));
		var jumpAndRotateAnm = cc.Spawn.create(jumpAnm,rotateAnm,jumpSprite);
		
		var endCallback = cc.CallFunc.create(this,function(){
			this.gang.world.boat.addChild(addWaterDrops(cc.ccp(this.getPosition().x,0), 15+rnd(5)));
		});
		
		var goDown = cc.MoveBy.create(.3, cc.ccp(0,-86));
		var sequence = cc.Sequence.create(jumpAndRotateAnm, endCallback, goDown);
		
		this.stopAllActions();
		this.runAction(sequence);
		
	}
	
});

EarlRebel.create = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("earl_run01.png");
    var sprite = new EarlRebel();
    sprite.initWithSpriteFrame(pFrame);
    sprite.setPosition(cc.ccp(-120, 18));
    addHitArea(sprite,20,30,0,-10);
    
    var animationAction = setupSpriteAnimationWithCustomDelay("earl_run", 6, .12);
	sprite.runAction(animationAction);
	
    return sprite;
};

// BOTTLE

var BottleRebel = BaseRebel.extend({

	update: function(){
		if(this.live){
			this._rotation += 10;
			this.setPosition(cc.ccp(this._position.x+5, this._position.y));
		}
		
		if(this.getPosition().x > 800){
			this._parent.removeChild(this);
		}
		
	},
	
	hit: function(){
		this.live = false; 
		
		var jumpAnm = cc.JumpBy.create(1.2, cc.ccp(120,-300), 220, 1);
		var rotateAnm	= cc.RotateBy.create(1.2,120);
		var jumpAndRotateAnm = cc.Spawn.create(jumpAnm,rotateAnm);
		
		var endCallback = cc.CallFunc.create(this,function(){
			this.gang.world.boat.addChild(addWaterDrops(cc.ccp(this.getPosition().x,0), 15+rnd(5)));
		});
		
		var goDown = cc.MoveBy.create(.3, cc.ccp(0,-86));
		var sequence = cc.Sequence.create(jumpAndRotateAnm, endCallback, goDown);
		
		this.stopAllActions();
		this.runAction(sequence);
		
	}
	
});

BottleRebel.create = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("bottle01.png");
    var sprite = new BottleRebel();
    sprite.initWithSpriteFrame(pFrame);
    sprite.setPosition(cc.ccp(-120, 60));
    addHitArea(sprite,20,30,0,-10);
    return sprite;
};
