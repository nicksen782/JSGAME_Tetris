// NICKSEN782 ANIMATION

'use strict';

game.gs.TITLE0 = {
	//
	temp : {},

	//
	vars         : {
	},

	//
	prepareState : function(){
		let gs    = this;
		let vars  = gs.vars;
		vars.init = false;

		_CFG.clearSprites();
		_CFG.ClearVram();

		vars.tilemaps = core.ASSETS.graphics.tilemaps;

		vars.lense = {
			"repeatsTillDone" : 3    , // How many times to repeat.
			"repeat_cnt"      : 0    , // How many times it has repeated.
			"frameDir"        : 1    , // Go up or down frames.
			"curFrame"        : 0    , // Current frame.
			"waitFrames"      : 0    , // Count of wait frames.
			"frameDelay"      : 3    , // How many wait frames before a frame change.
			"complete"        : false, // Is this animation complete?
			"pos" : { "x":10,"y":10 }, // Position of the frames.
			"frames" : [
				"n782_flare_f1" ,
				"n782_flare_f2" ,
				"n782_flare_f3" ,
				"n782_flare_f4" ,
				"n782_flare_f5" ,
				"n782_flare_f1" ,
			] ,
		};

		vars.stars = {
			"repeatsTillDone" : 4    , // How many times to repeat.
			"repeat_cnt"      : 0    , // How many times it has repeated.
			"frameDir"        : 1    , // Go up or down frames.
			"curFrame"        : 0    , // Current frame.
			"waitFrames"      : 0    , // Count of wait frames.
			"frameDelay"      : 1    , // How many wait frames before a frame change.
			"complete"        : false, // Is this animation complete?
			"pos" : { "x":10,"y":17 }, // Position of the frames.
			"frames" : [
				"n782_text_f3" ,
				"n782_text_f4" ,
				"n782_text_f5" ,
				"n782_text_f6" ,
				"n782_text_f7" ,
				"n782_text_f8" ,
				"n782_text_f9" ,
				"n782_text_f2" ,
			],
		};

		vars.endDelay = {
			"started": false,
			"delay"  : game.secondsToFrames(1.0) ,
			"cnt"    : 0,
		};

		vars.END = false;
	},

	//
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
		_CFG.ClearVram();

		core.FUNCS.audio.stopAllSounds_midi(true);
		core.FUNCS.audio.cancelAllSounds_mp3("all");
		let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		// let fillTile = core.ASSETS.graphics.tilemaps[ "empty_square" ][2];

		// Clear the background.
		_CFG.Fill(0, 0, _CS.VRAM_TILES_H, _CS.VRAM_TILES_V, fillTile, "VRAM1")

		// Draw the first frame of the lense.
		_CFG.DrawMap2(vars.lense.pos.x,vars.lense.pos.y, vars.tilemaps["n782_flare_f1"], "VRAM1");

		// Draw the first frame of the stars.
		_CFG.DrawMap2(vars.stars.pos.x,vars.stars.pos.y, vars.tilemaps["n782_text_f1"], "VRAM1");
		// _CFG.DrawMap2(vars.stars.pos.x,vars.stars.pos.y, vars.tilemaps["n782_text_f2"], "VRAM1");

		// Fade this in.
		_CG.FADER.FUNCS.FadeIn(1, true, false);
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
			return;
		}

		// Run.
		if(vars.init){
			if(
				game.chkBtn("BTN_A"    , "btnPressed1") ||
				game.chkBtn("BTN_START", "btnPressed1")
			){
				vars.END=true;
					_CG.FADER.FUNCS.FadeOut(1, true, false);
					game.setGamestate1("TITLE1", true);
			}
			else{
				// Lense flare animation.
				if(!vars.lense.complete){
					let obj = vars.lense;

					if(obj.waitFrames >= obj.frameDelay){
						obj.waitFrames=0;
						if(obj.curFrame<obj.frames.length && obj.curFrame >=0){
							_CFG.DrawMap2(obj.pos.x,obj.pos.y,vars.tilemaps[obj.frames[obj.curFrame]],"VRAM1");
							obj.curFrame+=obj.frameDir;
						}
						else{
							if(obj.repeat_cnt>= obj.repeatsTillDone){
								obj.complete=true;
								_CFG.DrawMap2(obj.pos.x,obj.pos.y, vars.tilemaps["n782_flare_f1"], "VRAM1");
							}
							else{
								obj.repeat_cnt+=1;
								obj.frameDir *= -1;
								obj.curFrame+=obj.frameDir;
							}
						}
					}
					else{ obj.waitFrames+=1; }
				}

				// Star animation.
				if(!vars.stars.complete){
					let obj = vars.stars;

					if(obj.waitFrames >= obj.frameDelay){
						obj.waitFrames=0;
						if(obj.curFrame<obj.frames.length && obj.curFrame >=0){
							_CFG.DrawMap2(obj.pos.x,obj.pos.y,vars.tilemaps[obj.frames[obj.curFrame]],"VRAM1");
							obj.curFrame+=obj.frameDir;
						}
						else{
							if(obj.repeat_cnt>= obj.repeatsTillDone){
								obj.complete=true;
								_CFG.DrawMap2(obj.pos.x,obj.pos.y, vars.tilemaps["n782_text_f1"], "VRAM1");
							}
							else{
								obj.repeat_cnt+=1;
								obj.curFrame=0;
								_CFG.DrawMap2(obj.pos.x,obj.pos.y,vars.tilemaps[obj.frames[obj.curFrame]],"VRAM1");
								obj.curFrame+=obj.frameDir;
							}
						}
					}
					else{ obj.waitFrames+=1; }
				}

				// Done with the animations?
				if(vars.lense.complete && vars.stars.complete && !vars.endDelay.started){ vars.endDelay.started=true; }

				// Delay before progressing to the next gamestate?
				if(vars.endDelay.started){
					if(vars.endDelay.cnt >= vars.endDelay.delay){
						vars.END=true;
						_CG.FADER.FUNCS.FadeOut(1, true, false);
						game.setGamestate1("TITLE1", true);
					}
					else{
						vars.endDelay.cnt+=1;
					}
				}
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