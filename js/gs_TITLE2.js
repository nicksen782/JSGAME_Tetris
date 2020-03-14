// MAIN TITLE SCREEN

'use strict';

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
		_CFG.clearSprites();
		// _CFG.ClearVram();

		vars.END = false;
		vars.text1 = ["PRESS START!"];
		vars.text2 = ["            "];

		vars.xOffset_text               = 8;
		vars.yOffset_text               = 23;
		vars.framesBetweenFlashes       = game.secondsToFrames(0.40) ; // x % of max.
		vars.framesBetweenFlashes_cnt   = 0;
		vars.framesBetweenFlashes_state = false;
	},

	//
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
		_CFG.ClearVram();

		core.FUNCS.audio.stopAllSounds_midi(true);
		core.FUNCS.audio.cancelAllSounds_mp3("all");

		let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		_CFG.Fill(0, 0, _CS.VRAM_TILES_H, _CS.VRAM_TILES_V, fillTile, "VRAM1")
		_CFG.DrawMap2(1,6, core.ASSETS.graphics.tilemaps["title_tetris"], "VRAM1"); // TITLE

		// vars.END = true;

		for(let y=0; y<vars.text1.length; y+=1){
			_CFG.Print(vars.xOffset_text, (y+vars.yOffset_text), vars.text2[y], "VRAM2");
		}

		_CG.FADER.FUNCS.FadeIn (1, true, false);
		// _CG.FADER.FUNCS.FadeIn (game.secondsToFrames(0.1)/_CG.FADER.CONSTS["FADER_STEPS"], true, false);

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
			if(
				game.chkBtn("BTN_START" , "btnPressed1")
				||
				game.chkBtn("BTN_A"    , "btnPressed1")
			){
				vars.END = true;
				game.setGamestate1("SETUP1", true);
			}

			if(vars.framesBetweenFlashes_cnt >= vars.framesBetweenFlashes){
				if(vars.framesBetweenFlashes_state){
					_CFG.Print(vars.xOffset_text, (vars.yOffset_text), vars.text2[0], "VRAM2");
				}
				else{
					_CFG.Print(vars.xOffset_text, (vars.yOffset_text), vars.text1[0], "VRAM2");
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
