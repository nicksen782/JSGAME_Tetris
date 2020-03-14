'use strict';

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
	let fontKeys = Object.keys(_CG.fonts);
	fontKeys.forEach(function(d){
		let rec = _CG.fonts[d] ;
		let button = document.createElement("button");
		let space = document.createElement("span");
		space.innerText=" ";
		button.innerText=d;
		button.onclick=function(){ _CFG.SetFont( d ); };
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

	game.DEBUG.DOM["debug_ClearVram1"] .addEventListener("click", function(){_CFG.ClearVram("VRAM1"); }, false);
	game.DEBUG.DOM["debug_ClearVram2"] .addEventListener("click", function(){_CFG.ClearVram("VRAM2"); }, false);
	game.DEBUG.DOM["debug_ClearSprites"].addEventListener("click", function(){_CFG.clearSprites();    }, false);

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
	document.body.classList.remove("verticalCenter");

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
		""  , ( _CG.flags.BG         == true ? 'BG         : TRUE' :'BG         :     ' ),
		"\n", ( _CG.flags.SPRITE     == true ? 'SPRITE     : TRUE' :'SPRITE     :     ' ),
		"\n", ( _CG.flags.TEXT       == true ? 'TEXT       : TRUE' :'TEXT       :     ' ),
		"\n", ( _CG.flags.FADE       == true ? 'FADE       : TRUE' :'FADE       :     ' ),
		"\n", ( _CG.flags.OUTPUT     == true ? 'OUTPUT     : TRUE' :'OUTPUT     :     ' ),
		"\n", ( _CG.FADER.fadeActive == true ? 'fadeActive : TRUE' :'fadeActive :     ' ),
		""
		);
	};

// game.DEBUG.fadeValuesToConsole = function(){
// 	console.log(
// 		"\n old values   : " , _CG.FADER.CONSTS["fader"][_CG.FADER.prevFadeStep],
// 		"\n new values   : " , _CG.FADER.CONSTS["fader"][_CG.FADER.fadeStep],
// 		// "\n " ,
// 		"\n prevFadeStep :" , _CG.FADER.prevFadeStep  ,
// 		"\n fadeStep     :" , _CG.FADER.fadeStep      ,
// 		"\n fadeSpeed    :" , _CG.FADER.fadeSpeed     ,
// 		"\n currFadeFrame:" , _CG.FADER.currFadeFrame ,
// 		"\n fadeDir      :" , _CG.FADER.fadeDir       ,
// 		"\n fadeActive   :" , _CG.FADER.fadeActive    ,
// 		"\n blocking     :" , _CG.FADER.blocking      ,
// 		"\n stayDark     :" , _CG.FADER.stayDark      ,
// 		"\n lastFadeFrame:" , _CG.FADER.lastFadeFrame ,
// 		"\n"
// 	);
// };

