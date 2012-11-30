
var PirateRiot = cc.Layer.extend({
    isMouseDown:false,
    helloLabel:null,

    init:function () {

        this._super();
        var size = cc.Director.sharedDirector().getWinSize();
        this.helloLabel = cc.LabelTTF.create("Pirate Riot, Arrr!", "Arial", 28);
        this.helloLabel.setPosition(cc.ccp(size.width / 2, size.height - 40));
        this.addChild(this.helloLabel);
        return true;
    }

});

PirateRiot.scene = function () {
    var scene = cc.Scene.create();
    var layer = this.node();
    scene.addChild(layer);
    return scene;
};

PirateRiot.node = function () {
    var ret = new PirateRiot();
    if (ret && ret.init())  return ret;
    return null;
};



