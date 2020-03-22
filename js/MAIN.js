// *** SHARED GAME VARIABLES ***

'use strict';

game.SHARED = {
	// These are the tiles that are considered "solid". (populated via populate.)
	solidBg1Tiles : [],

	populate : function(){
		let populate_menuStyles = function(){
			game.SHARED.menuStyle1 = {
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
		};
		let populate_solidBg1Tiles = function(){
			// Used to populate game.solidBgTiles.
			let solidBg1Tilemaps = [
				// Background Tetris pieces.
				"T_bgtile"        , // 1 tile.
				"J_bgtile"        , // 1 tile.
				"Z_bgtile"        , // 1 tile.
				"O_bgtile"        , // 1 tile.
				"S_bgtile"        , // 1 tile.
				"L_bgtile"        , // 1 tile.
				"I_bgtile"        , // 1 tile.
				"boardborder_ALL" , // 8 tiles.
			];
			let skipTheseTiles = [
				core.ASSETS.graphics.tilemaps[ "boardborder_top"   ][2],
			];
			// Clear
			game.solidBg1Tiles    = [];

			// Set multi-tile tilemaps.
			let len = solidBg1Tilemaps.length;
			for(let i=0; i<len; i+=1){
				let mapKey = solidBg1Tilemaps[i];
				let map = core.ASSETS.graphics.tilemaps[ mapKey ];
				let width  = map[0];
				let height = map[1];
				let numTiles = width*height;

				// Populate game.solidBg1Tiles.
				for(let ii=0; ii<numTiles; ii+=1){
					let tileid = map[ii+2];

					// Is this a skipped tile?
					if(skipTheseTiles.indexOf(tileid) == -1){
						// Is this a solid tile?
						if(game.SHARED.solidBg1Tiles.indexOf(tileid) == -1){
							// Add the tile to the list.
							game.SHARED.solidBg1Tiles.push( tileid );
						}
					}
				}
			}

			// console.log("game.solidBg1Tiles:", game.solidBg1Tiles);

		};

		populate_solidBg1Tiles();
		populate_menuStyles();

		// *** MENU FUNCTIONS ***

		// Get all the settings for the specified menu key.
		game.SHARED.getMenuData = function(key, gs){
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
			let cursor_x       = (OPTIONS[ selectedIndex ].cx+mx) * _CS.TILE_WIDTH  ;
			let cursor_y       = (OPTIONS[ selectedIndex ].cy+my) * _CS.TILE_HEIGHT ;
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
			};
		};
		// Draws the menu box itself.
		game.SHARED.drawMenu_box = function(mx, my, mw, mh, style, fillTile ){
			let menuTiles = style.tiles;
			let menuKeys  = style.keys;

			// Fill it (inside)
			if(fillTile != null){ _CFG.Fill(mx, my, mw, mh, fillTile, "VRAM1"); }

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

					_CFG.SetTile(x+mx, y+my, tileid, "VRAM1");
				}
			}

		};
		// Show/hide menu, text, and cursor.
		game.SHARED.drawMenu = function(which, newState, gs){
			let vars  = gs.vars;

			let data = game.SHARED.getMenuData(which,gs);

			if(newState=="ON") {
				// Update the visibility flag for this menu.
				vars.menu_visibility[which]=true;

				let fillTile = vars.bg1_tile     ;

				// Draw the menu box.
				game.SHARED.drawMenu_box(
					data.mx        ,
					data.my        ,
					data.mw        ,
					data.mh        ,
					data.MENU.menu ,
					fillTile
				);

				// Print the title text.
				_CFG.Print(data.title_x+data.mx, data.title_y+data.my , data.title_text, "VRAM2");

				// Print the options text.
				for(let i2=0; i2<data.OPTIONS.length; i2+=1){
					let option = data.OPTIONS[i2];
					let text = option.text;
					let tx   = option.tx + data.mx ;
					let ty   = option.ty + data.my ;
					_CFG.Print(tx, ty , text, "VRAM2");
				}

				// Show the sprite for this menu.
				game.SHARED.changeCursorState(which, newState, gs);
			}
			if(newState=="OFF"){
				// Update the visibility flag for this menu.
				vars.menu_visibility[which]=false;

				// Which tile will we draw with?
				let tileid = vars.empty_square;

				// Clear this portion of VRAM1.
				_CFG.Fill(data.mx, data.my, data.mw, data.mh, tileid, "VRAM1");

				// Clear this portion of VRAM2.
				_CFG.Fill(data.mx, data.my, data.mw, data.mh, 0     , "VRAM2");

				// Hide the sprite for this menu.
				game.SHARED.changeCursorState(which, newState, gs);
			}
			else{ return; }

		};
		// Does the initial menu draw (all menus.)
		game.SHARED.drawMenus = function(gs){
			let vars  = gs.vars;

			// Make sure that menu_keys exists.
			if(!vars.menu_keys){
				// console.log("menu_keys was not defined.");
				return;
			}

			// Draw the menus.
			let spriteNum=0;
			vars.currSprite_indexes = {};
			for(let i=0; i<vars.menu_keys.length; i+=1){
				// Get the core values.
				let key            = vars.menu_keys[i];
				let data = game.SHARED.getMenuData(key, gs);

				// Set bank and also SPRITE_OFF.
				let flags = _CC["SPRITE_OFF"] | _CC["SPRITE_BANK0"] ;

				// Map/Move the sprites.
				_CFG.MapSprite2( spriteNum, data.cursor_tilemap, flags );
				_CFG.MoveSprite( spriteNum, data.cursor_x+(data.mx*_CS.TILE_WIDTH) , data.cursor_y+(data.my*_CS.TILE_HEIGHT) , data.cursor_width, data.cursor_height );

				// Set the cursor sprite numbers.
				vars.currSprite_indexes[key]=spriteNum;
				spriteNum+=(data.cursor_width*data.cursor_height);

				// Draw the menu text.

				if(vars.menu_visibility[data.key]==true){ game.SHARED.drawMenu(data.key, "ON" , gs ); }
				else                                    { game.SHARED.drawMenu(data.key, "OFF", gs ); }
			}


		};
		// Turns the highlighting for all menus off.
		game.SHARED.blink_menus_allOff = function(gs){
			let vars  = gs.vars;

			// Force to off state (clears previous.)
			let data;
			let arrs = vars.menu_keys;
			for(let i=0; i<arrs.length; i+=1){
				let key = arrs[i];
				data = game.SHARED.getMenuData(key,gs);

				if(vars.menu_visibility[key]==true){
					_CFG.Fill(data.mx+1, data.my+1, data.mw-2, data.mh-2, vars.bg1_tile, "VRAM1");
				}
				else{
				}
			}
		};
		// Turns the highlighting for a specific menu either on or off.
		game.SHARED.blink_menu = function( which, state, gs ){
			let vars  = gs.vars;

			// Force to off state (clears previous.)
			game.SHARED.blink_menus_allOff(gs);

			let tileid;

			let data = game.SHARED.getMenuData(which,gs);

			if     (state=="ON" ){ tileid = vars.bg2_tile; }
			else if(state=="OFF"){ tileid = vars.bg1_tile; }

			_CFG.Fill(data.mx+1, data.my+1, data.mw-2, data.mh-2, tileid, "VRAM1");
		};
		// Show/hides the specified cursor.
		game.SHARED.changeCursorState = function(which, newState, gs){
			let vars  = gs.vars;

			// Get the spriteNum, flags.
			let spriteNum = vars.currSprite_indexes[which];
			let flags;
			try{
				flags = _CG.sprites[spriteNum].flags;
			}
			catch(e){
				console.log("Invalid sprite data.", which, newState, vars.currSprite_indexes);
				return;
			}

			let data = game.SHARED.getMenuData(which,gs);

			// Adjust flags.
			if     (newState=="ON") { flags &= ~( _CC["SPRITE_OFF"] ); } // Clear the bit.
			else if(newState=="OFF"){ flags |=  ( _CC["SPRITE_OFF"] ); } // Set the bit.
			else                    { return; }

			// Update the sprite.
			_CFG.MapSprite2( spriteNum, data.cursor_tilemap, flags );
			_CFG.MoveSprite( spriteNum, data.cursor_x, data.cursor_y , data.cursor_width, data.cursor_height );
		};
	},
};