// Fills VRAM1 with random tiles from the layer's active tileset.
game.DEBUG.fillVram1_random = function(){
	// Ignore if a tileset is not selected.
	if(!_CG.activeTileset["BG"]){ return; }

	// Set the tileset.
	let tileset = _CG.tiles[ _CG.activeTileset["BG"] ];

	// Count the number of tiles.
	let numTiles = tileset.length-1 ;

	// Write all tiles to VRAM.
	for(let y=0; y<_CS.VRAM_TILES_V; y+=1){
		for(let x=0; x<_CS.VRAM_TILES_H; x+=1){
			// Get random tile id from the range of available tile.
			let tileId = game.getRandomInt_inRange(0, numTiles);

			// Write the tile to VRAM.
			_CFG.SetTile(x,y, tileId, 'VRAM1');
		}
	}
};
// Fills VRAM2 with random tiles from the layer's active tileset.
game.DEBUG.fillVram2_random = function(){
	// Ignore if a tileset is not selected.
	if(!_CG.activeTileset["TEXT"]){
		console.log("Font tilemap not selected!");
		return;
	}

	let fontmap   = core.ASSETS.graphics.tilemaps[_CG.fontSettings.fontmap];
	if(!fontmap){ console.log("Font map not selected!"); }
	var numTiles  = fontmap.length-1 ;

	for(let y=0; y<_CS.VRAM_TILES_V; y+=1){
		for(let x=0; x<_CS.VRAM_TILES_H; x+=1){
			let tileId = game.getRandomInt_inRange(2, numTiles);
			_CFG.SetTile(x, y, fontmap[ tileId ], 'VRAM2' );
		}
	}
};
// Randomly place sprites (not grid aligned.)
game.DEBUG.spriteStressTest1 = function(){
	// Clear all sprites, map then move sprites.
	// Sprite x, y, and flags are randomized.

	_CFG.clearSprites();

	// let tilemap = core.ASSETS.graphics.tilemaps["shape_colors_sp"];
	let tilemap = [1,1,game.getRandomInt_inRange(0, 5)];
	let numSpriteMaps = 150;
	// let numSpriteMaps = game.getRandomInt_inRange(5, 175);
	let numTiles   = (tilemap[0] * tilemap[1]);
	let numSprites = numTiles * numSpriteMaps;
	let flags_arr=[
		0 ,
		0 | (_CC.SPRITE_FLIP_X),
		0 | (_CC.SPRITE_FLIP_Y),
		0 | (_CC.SPRITE_FLIP_X | _CC.SPRITE_FLIP_Y),
	];

	// Map sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		let flags =  game.getRandomInt_inRange(0, flags_arr.length-1) ;
		_CFG.MapSprite2( i , [1,1,game.getRandomInt_inRange(0, 5)], flags);
	}

	// Move sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		// NOT Grid-aligned
		let rand_x = game.getRandomInt_inRange(0, (_CS.VRAM_TILES_H-1) * _CS.TILE_WIDTH) ;
		let rand_y = game.getRandomInt_inRange(0, (_CS.VRAM_TILES_V-1) * _CS.TILE_HEIGHT) ;

		_CFG.MoveSprite( i , rand_x, rand_y, tilemap[0], tilemap[1] );
	}
};
// Randomly place sprites (grid aligned.)
game.DEBUG.spriteStressTest2 = function(){
	// Clear all sprites, map then move sprites.
	// Sprite x, y, and flags are randomized.

	_CFG.clearSprites();

	// let tilemap = core.ASSETS.graphics.tilemaps["shape_colors_sp"];
	let tilemap = [1,1,game.getRandomInt_inRange(0, 5)];
	let numSpriteMaps = 150;
	// let numSpriteMaps = game.getRandomInt_inRange(5, 175);
	let numTiles   = (tilemap[0] * tilemap[1]);
	let numSprites = numTiles * numSpriteMaps;
	let flags_arr=[
		0 ,
		0 | (_CC.SPRITE_FLIP_X),
		0 | (_CC.SPRITE_FLIP_Y),
		0 | (_CC.SPRITE_FLIP_X | _CC.SPRITE_FLIP_Y),
	];

	// Map sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		let flags =  game.getRandomInt_inRange(0, flags_arr.length-1) ;
		_CFG.MapSprite2( i , [1,1,game.getRandomInt_inRange(0, 5)], flags );
	}

	// Move sprites.
	for(let i=0; i<numSprites; i+=numTiles){
		// Grid-aligned (assumes 8 by 8 pixel tile.)
		let rand_x = game.getRandomInt_inRange(0, (_CS.VRAM_TILES_H-1) * _CS.TILE_WIDTH )  ;
		let rand_y = game.getRandomInt_inRange(0, (_CS.VRAM_TILES_V-1) * _CS.TILE_HEIGHT)  ;
		rand_x = (rand_x >> 3) << 3;
		rand_y = (rand_y >> 3) << 3;

		_CFG.MoveSprite( i , rand_x, rand_y, tilemap[0], tilemap[1] );
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
			game.DEBUG.VALS.vram1_test1_id = setInterval(function(){ if(_CG.flags.INLAYERUPDATE){ return; }; game.DEBUG.fillVram1_random(); }, 100);
			break;
		}
		case "vram1_test1_off" : {
			clearInterval( game.DEBUG.VALS.vram1_test1_id );
			break;
		}

		case "vram2_test1_on"  : {
			clearInterval( game.DEBUG.VALS.vram2_test1_id );
			game.DEBUG.VALS.vram2_test1_id = setInterval(function(){ if(_CG.flags.INLAYERUPDATE){ return; }; game.DEBUG.fillVram2_random(); }, 250);
			break;
		}
		case "vram2_test1_off" : {
			clearInterval( game.DEBUG.VALS.vram2_test1_id );
			break;
		}

		case "sprite_test1_on"  : {
			clearInterval( game.DEBUG.VALS.sprite_test1_id );
			game.DEBUG.VALS.sprite_test1_id = setInterval(function(){ if(_CG.flags.INLAYERUPDATE){ return; }; game.DEBUG.spriteStressTest1(); }, 100);
			break;
		}
		case "sprite_test1_off" : {
			clearInterval( game.DEBUG.VALS.sprite_test1_id );
			break;
		}

		case "sprite_test2_on"  : {
			clearInterval( game.DEBUG.VALS.sprite_test2_id );
			game.DEBUG.VALS.sprite_test2_id = setInterval(function(){ if(_CG.flags.INLAYERUPDATE){ return; }; game.DEBUG.spriteStressTest2(); }, 100);
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

		try{ new_avg_BG     = (_CG.performance.BG     .reduce(sum) / _CG.performance.BG    .length); } catch(e){ return; }
		try{ new_avg_SPRITE = (_CG.performance.SPRITE .reduce(sum) / _CG.performance.SPRITE.length); } catch(e){ return; }
		try{ new_avg_TEXT   = (_CG.performance.TEXT   .reduce(sum) / _CG.performance.TEXT  .length); } catch(e){ return; }
		try{ new_avg_FADE   = (_CG.performance.FADE   .reduce(sum) / _CG.performance.FADE  .length); } catch(e){ return; }
		try{ new_avg_OUTPUT = (_CG.performance.OUTPUT .reduce(sum) / _CG.performance.OUTPUT.length); } catch(e){ return; }

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
		game.DEBUG.DOM["debug_gameVars"].innerHTML="";
		game.DEBUG.DOM["debug_gameVars"].innerHTML="GAMESTATE: " + game.gamestate + "\n" + "";
		let keys;
		let newText="";

		// VARS
		try{ keys = Object.keys(game.gs[game.gamestate].vars); } catch(e){ keys = [];}
		if(keys.length){
			newText = "";
			newText = "\n";
			newText += "-----------\n";
			newText += "[ GS VARS ]\n";
			newText += "-----------\n";
			keys.forEach(function(d){
				let key = d.padEnd(20, " ");
				newText+=key+" ::: "+JSON.stringify(game.gs[game.gamestate].vars[d],null,0) + "\n";
			});
			game.DEBUG.DOM["debug_gameVars"].innerHTML+= newText;
		}

		// CONSTS
		try{ keys = Object.keys(game.gs[game.gamestate].consts); } catch(e){ keys = [];}
		if(keys.length){
			newText = "";
			newText = "\n";
			newText += "-------------\n";
			newText += "[ GS CONSTS ]\n";
			newText += "-------------\n";
			keys.forEach(function(d){
				let key = d.padEnd(20, " ");
				newText+=key+" ::: "+JSON.stringify(game.gs[game.gamestate].consts[d],null,0) + "\n";
			});
			game.DEBUG.DOM["debug_gameVars"].innerHTML+= newText;
		}

		// TEMP
		try{ keys = Object.keys(game.gs[game.gamestate].temp); } catch(e){ keys = [];}
		if(keys.length){
			newText = "";
			newText = "\n";
			newText += "-----------\n";
			newText += "[ GS TEMP ]\n";
			newText += "-----------\n";
			keys.forEach(function(d){
				let key = d.padEnd(20, " ");
				newText+=key+" ::: "+JSON.stringify(game.gs[game.gamestate].temp[d],null,0) + "\n";
			});
			game.DEBUG.DOM["debug_gameVars"].innerHTML+= newText;
		}

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
		_CG.sprites.map(a => Object.assign({}, a));
		var te1=performance.now();

		var ts2=performance.now();
		_CG.sprites_prev = JSON.parse(JSON.stringify(_CG.sprites));
		var te2=performance.now();

		// var ts3=performance.now();
		// _CG.sprites_prev = _CG.sprites.map(x=>x);
		// var te3=performance.now();

		var ts4=performance.now();
		_CG.sprites_prev.length=0;
		for(let i=0; i<_CG.sprites.length; i+=1){
			_CG.sprites_prev[i] = {
				"flags"     : _CG.sprites[i].flags     ,
				"hash"      : _CG.sprites[i].hash      ,
				"tileIndex" : _CG.sprites[i].tileIndex ,
				"x"         : _CG.sprites[i].x         ,
				"y"         : _CG.sprites[i].y         ,
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
