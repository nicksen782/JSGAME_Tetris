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
		_CFG.clearSprites();
		// _CFG.ClearVram();

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
		_CFG.ClearVram();
		_CFG.Fill(0, 0, _CS.VRAM_TILES_H, _CS.VRAM_TILES_V, fillTile, "VRAM1")

		let xOffset = 0;
		let yOffset = 5;
		for(let y=0; y<vars.text1.length; y+=1){
			_CFG.Print(xOffset, (y+yOffset), vars.text1[y], "VRAM2");
		}

		// Fade this in.
		_CG.FADER.FUNCS.FadeIn(1, true, false);
		// _CG.FADER.FUNCS.FadeIn(game.secondsToFrames(0.1)/_CG.FADER.CONSTS["FADER_STEPS"], true, false);
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
			// Dismiss this screen when the user presses start.
			if(
				game.chkBtn("BTN_START" , "btnPressed1") ||
				game.chkBtn("BTN_A"    , "btnPressed1") ||
				vars.framesUntilDone_cnt >= vars.framesUntilDone
			){
				_CG.FADER.FUNCS.FadeOut(1, true, false);
				// _CG.FADER.FUNCS.FadeOut(game.secondsToFrames(0.1)/_CG.FADER.CONSTS["FADER_STEPS"], true, false);

				vars.END = true;
				game.setGamestate1("TITLE2", true);
			}
			else{
				vars.framesUntilDone_cnt+=1;
			}

			// if( game.chkBtn("BTN_START" , "btnPressed1") || vars.framesUntilDone_cnt >= vars.framesUntilDone){
			// 	_CG.FADER.FUNCS.FadeOut(1, true, false);
			// 	// _CG.FADER.FUNCS.FadeOut(game.secondsToFrames(0.1)/_CG.FADER.CONSTS["FADER_STEPS"], true, false);

			// 	vars.END = true;
			// 	game.setGamestate1("TITLE2", true);
			// }
			// else{
			// 	vars.framesUntilDone_cnt+=1;
			// }

		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	// EXAMPLE : function( VALUE ){
	// 	let gs    = this;
	// 	let vars  = gs.vars;
	// },
};