// Tetriminos Matrixes and rotations.
game.pieces = {
	"T" : [
		[ [1,2],[2,2],[3,2],[2,1] ], // T up
		[ [2,1],[2,2],[3,2],[2,3] ], // T right
		[ [1,2],[2,2],[3,2],[2,3] ], // T down (spawn)
		[ [2,1],[1,2],[2,2],[2,3] ]  // T left
	] ,
	"J" : [
		[ [2,1],[2,2],[1,3],[2,3] ], // J left
		[ [1,1],[1,2],[2,2],[3,2] ], // J up
		[ [2,1],[3,1],[2,2],[2,3] ], // J right
		[ [1,2],[2,2],[3,2],[3,3] ]  // J down (SPAWN)
	] ,
	"Z" : [
		[ [1,2],[2,2],[2,3],[3,3] ], // Z horizontal (spawn)
		[ [3,1],[2,2],[3,2],[2,3] ], // Z vertical
		[ [1,2],[2,2],[2,3],[3,3] ], // Z horizontal ** DUPE
		[ [3,1],[2,2],[3,2],[2,3] ]  // Z vertical   ** DUPE
	] ,
	"O" : [
		[ [1,2],[2,2],[1,3],[2,3] ], // O (SPAWN)
		[ [1,2],[2,2],[1,3],[2,3] ], // O ** DUPE
		[ [1,2],[2,2],[1,3],[2,3] ], // O ** DUPE
		[ [1,2],[2,2],[1,3],[2,3] ]  // O ** DUPE
	] ,
	"S" : [
		[ [2,2],[3,2],[1,3],[2,3] ], // S horizontal (SPAWN)
		[ [2,1],[2,2],[3,2],[3,3] ], // S vertical
		[ [2,2],[3,2],[1,3],[2,3] ], // S horizontal ** DUPE
		[ [2,1],[2,2],[3,2],[3,3] ]  // S vertical   ** DUPE
	] ,
	"L" : [
		[ [2,1],[2,2],[2,3],[3,3] ], // L right
		[ [1,2],[2,2],[3,2],[1,3] ], // L down (SPAWN)
		[ [1,1],[2,1],[2,2],[2,3] ], // L left
		[ [3,1],[1,2],[2,2],[3,2] ]  // L up
	] ,
	"I" : [
		[ [2,0],[2,1],[2,2],[2,3] ], // I vertical
		[ [0,2],[1,2],[2,2],[3,2] ], // I horizontal (SPAWN)
		[ [2,0],[2,1],[2,2],[2,3] ], // I vertical   ** DUPE
		[ [0,2],[1,2],[2,2],[3,2] ]  // I horizontal ** DUPE
	]
};

