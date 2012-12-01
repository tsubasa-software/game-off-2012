
var GameScene = cc.Layer.extend({

    waves: null,
    wavesBG: null,
    sky: null,
    clouds: null,
    boat: null,
    rebels: null,
    gameLogo: null,
    lifeMeter: null,
    scoreLabel: null,
    score: 0,
    
    gameOverLayer: null,
    
    state: PM.GAME_SCENE.UNKNOWN,
    
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
        this.boat.capn.world = this;
        this.addChild(this.boat);
        
        var upDownAction = cc.RepeatForever.create(
        						cc.Sequence.create(
        							cc.EaseSineInOut.create(cc.MoveBy.create(.92, cc.ccp(0,10))),
        							cc.EaseSineInOut.create(cc.MoveBy.create(.92, cc.ccp(0,-10))),
        							cc.EaseSineInOut.create(cc.MoveBy.create(.62, cc.ccp(0,15))),
        							cc.EaseSineInOut.create(cc.MoveBy.create(.62, cc.ccp(0,-15)))
        						));
        this.boat.runAction(upDownAction);
        
        this.rebels = Rebels(this);
        this.rebels.node.setPosition(cc.ccp(0,220));
        this.rebels.node.setAnchorPoint(cc.ccp(0,0.5));
        this.boat.addChild(this.rebels.node);
        
        this.waves = new Water();
        this.waves.setPosition(cc.ccp(0, 0));
        this.addChild(this.waves);
        
        // LIFES
        this.lifeMeter = LifeMeter();
        this.lifeMeter.node.setAnchorPoint(cc.ccp(1,1));
        this.lifeMeter.node.setPosition(cc.ccp(size.width,size.height-30));
        this.boat.capn.lifeMeter = this.lifeMeter;
        this.addChild(this.lifeMeter.node);
        
        // SCORE
        this.scoreLabel = cc.LabelBMFont.create("SCORE: 00000", "Resources/derp.fnt");
        this.scoreLabel.setAnchorPoint(cc.ccp(1,1));
        this.scoreLabel.setPosition(cc.ccp(size.width-20,size.height-54));
        this.addChild(this.scoreLabel);
        
        // GAME LOGO AND INFO
        this.gameLogo = new GameLogo();
        this.gameLogo.setPosition(cc.ccp(size.width+size.width/2, 380));
        this.addChild(this.gameLogo);
        
        var clickToPlayLabel = cc.LabelBMFont.create("Click anywhere to play!", "Resources/derp.fnt");
        clickToPlayLabel.setPosition(cc.ccp(~~(size.width+size.width/2)|0, 260));
        this.addChild(clickToPlayLabel);
        
        this.schedule(this.update);
        this.setPosition(cc.ccp(-size.width, 0));
        
        var self = this;
        window.onmouseup = function(){
	        self.changeState(PM.GAME_SCENE.GAME);
	        if(self.state == PM.GAME_SCENE.GAMEOVER){
	        	window.location.reload();
	        }
        }
        
        return true;
        
    },
    
    reset: function(){
	           
	    var size = cc.Director.sharedDirector().getWinSize();
        this.rebels.reset()
        this.boat.capn.reset();
        
        this.score = 0;
        this.scoreLabel.setString("SCORE: " + zeroFill(this.score,5));
	    
    },
    
    changeState: function(_newstate){
    
    	var size = cc.Director.sharedDirector().getWinSize();
    
    	if(this.state == PM.GAME_SCENE.UNKNOWN && _newstate == PM.GAME_SCENE.MENU){
    		this.state = PM.GAME_SCENE.MENU;
    		this.gameOverLayer.setPosition(cc.ccp(0,size.height));
    	}
    	
    	if(this.state == PM.GAME_SCENE.MENU && _newstate == PM.GAME_SCENE.GAME){
    		
    		this.state = PM.GAME_SCENE.MENU2GAME;
    		
    		var size = cc.Director.sharedDirector().getWinSize();
    		var moveToGame = cc.MoveBy.create(2.0,cc.ccp(size.width,0));
    		var moveAndEase = cc.EaseSineInOut.create(moveToGame);
    		var onMoveEnd = cc.CallFunc.create(this, function () {
    			
    			var capn = this.boat.capn;
    			var moveCapn = cc.JumpBy.create(1.0, cc.ccp(320,0), 30, 3);
				var animCache = cc.AnimationCache.sharedAnimationCache();
		   		var animN = cc.Animate.create(animCache.animationByName("capnHit"));
		   		var anmAndMove = cc.Spawn.create(moveCapn, animN);
		   		var onCapnJumpEnd = cc.CallFunc.create(this, function() {
		   			
		   			capn.wait();
		   			this.state = PM.GAME_SCENE.GAME;
		   			
		   		});
	   		
    			capn.stopAllActions();
    			capn.runAction(cc.Sequence.create(anmAndMove,onCapnJumpEnd));
    			
    		});
    		this.stopAllActions();
    		this.runAction(cc.Sequence.create(moveAndEase, onMoveEnd));
    		
    	}
    	
    	if(this.state == PM.GAME_SCENE.GAME && _newstate == PM.GAME_SCENE.GAMEOVER){
    		
    		this.state = PM.GAME_SCENE.GAME2GAMEOVER;
    		this.gameOverLayer.totalScore = this.score;
    		this.gameOverLayer.updateScore();
			
    		var wait		= cc.DelayTime.create(1.0);
    		var move		= cc.EaseSineInOut.create(cc.MoveTo.create(0.8, cc.ccp(0,0)));
    		var onFadeEnd 	= cc.CallFunc.create(this, function () {
    			this.rebels.node.removeAllChildrenWithCleanup(false);
		   		this.state = PM.GAME_SCENE.GAMEOVER;
    		});
    		
    		this.gameOverLayer.stopAllActions();
    		this.gameOverLayer.runAction(cc.Sequence.create(wait,move, onFadeEnd));
    		
    	}
    	
    },
    
    updateScore: function(_new){
	    this.score += _new;
	    this.scoreLabel.setString("SCORE: " + zeroFill(this.score,5));
    },
    
    update:function(dt){
	    
	    if(this.state == PM.GAME_SCENE.GAME || this.state == PM.GAME_SCENE.GAME2GAMEOVER){
	    
		    this.rebels.update(dt);
	    
		    if(dpad.keys.up.state == dpad.stateKeyDown){
				this.boat.capn.jump();	    	
		    }else if(dpad.keys.down.state == dpad.stateKeyPressed){
		    	this.boat.capn.crouch();
		    }else{
			    this.boat.capn.wait();
		    }
	    }
	    
	    dpad.update();
	    
    }

});

