Config = 
{
	gtick:          30.00,  // playtime (pseudothread)
	teamSize:       11.00,  // diss how many players in a team
	// ------------------
	sprites:        "./assets/sprites.png",    // diss i do not know about
	background:     "./assets/background.png", // some image assets	
	playerSpriteW:  64.00,  // width of player sprite
	playerSpriteH:  64.00,  // height of player sprite
	ballSpriteW:    64.00,  // width of ball sprite
	ballSpriteH:    64.00,  // heigth of ball sprite
	fieldSpriteW:  240.00,  // width of background sprite 
	fieldSpriteH:  360.00,  // height of background sprite 
	// ------------------ 
	keyWest:        37.00,  // key left
	keyNorth:       38.00,  // key up
	keyEast:        39.00,  // key right
	keySouth:       40.00,  // key down
	keyKickL:       65.00,  // key a
	keyKickR:       83.00,  // key s
	keySwitchB:     68.00,  // key d
	keyNextP:       78.00,  // key n 
	keyPause:       80.00,  // key p 
	// ------------------ 
	fieldH:        115.00,  // height of field in meters
	fieldW:         85.00,  // width in meters
	fieldC:          9.15,  // cc in meters 
	fieldG:          7.32,  // goal size in meters
	field5:          5.50,  // 5m 
	field11:        11.00,  // 11m
	fieldBX:        10.00,  // field border (x)
	fieldBY:        10.00,  // field border (y)
	scaleR:         42.00,  // scale ratio > 6) / "1" is "1m" // 1px is 1m // 40px is 1m
	playerH:         1.45,  // heigth of player in meters
	// ------------------ 
	posRecLength:   10.00,  // thel length of recorded player positions
	camRunOffset:  100.00,  // yoffset of cam (switches at heading of player)
	// ------------------
	camSlowDownXR:   4.00,  // slowdown rate of cam
	camSlowDownYR:   4.00,
	// ------------------
	drawBounds:   false,
	drawSprites:  true,
}

ClientM = 
{
	cycles:       0,        // cycles (to sync an such) "turns" of the game
	outbuff:      null,     // canvas ref
	smg:          null,     // sprite image ref
	bmg:          null,     // background image ref
	ctx:          null,     // canvas graphics context
	gameProc:     null,     // game proc 
	teamA:        null,     // 
	teamB:        null,     // 
	cam:          null,     // cam ref
	ball:         null,     // ball ref
	selectedP:    null,     // ref of the selected player
	focusRef:     null,     // ref of cam focus
	// ----------------	 
	HOME:         1,        // condition states 
	GUEST:        2,
	// ---------------	
	WEST:         3,
	NW:           4,
	NORTH:        5,
	NE:           6,
	EAST:         7,
	SE:           8,
	SOUTH:        9,
	SW:          10,
	// ---------------	
	NO:         999,
	UP:          11,
	DOWN:        12,
	LEFTFEET:    13,
	RIGHTFEET:   14,
	TYPE_BALL:   15,
	TYPE_PLAYER: 16,
	DGNL:          .66,
	// ---------------
	fieldH:       0,       // height of field (length) 
	fieldW:       0,       // width of field (width)
	fieldC:       0,       // circle (9.5 *ratio...
	fieldG:       0,       // goal size
	field5:       0,       // 5m size (*ratio..
	field11:      0,       // 11m size
	fieldBX:      0,       // field border (x)
	fieldBY:      0,       // field border (y) 
	scaleR:       0,       // scale ratio (from config)
	// -------------
	slctindx:     0,
	// -------------
	pMaxXMove:    0,       // max x move of player (100m /s??
	pMaxYMove:    0,       // max y move of player
	playerH:      0,       // height of player meter *scaleR // ?? configs?  
	// -------------
	gameScreenH:  0,       // height of html canvas id outbuff
	gameScreenW:  0,       // width of html canvas id outbuff
	// -------------
	AHEAD:       16,       // condition state of player
	BACK:        17,       // 
	// -------------
	RUNNING:     18,
	PAUSED:      19,
	state:        0,
	// -------------
	X:          890,
	Y:          892,
	Z:          987,
}

ClientMessage = 
{
	INIT_DONE:          "INIT_DONE",
	SETUP_CANVAS_DONE:  "SETUP_CANVAS_DONE",
	SETUP_CLOCK_DONE:   "SETUP_CLOCK_DONE",
	SETUP_TEAMS_DONE:   "SETUP_TEAMS_DONE",
	START_CLOCK_DONE:   "START_CLOCK_DONE", 
	SETUP_BALL_DONE:    "SETUP_BALL_DONE",
	PAUSE_CLOCK_DONE:   "PAUSE_CLOCK_DONE", 
	LOAD_SPRITES_DONE:  "LOAD_SPRITES_DONE", 
	LOAD_BG_DONE:       "LOAD_BG_DONE", 
	PLAYER_SELECTED:    "PLAYER_SELECTED",
	SETUP_CAM_DONE:     "SETUP_CAM_DONE",
}

PlayerMessage = 
{
	MODEL_SET:          "MODEL_SET",
	LIGHTS_WENT_OUT:    "LIGHTS_WENT_OUT",
	BALL_IS_LOST:       "BALL_IS_LOST",
	FLITZER_SIGHTED:    "FLITZER",
	BALL_CATCHED:       "BALL_CATCHED",
	BALL_RELEASED:      "BALL_RELEASED",
	KICK_RELEASED:      "KICK_RELEASED",
	BACKER:             "BACKER",
	LINE:               "LINE",
	OFFSIDE:            "OFFSIDE",
	TRAP:               "TRAP",
	TONGUE_SAGS:        "TONGUE_SAGS",
	CANT_PROC_MESSAGES: "CANT_PROC_MESSAGES", 			 
	CAN_PROC_MESSAGES:  "CAN_PROC_MESSAGES",
}

TeamMessage = 
{
	TIMEOUT_REQUESTED:  "TIMEOUT_REQUESTED",	
}

