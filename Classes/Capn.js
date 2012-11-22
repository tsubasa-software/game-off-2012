var Capn = cc.Sprite.extend({
	
	state: PM.PLAYER_STATE.UNKNOWN,
	
	
	init: function(){
		this._super();
		
		// ANIMATIONS
        addFBFSpriteAnimationToCache("capn_idle",4,.15,"capnIdle");
        addFBFSpriteAnimationToCache("capn_down",3,.15,"capnDown");
        addFBFSpriteAnimationToCache("capn_jump",4,.15,"capnJump");
        
		this.scheduleUpdate();
		this.wait();
		
	},
	
	update:function(dt){
		
	},
	
	walkLeft: function(){
	
		if(this.state == PM.PLAYER_STATE.JUMP) return;

		if(this.state != PM.PLAYER_STATE.WALK_LEFT){
			this.state = PM.PLAYER_STATE.WALK_LEFT;
			this.stopAllActions();
		}
		var p = this._position;
		this.setPosition(cc.ccp(p.x-1, p.y));
		
	},
	
	walkRight: function(){
	
		if(this.state == PM.PLAYER_STATE.JUMP) return;
		
		if(this.state != PM.PLAYER_STATE.WALK_RIGHT){
			this.state = PM.PLAYER_STATE.WALK_RIGHT;
			this.stopAllActions();
		}
		var p = this._position;
		this.setPosition(cc.ccp(p.x+1, p.y));
	},
	
	jump: function(){
		if(this.state != PM.PLAYER_STATE.JUMP){
			this.state = PM.PLAYER_STATE.JUMP;
			this.stopAllActions();
			
			var animCache = cc.AnimationCache.sharedAnimationCache();
	        var animN = cc.Animate.create(animCache.animationByName("capnJump"));
			
			var jump = cc.JumpBy.create(0.6, cc.ccp(0,0), 80, 1);
			
			var action = cc.CallFunc.create(this, function(){
				this.state = PM.PLAYER_STATE.UNKNOWN;
				this.wait();
			});
			
			var spawn	 = cc.Spawn.create(jump,animN);
			var sequence = cc.Sequence.create(spawn,action);
			this.runAction(sequence);
			
		}
	},
	
	crouch: function(){
		
		if(this.state == PM.PLAYER_STATE.JUMP) return;
		
		if(this.state != PM.PLAYER_STATE.CROUCH){
			this.state = PM.PLAYER_STATE.CROUCH;
			this.stopAllActions();
			
			var animCache = cc.AnimationCache.sharedAnimationCache();
	        var animN = cc.Animate.create(animCache.animationByName("capnDown"));
			this.runAction(animN);
			
		}
	},
	
	wait: function(){
		
		if(this.state == PM.PLAYER_STATE.JUMP) return;
		
		if(this.state != PM.PLAYER_STATE.WAITING){
		
			this.state = PM.PLAYER_STATE.WAITING	
			this.stopAllActions();			
			
			var animCache = cc.AnimationCache.sharedAnimationCache();
			var idle_anm = animCache.animationByName("capnIdle");
	        var animN = cc.Animate.create(idle_anm);
	        var repeat = cc.RepeatForever.create(animN);
			this.runAction(repeat);
		}
	}
    
});

Capn.spriteWithSpriteFrameName = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrameName);
    var sprite = new Capn();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
};