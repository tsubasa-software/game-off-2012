var RepeatXSprite = cc.Node.extend({
	
	build: function(refImageName, tileFunc){
	
		var spriteRef = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(refImageName);
		
		var tileW = spriteRef._rect.size.width;
		var totalW = this._contentSize.width;
		var count = Math.ceil(totalW/tileW);
		
		for(var i = 0; i < count; i++){
			var aTile = new tileFunc.spriteWithSpriteFrameName(refImageName);
			aTile.setAnchorPoint(cc.ccp(0,0));
			aTile.setPosition(cc.ccp(i*tileW,0));
			this.addChild(aTile);
		}
			
	}
	
});

var setupSpriteAnimationWithCustomDelay = function(imageName, frames, perFrameDelay){
		
	var animFrames = [];
    var str = "";
    for (var i = 1; i <= frames; i++) {
	    str = imageName + (i < 10 ? ("0" + i) : i) + ".png";
        var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
        animFrames.push(frame);
    }
   
    var animation = cc.Animation.create(animFrames, perFrameDelay);
    cc.AnimationCache.sharedAnimationCache().addAnimation(animation, imageName);
		
	// RUN ANIMATION
	var animCache = cc.AnimationCache.sharedAnimationCache();
	var idle_anm = animCache.animationByName(imageName);
    var animN = cc.Animate.create(idle_anm);
    var repeat = cc.RepeatForever.create(animN);
	return repeat;
    
};


var setupSpriteAnimation = function(imageName, frames){
	return setupSpriteAnimationWithCustomDelay(imageName, frames, .15);
};