// Each piece when spawned has a default rotation index.
game.pieces_spawnIndexes = { "T" : 2, "J" : 3, "Z" : 0, "O" : 0, "S" : 0, "L" : 1, "I" : 1, };

// Will hold variables that are meant to be shared across the application.
game.gamestate       = "" ;
game.gamestate_prev  = "" ;
game.gamestate2      = "" ;
game.gamestate2_prev = "" ;

// Keeps track of the logical processing timings.
game.logic_timings = [0,0,0,0,0];

// Whole image graphics processor(s).
// game.graphicsPostProcessor_shake = function(ctx){
// 	return new Promise(function(res,rej){
// 		res(ctx);
// 	});
// };

// Run one time at game load. Configures game assets (graphics, sound.)
game.runOnce = function(){
	return new Promise(function(resolve,reject){
		// These functions may run async.
		let proms1 = [];

		// Graphics and audio setup.
		proms1.push( _CFG.init() ) ; // Comes from the selected video kernel.
		proms1.push( core.FUNCS.audio   .init() ) ; // Comes from the selected sound kernel.

		// When the above promises have been completed...
		Promise.all(proms1).then(
			function(){
				// Populate the SHARED data for the game.
				game.SHARED.populate();

				// Whole image graphics processors.
				// core.EXTERNAL.GRAPHICS = game.graphicsPostProcessor_shake ;

				// Remove the initial graphics assets since they will not be needed again.
				delete core.ASSETS.graphics.tiles ;
				delete core.ASSETS.graphics.ramtiles;

				// Remove these functions since they will not be needed again.
				delete _CFG.init ;
				delete core.FUNCS.audio.init    ;

				// Remove the population function since it is only needed once.
				delete game.SHARED.populate;

				// Remove these functions since they will not be needed again.
				delete game.runOnce ;

				// *** DEBUG ***
				if(JSGAME.FLAGS.debug && game.DEBUG.init){
					//
					game.DEBUG.init();

					// Combine all the core objects into one.
					app = {
						"JSGAME" : JSGAME ,
						"core"   : core   ,
						"game"   : game   ,
					};
				}

				// Resolve the promise and allow the program to continue.
				resolve();
			},
			function(err){ console.log("ERROR: runOnce: ", err);  }
		);

	});
};
// Game setup and first game loop.
game.firstLoop = function(){
	return new Promise(function(resolve,reject){
		// Make sure any sounds have been stopped.
		core.FUNCS.audio.stopAllSounds_midi();
		core.FUNCS.audio.cancelAllSounds_mp3("all");

		// *** Adjust game canvas dimensions ***

		JSGAME.DOM["canvasScaleSlider"].value = JSGAME.PRELOAD.gamesettings_json.canvas_scaleFactor;
		JSGAME.SHARED.canvasResize( JSGAME.DOM["canvasScaleSlider"].value );

		// *** Aliases for JSGAME.SHARED functions ***

		game.chkBtn               = JSGAME.SHARED.checkButton          ; //
		game.buttons              = JSGAME.SHARED.buttons              ; //
		game.secondsToFrames      = JSGAME.SHARED.secondsToFrames      ; //
		game.getRandomInt_inRange = JSGAME.SHARED.getRandomInt_inRange ; //

		// *** TIMING ***

		// https://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
		JSGAME.SHARED.timing.adjust( _CS.fps );

		// *** VRAM ***

		// VRAM1 - SET INITIAL TILESET.
		_CFG.SetTileTable("tilesBG1", "BG");
		_CFG.SetTileTable("tilesBG1", "BG2");

		// VRAM2 - SET INTITAL FONT.
		_CFG.SetFont("fonts1"); // White
		// _CFG.SetFont("fonts2"); // Dark gray.

		// *** AUDIO ***

		// Set the volume.
		core.FUNCS.audio.changeMasterVolume(75);

		// Set the volume:
		if( JSGAME.PRELOAD.PHP_VARS.mastervol != undefined)       {
			// Set the volume (within range.)
			if( !isNaN( JSGAME.PRELOAD.PHP_VARS.mastervol ) ){
				core.FUNCS.audio.changeMasterVolume( Math.min(Math.max(JSGAME.PRELOAD.PHP_VARS.mastervol, 0), 100) );
			}
		}

		// *** SPRITES ***

		_CFG.SetSpritesTileBank(0, "tilesSP1"); // SPRITE_BANK0
		_CFG.SetSpritesTileBank(1, "tilesBG1"); // SPRITE_BANK1
		_CFG.SetSpritesTileBank(2, "tilesTX1"); // SPRITE_BANK2
		// _CFG.SetSpritesTileBank(3, "");         // SPRITE_BANK3

		// *** GAMESTATES RESET ***

		// Prepare all gamestates (resetting them to default values.)
		let gamestates = Object.keys(game.gs);
		gamestates.forEach(function(d){ game.gs[d].vars = {}; });

		// CLEAR ALL CANVASES AND GRAPHICS ARRAYS.
		_CFG.clearAllCanvases();

		// _CFG.update_allLayers();

		// Resolve this since we are done.
		setTimeout(
			function(){
				// Blank the screen.
				let outputCanvasCtx = _CG["ctx"].OUTPUT;
				outputCanvasCtx.fillStyle = "#000";
				outputCanvasCtx.fillRect(0, 0, outputCanvasCtx.canvas.width, outputCanvasCtx.canvas.height);

				resolve(
					function(){
						// CLEAR ALL CANVASES AND GRAPHICS ARRAYS.
						_CFG.clearAllCanvases();

						// Again, make sure the output is is clear.
						outputCanvasCtx.fillRect(0, 0, outputCanvasCtx.canvas.width, outputCanvasCtx.canvas.height);

						// Play the game start sound.
						core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);

						// Set the gameReady flag to true.
						JSGAME.FLAGS.gameReady=true;

						// *** REQUEST FIRST GAME LOOP ***
						// JSGAME.SHARED.raf_id = requestAnimationFrame( game.gameloop );

						// *** GAMESTATE ***

						if(!JSGAME.FLAGS.debug){
							game.setGamestate1("TITLE0"          , true); // Init screen
						}
						else{
							game.setGamestate1("TITLE0"          , true); // Init screen
							// game.setGamestate1("TITLE1"          , true); // Copyright screen.
							// game.setGamestate1("TITLE2"          , true); // Title screen.
							// game.setGamestate1("SETUP1"          , true); // Setup screen 1
							// game.setGamestate1("SETUP2"          , true); // Setup screen 2
							// game.setGamestate1("PLAY"            , true); // Main game.
							// game.setGamestate1("ENTER_HIGH_SCORE", true); // End of game, high score entry.
						}

						console.log("JSGAME TETRIS - STARTED");
					}
				);
			},
			125
		);

	});
};

