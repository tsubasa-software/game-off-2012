var Capn = cc.Sprite.extend({
	
	init: function(){
		this._super();
		
		// IDLE ANIMATION
		var animFrames = [];
        var str = "";
        for (var i = 1; i < 5; i++) {
            str = "capn_idle" + (i < 10 ? ("0" + i) : i) + ".png";
            var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.15);
        cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "capnIdle");
		
		// RUN ANIMATION
		var animCache = cc.AnimationCache.sharedAnimationCache();
		var idle_anm = animCache.animationByName("capnIdle");
        var animN = cc.Animate.create(idle_anm);
        var repeat = cc.RepeatForever.create(animN);
		this.runAction(repeat);
		
		this.scheduleUpdate();
		
	},
	
	update:function(dt){
		
	}
    
});

Capn.spriteWithSpriteFrameName = function (spriteFrameName) {
    var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrameName);
    var sprite = new Capn();
    sprite.initWithSpriteFrame(pFrame);
    return sprite;
};