Controller = 
{
	init: function()
	{
		Trace.init();
		r = ClientM.scaleR = Config.scaleR;
		ClientM.fieldH = Config.fieldH *r;
		ClientM.fieldW = Config.fieldW *r;
		ClientM.fieldC = Config.fieldC *r;
		ClientM.fieldG = Config.fieldG *r;
		ClientM.field5 = Config.field5 *r;
		ClientM.field11 = Config.field11 *r;
		ClientM.fieldBX = Config.fieldBX *r;	
		ClientM.fieldBY = Config.fieldBY *r;	
		ClientM.pMaxXMove = 3 /10 *r;
		ClientM.pMaxYMove = 3 /10 *r;
		ClientM.playerH = Config.playerH;
		Controller.dispatch({message: ClientMessage.INIT_DONE});
	},

	dispatch: function(e)
	{
		switch(e.message){
			case ClientMessage.INIT_DONE:
				Controller.setupCanvas();
				break;
			case ClientMessage.SETUP_CANVAS_DONE:
				Controller.loadBackground();
				break;
			case ClientMessage.LOAD_BG_DONE:
				Controller.loadSprites();
				break;
			case ClientMessage.LOAD_SPRITES_DONE:
				Controller.setupBall();
				break;
			case ClientMessage.SETUP_BALL_DONE:
				Controller.setupTeams();
				break;	
			case ClientMessage.SETUP_TEAMS_DONE:
				Controller.setupCam();
				break;
			case ClientMessage.SETUP_CAM_DONE: 
				Controller.setupClock();
				break;
		}
	},

	setupBall: function()
	{
		ClientM.ball = new Ball();
		ClientM.ball.init();
		HitReg.add(ClientM.ball);
		Controller.dispatch({message: ClientMessage.SETUP_BALL_DONE});
	},

	setupCam: function()
	{
		ClientM.cam = new Cam();
		Controller.dispatch({message: ClientMessage.SETUP_CAM_DONE});
	},

	bindCam: function(target)
	{
		ClientM.focusRef = target;
		Controller.dispatch({message: ClientMessage.CAM_BOUND});
	},

	releaseCam: function()
	{
		ClientM.focusRef = null;
	},
	
	updateCam: function()
	{
		if(null == ClientM.focusRef){
			return;
		}
	
		x = ClientM.focusRef.m.pos.x 
			-(ClientM.gameScreenW /2) 
			+(ClientM.focusRef.m.spriteW /2);
		
		y = ClientM.focusRef.m.pos.y 
			-(ClientM.gameScreenH /2) 
			+(ClientM.focusRef.m.spriteH /2)
			+Controller.getCamRunOffset();

		ClientM.cam.setTargetPos(new Pos(x, y, 0));
	},

	getCamRunOffset: function()
	{
		offset = 0;
		if(ClientM.NORTH == ClientM.focusRef.m.body){
			offset = -Config.camRunOffset;
		}
		else if(ClientM.SOUTH == ClientM.focusRef.m.body){
			offset = +Config.camRunOffset;
		}
		return offset;
	},

	setupTeams: function()
	{
		ClientM.teamA = new Team();
		ClientM.teamB = new Team();
		ClientM.teamA.init(ClientM.HOME);
		ClientM.teamB.init(ClientM.GUEST);
		Controller.selectPlayer();
		Controller.dispatch({message: ClientMessage.SETUP_TEAMS_DONE});
	},

	selectPlayer: function()
	{
		if(null != ClientM.selectedP){
			sig = ClientM.selectedP.deselect();
		} 
		else {
			sig = new Sig();
		}
		ClientM.selectedP = ClientM.teamA.m.players[ClientM.slctindx];
		ClientM.selectedP.select(sig);
	},

	selectNextPlayer: function(team)
	{
		team = (null == team) ? ClientM.teamA : team;
		ClientM.slctindx++;
		if(ClientM.slctindx >= team.m.players.length -1){
			ClientM.slctindx = 0;
		}
		Controller.selectPlayer();
		Controller.bindCam(ClientM.selectedP);
	},
	
	setupClock: function()
	{
		Controller.startClock();
		Controller.dispatch({message: ClientMessage.SETUP_CLOCK_DONE});
	},

	pauseClock: function()
	{
		clearInterval(ClientM.gameProc);
		ClientM.state = ClientM.PAUSED;
		Controller.dispatch({messsage: ClientMessage.PAUSE_CLOCK_DONE});
	},

	toggleClock: function()
	{
		switch(ClientM.state){
			
			case ClientM.RUNNING:
				Controller.pauseClock();
				break;
			
			case ClientM.PAUSED:
				Controller.startClock();
				break;
		}
	},
		
	startClock: function()
	{
		if(ClientM.RUNNING == ClientM.state){ Controller.pauseClock(); }
		ClientM.gameProc = setInterval(function(){ Controller.runGame() }, Config.gtick);
		ClientM.state = ClientM.RUNNING;
		Controller.dispatch({messsage: ClientMessage.START_CLOCK_DONE});
	},

	runGame: function()
	{
		ClientM.teamA.run();
		ClientM.teamB.run();
		ClientM.ball.run();
		Controller.updateCam();
		ClientM.cam.run();
		Controller.paint();
		ClientM.cycles++;
	},
	
	setupCanvas: function()
	{
		ClientM.outbuff = document.getElementById("outbuff");
		ClientM.ctx = ClientM.outbuff.getContext("2d");
		window.onkeydown = function(e){ Controller.keyDown(e); }
		window.onkeyup = function(e){ Controller.keyUp(e); }
		ClientM.gameScreenW = ClientM.outbuff.width;
		ClientM.gameScreenH = ClientM.outbuff.height;
		Controller.dispatch({message: ClientMessage.SETUP_CANVAS_DONE});
	},

	keyUp: function(e)
	{
		if(null == ClientM.selectedP){ 
			return false; 
		}
		ClientM.selectedP.keyUp(e);
	},

	keyDown: function(e)
	{
		switch(e.keyCode){
			case Config.keyPause:
				Controller.toggleClock();
				break;
			
			case Config.keyNextP:
				Controller.selectNextPlayer();
				break;
		}
		
		if(null == ClientM.selectedP){ 
			return false; 
		}
		ClientM.selectedP.keyDown(e);
	},

	loadSprites: function()
	{
		ClientM.smg = new Image();
		ClientM.smg.onload = function(){
			Controller.dispatch({message: ClientMessage.LOAD_SPRITES_DONE});
		};
		ClientM.smg.src = Config.sprites;
	},

	loadBackground: function()
	{
		ClientM.bmg = new Image();
		ClientM.bmg.onload = function(){
			Controller.dispatch({message: ClientMessage.LOAD_BG_DONE});
		};
		ClientM.bmg.src = Config.background;
	},

	paintField: function()
	{
		// ClientM.ctx.clearRect(0, 0, ClientM.gameScreenW, ClientM.gameScreenH);
		// ClientM.ctx.fillStyle = "#546a54";
		// ClientM.ctx.fillRect(0, 0, ClientM.gameScreenW, ClientM.gameScreenH);
		
		/*
		ClientM.ctx.fillStyle = ClientM.ctx.createPattern(ClientM.bmg, "repeat");
		ClientM.ctx.moveTo(
			0 -ClientM.cam.m.pos.x, 
			0 -ClientM.cam.m.pos.y
		);
		ClientM.ctx.fillRect(
			0 -ClientM.cam.m.pos.x,
			0,
			200,
			100	
		);
		ClientM.ctx.closePath();
		*/

		for(i = 0; 
			i < ClientM.fieldW +ClientM.fieldBX *2;
			i+= Config.fieldSpriteW){
			for(ii = 0; 
				ii < ClientM.fieldH +ClientM.fieldBY *2; 
				ii+= Config.fieldSpriteH){
				ClientM.ctx.drawImage(
					ClientM.bmg,
					0, // x-position of sprite in ClientM.bmg
					0, // y-position of sprite in ClientM.bmg
					Config.fieldSpriteW, 
					Config.fieldSpriteH,
					i  -ClientM.cam.m.pos.x,
					ii -ClientM.cam.m.pos.y,
					Config.fieldSpriteW,
					Config.fieldSpriteH	
				);
			}
		}
	
		ClientM.ctx.beginPath();
		ClientM.ctx.strokeStyle = "#cccccc";
		ClientM.ctx.lineWidth = 5;
		
		// lines around field 
		ClientM.ctx.moveTo(
			ClientM.fieldBX 
				-ClientM.cam.m.pos.x, 
			ClientM.fieldBY 
				-ClientM.cam.m.pos.y
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				-ClientM.cam.m.pos.x, 
			ClientM.fieldH 
				+ClientM.fieldBY 
				-ClientM.cam.m.pos.y
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				+ClientM.fieldW 
				-ClientM.cam.m.pos.x, 
			ClientM.fieldH 
				+ClientM.fieldBY 
				-ClientM.cam.m.pos.y
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				+ClientM.fieldW 
				-ClientM.cam.m.pos.x, 
			ClientM.fieldBY 
				-ClientM.cam.m.pos.y
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				-ClientM.cam.m.pos.x, 
			ClientM.fieldBY 
				-ClientM.cam.m.pos.y
		);
		
		// line in the center of field 
		ClientM.ctx.moveTo(
			ClientM.fieldBX 
				-ClientM.cam.m.pos.x, 
			ClientM.fieldBY 
				+ClientM.fieldH /2 
				-ClientM.cam.m.pos.y
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				+ClientM.fieldW 
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY 
				+ClientM.fieldH /2 
				-ClientM.cam.m.pos.y
		);
		
		// penalty box (north) 
		tmp = ClientM.fieldW /2 
			-(ClientM.field11 
				+ClientM.field5 
				+ClientM.fieldG /2);
		
		pmt = ClientM.fieldW -tmp;	
		
		ClientM.ctx.moveTo(
			ClientM.fieldBX 
				+tmp 
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY 
				-ClientM.cam.m.pos.y	
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				+tmp 
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY 
				+ClientM.field5 
				+ClientM.field11 
				-ClientM.cam.m.pos.y	
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				+pmt -ClientM.cam.m.pos.x,
			ClientM.fieldBY 
				+ClientM.field5 
				+ClientM.field11 
				-ClientM.cam.m.pos.y	
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX 
				+pmt 
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY 
				-ClientM.cam.m.pos.y	
		);
		
		// 5er north
		ClientM.ctx.moveTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				-ClientM.cam.m.pos.y
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.field5
				-ClientM.cam.m.pos.y
		)

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				+ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.field5
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				+ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				-ClientM.cam.m.pos.y
		);

		// goal north
		ClientM.ctx.moveTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY	
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				-ClientM.field5 /2	
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				-ClientM.field5 /2
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX	
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				-ClientM.cam.m.pos.y	
		);

		ClientM.ctx.stroke();
		ClientM.ctx.closePath();
	
		// penalty arc north	
		ClientM.ctx.beginPath();
		ClientM.ctx.arc(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.field11
				-ClientM.cam.m.pos.y,	
			ClientM.fieldC, 
				2.205 *Math.PI, 
				0.795 *Math.PI, 
				false
		);
		ClientM.ctx.stroke();
		ClientM.ctx.closePath();
	
		// penalty 11er north
		ClientM.ctx.beginPath();
		ClientM.ctx.arc(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.field11
				-ClientM.cam.m.pos.y,	
			3, 
				0 *Math.PI, 
				2 *Math.PI, 
				false
		);
		ClientM.ctx.stroke();
		ClientM.ctx.closePath();

		// mid
		ClientM.ctx.beginPath();
		ClientM.ctx.arc(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH /2
				-ClientM.cam.m.pos.y,	
			ClientM.fieldC, 
				0 *Math.PI, 
				2 *Math.PI, 
				false
		);
		ClientM.ctx.stroke();
		ClientM.ctx.closePath();

		// mid c
		ClientM.ctx.beginPath();
		ClientM.ctx.arc(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH /2
				-ClientM.cam.m.pos.y,	
			3, 
				0 *Math.PI, 
				2 *Math.PI, 
				false
		);
		ClientM.ctx.stroke();
		ClientM.ctx.closePath();
			
		// penalty box south
		ClientM.ctx.beginPath;
		ClientM.ctx.moveTo(
			ClientM.fieldBX
				+tmp	
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+tmp	
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.field5
				-ClientM.field11	
				-ClientM.cam.m.pos.y
		)

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+pmt
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.field5
				-ClientM.field11	
				-ClientM.cam.m.pos.y
		)
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+pmt
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.cam.m.pos.y
		);
	
		// 5er south
		ClientM.ctx.moveTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.field5	
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				+ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.field5	
				-ClientM.cam.m.pos.y
		);
		
		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				+ClientM.field5
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.cam.m.pos.y
		);
		
		// goal south
		ClientM.ctx.moveTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.cam.m.pos.y
		);
	
		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				+ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				+ClientM.field5 /2
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				+ClientM.field5 /2
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.lineTo(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.fieldG /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.cam.m.pos.y
		);

		ClientM.ctx.stroke();
		ClientM.ctx.closePath;

		// penalty arc south
		ClientM.ctx.beginPath();
		ClientM.ctx.arc(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.field11
				-ClientM.cam.m.pos.y,	
			ClientM.fieldC, 
				1.205 *Math.PI, 
				1.795 *Math.PI, 
				false
		);
		ClientM.ctx.stroke();
		ClientM.ctx.closePath();

		// penalty 11er south
		ClientM.ctx.beginPath();
		ClientM.ctx.arc(
			ClientM.fieldBX
				+ClientM.fieldW /2
				-ClientM.cam.m.pos.x,
			ClientM.fieldBY
				+ClientM.fieldH
				-ClientM.field11
				-ClientM.cam.m.pos.y,	
			3, 
				0 *Math.PI, 
				2 *Math.PI, 
				false
		);
		ClientM.ctx.stroke();
		ClientM.ctx.closePath();
	
	},

	zPaint: function()
	{
		PaintReg.run();
	},

	paint: function()
	{
		Controller.paintField();
		Controller.zPaint();
	},

	resetBall: function()
	{
		ClientM.ball.setPos(new Pos(0, 0, 0));
	},
}