var GameOverLayer = cc.LayerColor.extend({
	
	gameLogo: null,
	scoreLabel: null,
	scoreLabel: null,
	hiscoreLabel: null,
	leaderbordsLabel: null,
	winnersLabels: [],
	
	totalScore: 0,
	
	updateScore: function(){
	
		var localHiScore = 0;
		
		if(localStorage){
			if(localStorage.hiscore){
				if(localStorage.hiscore > this.totalScore){
					localHiScore = localStorage.hiscore;
				}else{
					localStorage.hiscore = this.totalScore;
					localHiScore = localStorage.hiscore;
				}
			}else{
				localStorage.hiscore = this.totalScore;
				localHiScore = localStorage.hiscore;
			}
		}else{
			localHiScore = this.totalScore;
		}
		
		this.scoreLabel.setString("THIS SESSION SCORE: "+this.totalScore);
		this.hiscoreLabel.setString("LOCAL HI-SCORE: "+localHiScore);
		
	},
	
	setup: function() {

		var size = cc.Director.sharedDirector().getWinSize();
		
		//LOGO AND INFO
		this.gameLogo = new GameLogo();
		this.gameLogo.setPosition(cc.ccp(size.width/2, 380));
		this.addChild(this.gameLogo);
   	
		this.scoreLabel = cc.LabelBMFont.create("THIS SESSION SCORE: "+this.totalScore, "Resources/derp.fnt");
		this.scoreLabel.setPosition(cc.ccp(130, 200+30));
		this.scoreLabel.setAnchorPoint(cc.ccp(0,0));
		this.addChild(this.scoreLabel);
		
		var localHiScore = 0;
		
		if(localStorage){
			if(localStorage.hiscore){
				if(localStorage.hiscore > this.totalScore){
					localHiScore = localStorage.hiscore;
				}else{
					localStorage.hiscore = this.totalScore;
					localHiScore = localStorage.hiscore;
				}
			}else{
				localStorage.hiscore = this.totalScore;
				localHiScore = localStorage.hiscore;
			}
		}else{
			localHiScore = this.totalScore;
		}
   	 		   	
		this.hiscoreLabel = cc.LabelBMFont.create("LOCAL HI-SCORE: "+localHiScore, "Resources/derp.fnt");
		this.hiscoreLabel.setPosition(cc.ccp(130, 175+30));
		this.hiscoreLabel.setAnchorPoint(cc.ccp(0,0));
		this.addChild(this.hiscoreLabel);
 		/*
 		this.leaderbordsLabel = cc.LabelBMFont.create("- LEADERBOARDS -", "Resources/derp.fnt");
		this.leaderbordsLabel.setPosition(cc.ccp(size.width/2, 182));
		this.addChild(this.leaderbordsLabel);
 		
 		for( var i = 0; i < 5; i ++){
 			
 			var wLabel = cc.LabelBMFont.create((i+1)+". LUM ... 32000", "Resources/derp.fnt");
			wLabel.setPosition(cc.ccp(size.width/2, 115-(28*i)));
			wLabel.setAnchorPoint(cc.ccp(.5,0));
 			
 			this.winnersLabels.push(wLabel);
 			this.addChild(wLabel);
 			
 		}
 		*/
	}

});

GameScene.scene = function () {
	
	var scene = cc.Scene.create();
	var layer = this.node();
	scene.addChild(layer);		

 	var gameOverLayer = new GameOverLayer();
 	gameOverLayer.initWithColor(cc.ccc4(255, 255, 255, 255));
 	gameOverLayer.setup();
	scene.addChild(gameOverLayer);
	
	layer.gameOverLayer = gameOverLayer;
	layer.changeState(PM.GAME_SCENE.MENU);
    
   return scene;
};

GameScene.node = function () {
    var ret = new GameScene();
    if (ret && ret.init())  return ret;
    return null;
};


