
var cc = cc = cc || {};
cc.Dir = './';
cc.loadQue = [];
cc.COCOS2D_DEBUG = 2;
cc._DEBUG = 1;
cc._IS_RETINA_DISPLAY_SUPPORTED = 0;

cc.$ = function (x) {
    return document.querySelector(x);
};
cc.$new = function (x) {
    return document.createElement(x);
};

cc.loadjs = function (filename) {
	
    var script = cc.$new('script');
    script.src = cc.Dir + filename;
    script.order = cc.loadQue.length;
    cc.loadQue.push(script);
    
    script.onload = function () {
	
        if (this.order + 1 < cc.loadQue.length) {
            cc.$('head').appendChild(cc.loadQue[this.order + 1]);
        } else {
            cc.setup("gameCanvas");
            cc.AudioManager.sharedEngine().init("mp3");
            cc.Loader.shareLoader().onloading = function () {
                cc.LoaderScene.shareLoaderScene().draw();
            };
            
            cc.Loader.shareLoader().onload = function () {
                cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            };
			
            cc.Loader.shareLoader().preload([
                {type:"plist", src:"Resources/pm.plist"},
                {type:"image", src:"Resources/pm.png"}
            ]);
        }
    };
    
    if (script.order === 0){
        cc.$('head').appendChild(script);
    }
};

cc.loadjs('Lib/Cocos2d-html5-canvasmenu-min.js');
cc.loadjs('Classes/AppDelegate.js');
cc.loadjs('Classes/dpad.js');
cc.loadjs('Classes/GameScene.js');
cc.loadjs('Classes/Capn.js');
cc.loadjs('Classes/World.js');
cc.loadjs('Classes/SpriteUtils.js');
cc.loadjs('Classes/PirateMutiny.js');