PaintReg = 
{
	ary: [],
	add: function(ref, z){
		if(null == PaintReg.ary[z]){
			PaintReg.ary[z] = [];
		}
		PaintReg.ary[z].push(ref);
	},
	run: function(){
		for(idx in PaintReg.ary){
			while(ref = PaintReg.ary[idx].pop()){
				ref.paint(idx);
			}	
		}
	}
}

BShadow = function()
{
	this.m = {};
	this.m.spriteX = 0;
	this.m.spriteY = 1;
	this.m.spriteW = Config.ballSpriteW;
	this.m.spriteH = Config.ballSpriteH;
	this.m.pos = new Pos(0, 0, 0);
	this.m.xoff = 4;
	this.m.yoff = 2;
	this.m.bound = new Rect(0, 0, this.m.spriteW, this.m.spriteH);
	this.m.hit = new Rect(0, 0, this.m.spriteW, this.m.spriteH);

	this.dispatch = function(e)	
	{
		switch(e){}
	},
	
	this.init = function()
	{
	},

	this.setModel = function(m)
	{
		this.m = m;
	},

	this.getModel = function()
	{
		return this.m;
	},

	this.run = function(ball)
	{
		this.m.pos.x = ball.m.pos.x;
		this.m.pos.y = ball.m.pos.y;	
		// calcs offset of shadow
		temp = ball.m.pos.z;
		if(temp <= 0){ temp = 0; }
		this.m.pos.x += temp;
	},

	this.paint = function()
	{
		if(Config.drawBounds){
			ClientM.ctx.fillRect(
				this.m.pos.x -ClientM.cam.m.pos.x, 
				this.m.pos.y -ClientM.cam.m.pos.y,
				this.m.bound.w,
				this.m.bound.h
			)
		}

		if(Config.drawSprites){	
			ClientM.ctx.drawImage(
			ClientM.smg, 
			this.m.spriteX *this.m.spriteW,
			this.m.spriteY *this.m.spriteH,
			this.m.spriteW,
			this.m.spriteH,
			this.m.pos.x +this.m.xoff -ClientM.cam.m.pos.x,
			this.m.pos.y +this.m.yoff -ClientM.cam.m.pos.y,
			this.m.spriteW,
			this.m.spriteH
		);
		}
	}
}