// *** GAME STATE FUNCTIONS ***

// Updates game.gamestate and game.gamestate_prev.
game.setGamestate1 = function(newState, prepare){
	// Stop whatever might be running.
	window.cancelAnimationFrame( JSGAME.SHARED.raf_id );
	JSGAME.SHARED.raf_id=null;

	// Start it again.
	JSGAME.SHARED.raf_id=requestAnimationFrame(game.gameloop);

	// Save previous gamestate1
	game.gamestate_prev  = game.gamestate ;

	// Set the new gamestate1
	game.gamestate       = newState ;

	// Was a prepare requested?
	if(prepare){
		game.gs[game.gamestate].prepareState();
	}
};
// Updates game.gamestate2 and game.gamestate2_prev.
game.setGamestate2 = function(newState, prepare){
	// Stop whatever might be running.
	window.cancelAnimationFrame( JSGAME.SHARED.raf_id );
	JSGAME.SHARED.raf_id=null;

	// Start it again.
	JSGAME.SHARED.raf_id=requestAnimationFrame(game.gameloop);

	// Save previous gamestate1
	game.gamestate2_prev = game.gamestate2 ;

	// Set the new gamestate1
	game.gamestate2      = newState ;

	// Was a prepare requested?
	// if(prepare){
		// 	game.gs[game.gamestate].prepareState();
		// }
};
// Run prepareState on all gamestates then run the firstLoop again.
game.game_full_restart = function(){
	// Stop whatever might be running.
	window.cancelAnimationFrame( JSGAME.SHARED.raf_id );
	JSGAME.SHARED.raf_id=null;

	// Blank the screen.
	let outputCanvasCtx = _CG["ctx"].OUTPUT;
	outputCanvasCtx.fillStyle = "#BB3";
	outputCanvasCtx.fillRect(0, 0, outputCanvasCtx.canvas.width, outputCanvasCtx.canvas.height);

	// Set the gameReady flag to false.
	JSGAME.FLAGS.gameReady=false;

	setTimeout(function(){
		// Stop sounds.
		core.FUNCS.audio.stopAllSounds_midi();
		core.FUNCS.audio.cancelAllSounds_mp3("all");

		// Wait a short time for whatever may have been active before cancel.
		setTimeout(function(){
			game.firstLoop().then(
				function(func){ func(); },
				function(err) { console.log("ERR:", err); }
			);
			}, 125);
		}, 125);

	};

