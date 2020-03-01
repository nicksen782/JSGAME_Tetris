// COPYRIGHT SCREEN

'use strict';

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
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.ClearVram();
		core.FUNCS.graphics.Fill(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, fillTile, "VRAM1")

		let xOffset = 0;
		let yOffset = 5;
		for(let y=0; y<vars.text1.length; y+=1){
			core.FUNCS.graphics.Print(xOffset, (y+yOffset), vars.text1[y], "VRAM2");
		}

		// Fade this in.
		core.GRAPHICS.FADER.FUNCS.FadeIn(1, true, false);
		// core.GRAPHICS.FADER.FUNCS.FadeIn(game.secondsToFrames(0.1)/core.GRAPHICS.FADER.CONSTS["FADER_STEPS"], true, false);
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
		}

		// Run.
		if(vars.init){
			if( game.chkBtn("BTN_START" , "btnPressed1") || vars.framesUntilDone_cnt >= vars.framesUntilDone){
				core.GRAPHICS.FADER.FUNCS.FadeOut(1, true, false);
				// core.GRAPHICS.FADER.FUNCS.FadeOut(game.secondsToFrames(0.1)/core.GRAPHICS.FADER.CONSTS["FADER_STEPS"], true, false);

				vars.END = true;
				game.setGamestate1("TITLE2", true);
			}
			else{
				vars.framesUntilDone_cnt+=1;
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