Ball = function()
{
	this.m = {}; // 
	this.m.type = ClientM.TYPE_BALL;
	this.m.pos = new Pos(
		ClientM.fieldBX
			+10 *Config.scaleR, 
		ClientM.fieldBY
			+10 *Config.scaleR, 
		0
	); 
	this.m.spriteY = 0;
	this.m.spriteX = 4;
	this.m.spriteW = Config.ballSpriteW;
	this.m.spriteH = Config.ballSpriteH;
	this.m.shadow = null; 
	this.m.hit = new Rect(24, 24, this.m.spriteW -24, this.m.spriteH -24);
	this.m.bound = new Rect(0, 0, this.m.spriteW, this.m.spriteH);
	this.m.hv = 0; // velocity
	this.m.vv = 0; // velocity
	this.m.ha = 0; // horiz angle
	this.m.va = 0; // vertic angle
	this.m.g = 9.80665; 
	this.m.vt = 0; // nudge cycles
	this.m.ht = 0; // nudge cycles
	this.m.mn = new Nudge(0, 0, 0, 1); // copy of nudge
	this.m.mp = this.m.pos // copy if pos
	this.m.fr = 0.80; // velocity loss of a ball not in the air ... :))
	this.m.fa = 2.00; // velocity loss of a ball in the air ... :))
	this.m.xoff = 0;
	this.m.yoff = 0;
	this.m.zoff = 0;
	this.m.hrot = 0;
	this.m.vrot = 0;
		
	this.setPos = function(p)
	{
		this.m.pos = p;
	},	
	
	this.dispatch = function(e)
	{
		switch(e){}
	},	

	this.setModel = function(m)
	{
		this.m = m;
	},

	this.getModel = function()
	{
		return this.m;
	},	

	this.init = function()
	{
		// meter pro sekunde
		// meter *scaler /sekunde /tick
		r = Config.scaleR /(1/(1000 /Config.gtick));
		this.m.g /= r;
		// this.m.g /= Config.scaleR;
		this.m.fa /= Config.scaleR;
		this.m.fr /= Config.scaleR;
		this.initShadow();
		PaintReg.add(this, parseInt(this.m.pos.z));
		HitReg.add(this);
	},

	this.initShadow = function()
	{
		this.m.shadow = new BShadow();
		this.m.shadow.init();
	},

	this.corr = function(target)
	{
	},

	this.select = function(sig){
	},
	
	this.deselect = function(){
	},

	this.nudge = function(n)
	{
		this.m.va = n.va;
		this.m.ha = n.ha;
		this.m.hv = n.v;
		this.m.vv = n.v;
		this.m.hrot = n.hrot;
		this.m.vrot = n.vrot;
		// authsc	
		this.m.ht = n.toffset;
		this.m.vt = n.toffset;
		// rec nudge
		this.m.mn = n;
		// rec pos of nudge
		this.m.mp = this.m.pos; 
	},

	this.run = function()
	{
		// vertical movement 
		// this.m.va : canonball shot angle vert 
		// this.m.ha : canonball shot angle horz 
		// this.m.t : time cycles since shot
		// this.m.v : canonball shot speed
		
		/* time increments by gtick */ 
		this.m.ht += 1 /(1000 /Config.gtick); 
		this.m.vt += 1 /(1000 /Config.gtick); 
	
		/* speed of *this lowers by magic "ball f thingy value" whithin in each tick */
		this.m.vv -= this.m.fa;
		
		// vertical offset: magaths senkeshuss
		if(this.m.pos.z > 0){
			this.m.va -= this.m.vrot;
			this.m.vrot--;
			if(this.m.vrot < 0){ 
				this.m.vrot = 0; 
			}	
		}
	
		vr = this.m.vv *this.m.vt *Math.sin(this.m.va /180 *Math.PI) -(this.m.g *this.m.vt *this.m.vt);
		
		// the height
		this.m.pos.z = vr *Config.scaleR;	
		// Trace.out("ball.height in m: " +this.m.pos.z);

		// zbounce
		if(this.m.pos.z < 0){
			this.m.mn.v /= 1.42;
			if(this.m.mn.v > 0.2){
				this.m.vv = this.m.mn.v;
				this.m.vt = 0;
				Trace.out("zbounce: " +ClientM.cycles +" : " +this.m.vv);
			}
			this.m.pos.z = 0;
		}

		// offset horiz (aussenrist... 
		if(this.m.pos.z > 0){
			this.m.ha +=this.m.hrot;
			this.m.hrot--;
			if(this.m.hrot <= 0){ 
				this.m.hrot = 0; 
			}
		}

		// horizontal
		this.m.hv -= this.m.fr;
		hr = this.m.hv *this.m.ht *Math.cos(this.m.va /180 *Math.PI);
		// hr = this.m.vv *this.m.vt *Math.cos(this.m.va /180 *Math.PI);
		if(hr <= 0){ hr = 0; }	
		
		this.m.xoff = hr *Math.cos(this.m.ha *Math.PI /180) *Config.scaleR;
		this.m.yoff = hr *Math.sin(this.m.ha *Math.PI /180) *Config.scaleR;
		
		// ugglyaggregatoaggregatorr	
		this.m.pos.x = this.m.mp.x +this.m.xoff;
		this.m.pos.y = this.m.mp.y -this.m.yoff;

		// 
		this.m.shadow.run(this);
		this.selectSprite();
	
		// next paint	
		PaintReg.add(this, parseInt(this.m.pos.z));
	},

	this.selectSprite = function()
	{
		// Trace.out("z:" +this.m.pos.z *5); // there is 5 sprites (for 5 meters?)
		magie = parseInt(this.m.pos.z /Config.scaleR);
		if(0 > magie){ magie = 0; }
		else if(5 < magie){ magie = 5; }
		this.m.spriteX = magie; // sprites den höhen zuordnen...
	},
	
	this.paint = function(z)
	{
		this.m.shadow.paint();
	
		if(Config.drawBounds){	
			ClientM.ctx.fillRect(
				this.m.pos.x -ClientM.cam.m.pos.x, 
				this.m.pos.y -ClientM.cam.m.pos.y,
				this.m.bound.w,
				this.m.bound.h
			);
		}

		if(Config.drawSprites){
			ClientM.ctx.drawImage(
				ClientM.smg, 
				this.m.spriteX *this.m.spriteW,
				this.m.spriteY *this.m.spriteH,
				this.m.spriteW,
				this.m.spriteH,
				this.m.pos.x -ClientM.cam.m.pos.x,
				this.m.pos.y -ClientM.cam.m.pos.y,
				this.m.spriteW,
				this.m.spriteH
			);
		}
	}
}