// *** LOW-LEVEL GAME FUNCTIONS ***

//
game.loop = function(){
	// Debug: Performance check.
	let logic_start;
	if(JSGAME.FLAGS.debug){
		logic_start=performance.now();
		game.logic_timings.shift();
	}

	// Should the gameloop run or be skipped?
	if(
		  JSGAME.FLAGS.windowIsFocused       && // Window in focus?
		! _CG.flags.INLAYERUPDATE  && // Not in a graphics update?
		! JSGAME.FLAGS.paused                && // Game NOT paused? (Automatic.)
		! JSGAME.FLAGS.manuallyPaused        && // Game NOT paused? (By user.)
		! _CG.FADER.blocking       && // Fader NOT set to block?
		! _CG.FADER.blockAfterFade && // Fade done but set to block logic?
		  JSGAME.FLAGS.gameReady                // Game is ready.
	){
		// *** Get inputs ***

		// JSGAME.SHARED.getUserInputs( game.buttons );
		JSGAME.SHARED.getUserInputs();

		// *** Run the current game state. ***

		game.stateManager();
	}
	else{
		// Game logic is paused.
	}

	// Debug: Performance check.
	if(JSGAME.FLAGS.debug){
		game.logic_timings.pop();
		game.logic_timings.push(performance.now()-logic_start);
	}

	// *** Output any graphical changes to the canvas. ***

	_CFG.update_allLayers();
};
//
game.gameloop = function(timestamp){

	// *** Update the timing data. ***

	// JSGAME.SHARED.timing.now   = performance.now();
	JSGAME.SHARED.timing.now   = timestamp;
	JSGAME.SHARED.timing.delta = JSGAME.SHARED.timing.now - JSGAME.SHARED.timing._then;

	// *** Does the gameloop run this time? ***

	if (JSGAME.SHARED.timing.delta >= JSGAME.SHARED.timing.interval) {

		// *** Update the timing data. ***

		JSGAME.SHARED.timing._then = JSGAME.SHARED.timing.now - (JSGAME.SHARED.timing.delta % JSGAME.SHARED.timing.interval);

		// *** Update the effective average framerate. (Can be displayed to the user/debug.) ***

		JSGAME.SHARED.fps.tick();

		// Updates the logic and the graphics.
		game.loop();
	}
	else{
		// *** DEBUG ***

		if(JSGAME.FLAGS.debug){
			// Control how often the debug display is updated.
			// NOTE: Time includes the last frame drawn.
			let last                       = game.DEBUG.VALS.lastDebugDisplay           ;
			let timeSince                  = performance.now() - last                   ;
			let secondsToWait_debugDisplay = game.DEBUG.VALS.secondsToWait_debugDisplay ;

			// Update the debug display?
			if(timeSince >= (JSGAME.SHARED.timing.interval * _CS.fps) * secondsToWait_debugDisplay ){
				game.DEBUG.updateDebugDisplay();
				game.DEBUG.VALS.lastDebugDisplay=performance.now();
			}
		}

		// Networking?
		//
	}

	// *** Game loop. (Run this function again.) ***

	JSGAME.SHARED.raf_id = requestAnimationFrame( game.gameloop );

};
//
game.stateManager = function(){
	// Run the main function for the gamestate (if it exists.)
	if(game.gs[game.gamestate]){ game.gs[game.gamestate].main(); }

	// Error!
	else{
		let str = "Invalid game.gamestate !";
		console.log(str, game.gamestate);
		throw str + " " + game.gamestate;
	}
};

// *** SHARED ***

