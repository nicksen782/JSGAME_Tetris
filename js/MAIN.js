// *** SHARED GAME VARIABLES ***

// Will hold each individual game state.
game.gs = {};

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

// These are the tiles that are considered "solid".
// populated by the game.firstLoop function.
game.solidBg1Tiles    = [];

// The game board is 22 by 10 where the top 2 rows are not visible.
// Created by the game reset function.
// game.playBoard=[];

// Holds the button states for the game.
game.buttons = {
	btnPrev1 : 0 , btnHeld1 : 0 , btnPressed1 : 0 , btnReleased1 : 0 ,
	btnPrev2 : 0 , btnHeld2 : 0 , btnPressed2 : 0 , btnReleased2 : 0 ,
};

// Will hold variables that are meant to be shared across the application.
game.gamestate       = "" ;
game.gamestate_prev  = "" ;
game.gamestate2      = "" ;
game.gamestate2_prev = "" ;

// Keeps track of the logical processing timings.
game.logic_timings = [0,0,0,0,0];

// Run one time at game load. Configures game assets (graphics, sound.)
game.runOnce = function(){
	return new Promise(function(resolve,reject){
		// These functions may run async.
		let proms1 = [
			core.FUNCS.graphics.init(), // Comes from the selected video kernel.
			core.FUNCS.audio   .init(), // Comes from the selected sound kernel.
		];

		Promise.all(proms1).then(function(){
			// *** DEBUG ***

			if(JSGAME.SHARED.debug && game.DEBUG.init){ game.DEBUG.init(); }

			// DEBUG ONLY: Combine all the core objects into one.
			app = {
				"JSGAME" : JSGAME ,
				"core"   : core   ,
				"game"   : game   ,
			};

			// Remove the initial graphics assets since they will not be needed again.
			delete core.ASSETS.graphics.tiles ;
			delete core.ASSETS.graphics.ramtiles

			// Remove these functions since they will not be needed again.
			delete core.FUNCS.graphics.init ;
			delete core.FUNCS.audio.init    ;

			// Remove these functions since they will not be needed again.
			delete game.runOnce ;

			// Resolve the promise and allow the program to continue.
			resolve();
		});

	});
};
// Game setup and first game loop.
game.firstLoop = function(){
	return new Promise(function(resolve,reject){
		// *** Adjust game canvas dimensions ***

		JSGAME.DOM["canvasScaleSlider"].value = JSGAME.PRELOAD.gamesettings_json.canvas_scaleFactor;
		JSGAME.SHARED.canvasResize( JSGAME.DOM["canvasScaleSlider"].value );

		// *** Aliases ***

		game.chkBtn=JSGAME.SHARED.checkButton; // Alias the JSGAME.SHARED.checkButton function.

		// *** TIMING ***

		// https://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
		JSGAME.SHARED.timing.adjust( core.SETTINGS.fps );

		// *** VRAM ***

		// VRAM1 - TILESET AND CLEAR.
		core.FUNCS.graphics.SetTileTable("tilesBG1");

		// POPULATE solidBg1Tiles.
		let populate_solidBg1Tiles = function(){
			// Used to populate game.solidBgTiles.
			let solidBg1Tilemaps = [
				// Background Tetris pieces.
				"T_bgtile" , // 1 tile.
				"J_bgtile" , // 1 tile.
				"Z_bgtile" , // 1 tile.
				"O_bgtile" , // 1 tile.
				"S_bgtile" , // 1 tile.
				"L_bgtile" , // 1 tile.
				"I_bgtile" , // 1 tile.

				// Border for the game grid.
				"boardborder", // 8 tiles
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
				for(let ii=0; ii<numTiles; ii+=1){
					let tileid = map[ii+2];
					if(game.solidBg1Tiles.indexOf(tileid) == -1){
						game.solidBg1Tiles.push( tileid );
					}
				}
			}

		};
		populate_solidBg1Tiles();

		// VRAM2 - FONTS
		core.FUNCS.graphics.SetFont("fonts1"); // White
		// core.FUNCS.graphics.SetFont("fonts2"); // Dark gray.

		// Make sure all canvases are cleared.
		core.FUNCS.graphics.clearAllCanvases();
		core.FUNCS.graphics.update_allLayers();

		// *** AUDIO ***

		// Set the volume.
		core.FUNCS.audio.changeMasterVolume(75);

		// *** SPRITES ***

		core.FUNCS.graphics.SetSpritesTileBank(0, "tilesSP1"); // SPRITE_BANK0
		core.FUNCS.graphics.SetSpritesTileBank(1, "tilesBG1"); // SPRITE_BANK1
		core.FUNCS.graphics.SetSpritesTileBank(2, "tilesTX1"); // SPRITE_BANK2
		// core.FUNCS.graphics.SetSpritesTileBank(3, "");         // SPRITE_BANK3

		// *** GAMESTATE ***

		// Reset all gamestate values (do not run firstLoop)
		game.game_full_restart(false);

		// Set the gamestate.
		game.setGamestate1("TITLE1", true);
		// game.setGamestate1("PLAY_A", true);

		// *** REQUEST FIRST GAME LOOP ***

		// Request the first gameloop iteration.

		resolve();

		setTimeout(function(){
			core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);

			// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["gameboard1"], "VRAM1");
			// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen1"], "VRAM1");
			// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen2"], "VRAM1");
			// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen3"], "VRAM1");
			// core.FUNCS.graphics.Print(0,0, "Look at all the tiles!", "VRAM2");

			JSGAME.FLAGS.gameReady=true;
			JSGAME.SHARED.raf_id = requestAnimationFrame( game.gameloop );

			console.log("GAME STARTED");
		},250);

	});
};

