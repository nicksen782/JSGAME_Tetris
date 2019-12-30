// *** GAMESTATE FUNCTIONS ***

// (TODO) ---- NICKSEN782 ANIMATION
game.gs.TITLE0 = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		vars.END = false;
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;

			game.setGamestate1("TITLE1", true);
			vars.END = true;

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// COPYRIGHT SCREEN
game.gs.TITLE1 = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		// core.FUNCS.graphics.ClearVram();

		vars.END = false;
		vars.text1 = [
			// WIDTH: 28, HEIGHT: 18
			'       TM AND C 1987        ' , // 0
			'                            ' , // 1
			'  V/O ELECTRONORGTECHNICA   ' , // 2
			'                            ' , // 3
			'         ("ELORG")          ' , // 4
			'                            ' , // 5
			'  ORIGINAL CONCEPT, DESIGN  ' , // 6
			'                            ' , // 7
			'        AND PROGRAM         ' , // 8
			'                            ' , // 9
			'    BY ALEXEY PAZHITNOV     ' , // 10
			'                            ' , // 11
			' -------------------------- ' , // 12
			' -------------------------- ' , // 13
			'                            ' , // 14
			'        JSGAME PORT:        ' , // 15
			'                            ' , // 16
			' NICK ANDERSEN (NICKSEN782) ' , // 17
		];

		vars.framesUntilDone       = game.secondsToFrames(3.0) ; // x % of max.
		vars.framesUntilDone_cnt   = 0;
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
			core.FUNCS.graphics.ClearVram();
			core.FUNCS.graphics.Fill(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, fillTile, "VRAM1")


			// vars.END = true;
			let xOffset = 0;
			let yOffset = 5;
			for(let y=0; y<vars.text1.length; y+=1){
				core.FUNCS.graphics.Print(xOffset, (y+yOffset), vars.text1[y], "VRAM2");
			}

			// Fade this in.
			core.GRAPHICS.FADER.FUNCS.FadeIn(2, true, false);
			// core.GRAPHICS.FADER.FUNCS.FadeIn(game.secondsToFrames(0.1)/core.GRAPHICS.FADER.CONSTS["FADER_STEPS"], true, false);
		}

		// Run.
		if(vars.init){
			if( game.chkBtn("BTN_START" , "btnPressed1") || vars.framesUntilDone_cnt >= vars.framesUntilDone){
				core.GRAPHICS.FADER.FUNCS.FadeOut(3, true, false);
				// core.GRAPHICS.FADER.FUNCS.FadeOut(game.secondsToFrames(0.1)/core.GRAPHICS.FADER.CONSTS["FADER_STEPS"], true, false);

				game.setGamestate1("TITLE2", true);
				vars.END = true;
			}
			else{
				vars.framesUntilDone_cnt+=1;
			}

		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// MAIN TITLE SCREEN
game.gs.TITLE2 = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		// core.FUNCS.graphics.ClearVram();

		vars.END = false;
		vars.text1 = ["PRESS START!"];
		vars.text2 = ["            "];

		vars.xOffset_text               = 8;
		vars.yOffset_text               = 23;
		vars.framesBetweenFlashes       = game.secondsToFrames(0.40) ; // x % of max.
		vars.framesBetweenFlashes_cnt   = 0;
		vars.framesBetweenFlashes_state = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
		core.FUNCS.graphics.ClearVram();

		core.FUNCS.audio.stopAllSounds_midi(true);
		core.FUNCS.audio.cancelAllSounds_mp3("all");

		let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, fillTile, "VRAM1")
		core.FUNCS.graphics.DrawMap2(1,6, core.ASSETS.graphics.tilemaps["title_tetris"], "VRAM1"); // TITLE

		// vars.END = true;

		for(let y=0; y<vars.text1.length; y+=1){
			core.FUNCS.graphics.Print(vars.xOffset_text, (y+vars.yOffset_text), vars.text2[y], "VRAM2");
		}

		core.GRAPHICS.FADER.FUNCS.FadeIn (3, true, false);
		// core.GRAPHICS.FADER.FUNCS.FadeIn (game.secondsToFrames(0.1)/core.GRAPHICS.FADER.CONSTS["FADER_STEPS"], true, false);

	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			console.log("END");
			return;
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;
		}

		// Run.
		if(vars.init){
			// Dismiss this screen when the user presses start.
			if( game.chkBtn("BTN_START" , "btnPressed1") ){
				game.setGamestate1("SETUP1", true);
				vars.END = true;
			}

			if(vars.framesBetweenFlashes_cnt >= vars.framesBetweenFlashes){
				if(vars.framesBetweenFlashes_state){
					core.FUNCS.graphics.Print(vars.xOffset_text, (vars.yOffset_text), vars.text2[0], "VRAM2");
				}
				else{
					core.FUNCS.graphics.Print(vars.xOffset_text, (vars.yOffset_text), vars.text1[0], "VRAM2");
				}

				vars.framesBetweenFlashes_state = !vars.framesBetweenFlashes_state;

				vars.framesBetweenFlashes_cnt=0;
			}
			else{
				vars.framesBetweenFlashes_cnt+=1;
			}

		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	// EXAMPLE : function( VALUE ){
	// 	let gs    = this;
	// 	let vars  = gs.vars;
	// },
};
// (TODO) ---- FIRST MENU. INSTRUCTIONS, GAME SETUP, HIGHSCORES, CREDITS
game.gs.SETUP1 = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		vars.END = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		console.log("init");
		core.FUNCS.graphics.SetFont("fonts1"); // White
		// core.FUNCS.graphics.SetFont("fonts2"); // Dark gray.

		core.FUNCS.graphics.Print(8, 10, "INSTRUCTIONS", "VRAM2"); // INSTRUCTIONS
		core.FUNCS.graphics.Print(8, 12, "GAME SETUP"  , "VRAM2"); // GAME SETUP
		core.FUNCS.graphics.Print(8, 14, "HIGH SCORES" , "VRAM2"); // HIGH SCORES
		core.FUNCS.graphics.Print(8, 16, "CREDITS"     , "VRAM2"); // CREDITS

		vars.END = true;
		setTimeout(function(){
			game.setGamestate1("SETUP2"          , true); // Setup screen 2
		}, 1000);
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){ return; }

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;
		}

		// Run.
		if(vars.init){

		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// (TODO) ---- SETUP FOR: MUSIC, GAME TYPE, LEVEL, HEIGHT.
game.gs.SETUP2 = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;

		// core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		vars.menuStyle1 = {
			"tiles":[
				core.ASSETS.graphics.tilemaps[ "boardborder_top"   ][2], // index: 0
				core.ASSETS.graphics.tilemaps[ "boardborder_topL"  ][2], // index: 1
				core.ASSETS.graphics.tilemaps[ "boardborder_topR"  ][2], // index: 2
				core.ASSETS.graphics.tilemaps[ "boardborder_bot"   ][2], // index: 3
				core.ASSETS.graphics.tilemaps[ "boardborder_botL"  ][2], // index: 4
				core.ASSETS.graphics.tilemaps[ "boardborder_botR"  ][2], // index: 5
				core.ASSETS.graphics.tilemaps[ "boardborder_left"  ][2], // index: 6
				core.ASSETS.graphics.tilemaps[ "boardborder_right" ][2], // index: 7
			],
			"keys":{
				"top"  :0, "topL" :1, "topR" :2,
				"bot"  :3, "botL" :4, "botR" :5,
				"left" :6, "right":7,
			},
		};

		//
		vars.menus = {
			"game"   : {
				"MENU":{"mx":2,"my":5,"mw":11,"mh":7,"menu":vars.menuStyle1},
				"TITLE": { "text":"GAME TYPE", "x":1,"y":1 },
				"CURSOR":"cursor1",
				"OPTIONS"    : [
					{"cx":2,"cy":3,  "text":"A", "tx":4,"ty":3},
					{"cx":6,"cy":3,  "text":"B", "tx":8,"ty":3},
				]
			},
			"music"  : {
				"MENU":{"mx":13,"my":5,"mw":13,"mh":7,"menu":vars.menuStyle1},
				"TITLE": { "text":"MUSIC TYPE","x":1,"y":1 },
				"CURSOR":"cursor1",
				"OPTIONS" : [
					{"cx":2,"cy":3,  "text":"A  ", "tx":4,"ty":3},
					{"cx":6,"cy":3,  "text":"B  ", "tx":8,"ty":3},
					{"cx":2,"cy":5,  "text":"C  ", "tx":4,"ty":5},
					{"cx":6,"cy":5,  "text":"OFF", "tx":8,"ty":5},
				]
			},
			"level"  : {
				"MENU":{"mx":2,"my":12,"mw":22,"mh":7,"menu":vars.menuStyle1},
				"TITLE": { "text":"LEVEL","x":1,"y":1 },
				"CURSOR":"cursor1",
				"OPTIONS" : [
					{"cx":4-2 ,"cy":3, "text":"0", "tx":4 ,"ty":3},
					{"cx":8-2 ,"cy":3, "text":"1", "tx":8 ,"ty":3},
					{"cx":12-2,"cy":3, "text":"2", "tx":12,"ty":3},
					{"cx":16-2,"cy":3, "text":"3", "tx":16,"ty":3},
					{"cx":20-2,"cy":3, "text":"4", "tx":20,"ty":3},
					{"cx":4-2 ,"cy":5, "text":"5", "tx":4 ,"ty":5},
					{"cx":8-2 ,"cy":5, "text":"6", "tx":8 ,"ty":5},
					{"cx":12-2,"cy":5, "text":"7", "tx":12,"ty":5},
					{"cx":16-2,"cy":5, "text":"8", "tx":16,"ty":5},
					{"cx":20-2,"cy":5, "text":"9", "tx":20,"ty":5},
				]
			},
			"height" : {
				"MENU":{"mx":2,"my":19,"mw":14,"mh":7,"menu":vars.menuStyle1},
				"TITLE": { "text":"HEIGHT","x":1,"y":1 },
				"CURSOR":"cursor1",
				"OPTIONS" : [
					{"cx":4-2 ,"cy":3, "text":"0", "tx":4  ,"ty":3},
					{"cx":8-2 ,"cy":3, "text":"1", "tx":8  ,"ty":3},
					{"cx":12-2,"cy":3, "text":"2", "tx":12 ,"ty":3},
					{"cx":4-2 ,"cy":5, "text":"3", "tx":4  ,"ty":5},
					{"cx":8-2 ,"cy":5, "text":"4", "tx":8  ,"ty":5},
					{"cx":12-2,"cy":5, "text":"5", "tx":12 ,"ty":5},
				]
			},
		};
		//
		vars.menu_keys = Object.keys(vars.menus);
		//
		vars.menu_visibility = {
			"game"  : true,
			"music" : true,
			"level" : true,
			"height": false,
		};

		// Tile ids.
		vars.bg1_tile     = core.ASSETS.graphics.tilemaps["bg1_tile"][2];
		vars.bg2_tile     = core.ASSETS.graphics.tilemaps["bg2_tile"][2];
		vars.empty_square = core.ASSETS.graphics.tilemaps["empty_square"][2];

		// Music choices.
		vars.music = [
			"TETRIS_A_THEME_MID",
			"TETRIS_B_THEME_MID",
			"TETRIS_C_THEME_MID",
			"",
		];

		//
		vars.currentMenuKey = "game";

		//
		vars.menuSettings = {
			"game"  : {"option":0, "len":vars.menus["game"]  .OPTIONS.length},
			"music" : {"option":2, "len":vars.menus["music"] .OPTIONS.length},
			"level" : {"option":0, "len":vars.menus["level"] .OPTIONS.length},
			"height": {"option":0, "len":vars.menus["height"].OPTIONS.length},
		};

		// Holds the indexs for the cursor sprites.
		vars.currSprite_indexes = {};

		//
		vars.END = false;
		vars.configComplete=false;

		// Blink speed/delay
		vars.blinkState=false;
		vars.blinkSpeed     = game.secondsToFrames(0.50);
		vars.blinkSpeed_cnt = 0 ;
	},

	//
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		// vars.END = true;

		// let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		// core.FUNCS.graphics.ClearVram();
		core.FUNCS.graphics.clearSprites();

		// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["setup_oneplayer"], "VRAM1"); // PLAY

		gs.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, vars.menuStyle1, vars.empty_square);
		// gs.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, vars.menuStyle1, vars.bg1_tile);
		// gs.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, vars.menuStyle1, vars.bg2_tile);


		// Text positions
		let x_mainmenu    = 2;
		let y_mainmenu    = 2;
		gs.drawMenu_box(x_mainmenu-1, y_mainmenu-1, 26, 3, vars.menuStyle1, null);
		let text_mainmenu = "-MAIN MENU - ONE PLAYER-";
		core.FUNCS.graphics.Print(x_mainmenu, y_mainmenu, text_mainmenu, "VRAM2");

		// Draw the menus.
		let spriteNum=0;
		vars.currSprite_indexes = {};

		for(let i=0; i<vars.menu_keys.length; i+=1){
			// Get the core values.
			let key            = vars.menu_keys[i];
			let data = gs.getMenuData(key);

			// Set bank and also SPRITE_OFF.
			let flags = core.CONSTS["SPRITE_OFF"] | core.CONSTS["SPRITE_BANK0"] ;

			// Map/Move the sprites.
			core.FUNCS.graphics.MapSprite2( spriteNum, data.cursor_tilemap, flags );
			core.FUNCS.graphics.MoveSprite( spriteNum, data.cursor_x+(data.mx*core.SETTINGS.TILE_WIDTH) , data.cursor_y+(data.my*core.SETTINGS.TILE_HEIGHT) , data.cursor_width, data.cursor_height );

			// Set the cursor sprite numbers.
			vars.currSprite_indexes[key]=spriteNum;
			spriteNum+=(data.cursor_width*data.cursor_height);

			// Draw the menu text.

			if(vars.menu_visibility[data.key]==true){ gs.drawMenu(data.key, "ON"  ); }
			else                                    { gs.drawMenu(data.key, "OFF" ); }

			// Change the cursor state.
			// gs.changeCursorState(data.key, "ON");
		}

		gs.blink_menu("game" , "ON");

		// Play the first song.
		core.FUNCS.audio.play_midi  ( "BGM1", vars.music[ vars.menuSettings.music.option ], true, 1.0 );
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){ return; }

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;
		}

		// Run.
		if(vars.init){
			// Are we done?
			if(vars.configComplete){
				// Clear the variables first.
				game.gs.PLAY.temp.type           = undefined;
				game.gs.PLAY.temp.height         = undefined;
				game.gs.PLAY.temp.music          = undefined;
				game.gs.PLAY.temp.level          = undefined;
				game.gs.PLAY.temp.dropSpeedIndex = undefined;

				// Set game type.
				game.gs.PLAY.temp.type           = vars.menuSettings.game.option == 0 ? "A" : "B" ;

				// Stop current song.
				core.FUNCS.audio.stop_midi("BGM1", true);

				// Set song.
				game.gs.PLAY.temp.music = vars.music[ vars.menuSettings.music.option ] ;

				// Set level and drop speed.
				game.gs.PLAY.temp.level          = vars.menuSettings.level.option ;
				game.gs.PLAY.temp.dropSpeedIndex = vars.menuSettings.level.option ;

				// Start game!
				if(game.gs.PLAY.temp.type=="A"){
					// Start Type A.
					game.setGamestate1("PLAY", true);
				}
				else                             {
					// Set height.
					game.gs.PLAY.temp.height = vars.menuSettings.height.option ;

					// Start Type B.
					game.setGamestate1("PLAY", true);
					// game.setGamestate1("PLAY", true);
				}

				vars.END=true;

				return;
			}

			// Handle user input.
			else{
				// Handle cursor movements.
				if     ( game.chkBtn("BTN_DOWN"   , "btnPressed1") || game.chkBtn("BTN_RIGHT"   , "btnPressed1") ){
					// In bounds?
					if(! (vars.menuSettings[vars.currentMenuKey].option==vars.menuSettings[vars.currentMenuKey].len-1)){
						// Adjust the option index.
						vars.menuSettings[vars.currentMenuKey].option+=1;

						// Update the cursor position.
						gs.changeCursorState(vars.currentMenuKey, "ON");

						// If on the "music" key change the song.
						if(vars.currentMenuKey=="music"){ gs.changeSong(); }

						// If on the "game" key change the height visibility.
						if(vars.currentMenuKey=="game"){
							if( vars.menuSettings[vars.currentMenuKey].option == 0 ){ gs.drawMenu("height", "OFF"); }
							else                                                    { gs.drawMenu("height", "ON" ); }
						}

						// Play the cursor move sound.
						core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);
					}
				}

				else if( game.chkBtn("BTN_UP" , "btnPressed1") || game.chkBtn("BTN_LEFT"   , "btnPressed1") ){
					// In bounds?
					if(! (vars.menuSettings[vars.currentMenuKey].option==0)){
						// Adjust the option index.
						vars.menuSettings[vars.currentMenuKey].option-=1;

						// Update the cursor position.
						gs.changeCursorState(vars.currentMenuKey, "ON");

						// If on the "music" key change the song.
						if(vars.currentMenuKey=="music"){ gs.changeSong(); }

						// If on the "game" key change the height visibility.
						if(vars.currentMenuKey=="game"){
							if( vars.menuSettings[vars.currentMenuKey].option == 0 ){ gs.drawMenu("height", "OFF"); }
							else                                                    { gs.drawMenu("height", "ON" ); }
						}

						// Play the cursor move sound.
						core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);
					}
				}

				// Pressed A? (confirm)
				else if( game.chkBtn("BTN_A"    , "btnPressed1") ){

					// if( vars.currentMenuKey=="height" && !vars.menu_visibility[key]){}

					switch(vars.currentMenuKey){
						case "game"   : { vars.currentMenuKey="music"       ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						case "music"  : { vars.currentMenuKey="level"       ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						case "level"  : {
							// Is this Game Type A?
							if( vars.menuSettings["game"].option == 0 ){
								// We are done. No height for Game Type A.
								vars.configComplete=true;
							}
							// Is this Game Type B?
							else{
								// Game Type B has the height menu.
								vars.currentMenuKey="height"      ;
								vars.blinkState=true;
								vars.blinkSpeed_cnt = vars.blinkSpeed ;
							}
							break;
						}
						case "height" : { vars.configComplete=true          ;                                break; }
						default : { break; }
					}

					gs.changeCursorState(vars.currentMenuKey, "ON");

				}

				// Pressed B? (go back)
				else if( game.chkBtn("BTN_B"    , "btnPressed1") ){
					switch(vars.currentMenuKey){
						case "game"   : { game.setGamestate1("TITLE2", true); vars.END=true; return;        break; }
						case "music"  : { vars.currentMenuKey="game"        ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						case "level"  : { vars.currentMenuKey="music"       ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						case "height" : { vars.currentMenuKey="level"       ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						default : { break; }
					}

					gs.changeCursorState(vars.currentMenuKey, "ON");
				}

				// Handle the blinking indicator.
				if(vars.blinkSpeed_cnt >= vars.blinkSpeed){
					vars.blinkSpeed_cnt=0;
					if(vars.blinkState){ gs.blink_menu(vars.currentMenuKey , "ON");  }
					else               { gs.blink_menu(vars.currentMenuKey , "OFF"); }
					vars.blinkState = !vars.blinkState;
				}
				else{ vars.blinkSpeed_cnt += 1; }

			}

		}
	},

	// *** SUPPORT FUNCTIONS ***

	// Get all the settings for the specified menu key.
	getMenuData : function(key){
		let gs    = this;
		let vars  = gs.vars;

		let menu           = vars.menus[key]                                              ;
		let MENU           = menu.MENU                                                    ;
		let mw             = MENU.mw                                                      ;
		let mh             = MENU.mh                                                      ;
		let mx             = MENU.mx                                                      ;
		let my             = MENU.my                                                      ;
		let menuKeys       = MENU.menu.keys                                               ;
		let menuTiles      = MENU.menu.tiles                                              ;
		let OPTIONS        = menu.OPTIONS                                                 ;
		let CURSOR         = menu.CURSOR                                                  ;
		let selectedIndex  = vars.menuSettings[key].option                                ;
		let cursor_x       = (OPTIONS[ selectedIndex ].cx+mx) * core.SETTINGS.TILE_WIDTH  ;
		let cursor_y       = (OPTIONS[ selectedIndex ].cy+my) * core.SETTINGS.TILE_HEIGHT ;
		let cursor_tilemap = core.ASSETS.graphics.tilemaps[ CURSOR ]                      ;
		let cursor_width   = cursor_tilemap[0]                                            ;
		let cursor_height  = cursor_tilemap[1]                                            ;
		let TITLE          = menu.TITLE                                                   ;
		let title_text     = TITLE.text                                                   ;
		let title_x        = TITLE.x                                                      ;
		let title_y        = TITLE.y                                                      ;

		return{
			"key"            : key            ,
			"menu"           : menu           ,
			"MENU"           : MENU           ,
			"mw"             : mw             ,
			"mh"             : mh             ,
			"mx"             : mx             ,
			"my"             : my             ,
			"menuKeys"       : menuKeys       ,
			"menuTiles"      : menuTiles      ,
			"OPTIONS"        : OPTIONS        ,
			"CURSOR"         : CURSOR         ,
			"selectedIndex"  : selectedIndex  ,
			"cursor_x"       : cursor_x       ,
			"cursor_y"       : cursor_y       ,
			"cursor_tilemap" : cursor_tilemap ,
			"cursor_width"   : cursor_width   ,
			"cursor_height"  : cursor_height  ,
			"TITLE"          : TITLE          ,
			"title_text"     : title_text     ,
			"title_x"        : title_x        ,
			"title_y"        : title_y        ,
		}
	},
	// Show/hide menu, text, and cursor.
	drawMenu : function(which, newState){
		let gs    = this;
		let vars  = gs.vars;

		let data = gs.getMenuData(which);

		if(newState=="ON") {
			// Update the visibility flag for this menu.
			vars.menu_visibility[which]=true;

			let fillTile = vars.bg1_tile     ;
			// let fillTile = vars.bg2_tile     ;
			// let fillTile = vars.empty_square ;

			// Draw the menu box.
			gs.drawMenu_box(
				data.mx        ,
				data.my        ,
				data.mw        ,
				data.mh        ,
				data.MENU.menu ,
				fillTile
			);

			// Print the title text.
			core.FUNCS.graphics.Print(data.title_x+data.mx, data.title_y+data.my , data.title_text, "VRAM2");

			// Print the options text.
			for(let i2=0; i2<data.OPTIONS.length; i2+=1){
				let option = data.OPTIONS[i2];
				let text = option.text;
				let tx   = option.tx + data.mx ;
				let ty   = option.ty + data.my ;
				core.FUNCS.graphics.Print(tx, ty , text, "VRAM2");
			}

			// Show the sprite for this menu.
			gs.changeCursorState(which, newState);
		}
		if(newState=="OFF"){
			// Update the visibility flag for this menu.
			vars.menu_visibility[which]=false;

			// Which tile will we draw with?
			let tileid = vars.empty_square;

			// Clear this portion of VRAM1.
			core.FUNCS.graphics.Fill(data.mx, data.my, data.mw, data.mh, tileid, "VRAM1");

			// Clear this portion of VRAM2.
			core.FUNCS.graphics.Fill(data.mx, data.my, data.mw, data.mh, 0     , "VRAM2");

			// Hide the sprite for this menu.
			gs.changeCursorState(which, newState);
		}
		else{ return; }

	},
	// Draws the menu box itself.
	drawMenu_box : function(mx, my, mw, mh, style, fillTile ){
		let gs    = this;
		let vars  = gs.vars;

		let menuTiles = style.tiles;
		let menuKeys  = style.keys;

		// Fill it (inside)
		if(fillTile != null){ core.FUNCS.graphics.Fill(mx, my, mw, mh, fillTile, "VRAM1"); }

		// Draw it (borders)
		for(let y=0; y<mh; y+=1){
			for(let x=0; x<mw; x+=1){
				let tileid;
				let name;

				if     (x==0    && y==0   ) { name = "topL"  ; } // "topL"
				else if(x==mw-1 && y==0   ) { name = "topR"  ; } // "topR"
				else if(           y==0   ) { name = "top"   ; } // "top"
				else if(x==0    && y==mh-1) { name = "botL"  ; } // "botL"
				else if(x==mw-1 && y==mh-1) { name = "botR"  ; } // "botR"
				else if(           y==mh-1) { name = "bot"   ; } // "bot"
				else if(x==0              ) { name = "left"  ; } // "left"
				else if(x==mw-1           ) { name = "right" ; } // "right"
				else                        { continue; }

				tileid = menuTiles[ menuKeys[name] ];

				if(tileid==undefined){
					console.log("tileid was not defined.");
					continue;
				}

				core.FUNCS.graphics.SetTile(x+mx, y+my, tileid, "VRAM1");
			}
		}

	},
	// Turns the highlighting for all menus off.
	blink_menus_allOff : function( which, state ){
		let gs    = this;
		let vars  = gs.vars;

		// Force to off state (clears previous.)
		let data;
		let arrs = vars.menu_keys;
		for(let i=0; i<arrs.length; i+=1){
			let key = arrs[i];
			data = gs.getMenuData(key);

			if(vars.menu_visibility[key]==true){
				core.FUNCS.graphics.Fill(data.mx+1, data.my+1, data.mw-2, data.mh-2, vars.bg1_tile, "VRAM1");
			}
			else{
			}
		}
	},
	// Turns the highlighting for a specific menu either on or off.
	blink_menu : function( which, state ){
		let gs    = this;
		let vars  = gs.vars;

		// Force to off state (clears previous.)
		gs.blink_menus_allOff();

		let tileid;

		let data = gs.getMenuData(which);

		if     (state=="ON" ){ tileid = vars.bg2_tile; }
		else if(state=="OFF"){ tileid = vars.bg1_tile; }

		core.FUNCS.graphics.Fill(data.mx+1, data.my+1, data.mw-2, data.mh-2, tileid, "VRAM1");
	},
	// Show/hides the specified cursor.
	changeCursorState : function(which, newState){
		let gs    = this;
		let vars  = gs.vars;

		// Get the spriteNum, flags.
		let spriteNum = vars.currSprite_indexes[which];
		let flags;
		try{
			flags = core.GRAPHICS.sprites[spriteNum].flags;
		}
		catch(e){
			console.log("Invalid sprite data.", which, newState, vars.currSprite_indexes);
			return;
		}

		let data = gs.getMenuData(which);

		// Adjust flags.
		if     (newState=="ON") { flags &= ~( core.CONSTS["SPRITE_OFF"] ); } // Clear the bit.
		else if(newState=="OFF"){ flags |=  ( core.CONSTS["SPRITE_OFF"] ); } // Set the bit.
		else                    { return; }

		// Update the sprite.
		core.FUNCS.graphics.MapSprite2( spriteNum, data.cursor_tilemap, flags );
		core.FUNCS.graphics.MoveSprite( spriteNum, data.cursor_x, data.cursor_y , data.cursor_width, data.cursor_height );
	},
	// Changes the active song.
	changeSong : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Play the next song if there is a value set. (OFF is "").
		if( vars.music[ vars.menuSettings.music.option ] ){
			let song = vars.music[ vars.menuSettings.music.option ];
			core.FUNCS.audio.play_midi  ( "BGM1", song, true, 1.0 );
		}
		else{ core.FUNCS.audio.stop_midi("BGM1", true); }
	},
};
// MAIN GAME: TYPE A
game.gs.PLAY = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		// Constants.
		vars.min_x_tile  = 2  ;
		vars.min_y_tile  = 4  ;
		vars.max_y_tile  = 4  ; // This is the first playgrid row.

		// X values within the game play grid.
		vars.x_lines = [
			(0+vars.min_x_tile),
			(1+vars.min_x_tile),
			(2+vars.min_x_tile),
			(3+vars.min_x_tile),
			(4+vars.min_x_tile),
			(5+vars.min_x_tile),
			(6+vars.min_x_tile),
			(7+vars.min_x_tile),
			(8+vars.min_x_tile),
			(9+vars.min_x_tile),
		];
		// Y values within the game play grid.
		vars.y_lines = [
			(19+vars.min_y_tile),
			(18+vars.min_y_tile),
			(17+vars.min_y_tile),
			(16+vars.min_y_tile),
			(15+vars.min_y_tile),
			(14+vars.min_y_tile),
			(13+vars.min_y_tile),
			(12+vars.min_y_tile),
			(11+vars.min_y_tile),
			(10+vars.min_y_tile),
			(9+vars.min_y_tile),
			(8+vars.min_y_tile),
			(7+vars.min_y_tile),
			(6+vars.min_y_tile),
			(5+vars.min_y_tile),
			(4+vars.min_y_tile),
			(3+vars.min_y_tile),
			(2+vars.min_y_tile),
			(1+vars.min_y_tile),
			(0+vars.min_y_tile),
		];

		// Variables.
		vars.dropSpeeds         = [
			game.secondsToFrames(1.00) , // 0
			game.secondsToFrames(0.90) , // 1
			game.secondsToFrames(0.80) , // 2
			game.secondsToFrames(0.70) , // 3
			game.secondsToFrames(0.60) , // 4
			game.secondsToFrames(0.50) , // 5
			game.secondsToFrames(0.40) , // 6
			game.secondsToFrames(0.30) , // 7
			game.secondsToFrames(0.20) , // 8
			game.secondsToFrames(0.15) , // 9
			// game.secondsToFrames(0.05) , // 10 // This was too fast and blocked user input.
		];
		vars.validPieces = ["T"  ,"J"  ,"Z"  ,"O"  ,"S"  ,"L"  ,"I"];

		vars.pieceCounts = {"T":0,"J":0,"Z":0,"O":0,"S":0,"L":0,"I":0};

		// Drop speed/delay
		vars.dropSpeedIndex     = gs.temp.dropSpeedIndex ;
		vars.dropSpeed          = vars.dropSpeeds[ vars.dropSpeedIndex ] ;
		vars.dropSpeed_cnt      = 0                               ;

		// Input speed/delay
		vars.inputSpeed     = game.secondsToFrames(0.10);
		vars.inputSpeed_cnt = 0 ;

		vars.END                = false           ;
		vars.currentPiece       = ""              ;
		vars.currentMatrix      = ""              ;
		vars.currSprite_indexes = []              ;
		vars.currentMap         = ""              ;
		vars.gameOver           = false           ;
		vars.rotationIndex      = 0               ;
		vars.matrix_x           = vars.min_x_tile ; // Position of the falling piece.
		vars.matrix_y           = vars.min_y_tile ; // Position of the falling piece.

		vars.nextPiece ; // Next piece.

		// Scoring
		vars.lines = 0;
		vars.score = 0;
		vars.level = gs.temp.level;
		vars.type  = gs.temp.type;

		// Line clearing.
		vars.linesBeingCleared            = false;
		vars.linesBeingCleared_speed      = game.secondsToFrames(0.075);
		vars.linesBeingCleared_flashes    = 5;
		vars.linesBeingCleared_flashesCnt = 0;
		vars.linesBeingCleared_cnt        = 0;

		vars.field = {
			"org" : [] , // Before line clear.
			"adj" : [] , // During line clear.
			"new" : [] , // After line clear.
		};

		vars.instantDrop = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		core.FUNCS.graphics.ClearVram();

		core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["main_game"], "VRAM1"); // PLAY

		// Determine the first piece.
		vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];

		// Spawn the piece.
		gs.spawnPiece( vars.nextPiece );

		// Determine the next piece.
		vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];

		// Update the stats.
		gs.updateStats();

		// Start the music!
		if(game.gs.PLAY.temp.music){
			core.FUNCS.audio.play_midi  ( "BGM1", gs.temp.music, true, 1.0 );
		}
	},
	//
	main         : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Game over?
		else if(vars.gameOver){
			console.log("yup, game over!");
			if(JSGAME.SHARED.debug){ game.DEBUG.updateDebugDisplay(); }
			throw "done!";
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;
		}

		// Run.
		if(vars.init){
			// // Handle user-input: pause (start).
			// if     ( game.chkBtn("BTN_START"     , "btnPressed1") ){ console.log("START"); }

			// // Handle user-input: menu (select).
			// if     ( game.chkBtn("BTN_SELECT"     , "btnPressed1") ){ console.log("SELECT"); }

			if(0){
			}
			else {
				// Is a piece in the process of being removed?
				if(vars.linesBeingCleared){
					// Ready for the next animation?
					if(vars.linesBeingCleared_cnt >= vars.linesBeingCleared_speed){
						vars.linesBeingCleared_cnt  = 0;

						// Flashed enough times? Stop the animation.
						if(vars.linesBeingCleared_flashesCnt >= vars.linesBeingCleared_flashes){
							// Clear the flag.
							vars.linesBeingCleared=false;

							// Draw the new field.
							core.FUNCS.graphics.DrawMap2(vars.min_x_tile, vars.min_y_tile, vars.field.new );
						}
						else{
							// if(vars.linesBeingCleared_flashesCnt%2==0 && vars.linesBeingCleared_flashesCnt !=0){
							if(vars.linesBeingCleared_flashesCnt%2==0){
								core.FUNCS.graphics.DrawMap2(vars.min_x_tile, vars.min_y_tile, vars.field.adj );
							}
							else{
								core.FUNCS.graphics.DrawMap2(vars.min_x_tile, vars.min_y_tile, vars.field.org );
							}

							vars.linesBeingCleared_flashesCnt +=1 ;
							vars.linesBeingCleared_cnt += 1;
						}

					}
					else{
						vars.linesBeingCleared_cnt += 1;
					}

					return;
				}

				// Do we move the piece down (auto-decend?)
				if( vars.instantDrop || (vars.dropSpeed_cnt >= vars.dropSpeed) ){
					// Can the piece move down?
					if( gs.canThePieceBeDrawn("DOWN") ){
						// YES: Drop the piece one tile down after a certain time.
						game.gs.PLAY.vars.matrix_y+=1;
						game.gs.PLAY.drawCurrentPiece();
						vars.dropSpeed_cnt=0;
						vars.inputSpeed_cnt=0;
					}
					else{
						// 1 NO:  If at the top then game over.
						if( vars.matrix_y == vars.max_y_tile ){
							if(vars.instantDrop){ vars.instantDrop = false ; }
							gs.clearBoard(0);
							// vars.gameOver=true;
							// gs.gameOver();
						}
						// 2 NO:  Else, next piece.
						else{
							if(vars.instantDrop){ vars.instantDrop = false ; }

							gs.updatePieceCounts(vars.currentPiece);

							// Save the sprite as VRAM tiles at their present location.
							gs.currentPiecetoVRAM1();

							// Clear the sprites.
							core.FUNCS.graphics.clearSprites();

							// Detect completed lines!
							gs.detectCompletedLines();

							// Determine the next piece.
							// let newIndex = game.getRandomInt_inRange(0, vars.validPieces.length-1) ;

							// Spawn a piece.
							gs.spawnPiece( vars.nextPiece );

							// Set the next piece.
							vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];
							gs.updateNextPiece();
						}
					}
				}
				// Increment the dropSpeed_cnt.
				else{
					vars.dropSpeed_cnt  += 1;
				}

				// Instant drop?
				if     ( game.chkBtn("BTN_UP"    , "btnPressed1") ){
					core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);
					vars.instantDrop=true;
					vars.dropSpeed_cnt=0;
					vars.inputSpeed_cnt=0;
				}
				// Move the piece DOWN, LEFT, or RIGHT?
				else if(vars.inputSpeed_cnt >= vars.inputSpeed){
					let reset=false;

					// Handle directional user input.
					if     ( game.chkBtn("BTN_DOWN"  , "btnHeld1") ){ if( gs.canThePieceBeDrawn("DOWN" )   ) {core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0); game.gs.PLAY.vars.matrix_y+=1; game.gs.PLAY.drawCurrentPiece(); } reset=true; vars.dropSpeed_cnt=0; }
					else if( game.chkBtn("BTN_LEFT"  , "btnHeld1") ){ if( gs.canThePieceBeDrawn("LEFT" )   ) {core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0); game.gs.PLAY.vars.matrix_x-=1; game.gs.PLAY.drawCurrentPiece(); } reset=true; }
					else if( game.chkBtn("BTN_RIGHT" , "btnHeld1") ){ if( gs.canThePieceBeDrawn("RIGHT")   ) {core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0); game.gs.PLAY.vars.matrix_x+=1; game.gs.PLAY.drawCurrentPiece(); } reset=true; }

					if(reset){ vars.inputSpeed_cnt=0; }
					// else     { vars.inputSpeed_cnt += 1; }
				}
				else{ vars.inputSpeed_cnt += 1; }

				// Rotate the piece LEFT or RIGHT?
				// if(vars.inputSpeed_cnt != 0 && ! vars.instantDrop){
				if(! vars.instantDrop){
					if     ( game.chkBtn("BTN_A"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_RIGHT" ) ) { gs.rotatePiece("R_RIGHT"); core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0); gs.drawCurrentPiece(); } }
					else if( game.chkBtn("BTN_B"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_LEFT"  ) ) { gs.rotatePiece("R_LEFT") ; core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0); gs.drawCurrentPiece(); } }
				}
			}
		}
	},

	// *** SUPPORT FUNCTIONS ***

	// TESTING

	//
	gameOver              : function(){
		let gs    = this;
		let vars  = gs.vars;

		console.log("game over");

		if(1){
			vars.gameOver=true;
		}
	},

	// WORKING

	//
	convert2dTo1d         : function(arr){
		let new_arr = [];

		for(var i = 0; i < arr.length; i++){
			new_arr = new_arr.concat(arr[i]);
		}

		return new_arr;
	},
	//
	playboardVramToArray  : function(){
		let gs    = this;
		let vars  = gs.vars;

		let x_lines = vars.x_lines;
		let y_lines = vars.y_lines;

		//
		let field = [];

		// Copy the VRAM block into the field.
		for(let y=y_lines.length-1; y>=0; y-=1){
			// Create the row (blank.)
			let newRow=[];

			// Populate the row from VRAM data.
			for(let x=0; x<x_lines.length; x+=1){
				newRow.push( core.GRAPHICS.VRAM1[ ( ( y_lines[y] ) * core.SETTINGS.VRAM_TILES_H) + ( x_lines[x] ) ] );
			}

			// Add the completed row.
			field.push(newRow);
		}

		return field;
	},
	//
	detectCompletedLines  : function(){
		let gs    = this;
		let vars  = gs.vars;

		let X_tile = core.ASSETS.graphics.tilemaps[ "X_tile" ][2];

		vars.field.org = gs.playboardVramToArray();
		let oldFields  = gs.playboardVramToArray();
		let newFields = [];

		// The playboard has 20 lines all 10 tiles wide.
		let linesCleared = 0;

		// Determine all lines that are complete.
		for(let y=0; y<20; y+=1){
			let completedLine=true;

			for(let x=0; x<10; x+=1){
				let thisTile = oldFields[y][x];
				// Is the tile solid?
				if(game.solidBg1Tiles.indexOf( thisTile ) == -1){
					// No? Clear flag and break.
					completedLine=false;
					break;
				}
			}

			// If a line is completed, clear the line and then reset y and scan again.
			if(completedLine){
				linesCleared+=1;

				// Replace the row with X.
				oldFields[y] = [X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile] ;
			}
			else{
				newFields.push( oldFields[y].map(function(d){ return d; }) );
			}
		}

		if(linesCleared){
			// Recreate the fields array.

			// Shift to the top the number of rows removed.
			for(let i=0; i<linesCleared; i+=1){
				let empty_square = core.ASSETS.graphics.tilemaps[ "empty_square" ][2];
				newFields.unshift( [
					empty_square,empty_square,empty_square,empty_square,empty_square,
					empty_square,empty_square,empty_square,empty_square,empty_square
				] );
			}

			//
			oldFields      = gs.convert2dTo1d(oldFields);
			newFields      = gs.convert2dTo1d(newFields);
			vars.field.org = gs.convert2dTo1d(vars.field.org) ;

			//
			vars.field.org.unshift( 0 );
			vars.field.org.unshift( 0 );
			vars.field.org[0] = 10;
			vars.field.org[1] = 20;

			//
			oldFields.unshift( 0 );
			oldFields.unshift( 0 );
			oldFields[0] = 10;
			oldFields[1] = 20;

			//
			newFields.unshift( 0 );
			newFields.unshift( 0 );
			newFields[0] = 10;
			newFields[1] = 20;

			//
			vars.field.adj = oldFields ;
			vars.field.new = newFields ;

			// Add to the line count.
			vars.lines += linesCleared;
			gs.updateLineCount();

			// Add to the score.
			switch(linesCleared){
				case 1 : { vars.score += ( 40   + ((vars.level+gs.temp.level)*40  ) ); break; } // Single
				case 2 : { vars.score += ( 100  + ((vars.level+gs.temp.level)*100 ) ); break; } // Double
				case 3 : { vars.score += ( 300  + ((vars.level+gs.temp.level)*300 ) ); break; } // Triple
				case 4 : { vars.score += ( 1200 + ((vars.level+gs.temp.level)*1200) ); break; } // Tetris
				default : {
					vars.score += 0 ;
					console.log("this should not have happened. linesCleared:", linesCleared);
					break;
				}
			}
			gs.updateScore();

			// Change the level?
			let old_level = vars.level;
			gs.updateLevel();
			if(old_level != vars.level && gs.temp.level < vars.level){ gs.setNextDropSpeed("UP"); }

			// Start the flash animation.
			vars.linesBeingCleared            = true;
			vars.linesBeingCleared_flashesCnt = 0;
			vars.linesBeingCleared_cnt        = 0;
			vars.linesBeingCleared_cnt = vars.linesBeingCleared_speed;
		}
	},
	// Updates ALL stats (convenience function.)
	updateStats           : function(){
		let gs    = this;
		let vars  = gs.vars;

		gs.updateLineCount();
		gs.updateScore();
		gs.updateLevel();
		gs.clearPieceCounts();
		gs.updateType();
		gs.updateNextPiece();

		core.FUNCS.graphics.Print(17, 11, "-STATS-", "VRAM2");
	},
	//
	updateLineCount       : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(15, 19, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.lines.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(15, 19-1, "LINES", "VRAM2");
		core.FUNCS.graphics.Print(15, 19, str, "VRAM2");
	},
	//
	updateType       : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(15, 22, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.type.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(15, 22-1, "TYPE "   , "VRAM2");
		core.FUNCS.graphics.Print(15, 22, str, "VRAM2");

	},
	//
	updateScore           : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(21, 22, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.score.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(21, 22-1, "SCORE", "VRAM2");
		core.FUNCS.graphics.Print(21, 22, str, "VRAM2");
	},
	//
	updateLevel           : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Determine current level value.
		vars.level = parseInt( (vars.lines / 10),10);

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(21, 19, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=(vars.level+gs.temp.level).toString().padStart(5, " ");
		core.FUNCS.graphics.Print(21, 19-1, "LEVEL", "VRAM2");
		core.FUNCS.graphics.Print(21, 19, str, "VRAM2");
	},
	//
	updateNextPiece       : function(){
		let gs    = this;
		let vars  = gs.vars;

		// T_map :: purple
		// J_map :: green
		// Z_map :: orange
		// O_map :: red
		// S_map :: d blue
		// L_map :: yellow
		// I_map :: l blue

		let map = core.ASSETS.graphics.tilemaps[ vars.nextPiece + "_map"];
		if(!map){ console.log("updateNextPiece: map not found!"); return; }

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(19, 5, 5, 4, blacktile, "VRAM1");

		// Draw the tile map.
		core.FUNCS.graphics.DrawMap2(20,6, map, "VRAM1");

		// Draw the "NEXT".
		core.FUNCS.graphics.Print(18, 5 , "N"      , "VRAM2");
		core.FUNCS.graphics.Print(18, 6 , "E"      , "VRAM2");
		core.FUNCS.graphics.Print(18, 7 , "X"      , "VRAM2");
		core.FUNCS.graphics.Print(18, 8 , "T"      , "VRAM2");

	},
	//
	clearPieceCounts      : function(){
		let gs    = this;
		let vars  = gs.vars;

		let keys = Object.keys( vars.pieceCounts );
		for(let i = 0; i<keys.length; i+=1){
			let key = keys[i];
			vars.pieceCounts[key]=0;
		}
		let str;
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];

		core.FUNCS.graphics.Fill(17, 13, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[0] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 13, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 14, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[1] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 14, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 15, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[2] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 15, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 16, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[3] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 16, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 14, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[4] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 14, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 13, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[5] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 13, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 15, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[6] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 15, str, "VRAM2");
	},
	//
	updatePieceCounts     : function(type){
		let gs    = this;
		let vars  = gs.vars;

		let x;
		let y;

		switch(type){
			case "T" : { x=17 ; y=13; break; } // purple
			case "J" : { x=17 ; y=14; break; } // green
			case "Z" : { x=23 ; y=13; break; } // yellow
			case "O" : { x=23 ; y=14; break; } // d blue
			case "S" : { x=17 ; y=15; break; } // orange
			case "L" : { x=17 ; y=16; break; } // red
			case "I" : { x=23 ; y=15; break; } // l blue
			default : { console.log("INVALID PIECE SPECIFIED!", type); return; break; }
		};

		// Increment the count
		vars.pieceCounts[type]+=1;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(x, y, 3,1, blacktile, "VRAM1");

		// Draw the count text.
		let str = vars.pieceCounts[type].toString().padStart(3, "0") ;
		core.FUNCS.graphics.Print(x, y, str, "VRAM2");
	},
	//
	clearBoard            : function(){
		// Clears the VRAM of the playing board.

		let gs    = this;
		let vars  = gs.vars;

		let empty_square = core.ASSETS.graphics.tilemaps[ "empty_square" ][2];
		core.FUNCS.graphics.Fill(vars.min_x_tile, vars.min_y_tile, 10, 20, empty_square, "VRAM1");
	},
	//
	setDropSpeed          : function(index){
		// game.gs[game.gamestate].setDropSpeed(0);
		// game.gs[game.gamestate].setNextDropSpeed("UP");
		// game.gs[game.gamestate].setNextDropSpeed("DOWN");

		let gs    = this;
		let vars  = gs.vars;

		if(vars.dropSpeeds[index]){
			vars.dropSpeed     = vars.dropSpeeds[index] ;
			vars.dropSpeed_cnt = 0                  ;

			// console.log("Speed has been set to index:", index);
		}
		else{
			console.log("Invalid drop speed index was specified!");
		}
	},
	//
	setNextDropSpeed      : function(dir){
		let gs    = this;
		let vars  = gs.vars;

		let len = vars.dropSpeeds.length;

		if(dir=="DOWN"){
			if( vars.dropSpeedIndex == 0 )    { }
			else                              { vars.dropSpeedIndex--; }
		}

		else if(dir=="UP"){
			if( vars.dropSpeedIndex == len-1 ) { }
			else                               { vars.dropSpeedIndex++;  }
		}

		gs.setDropSpeed( vars.dropSpeedIndex );
	},
	//
	currentPiecetoVRAM1   : function(){
		let gs    = this;
		let vars  = gs.vars;

		// currSprite_indexes
		let len = vars.currSprite_indexes.length;
		for(let i=0; i<len; i+=1){
			let index  = vars.currSprite_indexes[i]   ;
			let sprite = core.GRAPHICS.sprites[index] ;
			let map;
			let sprTileId;
			let bgTileIndex;

			// Get the index of this tile (sp and bg.)
			switch( sprite.tileIndex ){
				case core.ASSETS.graphics.tilemaps["T_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["T_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["T_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["J_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["J_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["J_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["Z_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["Z_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["Z_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["O_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["O_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["O_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["S_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["S_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["S_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["L_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["L_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["L_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["I_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["I_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["I_bgtile"][2];
					break;
				}
				default : { console.log(i-1, i, sprite.tileIndex, "-- INVALID PIECE SPECIFIED!"); break; }
			};

			// Write this to VRAM at the correct position. (Expects that sprite and bg x,y are fully aligned.
			core.FUNCS.graphics.SetTile(
				sprite.x/core.SETTINGS.TILE_WIDTH,
				sprite.y/core.SETTINGS.TILE_HEIGHT,
				bgTileIndex,
				"VRAM1"
			);

		}
	},
	//
	spawnPiece            : function( type ){
		let gs    = this;
		let vars  = gs.vars;

		switch(type){
			case "T" : { vars.currentMap = "T_sptile"; break; } // purple
			case "J" : { vars.currentMap = "J_sptile"; break; } // green
			case "Z" : { vars.currentMap = "Z_sptile"; break; } // orange
			case "O" : { vars.currentMap = "O_sptile"; break; } // red
			case "S" : { vars.currentMap = "S_sptile"; break; } // d blue
			case "L" : { vars.currentMap = "L_sptile"; break; } // yellow
			case "I" : { vars.currentMap = "I_sptile"; break; } // l blue
			default : { console.log("INVALID PIECE SPECIFIED!", type); return; break; }
		};

		vars.currentPiece  = type;
		vars.rotationIndex = game.pieces_spawnIndexes[vars.currentPiece] ;
		vars.currentMatrix = game.pieces[ vars.currentPiece ][ vars.rotationIndex ];

		vars.matrix_x = vars.min_x_tile;
		vars.matrix_y = vars.min_y_tile;

		gs.drawCurrentPiece();

		// Reset the drop counter.
		vars.dropSpeed_cnt=0;

	},
	//
	canThePieceBeDrawn    : function(movement){
		// Check game.playBoard and the current rotation matrix for the current piece.
		let gs    = this;
		let vars  = gs.vars;

		let type;

		// Create a new temporary matrix to use for checking the sprites.
		if     ( movement=="R_LEFT" || movement=="R_RIGHT" )                                       { type="ROT"; }
		else if( movement=="UP"     || movement=="DOWN" || movement=="LEFT" || movement=="RIGHT" ) { type="DIR"; }
		else{
			// Movement NEEDS to be valid.
			console.log("canThePieceBeDrawn: Invalid movement specified.");
			return false;
		}

		// len should always be 4.
		let len = vars.currSprite_indexes.length;
		for(let i=0; i<len; i+=1){
			// Get this sprite as-is.
			let checking_sprite;
			if(type=="DIR"){
				checking_sprite = {
					"x" : core.GRAPHICS.sprites[ vars.currSprite_indexes[i] ].x,
					"y" : core.GRAPHICS.sprites[ vars.currSprite_indexes[i] ].y,
					"w" : core.SETTINGS.TILE_WIDTH                             ,
					"h" : core.SETTINGS.TILE_HEIGHT                            ,
				};
			}
			// Get the next rotation position for this sprite.
			else if(type=="ROT"){
				let rot_len = game.pieces[ vars.currentPiece ].length;
				let temp_rotationIndex = vars.rotationIndex;

				if(movement=="R_LEFT" ){
					if( temp_rotationIndex == 0         ) { temp_rotationIndex = rot_len-1; }
					else                                  { temp_rotationIndex --;          }
				}
				else if(movement=="R_RIGHT"){
					if( temp_rotationIndex == rot_len-1 ) { temp_rotationIndex = 0;         }
					else                                  { temp_rotationIndex ++;          }
				}
				else{ console.log("ERROR!"); }

				// BUG HERE???? PIECE CAN ROTATE EVEN IF IT SHOULD NOT???? vars.matrix_x, vars.matrix_y
				let _x = (game.pieces[ vars.currentPiece ][ temp_rotationIndex ][i][0] * core.SETTINGS.TILE_WIDTH ) + ((3+vars.matrix_x  ) * core.SETTINGS.TILE_WIDTH  ); // x;
				let _y = (game.pieces[ vars.currentPiece ][ temp_rotationIndex ][i][1] * core.SETTINGS.TILE_HEIGHT) + (  (vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ); // y;

				// (vars.currentMatrix[i][0] * core.SETTINGS.TILE_WIDTH)  + ((3+vars.matrix_x  ) * core.SETTINGS.TILE_WIDTH  ), // x
				// (vars.currentMatrix[i][1] * core.SETTINGS.TILE_HEIGHT) + (  (vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ), // y

				checking_sprite = {
					"x" : _x                        ,
					"y" : _y                        ,
					"w" : core.SETTINGS.TILE_WIDTH  ,
					"h" : core.SETTINGS.TILE_HEIGHT ,
				};
			}

			// Adjust the sprite location that will be checked.
			switch(movement){
				case "UP"      : { checking_sprite.y -= core.SETTINGS.TILE_HEIGHT; break; }
				case "DOWN"    : { checking_sprite.y += core.SETTINGS.TILE_HEIGHT; break; }
				case "LEFT"    : { checking_sprite.x -= core.SETTINGS.TILE_WIDTH ; break; }
				case "RIGHT"   : { checking_sprite.x += core.SETTINGS.TILE_WIDTH ; break; }
				case "R_LEFT"  : { break; }
				case "R_RIGHT" : { break; }
				default        : { return; break; }
			};

			// Determine the x, y for the bg tile based on the checking_sprite.
			let checking_bgtile = {
				// Get the pixel coords for the tile.
				"x" : parseInt((checking_sprite.x / core.SETTINGS.TILE_WIDTH ) * core.SETTINGS.TILE_WIDTH , 10),
				"y" : parseInt((checking_sprite.y / core.SETTINGS.TILE_HEIGHT) * core.SETTINGS.TILE_HEIGHT, 10),

				// Get the tile grid coords for the tile.
				"xT" : parseInt((checking_sprite.x / core.SETTINGS.TILE_WIDTH ), 10),
				"yT" : parseInt((checking_sprite.y / core.SETTINGS.TILE_HEIGHT), 10),

				"w" : core.SETTINGS.TILE_WIDTH                             ,
				"h" : core.SETTINGS.TILE_HEIGHT                            ,
			};

			let fullOverlap = ( (checking_sprite.x == checking_bgtile.x) && (checking_sprite.y == checking_bgtile.y) ? true : false );

			// Perform the easier collision detection?
			let bg_tileId = core.GRAPHICS.VRAM1[ (core.SETTINGS.VRAM_TILES_H * checking_bgtile.yT) + checking_bgtile.xT ];

			if(fullOverlap && game.solidBg1Tiles.indexOf(bg_tileId) != -1){
				// We have an exact overlap. And the bg_tileId is a solid tile.
				// The draw must be denied.

				// console.log("Cannot draw");
				return false; // CanNOT draw.
			}

		}

		// Getting here means there were no blocking collisions. Return true.

		// console.log("CAN draw");
		return true;
	},
	//
	drawCurrentPiece      : function(){
		let gs    = this;
		let vars  = gs.vars;

		core.FUNCS.graphics.clearSprites();

		// Draw the matrix.
		let spriteNum=0;
		// core.FUNCS.graphics.MapSprite2(
		// 	spriteNum,
		// 	core.ASSETS.graphics.tilemaps["TESTMATRIX5_5"] ,
		// 	0 | core.CONSTS["SPRITE_BANK0"]
		// );
		// core.FUNCS.graphics.MoveSprite(
		// 	spriteNum,
		// 	((vars.matrix_x+3) * core.SETTINGS.TILE_WIDTH  ), // x
		// 	((vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ), // y
		// 	core.ASSETS.graphics.tilemaps["TESTMATRIX5_5"][0],
		// 	core.ASSETS.graphics.tilemaps["TESTMATRIX5_5"][1]
		// );
		// spriteNum+=(5*5);

		vars.currSprite_indexes = [];

		// Draw 4 sprites (each block always has 4 sprites.)
		for(let i=0; i<4; i+=1){
			core.FUNCS.graphics.MapSprite2(
				spriteNum,
				core.ASSETS.graphics.tilemaps[vars.currentMap],
				0 | core.CONSTS["SPRITE_BANK0"]
			);

			core.FUNCS.graphics.MoveSprite(
				spriteNum,
				(vars.currentMatrix[i][0] * core.SETTINGS.TILE_WIDTH)  + ((3+vars.matrix_x  ) * core.SETTINGS.TILE_WIDTH  ), // x
				(vars.currentMatrix[i][1] * core.SETTINGS.TILE_HEIGHT) + (  (vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ), // y
				core.ASSETS.graphics.tilemaps[vars.currentMap][0],
				core.ASSETS.graphics.tilemaps[vars.currentMap][1]
			);

			vars.currSprite_indexes.push(spriteNum);
			spriteNum+=1;
		}

	},
	//
	rotatePiece           : function(dir){
		let gs   = this;
		let vars = gs.vars;

		let len = vars.currentMatrix.length;

		// Update the rotationIndex.
		if(dir=="R_LEFT" ){
			if( vars.rotationIndex == 0 ) { vars.rotationIndex = len-1; }
			else                          { vars.rotationIndex --;      }
		}
		else if(dir=="R_RIGHT"){
			if( vars.rotationIndex == len-1 ) { vars.rotationIndex = 0; }
			else                              { vars.rotationIndex ++;  }
		}

		// Update the currentMatrix.
		vars.currentMatrix = game.pieces[ vars.currentPiece ][ vars.rotationIndex ];
	},
};
// (TODO) ---- HIGH SCORE ENTRY SCREEN
game.gs.ENTER_HIGH_SCORE = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		vars.END = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// (TODO) ---- HIGH SCORE ENTRY SCREEN

// *** TEMPLATE GAMESTATE FUNCTION ***

// GAMESTATE TEMPLATE
game.gs.TEMPLATE = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		vars.END = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
