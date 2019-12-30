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