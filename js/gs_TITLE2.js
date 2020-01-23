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

	//
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

		core.GRAPHICS.FADER.FUNCS.FadeIn (1, true, false);
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