// horiz angle
// vertical angle
// velocity
// toffset
Nudge = function(ha, va, v, toffset, hrot, vrot)
{
	this.ha = ha;
	this.va = va;
	this.hrot = hrot;	
	this.vrot = vrot;
	this.v = v;
	// time offset of movement calc
	// for that player can controll the ball
	// somewhat scheissig aber was solls
	this.toffset = toffset;
}

Pos = function(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}

Rect = function(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.mx = this.x +this.w /2; // yeah
	this.my = this.y +this.h /2;
},

Player = function()
{
	this.m = {}; // memcache enhanced memory implementation :))
	this.m.type = ClientM.TYPE_PLAYER; // obj type [naja]
	this.m.selected = false; // selected player gets signal routed
	this.m.spriteX = 0; // sprite tile pos x
	this.m.spriteY = 2; // sprite tile pos y
	this.m.spriteW = Config.playerSpriteW; // width of sprite
	this.m.spriteH = Config.playerSpriteH; // height of sprite 
	this.m.pos = new Pos(0, ClientM.fieldH /2, 0); // current pos
	this.m.xm = 0; // current xstep
	this.m.ym = 0; // current ystep
	this.m.iSig = new Sig(); // incoming signals
	this.m.face = ClientM.SOUTH; // desired direction of player
	this.m.body = ClientM.SOUTH; // current direction of player 
	this.m.rdir = ClientM.AHEAD; // current heading of player
	this.m.idx = 0; // 0 goes for goalie..
	this.m.maxXMove = 0; // cannot cross faster
	this.m.maxYMove = 0; // cannot run faster
	this.m.posRec = []; // records of the *last positions
	this.m.height = 0; // in meters *scaleR
	this.m.baseR = new Rect(0, 0, 0, 0); // the rect the player supposed to be in
	// this.m.bound = new Rect(0, 0, 1 *ClientM.scaleR, 1 *ClientM.scaleR); // 1m *1m
	this.m.bound = new Rect(0, 0, this.m.spriteW, this.m.spriteH); 
	this.m.hit = new Rect(24, 24, this.m.spriteW -24, this.m.spriteH -24); 
	this.m.dpos = new Pos(0, 0, 0);
	this.m.sc = 0;	
	
	this.select = function(iSig)
	{
		this.m.iSig = (null == iSig) ? this.m.iSig : iSig;
		this.selected = true;
	},

	this.deselect = function()
	{
		sig = this.m.iSig;
		this.resetSignals();
		this.resetSteps();
		this.selected = false;
		return sig;
	},

	this.resetSteps = function()
	{
		this.m.xm = 0;
		this.m.ym = 0;
	},

	this.resetSignals = function()
	{
		this.m.iSig = new Sig();
	},
	
	this.setModel = function(m)
	{
		this.m = m;
		this.dispatch({ref: this, message: PlayerMessage.MODEL_SET});
	},

	this.getModel = function()
	{
		return this.m;
	},

	this.dispatch = function(e)
	{
		switch(e.message){
			
			case PlayerMessage.MODEL_SET:
				
				break;
			
			case PlayerMessage.LIGHTS_WENT_OUT:
				this.m.team.dispatch(e);
				break;
			
			case PlayerMessage.BALL_IS_LOST:
				this.m.team.dispatch(e);
				break;
		}	
	},

	this.init = function(team, idx)
	{
		this.m.idx = idx;
		this.m.team = team;

		// :..  parse some config file...
		this.m.height = ClientM.playerH;
		this.m.maxXMove = ClientM.pMaxXMove;
		this.m.maxYMove = ClientM.pMaxYMove;
		this.m.body = ClientM.SOUTH;
		this.m.face = ClientM.SOUTH;
		this.m.rdir = ClientM.AHEAD;

		// 	
		this.m.pos.x = Math.random() *ClientM.fieldW;
		this.m.pos.y = Math.random() *ClientM.fieldH;
		
		// fixdiss
		if(ClientM.GUEST == team.m.playstate){
			this.m.body = ClientM.NORTH;
		}
		// 
		HitReg.add(this);
		PaintReg.add(this, parseInt(this.m.pos.z));
	},	

	// sets run direction of controlled player
	this.setRunDir = function()
	{
		switch(this.m.rdir){
			
			case ClientM.AHEAD:
				if(ClientM.NORTH == this.m.body){if(this.m.iSig.south){
					this.m.rdir = ClientM.BACK;
				}}
				else if(ClientM.SOUTH == this.m.body){if(this.m.iSig.north){
					this.m.rdir = ClientM.BACK;
				}}
				break;
			
			case ClientM.BACK:
				if(ClientM.NORTH == this.m.body){if(this.m.iSig.north){
					this.m.rdir = ClientM.AHEAD;
				}}
				if(ClientM.SOUTH == this.m.body){if(this.m.iSig.south){
					this.m.rdir = ClientM.AHEAD;
				}}
				break;
		}	
	},

	// sets speed controlled of player	
	this.setDirSpeed = function()
	{
		this.m.maxYMove = ClientM.pMaxYMove; 
		if(ClientM.BACK == this.m.rdir){
			this.m.maxYMove = ClientM.pMaxYMove /2; 
		}
	},

	// sets x step of controlled player (at this cycle)
	this.setXStep = function()
	{
		this.m.xm = 0;
		if(this.m.iSig.west){ 
			this.m.face = ClientM.WEST;
			this.m.xm = -(this.m.maxXMove);
			if(this.m.iSig.north){
				this.m.face = ClientM.NW;
				this.m.xm = -(this.m.maxXMove *ClientM.DGNL);
			}
			else if(this.m.iSig.south){
				this.m.face = ClientM.SW;
				this.m.xm = -(this.m.maxXMove *ClientM.DGNL);
			}
		} 
		else if(this.m.iSig.east){
			this.m.face = ClientM.EAST;
			this.m.xm = +(this.m.maxXMove);
			if(this.m.iSig.north){
				this.m.face = ClientM.NE;
				this.m.xm = +(this.m.maxXMove *ClientM.DGNL);
			}
			else if(this.m.iSig.south){
				this.m.face = ClientM.SE;
				this.m.xm = +(this.m.maxXMove *ClientM.DGNL);
			}
		}
	},

	// sets the y step of controlled player 
	this.setYStep = function()
	{
		this.m.ym = 0;
		if(this.m.iSig.north){
			this.m.face = ClientM.NORTH;
			this.m.ym = -(this.m.maxYMove);
			if(this.m.iSig.west){
				this.m.face = ClientM.NW;
				this.m.ym = -(this.m.maxYMove *ClientM.DGNL);
			}
			if(this.m.iSig.east){
				this.m.face = ClientM.NE;
				this.m.ym = -(this.m.maxYMove *ClientM.DGNL);
			}
		} 
		else if(this.m.iSig.south){
			this.m.face = ClientM.SOUTH;
			this.m.ym = +(this.m.maxYMove);
			if(this.m.iSig.west){
				this.m.face = ClientM.SW;
				this.m.ym = +(this.m.maxYMove *ClientM.DGNL);
			}
			if(this.m.iSig.east){
				this.m.face = ClientM.SE;
				this.m.ym = +(this.m.maxYMove *ClientM.DGNL);
			}
		}
	},
	
	// records last 10 steps of player
	this.recPos = function()
	{
		this.m.posRec.unshift(this.m.pos);
		if(this.m.posRec.length > Config.posRecLength){
			this.m.posRec.pop();
		}
	},	

	// places player 
	this.setPlayerPos = function()
	{
		this.m.pos.x += this.m.xm;
		this.m.pos.y += this.m.ym;
	},	

	this.runCPU = function()
	{
		this.m.dpos.x = ClientM.fieldBX 
			+this.m.baseR.x
			-this.m.bound.mx;

		this.m.dpos.y = ClientM.fieldBY 
			+this.m.baseR.y
			-this.m.bound.my;
	
		this.m.iSig.east = false;
		this.m.iSig.north = false;	
		this.m.iSig.west = false;
		this.m.iSig.south = false;
		if(this.m.pos.x <= this.m.dpos.x){ 
			this.m.iSig.east = true; 
		}
		else if(this.m.pos.y >= this.m.dpos.x){ 
			this.m.iSig.west = true; 
		}
		if(this.m.pos.y <= this.m.dpos.y){ 
			this.m.iSig.south = true; 
		}
		else if(this.m.dpos.y >= this.m.dpos.y){ 
			this.m.iSig.north = true; 
		}
		// this.setRunDir();	
		// this.setDirSpeed();		
		this.setXStep();
		this.setYStep();
		this.setPlayerPos();
		this.selectSprite();
	},

	this.runControlled = function()
	{
		this.setRunDir();	
		this.setDirSpeed();		
		this.setXStep();
		this.setYStep();
		this.setPlayerPos();
		this.selectSprite();
	},	

	this.selectSprite = function()
	{
		// fixdiss steps / time / field
		this.m.sc++;
		if(2 != this.m.sc){ return; }
		this.m.sc = 0;
		this.m.spriteY = 2;
		if(ClientM.SOUTH == this.m.body){
			this.m.spriteY = 3;
		}

		if(this.m.ym == 0){
		}
		else { 
			this.m.spriteX++;
			if(this.m.spriteX >= 6){ this.m.spriteX = 0; }
		}
	},

	this.run = function()
	{
		if(this.selected){
			this.runControlled();
		}
		else {	
			// this.runCPU();	
		}
		HitReg.check(this);
		PaintReg.add(this, parseInt(this.m.pos.z));
		// PaintReg.add(this, this.m.pos.z +body);
		// PaintReg.add(this, this.m.pos.z +head);
		// this.recPos();
	},
	
	// player hits a target - new placement of *?both
	this.corr = function(target)
	{
		switch(target.m.type){ 
			case ClientM.TYPE_BALL: 
				if(target.m.pos.z /Config.scaleR > (this.m.pos.z +this.m.height)){
					Trace.out("ball is way too high up: " 
						+ClientM.cycles 
						+": ball.z: " 
						+ClientM.ball.m.pos.z 
						+": player.h: " 
						+(this.m.pos.z +this.m.height)
					);
					Controller.pauseClock()
					Trace.out("clock paused ->[p]");
					break;
				}
				if(this.m.iSig.kickL){
					this.releaseKick(ClientM.LEFTFEET);
				}
				else if(this.m.iSig.kickR){
					this.releaseKick(ClientM.RIGHTFEET);
				}
				else{
					this.guideBall();
				}
				break;
			default: 
				target.m.spriteX = parseInt(Math.random() *5);
			break;		
		}
	},

	this.canKickBall = function()
	{
		return HitReg.canKickBall(this);
	},

	this.catchBall = function()
	{
		this.m.team.dispatch({ref: this, message: PlayerMessage.BALL_CATCHED});	
	},

	// ?? holds
	this.holdBall = function()
	{
	},

	// releases ball	
	this.releaseBall = function()
	{
		this.m.team.dispatch({ref: this, message: PlayerMessage.BALL_RELEASED});	
	},

	// guides the ball?
	this.guideBall = function()
	{
		Controller.bindCam(this);
		ha = 0;	
		va = 0;
		ts = 0;
		vc = 0;	
		switch(this.m.face){
			case ClientM.NORTH:
				ha = +90;
				break;
			case ClientM.NE:
				break;
			case ClientM.NW:
				break;
			case ClientM.SOUTH:
				ha = -90;
				break;
			case ClientM.SE:
				break;
			case ClientM.SW:
				break;
			case ClientM.WEST:
				break;
			case ClientM.EAST:
				break;
		}
	
		// nudge is not the guide	
		if(ClientM.AHEAD == this.m.rdir){  
			va = 0.0;
			ts = 1.0; 
			vc = 0.5;
		}
		else {
			va = 0.0;
			ts = 0.3;
			vc = 0.5;
			
		}
		ClientM.ball.nudge(new Nudge(ha, va, vc, ts, 0, 0));
		
		// this.m.team.dispatch({ref: this, message: PlayerMessage.BALL_GUIDED});	
	}
	
	// releases kick 
	this.releaseKick = function(feet)
	{
		// binds cam
		Controller.bindCam(ClientM.ball);
		
		// no balls
		if(!this.canKickBall()){
			return;
		}
		// no backward kicks
		if(ClientM.BACK == this.m.rdir){
			Trace.out("realeaseKick(): back...");
			return;
		}

		// kick has dunno dependencies
		if(ClientM.NORTH == this.m.face){
			Trace.out("realeaseKick():");
		}
		else if(ClientM.SOUTH == this.m.face){
			Trace.out("realeaseKick():");
		}
		
		// dispatches messages
		this.m.team.dispatch({ref: this, message: PlayerMessage.KICK_RELEASED});	
	},

	// paints
	this.paint = function(z)
	{
		/* switch(z){ case feet: case body: case haare: } */
	
		if(Config.drawBounds){	
			ClientM.ctx.fillRect(
				this.m.pos.x -ClientM.cam.m.pos.x, 	
				this.m.pos.y -ClientM.cam.m.pos.y,
				this.m.bound.w, 
				this.m.bound.h
			);
		}

		if(Config.drawSprites){
			ClientM.ctx.drawImage(
				ClientM.smg, 
				this.m.spriteX *this.m.spriteW,
				this.m.spriteY *this.m.spriteH,
				this.m.spriteW,
				this.m.spriteH,
				this.m.pos.x -ClientM.cam.m.pos.x,
				this.m.pos.y -ClientM.cam.m.pos.y,
				this.m.spriteW,
				this.m.spriteH
			);
		}

	},

	// switches body of player (to north or south)	
	this.switchBody = function()
	{
		if(ClientM.NORTH == this.m.body){
			this.m.body = ClientM.SOUTH;
			this.m.rdir = ClientM.AHEAD;
		} 
		else if(ClientM.SOUTH == this.m.body){
			this.m.body = ClientM.NORTH;
			this.m.rdir = ClientM.AHEAD;
		}
	},

	this.keyDown = function(e)
	{
		switch(e.keyCode){
			case Config.keyWest:
				this.m.iSig.west = true; 
				break;
			case Config.keyNorth:
				this.m.iSig.north = true;
				break;
			case Config.keyEast:
				this.m.iSig.east = true;
				break;
			case Config.keySouth:
				this.m.iSig.south = true;
				break;
			case Config.keyKickL:
				this.m.iSig.kickL = true;
				break;
			case Config.keyKickR:
				this.m.iSig.kickR = true;
				break;
			case Config.keySwitchB:
				this.switchBody();
				break;
		}
	},

	this.keyUp = function(e)
	{
		switch(e.keyCode){
			case Config.keyWest:
				this.m.iSig.west = false; 
				break;
			case Config.keyNorth:
				this.m.iSig.north = false;
				break;
			case Config.keyEast:
				this.m.iSig.east = false;
				break;
			case Config.keySouth:
				this.m.iSig.south = false;
				break;
		}
		this.m.iSig.kickL = false;
		this.m.iSig.kickR = false;
	}
}

