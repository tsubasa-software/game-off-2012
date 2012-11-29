var Capn = cc.Sprite.extend({
	
	state: PM.PLAYER_STATE.UNKNOWN,
	didDie: null,
	normalHitArea: {w:30,h:70,dx:0,dy:-10},
	crouchHitArea: {w:30,h:30,dx:0,dy:-40},
	
	init: function(){
		this._super();
		
		// ANIMATIONS
        addFBFSpriteAnimationToCache("capn_idle",4,.15,"capnIdle");
        addFBFSpriteAnimationToCache("capn_down",3,.15,"capnDown");
        addFBFSpriteAnimationToCache("capn_jump",4,.15,"capnJump");
        addFBFSpriteAnimationToCache("capn_walk",4,.10,"capnWalk");
        addFBFSpriteAnimationToCache("capn_hit", 1,.10,"capnHit");
        
		this.scheduleUpdate();
		this.wait();
		
		this.setContentSize(cc.SizeMake(80,114));
		addHitArea(this,this.normalHitArea.w,this.normalHitArea.h,this.normalHitArea.dx,this.normalHitArea.dy);
		
	},
	
	update:function(dt){
		if( this.state != PM.PLAYER_STATE.DEAD &&
			this.state != PM.PLAYER_STATE.JUMP &&
			this.state != PM.PLAYER_STATE.WALK_LEFT &&
			this.state != PM.PLAYER_STATE.WALK_RIGHT){
			if(this.getPosition().x > 423) this.die();
		}
	},
	
	walkLeft: function(){
	
		if(this.state == PM.PLAYER_STATE.JUMP) return;
		if(this.state == PM.PLAYER_STATE.DEAD) return;
		if(this.state == PM.PLAYER_STATE.HIT) return;
		
		if(this.state != PM.PLAYER_STATE.WALK_LEFT){
		
			this.state = PM.PLAYER_STATE.WALK_LEFT;
			editHitArea(this,this.normalHitArea.w,this.normalHitArea.h,this.normalHitArea.dx,this.normalHitArea.dy);
			this.stopAllActions();
			
			var animCache 	= cc.AnimationCache.sharedAnimationCache();
	        var animWalk	= cc.Animate.create(animCache.animationByName("capnWalk"));
	        var move 		= cc.MoveBy.create(0.4, cc.ccp(-10,0));
	        var action 		= cc.CallFunc.create(this, function(){
				this.state 	= PM.PLAYER_STATE.UNKNOWN;
				this.wait();
			});
	        
			var spawn	 = cc.Spawn.create(move,animWalk);
			var sequence = cc.Sequence.create(spawn,action);
			this.runAction(sequence);
			
		}
		
	},
	
	walkRight: function(){
	
		if(this.state == PM.PLAYER_STATE.JUMP) return;
		if(this.state == PM.PLAYER_STATE.DEAD) return;
		if(this.state == PM.PLAYER_STATE.HIT) return;
		
		if(this.state != PM.PLAYER_STATE.WALK_RIGHT){
			
			this.state = PM.PLAYER_STATE.WALK_RIGHT;
			editHitArea(this,this.normalHitArea.w,this.normalHitArea.h,this.normalHitArea.dx,this.normalHitArea.dy);
			this.stopAllActions();
			
			var animCache 	= cc.AnimationCache.sharedAnimationCache();
	        var animWalk	= cc.Animate.create(animCache.animationByName("capnWalk"));
	        var move 		= cc.MoveBy.create(0.4, cc.ccp(12,0));
	        var action 		= cc.CallFunc.create(this, function(){
				this.state 	= PM.PLAYER_STATE.UNKNOWN;
				this.wait();
			});
	        
			var spawn	 = cc.Spawn.create(move,animWalk);
			var sequence = cc.Sequence.create(spawn,action);
			this.runAction(sequence);
			
		}
		var p = this._position;
		this.setPosition(cc.ccp(p.x+1, p.y));
	},
	
	jump: function(){
	
		if(this.state == PM.PLAYER_STATE.WALK_LEFT) return;
		if(this.state == PM.PLAYER_STATE.WALK_RIGHT) return;
		if(this.state == PM.PLAYER_STATE.DEAD) return;
		if(this.state == PM.PLAYER_STATE.HIT) return;
	
		if(this.state != PM.PLAYER_STATE.JUMP){
		
			this.state = PM.PLAYER_STATE.JUMP;
			editHitArea(this,this.normalHitArea.w,this.normalHitArea.h,this.normalHitArea.dx,this.normalHitArea.dy);
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
		if(this.state == PM.PLAYER_STATE.WALK_LEFT) return;
		if(this.state == PM.PLAYER_STATE.WALK_RIGHT) return;
		if(this.state == PM.PLAYER_STATE.DEAD) return;
		if(this.state == PM.PLAYER_STATE.HIT) return;
		
		if(this.state != PM.PLAYER_STATE.CROUCH){
			
			this.state = PM.PLAYER_STATE.CROUCH;
			editHitArea(this,this.crouchHitArea.w,this.crouchHitArea.h,this.crouchHitArea.dx,this.crouchHitArea.dy);
			this.stopAllActions();
			
			var animCache = cc.AnimationCache.sharedAnimationCache();
	        var animN = cc.Animate.create(animCache.animationByName("capnDown"));
			this.runAction(animN);
			
		}
	},
	
	wait: function(){
		
		if(this.state == PM.PLAYER_STATE.JUMP) return;
		if(this.state == PM.PLAYER_STATE.WALK_LEFT) return;
		if(this.state == PM.PLAYER_STATE.WALK_RIGHT) return;
		if(this.state == PM.PLAYER_STATE.DEAD) return;
		if(this.state == PM.PLAYER_STATE.HIT) return;
		
		if(this.state != PM.PLAYER_STATE.WAITING){
		
			this.state = PM.PLAYER_STATE.WAITING	
			editHitArea(this,this.normalHitArea.w,this.normalHitArea.h,this.normalHitArea.dx,this.normalHitArea.dy);
			this.stopAllActions();			
			
			var animCache = cc.AnimationCache.sharedAnimationCache();
			var idle_anm = animCache.animationByName("capnIdle");
	        var animN = cc.Animate.create(idle_anm);
	        var repeat = cc.RepeatForever.create(animN);
			this.runAction(repeat);
		}
	},
	
	die: function(){
		
		this.state = PM.PLAYER_STATE.DEAD;
		
		var jumpAnm = cc.JumpBy.create(1.0,cc.ccp(100,-250), 100, 1);
		var rotateAnm	= cc.RotateBy.create(1.0,30);
		var jumpAndRotateAnm = cc.Spawn.create(jumpAnm,rotateAnm);
		
		var endCallback = cc.CallFunc.create(this,function(){
			if(this.didDie) this.didDie();
		});
		
		var goDown = cc.MoveBy.create(.3, cc.ccp(0,-86));
		
		var sequence = cc.Sequence.create(jumpAndRotateAnm, endCallback, goDown);
		
		this.stopAllActions();
		this.runAction(sequence);
		
	},
	
	hit: function(){
		
		this.state = PM.PLAYER_STATE.HIT;
		
		editHitArea(this,1,1,100000,1000000);
		this.stopAllActions();
			
		var animCache = cc.AnimationCache.sharedAnimationCache();
	    var animN = cc.Animate.create(animCache.animationByName("capnHit"));
			
		var jump = cc.JumpTo.create(0.4, cc.ccp(this._position.x+30,202), 40, 1);
			
		var action = cc.CallFunc.create(this, function(){
			this.state = PM.PLAYER_STATE.UNKNOWN;
			this.wait();
		});
			
		var spawn	 = cc.Spawn.create(jump,animN);
		var sequence = cc.Sequence.create(spawn,action);
		this.runAction(sequence);
		
	}
    
});

Capn.spriteWithSpriteFrameName = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrameName);
    var sprite = new Capn();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
};