// *** SHARED GAME FUNCTIONS ***

// Updates game.gamestate and game.gamestate_prev.
game.setGamestate1 = function(newState, prepare){
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
game.game_full_restart = function(run_firstLoop){
	// Prepare all gamestates (resetting them to default values.)
	let gamestates = Object.keys(game.gs);
	gamestates.forEach(function(d){ game.gs[d].prepareState(); });

	if(run_firstLoop){
		// Run the game's game.firstLoop function.
		game.firstLoop();
	}
};
// Clears gamestates and changes the game to the title screen.
game.restart = function(){
	// Clear gamestate variables.
	game.gamestate       = "";
	game.gamestate_prev  = "";
	game.gamestate2      = "";
	game.gamestate2_prev = "";

	// Switch to the title screen.
	game.setGamestate1("TITLE1", true);
};
// Get a random integer in the specified range.
game.getRandomInt_inRange = function (min, max) {
	min = (min << 0);
	max = (max << 0);
	return ((Math.random() * (max - min + 1)) + min) << 0;
};


// *** LOW-LEVEL GAME FUNCTIONS ***

//
game.loop = function(){

	// Debug: Performance check.
	let logic_start;
	if(JSGAME.SHARED.debug){
		logic_start=performance.now();
		game.logic_timings.unshift();
	}

	// *** Get inputs ***

	JSGAME.SHARED.getUserInputs( game.buttons );

	// *** Run the current game state. ***

	game.stateManager();

	// ACTORS: Update sprites data arrays?
	if( game.actorsUpdated ){
		game.actorsUpdated=false;

		// Re-write the core.GRAPHICS.sprites array based on data from the actors array.
		//
	}

	// Debug: Performance check.
	if(JSGAME.SHARED.debug){
		game.logic_timings.pop();
		game.logic_timings.push(performance.now()-logic_start);
	}

	// *** Output any graphical changes to the canvas. ***

	core.FUNCS.graphics.update_allLayers();
};
//
game.gameloop = function(timestamp){
	// *** Update the timing data. ***

	JSGAME.SHARED.timing.now   = performance.now();
	// JSGAME.SHARED.timing.now   = timestamp;
	JSGAME.SHARED.timing.delta = JSGAME.SHARED.timing.now - JSGAME.SHARED.timing._then;

	// *** Does the gameloop run this time? ***

	if (JSGAME.SHARED.timing.delta >= JSGAME.SHARED.timing.interval) {

		// *** Update the timing data. ***

		JSGAME.SHARED.timing._then = JSGAME.SHARED.timing.now - (JSGAME.SHARED.timing.delta % JSGAME.SHARED.timing.interval);

		// *** Update the effective average framerate. ***

		JSGAME.SHARED.fps.tick();

		// Should the gameloop run or be skipped?
		if(
			JSGAME.FLAGS.windowIsFocused  &&  // Window not in focus?
			!JSGAME.FLAGS.paused          &&  // Game paused?
			!JSGAME.FLAGS.manuallyPaused      // Game paused?
		){
			game.loop();
		}
		else{
			// console.log("Game is paused.");
		}
	}
	else{
		// *** DEBUG ***

		if(JSGAME.SHARED.debug){
			// Control how often the debug display is updated.
			// NOTE: Time includes the last frame drawn.
			let last = game.DEBUG.VALS.lastDebugDisplay;
			let timeSince = performance.now() - last;
			let secondsToWait_debugDisplay = game.DEBUG.VALS.secondsToWait_debugDisplay;

			// Update the debug display?
			if(timeSince >= (JSGAME.SHARED.timing.interval * core.SETTINGS.fps) * secondsToWait_debugDisplay ){
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

/*
	// core.FUNCS.audio.playSound_mp3("cursorSelect1"    , true, 1.0);
	// core.FUNCS.audio.playSound_mp3("cursorSelect2"    , true, 1.0);
	// core.FUNCS.audio.playSound_mp3("diceRoll1"        , true, 1.0);
	// core.FUNCS.audio.playSound_mp3("diceShake1"       , true, 1.0);
	// core.FUNCS.audio.playSound_mp3("moneyRainDown"    , true, 1.0);
	// core.FUNCS.audio.playSound_mp3("payfee1"          , true, 1.0);
	// core.FUNCS.audio.playSound_mp3("tokenMove1"       , true, 1.0);
	// core.FUNCS.audio.playSound_mp3("visitOccupiedJail", true, 1.0);

	game.clearPlayboard = function(){
		// Clear the playboard.
		game.playBoard=[];
		for(let y=0; y<22; y+=1){
			game.playBoard[y]=[];
			for(let x=0; x<10; x+=1){
				game.playBoard[y][x]=0;
			}
		}
	};
*/