Team = function()
{
	this.m = {};
	this.m.playstate = ClientM.HOME;
	this.m.players = [];
	this.tactics = null;

	this.dispatch = function(e)
	{
		/*
			e.message = was eigens
			e.ref = von wem
			e.to = [] an wen (?alle)
		 */
		switch(e.message){
			case PlayerMessage.BALL_IS_LOST:
				break;
			case PlayerMessage.KICK_RELEASED:
				break;
		}
	},

	this.setModel = function(m)
	{
		this.m = m;
	},

	this.getModel = function()
	{
		return this.m;
	},

	this.init = function(playstate)
	{
		this.m.playstate = playstate;
		for(i = 0; i <= Config.teamSize; i++){
			p = new Player();
			p.init(this, i);
			this.m.players[i] = p;
		}
		this.tactics = new Tactics();
		this.tactics.init();
		if(ClientM.HOME == this.m.playstate){
			this.selectGroup();
		}
	},

	this.selectGroup = function(idx)
	{
		this.tactics.selectGroup(idx);
		for(i = 0; i < Config.teamSize; i++){
			p = this.m.players[i];
			p.m.baseR = this.tactics.getBaseR(p);
		}
	},
	
	this.run = function()
	{
		for(i = 0; i < Config.teamSize; i++){
			this.m.players[i].run();
		}
	}
}

