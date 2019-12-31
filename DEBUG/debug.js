game.DEBUG       = {} ;
game.DEBUG.DOM   = {} ;
game.DEBUG.VALS  = {} ;
game.DEBUG.TESTS = {} ;
game.DEBUG.NAV   = {} ;

//
game.DEBUG.init = function(){
	// DEBUG DOM CACHE
	game.DEBUG.DOM["DEBUG_DIV"]      = document.getElementById("DEBUG_DIV");
	game.DEBUG.DOM["debug_mode_chk"] = document.getElementById("debug_mode");

	game.DEBUG.DOM["debugSounds"]    = document.getElementById("debugSounds");

	// Display of the performance.
	game.DEBUG.DOM["avg_BG"]     = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_BG");
	game.DEBUG.DOM["avg_SPRITE"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_SPRITE");
	game.DEBUG.DOM["avg_TEXT"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_TEXT");
	game.DEBUG.DOM["avg_FADE"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_FADE");
	game.DEBUG.DOM["avg_OUTPUT"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_OUTPUT");
	game.DEBUG.DOM["avg_TOTAL"]  = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_TOTAL");
	game.DEBUG.DOM["avg_LOGIC"]  = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_LOGIC");

	// Test buttons.
	game.DEBUG.DOM["vram1_test1_on"]     = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#vram1_test1_on");
	game.DEBUG.DOM["vram1_test1_off"]    = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#vram1_test1_off");
	game.DEBUG.DOM["vram2_test1_on"]     = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#vram2_test1_on");
	game.DEBUG.DOM["vram2_test1_off"]    = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#vram2_test1_off");
	game.DEBUG.DOM["sprite_test1_on"]    = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#sprite_test1_on");
	game.DEBUG.DOM["sprite_test1_off"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#sprite_test1_off");
	game.DEBUG.DOM["sprite_test2_on"]    = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#sprite_test2_on");
	game.DEBUG.DOM["sprite_test2_off"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#sprite_test2_off");
	game.DEBUG.DOM["debug_ClearVram1"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#debug_ClearVram1");
	game.DEBUG.DOM["debug_ClearVram2"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#debug_ClearVram2");
	game.DEBUG.DOM["debug_ClearSprites"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#debug_ClearSprites");

	// Test - Fonts
	game.DEBUG.DOM["debug_fontChangeDiv"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#debug_fontChangeDiv");
	let fontKeys = Object.keys(core.GRAPHICS.fonts);
	fontKeys.forEach(function(d){
		let rec = core.GRAPHICS.fonts[d] ;
		let button = document.createElement("button");
		let space = document.createElement("span");
		space.innerText=" ";
		button.innerText=d;
		button.onclick=function(){ core.FUNCS.graphics.SetFont( d ); };
		game.DEBUG.DOM["debug_fontChangeDiv"].appendChild(button);
		game.DEBUG.DOM["debug_fontChangeDiv"].appendChild(space);
	});

	// GAME VARS
	game.DEBUG.DOM["DEBUG_MENU_DIV_3"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#DEBUG_MENU_DIV_3");
	game.DEBUG.DOM["debug_gameVars"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#debug_gameVars");

	// DEBUG DOM EVENT LISTENERS.
	game.DEBUG.DOM["vram1_test1_on"]  .addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);
	game.DEBUG.DOM["vram1_test1_off"] .addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);

	game.DEBUG.DOM["vram2_test1_on"]  .addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);
	game.DEBUG.DOM["vram2_test1_off"] .addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);

	game.DEBUG.DOM["sprite_test1_on"] .addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);
	game.DEBUG.DOM["sprite_test1_off"].addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);

	game.DEBUG.DOM["sprite_test2_on"] .addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);
	game.DEBUG.DOM["sprite_test2_off"].addEventListener("click", function(){game.DEBUG.TESTS.timedTests(this.id);    }, false);

	game.DEBUG.DOM["debug_ClearVram1"] .addEventListener("click", function(){core.FUNCS.graphics.ClearVram("VRAM1"); }, false);
	game.DEBUG.DOM["debug_ClearVram2"] .addEventListener("click", function(){core.FUNCS.graphics.ClearVram("VRAM2"); }, false);
	game.DEBUG.DOM["debug_ClearSprites"].addEventListener("click", function(){core.FUNCS.graphics.clearSprites();    }, false);

	// Set flags and counters.
	game.DEBUG.VALS.lastDebugDisplay=performance.now();  //
	game.DEBUG.VALS.vram1_test1_id  = null;              //
	game.DEBUG.VALS.vram1_test2_id  = null;              //
	game.DEBUG.VALS.vram2_test1_id  = null;              //
	game.DEBUG.VALS.sprite_test1_id = null;              //
	game.DEBUG.VALS.sprite_test2_id = null;              //
	// game.DEBUG.VALS.secondsToWait_debugDisplay = 1.0;  //
	// game.DEBUG.VALS.secondsToWait_debugDisplay = 0.25; //
	game.DEBUG.VALS.secondsToWait_debugDisplay = 0.10;   //

	// Allow activing or de-activating the debug functions.
	game.DEBUG.DOM["debug_mode_chk"].addEventListener("change", function(){
		// Change the debug flag per the checked value of the checkbox.
		JSGAME.FLAGS.debug = this.checked;

		// Adjust the DEBUG_DIV visibility.
		if(JSGAME.FLAGS.debug){
			game.DEBUG.DOM["DEBUG_DIV"].classList.remove("notActive");
			game.DEBUG.DOM["DEBUG_DIV"].classList.remove("noSelect");
		}
		else{
			game.DEBUG.DOM["DEBUG_DIV"].classList.add("notActive");
			game.DEBUG.DOM["DEBUG_DIV"].classList.add("noSelect");
		}
	}, false);

	// POPULATE THE SOUND TEST.
	let populateSoundTest = function(){
		let elem = game.DEBUG.DOM["debugSounds"] ;

		let mp3_keys;
		let mid_keys;

		try{ mp3_keys = Object.keys(core.ASSETS.audio.lookups); } catch(e){ console.log("No mp3_keys found!"); mp3_keys = []; }
		try{ mid_keys = Object.keys(core.AUDIO.midiData);       } catch(e){ console.log("No mid_keys found!"); mid_keys = []; }

		// console.log(
		// 	"mp3_keys:",mp3_keys,
		// 	"mid_keys:",mid_keys,
		// 	""
		// );

		var frag = document.createDocumentFragment();

		for(let i=0; i<mp3_keys.length; i+=1){
			let key = mp3_keys[i];
			let rec = core.ASSETS.audio.lookups[key];

			var temp_tr   = document.createElement("tr");
			var temp_td1  = document.createElement("td"); temp_tr.appendChild(temp_td1); //
			var temp_td2  = document.createElement("td"); temp_tr.appendChild(temp_td2); //

			let extKey = key;
			let intKey = rec.key;
			let type   = rec.type;

			temp_td1.innerHTML=type.toUpperCase();
			temp_td2.innerHTML="<button onclick='core.FUNCS.audio.playSound_mp3(\""+extKey+"\", true, 1.0);' >"+intKey+", ("+type+")</button>";

			// Add this row to the DOM fragment.
			frag.appendChild(temp_tr);
		}

		// mid_bgm
		// mid_sfx

		for(let i=0; i<mid_keys.length; i+=1){
			let key = mid_keys[i];
			let rec = core.AUDIO.midiData[key];
			// core.FUNCS.audio.play_midi  ( "BGM1", "C_THEME" );

			var temp_tr   = document.createElement("tr");
			var temp_td1  = document.createElement("td"); temp_tr.appendChild(temp_td1); //
			var temp_td2  = document.createElement("td"); temp_tr.appendChild(temp_td2); //

			let extKey = key;
			let intKey = rec.key;
			let type   = rec.type;

			temp_td1.innerHTML=type.toUpperCase();
			temp_td2.innerHTML="<button onclick='core.FUNCS.audio.play_midi(\"BGM1\", \""+extKey+"\", true, 1.0);' >"+intKey+", ("+type+")</button>";

			// Add this row to the DOM fragment.
			frag.appendChild(temp_tr);

		}

		elem.appendChild(frag);
	};
	populateSoundTest();

	// *** Show the debug div. ***

	// Set the normal site container to inline-block.
	// Remove the hidden and noSelect classes from the debug DOM.
	JSGAME.DOM["siteContainerDiv"].classList.add("inline_block");
	JSGAME.DOM["sideDiv"].classList.remove("hide");
	game.DEBUG.DOM["DEBUG_DIV"].classList.remove("hidden");
	game.DEBUG.DOM["DEBUG_DIV"].classList.remove("noSelect");

	// Remove the init function since it is no longer needed.
	delete game.DEBUG.init;

	console.log("DEBUG MODE ACTIVE");
};

// *** DEBUG NAVIGATION MENU ***

// Show a clicked panel.
game.DEBUG.NAV.debug_showPanel  = function(panel_id, elem){
	// Attempt to get a DOM handle to the specified panel.
	let specifiedPanel = document.getElementById(panel_id);

	// Was it found? Show it.
	if(specifiedPanel){
		// Hide all first.
		game.DEBUG.NAV.debug_hidePanels();

		// Show this panel.
		specifiedPanel.classList.add("active");

		// Set the clicked button as active.
		if(elem){ elem.classList.add("active"); }
	}
	// Not found? Error!
	else{
		console.log("panel not found!");
	}
};
// Hide all panels.
game.DEBUG.NAV.debug_hidePanels = function(){
	// Hide panels.
	let panels = document.querySelectorAll('.DEBUG_DIV_MENU_DIVS');
	for(let i=0; i<panels.length; i+=1){
		panels[i].classList.remove("active");
	}

	// Remove the active class from the buttons.
	let debug_navButtons = document.querySelectorAll('.debugPanelButtons');
	for(let i=0; i<debug_navButtons.length; i+=1){
		debug_navButtons[i].classList.remove("active");
	}
};

// *** DEBUG FUNCTIONS ***

game.DEBUG.drawFlagsToConsole = function(){
	console.log(
		""  , ( core.GRAPHICS.flags.BG         == true ? 'BG         : TRUE' :'BG         :     ' ),
		"\n", ( core.GRAPHICS.flags.SPRITE     == true ? 'SPRITE     : TRUE' :'SPRITE     :     ' ),
		"\n", ( core.GRAPHICS.flags.TEXT       == true ? 'TEXT       : TRUE' :'TEXT       :     ' ),
		"\n", ( core.GRAPHICS.flags.FADE       == true ? 'FADE       : TRUE' :'FADE       :     ' ),
		"\n", ( core.GRAPHICS.flags.OUTPUT     == true ? 'OUTPUT     : TRUE' :'OUTPUT     :     ' ),
		"\n", ( core.GRAPHICS.FADER.fadeActive == true ? 'fadeActive : TRUE' :'fadeActive :     ' ),
		""
		);
	};

// game.DEBUG.fadeValuesToConsole = function(){
// 	console.log(
// 		"\n old values   : " , core.GRAPHICS.FADER.CONSTS["fader"][core.GRAPHICS.FADER.prevFadeStep],
// 		"\n new values   : " , core.GRAPHICS.FADER.CONSTS["fader"][core.GRAPHICS.FADER.fadeStep],
// 		// "\n " ,
// 		"\n prevFadeStep :" , core.GRAPHICS.FADER.prevFadeStep  ,
// 		"\n fadeStep     :" , core.GRAPHICS.FADER.fadeStep      ,
// 		"\n fadeSpeed    :" , core.GRAPHICS.FADER.fadeSpeed     ,
// 		"\n currFadeFrame:" , core.GRAPHICS.FADER.currFadeFrame ,
// 		"\n fadeDir      :" , core.GRAPHICS.FADER.fadeDir       ,
// 		"\n fadeActive   :" , core.GRAPHICS.FADER.fadeActive    ,
// 		"\n blocking     :" , core.GRAPHICS.FADER.blocking      ,
// 		"\n stayDark     :" , core.GRAPHICS.FADER.stayDark      ,
// 		"\n lastFadeFrame:" , core.GRAPHICS.FADER.lastFadeFrame ,
// 		"\n"
// 	);
// };

// Fills VRAM1 with random tiles from the layer's active tileset.
game.DEBUG.fillVram1_random = function(){
	// Ignore if a tileset is not selected.
	if(!core.GRAPHICS.activeTileset["BG"]){ return; }

	// Set the tileset.
	let tileset = core.GRAPHICS.tiles[ core.GRAPHICS.activeTileset["BG"] ];

	// Count the number of tiles.
	let numTiles = tileset.length-1 ;

	// Write all tiles to VRAM.
	for(let y=0; y<core.SETTINGS.VRAM_TILES_V; y+=1){
		for(let x=0; x<core.SETTINGS.VRAM_TILES_H; x+=1){
			// Get random tile id from the range of available tile.
			let tileId = game.getRandomInt_inRange(0, numTiles);

			// Write the tile to VRAM.
			core.FUNCS.graphics.SetTile(x,y, tileId, 'VRAM1');
		}
	}
};
// Fills VRAM2 with random tiles from the layer's active tileset.
game.DEBUG.fillVram2_random = function(){
	// Ignore if a tileset is not selected.
	if(!core.GRAPHICS.activeTileset["TEXT"]){
		console.log("Font tilemap not selected!");
		return;
	}

	let fontmap   = core.ASSETS.graphics.tilemaps[core.GRAPHICS.fontSettings.fontmap];
	if(!fontmap){ console.log("Font map not selected!"); }
	var numTiles  = fontmap.length-1 ;

	for(let y=0; y<core.SETTINGS.VRAM_TILES_V; y+=1){
		for(let x=0; x<core.SETTINGS.VRAM_TILES_H; x+=1){
			let tileId = game.getRandomInt_inRange(2, numTiles);
			core.FUNCS.graphics.SetTile(x, y, fontmap[ tileId ], 'VRAM2' );
		}
	}
};
// Randomly place sprites (not grid aligned.)
game.DEBUG.spriteStressTest1 = function(){
	// Clear all sprites, map then move sprites.
	// Sprite x, y, and flags are randomized.

	core.FUNCS.graphics.clearSprites();

	// let tilemap = core.ASSETS.graphics.tilemaps["shape_colors_sp"];
	let tilemap = [1,1,game.getRandomInt_inRange(0, 5)];
	let numSpriteMaps = 150;
	// let numSpriteMaps = game.getRandomInt_inRange(5, 175);
	let numTiles   = (tilemap[0] * tilemap[1]);
	let numSprites = numTiles * numSpriteMaps;
	let flags_arr=[
		0 ,
		0 | (core.CONSTS.SPRITE_FLIP_X),
		0 | (core.CONSTS.SPRITE_FLIP_Y),
		0 | (core.CONSTS.SPRITE_FLIP_X | core.CONSTS.SPRITE_FLIP_Y),
	];

	// Map sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		let flags =  game.getRandomInt_inRange(0, flags_arr.length-1) ;
		// core.FUNCS.graphics.MapSprite2( i , tilemap, flags );
		core.FUNCS.graphics.MapSprite2( i , [1,1,game.getRandomInt_inRange(0, 5)], flags );
	}

	// Move sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		// NOT Grid-aligned
		let rand_x = game.getRandomInt_inRange(0, (core.SETTINGS.VRAM_TILES_H-1) * core.SETTINGS.TILE_WIDTH) ;
		let rand_y = game.getRandomInt_inRange(0, (core.SETTINGS.VRAM_TILES_V-1) * core.SETTINGS.TILE_HEIGHT) ;

		core.FUNCS.graphics.MoveSprite( i , rand_x, rand_y, tilemap[0], tilemap[1] );
	}
};
// Randomly place sprites (grid aligned.)
game.DEBUG.spriteStressTest2 = function(){
	// Clear all sprites, map then move sprites.
	// Sprite x, y, and flags are randomized.

	core.FUNCS.graphics.clearSprites();

	// let tilemap = core.ASSETS.graphics.tilemaps["shape_colors_sp"];
	let tilemap = [1,1,game.getRandomInt_inRange(0, 5)];
	let numSpriteMaps = 150;
	// let numSpriteMaps = game.getRandomInt_inRange(5, 175);
	let numTiles   = (tilemap[0] * tilemap[1]);
	let numSprites = numTiles * numSpriteMaps;
	let flags_arr=[
		0 ,
		0 | (core.CONSTS.SPRITE_FLIP_X),
		0 | (core.CONSTS.SPRITE_FLIP_Y),
		0 | (core.CONSTS.SPRITE_FLIP_X | core.CONSTS.SPRITE_FLIP_Y),
	];

	// Map sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		let flags =  game.getRandomInt_inRange(0, flags_arr.length-1) ;
		// core.FUNCS.graphics.MapSprite2( i , tilemap, flags );
		core.FUNCS.graphics.MapSprite2( i , [1,1,game.getRandomInt_inRange(0, 5)], flags );
	}

	// Move sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		// Grid-aligned (assumes 8 by 8 pixel tile.)
		let rand_x = game.getRandomInt_inRange(0, (core.SETTINGS.VRAM_TILES_H-1) * core.SETTINGS.TILE_WIDTH )  ;
		let rand_y = game.getRandomInt_inRange(0, (core.SETTINGS.VRAM_TILES_V-1) * core.SETTINGS.TILE_HEIGHT)  ;
		rand_x = (rand_x >> 3) << 3;
		rand_y = (rand_y >> 3) << 3;

		core.FUNCS.graphics.MoveSprite( i , rand_x, rand_y, tilemap[0], tilemap[1] );
	}
};
// Runs prepareState again on the current gamestate which should restart it.
game.DEBUG.restartGamestate = function(){
	game.gs[game.gamestate].vars={};
	game.gs[game.gamestate].prepareState();
};
// Various tests that use timed intervals.
game.DEBUG.TESTS.timedTests = function(id){
	switch(id){
		case "vram1_test1_on"  : {
			clearInterval( game.DEBUG.VALS.vram1_test1_id );
			game.DEBUG.VALS.vram1_test1_id = setInterval(function(){ if(core.GRAPHICS.flags.INLAYERUPDATE){ return; }; game.DEBUG.fillVram1_random(); }, 100);
			break;
		}
		case "vram1_test1_off" : {
			clearInterval( game.DEBUG.VALS.vram1_test1_id );
			break;
		}

		case "vram2_test1_on"  : {
			clearInterval( game.DEBUG.VALS.vram2_test1_id );
			game.DEBUG.VALS.vram2_test1_id = setInterval(function(){ if(core.GRAPHICS.flags.INLAYERUPDATE){ return; }; game.DEBUG.fillVram2_random(); }, 250);
			break;
		}
		case "vram2_test1_off" : {
			clearInterval( game.DEBUG.VALS.vram2_test1_id );
			break;
		}

		case "sprite_test1_on"  : {
			clearInterval( game.DEBUG.VALS.sprite_test1_id );
			game.DEBUG.VALS.sprite_test1_id = setInterval(function(){ if(core.GRAPHICS.flags.INLAYERUPDATE){ return; }; game.DEBUG.spriteStressTest1(); }, 100);
			break;
		}
		case "sprite_test1_off" : {
			clearInterval( game.DEBUG.VALS.sprite_test1_id );
			break;
		}

		case "sprite_test2_on"  : {
			clearInterval( game.DEBUG.VALS.sprite_test2_id );
			game.DEBUG.VALS.sprite_test2_id = setInterval(function(){ if(core.GRAPHICS.flags.INLAYERUPDATE){ return; }; game.DEBUG.spriteStressTest2(); }, 100);
			break;
		}
		case "sprite_test2_off" : {
			clearInterval( game.DEBUG.VALS.sprite_test2_id );
			break;
		}
		default                : { return; break; }
	};

};

// *** DEBUG DISPLAY UPDATES ***

// Used by game.DEBUG.updateDebugDisplay.
game.DEBUG.updateDebugDisplay_funcs = {
	// Generates/displays: performance for graphics.
	timings_gfx : function(){
		let sum = function(a,c){ return a + c; }

		// Get new averages.
		let new_avg_BG    ;
		let new_avg_SPRITE;
		let new_avg_TEXT  ;
		let new_avg_FADE  ;
		let new_avg_OUTPUT;

		try{ new_avg_BG     = (core.GRAPHICS.performance.BG     .reduce(sum) / core.GRAPHICS.performance.BG    .length); } catch(e){ return; }
		try{ new_avg_SPRITE = (core.GRAPHICS.performance.SPRITE .reduce(sum) / core.GRAPHICS.performance.SPRITE.length); } catch(e){ return; }
		try{ new_avg_TEXT   = (core.GRAPHICS.performance.TEXT   .reduce(sum) / core.GRAPHICS.performance.TEXT  .length); } catch(e){ return; }
		try{ new_avg_FADE   = (core.GRAPHICS.performance.FADE   .reduce(sum) / core.GRAPHICS.performance.FADE  .length); } catch(e){ return; }
		try{ new_avg_OUTPUT = (core.GRAPHICS.performance.OUTPUT .reduce(sum) / core.GRAPHICS.performance.OUTPUT.length); } catch(e){ return; }

		// toFixed and then parseFloat.
		let new_avg_TOTAL  = (
			parseFloat(new_avg_BG    .toFixed(2),10) +
			parseFloat(new_avg_SPRITE.toFixed(2),10) +
			parseFloat(new_avg_TEXT  .toFixed(2),10) +
			parseFloat(new_avg_FADE  .toFixed(2),10) +
			parseFloat(new_avg_OUTPUT.toFixed(2),10)
		);

		// Set the values to fixed decimal.
		new_avg_BG     = new_avg_BG    .toFixed(2);
		new_avg_SPRITE = new_avg_SPRITE.toFixed(2);
		new_avg_TEXT   = new_avg_TEXT  .toFixed(2);
		new_avg_FADE   = new_avg_FADE  .toFixed(2);
		new_avg_OUTPUT = new_avg_OUTPUT.toFixed(2);
		new_avg_TOTAL  = new_avg_TOTAL .toFixed(2);

		// Get the old (displayed) averages.
		let old_avg_BG     = game.DEBUG.DOM["avg_BG"]     .innerText ;
		let old_avg_SPRITE = game.DEBUG.DOM["avg_SPRITE"] .innerText ;
		let old_avg_TEXT   = game.DEBUG.DOM["avg_TEXT"]   .innerText ;
		let old_avg_FADE   = game.DEBUG.DOM["avg_FADE"]   .innerText ;
		let old_avg_OUTPUT = game.DEBUG.DOM["avg_OUTPUT"] .innerText ;

		// Update the displayed averages.
		let interval = JSGAME.SHARED.timing.interval;
		if(new_avg_BG     != old_avg_BG    ){ game.DEBUG.DOM["avg_BG"]     .innerHTML = ((new_avg_BG     / interval)*100).toFixed(2) + "%"; }
		if(new_avg_SPRITE != old_avg_SPRITE){ game.DEBUG.DOM["avg_SPRITE"] .innerHTML = ((new_avg_SPRITE / interval)*100).toFixed(2) + "%"; }
		if(new_avg_TEXT   != old_avg_TEXT  ){ game.DEBUG.DOM["avg_TEXT"]   .innerHTML = ((new_avg_TEXT   / interval)*100).toFixed(2) + "%"; }
		if(new_avg_FADE   != old_avg_FADE  ){ game.DEBUG.DOM["avg_FADE"]   .innerHTML = ((new_avg_FADE   / interval)*100).toFixed(2) + "%"; }
		if(new_avg_OUTPUT != old_avg_OUTPUT){ game.DEBUG.DOM["avg_OUTPUT"] .innerHTML = ((new_avg_OUTPUT / interval)*100).toFixed(2) + "%"; }

		return parseFloat(new_avg_TOTAL,10);
	},
	// Generates/displays: performance for logic and total.
	timings_logic : function(new_avg_TOTAL){
		let sum = function(a,c){ return a + c; }

		let new_avg_LOGIC = (game.logic_timings.reduce(sum) / game.logic_timings.length);
		new_avg_TOTAL = new_avg_TOTAL + new_avg_LOGIC;
		new_avg_LOGIC     = new_avg_LOGIC.toFixed(2);
		let old_avg_LOGIC = game.DEBUG.DOM["avg_LOGIC"].innerText ;
		let interval      = JSGAME.SHARED.timing.interval;
		if(new_avg_LOGIC != old_avg_LOGIC){ game.DEBUG.DOM["avg_LOGIC"].innerHTML = ((new_avg_LOGIC / interval)*100).toFixed(2) + "%"; }

		let old_avg_TOTAL  = game.DEBUG.DOM["avg_TOTAL"]  .innerText ;

		if(new_avg_TOTAL  != old_avg_TOTAL ){ game.DEBUG.DOM["avg_TOTAL"]  .innerHTML = ((new_avg_TOTAL  / interval)*100).toFixed(2) + "%"; }
	},
	// Update the textarea with the gamestate variables/values.
	vars_display : function(){
		let keys = Object.keys(game.gs[game.gamestate].vars);
		let newText = "";
		keys.forEach(function(d){
			let key = d.padEnd(20, " ");
			newText+=key+" ::: "+JSON.stringify(game.gs[game.gamestate].vars[d],null,0) + "\n";
		});
		game.DEBUG.DOM["debug_gameVars"].innerHTML="GAMESTATE: " + game.gamestate + "\n\n" + newText;
	},
};
// Called periodically to update the displayed debug information.
game.DEBUG.updateDebugDisplay = function(){
	// PERFORMANCE DISPLAY (AVG TIMINGS)
	let new_avg_TOTAL;
	new_avg_TOTAL=game.DEBUG.updateDebugDisplay_funcs.timings_gfx();
	game.DEBUG.updateDebugDisplay_funcs.timings_logic(new_avg_TOTAL);

	// CORE

	// VID TESTS
	//

	// GAME FUNCS:
	//

	// GAME VARS:
	if(game.DEBUG.DOM["DEBUG_MENU_DIV_3"].classList.contains("active")){
		// Update the textarea with the gamestate variables/values.
		game.DEBUG.updateDebugDisplay_funcs.vars_display();

		//
	}

}

// *** GAME-SPECIFIC DEBUG TESTS ***

// Add some "junk" lines (some complete) to the screen.
// game.DEBUG.bottomLines = function(){
// 	let vars = game.gs['PLAY_A'].vars;

// 	let startx1=vars.min_x_tile+0;
// 	let starty =vars.min_y_tile+19;

// 	let T = core.ASSETS.graphics.tilemaps["T_bgtile"][2]
// 	let J = core.ASSETS.graphics.tilemaps["J_bgtile"][2]
// 	let Z = core.ASSETS.graphics.tilemaps["Z_bgtile"][2]
// 	let O = core.ASSETS.graphics.tilemaps["O_bgtile"][2]
// 	let S = core.ASSETS.graphics.tilemaps["S_bgtile"][2]
// 	let L = core.ASSETS.graphics.tilemaps["L_bgtile"][2]
// 	let I = core.ASSETS.graphics.tilemaps["I_bgtile"][2]

// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+0 , 1  , 1, T, "VRAM1");
// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+2 , 1  , 1, J, "VRAM1");
// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+4 , 1  , 1, Z, "VRAM1");
// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+12, 10 , 1, O, "VRAM1");
// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+13, 10 , 1, S, "VRAM1");
// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+15, 10 , 1, L, "VRAM1");
// 	// core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+17, 10 , 1, I, "VRAM1");
// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+16, 1  , 1, J, "VRAM1");
// 	core.FUNCS.graphics.Fill(startx1, vars.min_y_tile+19, 10 , 1, I, "VRAM1");
// };
// Displays the playboard VRAM1 data in the counsole. (basic.)
// game.DEBUG.showVramInConsole = function(){
// 	console.log("\n");
// 	let vars = game.gs['PLAY_A'].vars;

// 	// Shift the lines down.
// 	let i=0;
// 	for(let y=0; y<20; y+=1){
// 		let newy=(y+vars.min_y_tile).toString().padEnd(3, " ");
// 		let text="";
// 		for(let x=0; x<10; x+=1){
// 			let tileid = core.GRAPHICS.VRAM1[ ((y+vars.min_y_tile)*core.SETTINGS.VRAM_TILES_H) + (x+vars.min_x_tile) ] ;
// 			// let newtileid = (tileid).toString().padEnd(3, " ");
// 			if(tileid==1){ text+= "" + "."    + " " ; }
// 			else         { text+= "" + "X" + " " ; }

// 		}
// 		console.log(newy, " ::: ", text, " --- ", "i:", i);
// 		i++;
// 	}
// };

//
// game.DEBUG.showCoords = function(color){
// 	if(color=="white"){
// 		core.FUNCS.graphics.DrawMap_customDimensions(0, 0, core.SETTINGS.VRAM_TILES_H, 1,                          core.ASSETS.graphics.tilemaps["nums_0_9_wh"], "VRAM2");
// 		core.FUNCS.graphics.DrawMap_customDimensions(0, 0, 1                         , core.SETTINGS.VRAM_TILES_V, core.ASSETS.graphics.tilemaps["nums_0_9_wv"], "VRAM2");
// 	}
// 	else if(color=="black"){
// 		core.FUNCS.graphics.DrawMap_customDimensions(0, 0, core.SETTINGS.VRAM_TILES_H, 1,                          core.ASSETS.graphics.tilemaps["nums_0_9_bh"], "VRAM2");
// 		core.FUNCS.graphics.DrawMap_customDimensions(0, 0, 1                         , core.SETTINGS.VRAM_TILES_V, core.ASSETS.graphics.tilemaps["nums_0_9_bv"], "VRAM2");
// 	}
// };
// game.DEBUG.hideCoords = function(){
// 	core.FUNCS.graphics.Fill(0, 0, core.SETTINGS.VRAM_TILES_H, 1,                          0, "VRAM2");
// 	core.FUNCS.graphics.Fill(0, 0, 1                         , core.SETTINGS.VRAM_TILES_V, 0, "VRAM2");
// };


// *** CUSTOM TESTS ***

// Performance tests.
game.DEBUG.speedtest1 = function(){
	let avgArr = function(arr){
		let sum = function(a,c){ return a + c; } ;
		return (arr.reduce(sum) / arr.length);
	}

	let test1Arr=[];
	let test2Arr=[];
	// let test3Arr=[];
	let test4Arr=[];

	for(let i=0; i<50000; i+=1){
		var ts1=performance.now();
		core.GRAPHICS.sprites.map(a => Object.assign({}, a));
		var te1=performance.now();

		var ts2=performance.now();
		core.GRAPHICS.sprites_prev = JSON.parse(JSON.stringify(core.GRAPHICS.sprites));
		var te2=performance.now();

		// var ts3=performance.now();
		// core.GRAPHICS.sprites_prev = core.GRAPHICS.sprites.map(x=>x);
		// var te3=performance.now();

		var ts4=performance.now();
		core.GRAPHICS.sprites_prev.length=0;
		for(let i=0; i<core.GRAPHICS.sprites.length; i+=1){
			core.GRAPHICS.sprites_prev[i] = {
				"flags"     : core.GRAPHICS.sprites[i].flags     ,
				"hash"      : core.GRAPHICS.sprites[i].hash      ,
				"tileIndex" : core.GRAPHICS.sprites[i].tileIndex ,
				"x"         : core.GRAPHICS.sprites[i].x         ,
				"y"         : core.GRAPHICS.sprites[i].y         ,
			};
		}
		var te4=performance.now();

		test1Arr.push( (te1-ts1) );
		test2Arr.push( (te2-ts2) );
		// test3Arr.push( (te3-ts3) );
		test4Arr.push( (te4-ts4) );
	}

	console.log(
		// "map          : ", avgArr(test3Arr).toFixed(5) ,
		// "\n"+
		"for          : ", avgArr(test4Arr).toFixed(5) ,
		"\n"+
		"Object.assign: ", avgArr(test1Arr).toFixed(5) ,
		"\n"+
		"JSON         : ", avgArr(test2Arr).toFixed(5) ,
	);
};
