dpad = {};

dpad.stateIdle 			= 0;
dpad.stateKeyDown    	= 1;
dpad.stateKeyPressed	= 2;
dpad.stateKeyUp 		= 3;

dpad.keys = {
	up:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 87
	},
	down:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 83
	},
	left:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 65
	},
	right:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 68
	}
	
}

dpad.update = function () {
	
	for(var aKeyTag in dpad.keys){
		
		var aKey =  dpad.keys[aKeyTag];
		
		if(aKey.state == dpad.stateKeyUp && !aKey.next){
			aKey.state = dpad.stateIdle;
		}else if(aKey.state == dpad.stateKeyDown && !aKey.next){
			aKey.state = dpad.stateKeyPressed;
		}else{
			if(aKey.next){
				aKey.state = aKey.next;
			}
		}
		
		aKey.next 	= null;
		aKey.dirty = false;
		
	}

}

dpad.setup = function(){
	document.onkeydown 	= dpad.keyDown;
	document.onkeyup 	= dpad.keyUp;
}

dpad.keyDown = function (e) {
	dpad.processKeyEvent("down",e);
}

dpad.keyUp = function (e) {
	dpad.processKeyEvent("up", e);
}

dpad.processKeyEvent = function (type, evt){
	
	var x = null;
	if(window.event) x = event.keyCode;
	else x = evt.charCode ? evt.charCode : evt.keyCode;
	
	for(var aKeyTag in dpad.keys){
	
		var aKey =  dpad.keys[aKeyTag];
		if(aKey.bindingCode == x){
			if(!aKey.dirty){
				aKey.dirty = true;
				
				if(aKey.state == dpad.stateIdle){
					if(type == "down"){
						aKey.next = dpad.stateKeyDown;	
					}
				}else if (aKey.state == dpad.stateKeyDown) {
					if(type == "down"){
						aKey.next = dpad.stateKeyPressed;	
					}else if(type == "up"){
						aKey.next = dpad.stateKeyUp;
					}			
				}else if (aKey.state == dpad.stateKeyPressed) {
					if(type == "up"){
						aKey.next = dpad.stateKeyUp;	
					}			
				}
			}else{
				if(type == "up"){
					aKey.next = dpad.stateKeyUp;
				}
			}
		}
	}
	
}