Cam = function()
{
	this.m = {};
	this.m.pos = new Pos(0, 0, 0);
	this.m.target = new Pos(0, 0, 0);
	this.m.xMove = 0;
	this.m.yMove = 0;
	this.m.horiz = ClientM.NO;
	this.m.vertz = ClientM.NO;

	this.dispatch = function(e)
	{
		switch(e.message){
		}
	},
	
	this.setModel = function(m)
	{
		this.m = m;
	},

	this.getModel = function()
	{
		return this.m;
	},
		
	this.run = function()
	{
		// horizontal
		// mover...
		tmp = Math.abs(this.m.pos.x -this.m.target.x);
		this.m.xMove = tmp /Config.camSlowDownXR;
		tmp = Math.abs(this.m.pos.y -this.m.target.y);
		this.m.yMove = tmp /Config.camSlowDownYR;
		
		// 
		switch(this.m.horiz){
			case ClientM.WEST:
				nextH = this.m.pos.x -this.m.xMove;
				this.m.pos.x = nextH;
				if(nextH <= this.m.target.x){
					this.m.pos.x = this.m.target.x;
					this.m.horiz = ClientM.NO;
				} 
				break;
			case ClientM.EAST:
				nextH = this.m.pos.x +this.m.xMove;
				this.m.pos.x = nextH;
				if(nextH >= this.m.target.x){
					this.m.pos.x = this.m.target.x;
					this.m.horiz = ClientM.NO;
				} 
				break;
		}
		
		// vertical
		switch(this.m.vertz){
			case ClientM.NORTH:
				nextV = this.m.pos.y -this.m.yMove;
				this.m.pos.y = nextV;
				if(nextV <= this.m.target.y){
					this.m.pos.y = this.m.target.y;
					this.m.vertz = ClientM.NO;
				} 
				break;
			case ClientM.SOUTH:
				nextV = this.m.pos.y +this.m.yMove;
				this.m.pos.y = nextV;
				if(nextV >= this.m.target.y){
					this.m.pos.y = this.m.target.y;
					this.m.vertz = ClientM.NO;
				} 
				break;
		}
	
		// eastbound
		if(this.m.pos.x > (ClientM.fieldW 
			+ClientM.fieldBX *2 
			-ClientM.gameScreenW)){
			this.m.pos.x = (ClientM.fieldW 
				+ClientM.fieldBX *2 
				-ClientM.gameScreenW);
			this.m.horiz = ClientM.NO;
		}
		
		// westbound 
		if(this.m.pos.x < 0){
			this.m.pos.x = 0;
			this.m.horiz = ClientM.NO;
		}
		
		// northbound
		if(this.m.pos.y < 0){
			this.m.pos.y = 0;
			this.m.vertz = ClientM.NO;
		}
		
		// southbound
		if(this.m.pos.y > (ClientM.fieldH 
			+ClientM.fieldBY *2
			-ClientM.gameScreenH)){
			this.m.pos.y = (ClientM.fieldH 
				+ClientM.fieldBY *2 
				-ClientM.gameScreenH);
			this.m.vertz = ClientM.NO;
		}
	},

	this.setTargetPos = function(p)
	{
		this.m.horiz = ClientM.EAST;
		if(p.x < this.m.pos.x){ this.m.horiz = ClientM.WEST; }
		this.m.vertz = ClientM.NORTH;
		if(p.y > this.m.pos.y){ this.m.vertz = ClientM.SOUTH; }
		this.m.target = p;
	}
}

