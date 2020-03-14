// (TODO) ---- SETUP FOR: MUSIC, GAME TYPE, LEVEL, HEIGHT.

'use strict';

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

		_CFG.clearSprites();
		_CFG.ClearVram();

		//
		vars.menus = {
			"game"   : {
				"MENU":{"mx":2,"my":5,"mw":11,"mh":7,"menu":game.SHARED.menuStyle1},
				"TITLE": { "text":"GAME TYPE", "x":1,"y":1 },
				"CURSOR":"cursor1",
				"OPTIONS"    : [
					{"cx":2,"cy":3,  "text":"A", "tx":4,"ty":3},
					{"cx":6,"cy":3,  "text":"B", "tx":8,"ty":3},
				]
			},
			"music"  : {
				"MENU":{"mx":13,"my":5,"mw":13,"mh":7,"menu":game.SHARED.menuStyle1},
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
				"MENU":{"mx":2,"my":12,"mw":22,"mh":7,"menu":game.SHARED.menuStyle1},
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
				"MENU":{"mx":2,"my":19,"mw":14,"mh":7,"menu":game.SHARED.menuStyle1},
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
		vars.currentMenuKey = "game";
		//
		vars.menuSettings = {
			"game"  : {"option":0, "len":vars.menus["game"]  .OPTIONS.length},
			"music" : {"option":1, "len":vars.menus["music"] .OPTIONS.length},
			"level" : {"option":0, "len":vars.menus["level"] .OPTIONS.length},
			"height": {"option":0, "len":vars.menus["height"].OPTIONS.length},
		};
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
		vars.blacktile    = core.ASSETS.graphics.tilemaps["blacktile"][2];

		// Music choices.
		vars.music = [
			"TETRIS_A_THEME_MID",
			"TETRIS_B_THEME_MID",
			"TETRIS_C_THEME_MID",
			"",
		];

		// Holds the indexs for the cursor sprites.
		vars.currSprite_indexes = {};

		// Indicates completion.
		vars.END = false;
		vars.configComplete=false;

		// Blink speed/delay
		vars.blinkState     = false;
		vars.blinkSpeed     = game.secondsToFrames(0.50);
		vars.blinkSpeed_cnt = 0 ;
	},

	//
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Draw the border around the screen.
		game.SHARED.drawMenu_box(0, 0, _CS.VRAM_TILES_H, _CS.VRAM_TILES_V, game.SHARED.menuStyle1, vars.empty_square);

		// Draw the main menu title and box.
		let x_mainmenu    = 2;
		let y_mainmenu    = 2;
		game.SHARED.drawMenu_box(x_mainmenu-1, y_mainmenu-1, 26, 3, game.SHARED.menuStyle1, vars.blacktile);
		let text_mainmenu = "-MAIN MENU - ONE PLAYER-";
		_CFG.Print(x_mainmenu, y_mainmenu, text_mainmenu, "VRAM2");

		// Draw the menus.
		game.SHARED.drawMenus(gs);

		//
		game.SHARED.blink_menu(vars.currentMenuKey , "ON", gs);

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
		if(!vars.init){ vars.init=true; gs.init(); return; }

		// Run.
		if(vars.init){
			// Are we done?
			if(vars.configComplete){ gs.configComplete(); return; }

			// Handle user input.
			else{
				// Handle cursor movements.
				if     ( game.chkBtn("BTN_DOWN"   , "btnPressed1") || game.chkBtn("BTN_RIGHT"   , "btnPressed1") ){
					// In bounds?
					if(! (vars.menuSettings[vars.currentMenuKey].option==vars.menuSettings[vars.currentMenuKey].len-1)){
						// Adjust the option index.
						vars.menuSettings[vars.currentMenuKey].option+=1;

						// Adjust the menu cursor and some other things.
						gs.menuCursorChange();
					}
				}

				else if( game.chkBtn("BTN_UP" , "btnPressed1") || game.chkBtn("BTN_LEFT"   , "btnPressed1") ){
					// In bounds?
					if(! (vars.menuSettings[vars.currentMenuKey].option==0)){
						// Adjust the option index.
						vars.menuSettings[vars.currentMenuKey].option-=1;

						// Adjust the menu cursor and some other things.
						gs.menuCursorChange();
					}
				}

				// Pressed A? (confirm)
				else if( game.chkBtn("BTN_A"    , "btnPressed1") ){
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

					game.SHARED.changeCursorState(vars.currentMenuKey, "ON", gs);

				}

				// Pressed B? (go back)
				else if( game.chkBtn("BTN_B"    , "btnPressed1") ){
					switch(vars.currentMenuKey){
						case "game"   : { game.setGamestate1("SETUP1", true); vars.END=true; return;        break; }
						case "music"  : { vars.currentMenuKey="game"        ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						case "level"  : { vars.currentMenuKey="music"       ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						case "height" : { vars.currentMenuKey="level"       ; vars.blinkState=true; vars.blinkSpeed_cnt = vars.blinkSpeed ; break; }
						default : { break; }
					}

					game.SHARED.changeCursorState(vars.currentMenuKey, "ON",gs);
				}

				// Handle the blinking indicator.
				if(vars.blinkSpeed_cnt >= vars.blinkSpeed){
					if(vars.blinkState){ game.SHARED.blink_menu(vars.currentMenuKey , "ON" , gs); }
					else               { game.SHARED.blink_menu(vars.currentMenuKey , "OFF", gs); }
					vars.blinkState = !vars.blinkState;
					vars.blinkSpeed_cnt=0;
				}
				else{ vars.blinkSpeed_cnt += 1; }

			}

		}
	},

	// *** SUPPORT FUNCTIONS ***

	// Saves the settings and starts the game.
	configComplete : function(){
		let gs    = this;
		let vars  = gs.vars;

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

		vars.END=true;

		// Start game!
		if(game.gs.PLAY.temp.type=="A"){
			// Set height.
			game.gs.PLAY.temp.height = 0 ;

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

		return;
	},

	// Used when the cursor moves within a menu.
	menuCursorChange : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Update the cursor position.
		game.SHARED.changeCursorState(vars.currentMenuKey, "ON",gs);

		// If on the "music" key change the song.
		if(vars.currentMenuKey=="music"){ gs.changeSong(); }

		// If on the "game" key change the height visibility.
		if(vars.currentMenuKey=="game"){
			if( vars.menuSettings[vars.currentMenuKey].option == 0 ){ game.SHARED.drawMenu("height", "OFF", gs); }
			else                                                    { game.SHARED.drawMenu("height", "ON" , gs); }
		}

		// Play the cursor move sound.
		core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);
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