
var PM = PM || {};

PM.PLAYER_STATE = {
	UNKNOWN:	0,
	WAITING:	1,
	WALK_LEFT:	2,
	WALK_RIGHT:	3,
	JUMP:		4,
	CROUCH:		5,
	HIT:		6,
	DEAD:		7
}

//PM.GAME_SCENE.UNKNOWN

PM.GAME_SCENE = {
	UNKNOWN:	0,
	MENU:1,
	MENU2GAME:2,
	GAME:3,
	GAMEOVER:4
}


PM.REBEL_TYPE = {
	UNKNOWN:	0,
	BOTTLE:		1,
	EARL:		2,
	CARL:		3
	
}

PM.DEBUG = false;


PM.REBELS_SPEED = [4.5,5.0,5.5,6.5,7,7.5,8,8.5,9,10];