HitReg = 
{
	ary: [],
	add: function(ref){
		HitReg.ary.push(ref);
	},
	check: function(ref){
		for(idx in HitReg.ary){
			temp = HitReg.ary[idx];
			// ref wont hit ref 
			if(temp == ref){ 
				continue; 
			}

			// ref is on the right side of object 
			if(ref.m.pos.x +ref.m.hit.x > temp.m.pos.x +temp.m.hit.w){
				continue;
			}

			// ref is on the left side of temp
			if(ref.m.pos.x +ref.m.hit.w < temp.m.pos.x +temp.m.hit.x){
				continue;
			}
			//  ref is north	
			if(ref.m.pos.y +ref.m.hit.h < temp.m.pos.y +temp.m.hit.y){
				continue;
			}
			// ref is south	
			if(ref.m.pos.y +ref.m.hit.y > temp.m.pos.y +temp.m.hit.h){
				continue;
			}
			
			// ref hits object from "east"
			if(ref.m.pos.x +ref.m.hit.x < temp.m.pos.x +temp.m.hit.w){
				ref.corr(temp);
				continue;
			}
			// ref hits object from "west"
			if(ref.m.pos.x +ref.m.pos.w > temp.m.pos.x +temp.m.hit.x){
				ref.corr(temp);
				continue;
			}
			// ref hits object from "south"
			if(ref.m.pos.y +ref.m.hit.y < temp.m.pos.y -temp.m.hit.h){
				ref.corr(temp);
				continue;
			}
			// ref hits object from "north"
			if(ref.m.pos.y +ref.m.hit.h > temp.m.pos.y +temp.m.hit.y){
				ref.corr(temp);
				continue;
			}
		}
	},
	
	canKickBall: function(ref)
	{
		ball = ClientM.ball;
		if(ref.m.pos.x 
			-ref.m.hit.x 
			+ref.m.hit.w < ball.m.pos.x){
			return false;
		}	
		if(ref.m.pos.x > ball.m.pos.x 
			-ball.m.hit.x 
			+ball.m.hit.w){
			return false;
		}
		if(ref.m.pos.y 
			-ref.m.hit.y 
			+ref.m.hit.h < ball.m.pos.y){
			return false;
		}
		if(ref.m.pos.y > ball.m.pos.y 
			-ball.m.hit.y 
			+ball.m.hit.h){
			return false;
		}
		/*
		if(ref.m.pos.z 
			+ref.m.height < ball.m.pos.z){
			return false;
		}
		*/
		return true;
	}
}

Sig = function()
{
	this.west = false;   // incoming left
	this.north = false;  // incoming up
	this.east = false;   // incoming right
	this.south = false;  // incoming down
	this.kickL = false;  // kick
	this.kickR = false;
}

/*** 
 WEST NORTH EAST SOUTH: kinda blödsinn aber was solls....
 machts anders 
 einmal den kopf drumherum
 */
Tactics = function() 
{
	this.ix = 0;	
	this.xt = 8;
	this.yt = 11;
	this.rw = 0;
	this.rh = 0;

	this.init = function()
	{
		this.groups = [];
		/* whatataktik
			|
			|
			-- -- -- -- 00 -- -- -- --
			-- -- -- -- -- -- -- -- --
			-- 01 -- -- 02 -- -- 03 --
			-- -- -- -- -- -- -- -- --
			-- 04 -- 05 -- 06 -- 07 --	
			-- -- -- -- -- -- -- -- --
			-- -- 08 -- -- -- 09 -- --
			-- -- -- -- -- -- -- -- --
			-- -- -- 10 -- 11 -- -- --		
			-- -- -- -- -- -- -- -- --
			-- -- -- -- -- -- -- -- --
			-- -- -- -- -- -- -- -- --
			|
			|
			|
			|
			V
		*/
		this.test = [
			[4, 0],
			// -----------------
			[1, 2], 
			[4, 2],
			[7, 2],
			// -----------------
			[1, 4],
			[3, 4],
			[5, 4],
			[7, 4],
			// -----------------
			[2, 6],
			[6, 6],
			// -----------------
			[4, 8],
			[6, 8],
		];
		this.rw = ClientM.fieldW /this.xt;
		this.rh = ClientM.fieldH /this.yt;
	},
	
	this.selectGroup = function(ix)
	{
		this.ix = ix
	},

	// returns a rect 
	this.getBaseR = function(p)
	{
		x = this.test[p.m.idx][0] *this.rw;	
		y = this.test[p.m.idx][1] *this.rh; 	
		w = this.rw;
		h = this.rh;
		return new Rect(x, y, w, h);
	}
}

init = function()
{
	Controller.init();
}

// utilities: 
//************** * * * * ********************************** * * * * //
Trace = 
{
	l: 0,
	messages: [],
	
	init: function()
	{
		Trace.dout = document.getElementById("dout");
	},

	out: function(message)
	{
		if(Trace.l > 10){ Trace.messages.pop(); }
		Trace.messages.unshift(message);
		Trace.dout.value = Trace.messages.join("\n");
		Trace.l++;
	}
}

// klickmichs
testSetTargetPos = function(x, y, z){
	Controller.releaseCam();
	ClientM.cam.setTargetPos(new Pos(x, y, z));
}
testBindPlayer = function(){
	Controller.bindCam(ClientM.selectedP);
}
testBindBall = function(){
	Controller.bindCam(ClientM.ball);
}
testSelectNextPlayer = function(){
	Controller.selectNextPlayer();
}
testPause = function(){
	Controller.pauseClock();
}
testResume = function(){
	Controller.startClock();
}
testResetBall = function(){
	Controller.resetBall();
}
testUpdateCam = function(){
	Controller.updateCam();
}
testSwitchBody = function(){
	ClientM.selectedP.switchBody();
}
testFullscreen = function(){
	if(false){ return false; }
	else if(ClientM.outbuff.requestFullscreen){ ClientM.outbuff.requestFullscreen(); }
	else if(ClientM.outbuff.mozRequestFullScreen){ ClientM.outbuff.mozRequestFullScreen(); }
	else if(ClientM.outbuff.webkitRequestFullscreen){ ClientM.outbuff.webkitRequestFullscreen(); }
}
testKick = function(idx){
	Controller.bindCam(ClientM.ball);
	switch(idx){
		case 1:
			ClientM.ball.nudge(
				new Nudge(
				        -090,  // horiz 
					+030,  // vert
					+1.50, // power 
					+0.50, // toffset
					+1.00, // horiz rot
					+0.20  // vert rot
				)
			);
			break;
		case 2:
			ClientM.ball.nudge(new Nudge(-090, +032, +0.90, 0.75, +001, 0));
			break;
		case 3:
			ClientM.ball.nudge(new Nudge(+090, +018, +1.20, 0.25, +003, 0));
			break;
		case 4:
			ClientM.ball.nudge(new Nudge(-090, +000, +1.00, 0.25, +004 ,0));
			break;
		case 5: 
			ClientM.ball.nudge(new Nudge(-090, +000, +1.00, 1.00, +005, 0));
			break;
		case 6: 
			ClientM.ball.nudge(new Nudge(-090, +068, +2.00, 0.25, +006, 0));
			break;
		case 7:
			ClientM.ball.nudge(new Nudge(+090, +045, +1.00, 0.25, 0, 0));
			break;
		case 8:
			ClientM.ball.nudge(new Nudge(-090, +045, +1.40, 1.00, +002, 0));
			break;
		case 9:
			ClientM.ball.nudge(new Nudge(+090, +045, +1.40, 1.00, +001, 0));
			break;
		case 10:
			ClientM.ball.nudge(new Nudge(+000, +045, +1.50, 1.00, +001, 0));
			break;
		case 11:
			ClientM.ball.nudge(new Nudge(+180, +045, +1.50, 1.00, +002, 0));
			break;	
	}
}
