// MAIN GAME: TYPE A

'use strict';

game.gs.PLAY = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	consts       : {
	},
	//
	prepareState : function(){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;

		vars.init=false;
		_CFG.clearSprites();
		_CFG.ClearVram();

		// Constants.
		consts.min_x_tile  = 2  ;
		consts.min_y_tile  = 4  ;
		consts.max_y_tile  = 4  ; // This is the first playgrid row.

		// X values within the game play grid.
		consts.x_lines = [
			(0+consts.min_x_tile),
			(1+consts.min_x_tile),
			(2+consts.min_x_tile),
			(3+consts.min_x_tile),
			(4+consts.min_x_tile),
			(5+consts.min_x_tile),
			(6+consts.min_x_tile),
			(7+consts.min_x_tile),
			(8+consts.min_x_tile),
			(9+consts.min_x_tile),
		];
		// Y values within the game play grid.
		consts.y_lines = [
			(19+consts.min_y_tile),
			(18+consts.min_y_tile),
			(17+consts.min_y_tile),
			(16+consts.min_y_tile),
			(15+consts.min_y_tile),
			(14+consts.min_y_tile),
			(13+consts.min_y_tile),
			(12+consts.min_y_tile),
			(11+consts.min_y_tile),
			(10+consts.min_y_tile),
			(9+consts.min_y_tile),
			(8+consts.min_y_tile),
			(7+consts.min_y_tile),
			(6+consts.min_y_tile),
			(5+consts.min_y_tile),
			(4+consts.min_y_tile),
			(3+consts.min_y_tile),
			(2+consts.min_y_tile),
			(1+consts.min_y_tile),
			(0+consts.min_y_tile),
		];

		// Variables.
		consts.dropSpeeds  = [
			game.secondsToFrames(1.00) , // 0
			game.secondsToFrames(0.90) , // 1
			game.secondsToFrames(0.80) , // 2
			game.secondsToFrames(0.70) , // 3
			game.secondsToFrames(0.60) , // 4
			game.secondsToFrames(0.50) , // 5
			game.secondsToFrames(0.40) , // 6
			game.secondsToFrames(0.30) , // 7
			game.secondsToFrames(0.20) , // 8
			game.secondsToFrames(0.15) , // 9
			// game.secondsToFrames(0.05) , // 10 // This was too fast and blocked user input.
		];
		consts.validPieces = ["T"  ,"J"  ,"Z"  ,"O"  ,"S"  ,"L"  ,"I"];

		vars.pieceCounts = {"T":0,"J":0,"Z":0,"O":0,"S":0,"L":0,"I":0};

		// Drop speed/delay
		vars.dropSpeedIndex = gs.temp.dropSpeedIndex ;
		vars.dropSpeed      = consts.dropSpeeds[ vars.dropSpeedIndex ] ;
		vars.dropSpeed_cnt  = 0                               ;

		// Input speed/delay
		consts.inputSpeed   = game.secondsToFrames(0.10);
		vars.inputSpeed_cnt = 0 ;

		vars.END                = false           ;
		vars.currentPiece       = ""              ;
		vars.currentMatrix      = ""              ;
		vars.currSprite_indexes = []              ;
		vars.currentMap         = ""              ;
		vars.gameOver           = false           ;
		vars.rotationIndex      = 0               ;
		vars.matrix_x           = consts.min_x_tile ; // Position of the falling piece.
		vars.matrix_y           = consts.min_y_tile ; // Position of the falling piece.

		vars.nextPiece ; // Next piece.

		// Scoring
		vars.lines = 0;
		vars.score = 0;
		vars.level = gs.temp.level;
		vars.type  = gs.temp.type;

		// Line clearing.
		vars.linesCleared           = false;
		consts.linesCleared_speed   = game.secondsToFrames(0.075);
		consts.linesCleared_flashes = 5;
		vars.linesCleared_f_Cnt     = 0;
		vars.linesCleared_cnt       = 0;

		vars.field = {
			"org" : [] , // Before line clear.
			"adj" : [] , // During line clear.
			"new" : [] , // After line clear.
		};

		vars.instantDrop = false;

		vars.paused = false;
		vars.prev_vram1=[];
		vars.prev_vram2=[];
		vars.menuActive = false;

		vars.nextPiece = "";

		vars.blacktile    = core.ASSETS.graphics.tilemaps["blacktile"][2];
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		_CFG.ClearVram();

		_CFG.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["main_game"], "VRAM1"); // PLAY

		// Determine the first piece.
		vars.nextPiece = consts.validPieces[ game.getRandomInt_inRange(0, consts.validPieces.length-1) ];

		// gs.updatePieceCounts(vars.currentPiece);
		gs.startNextTurn();

		gs.clearPieceCounts();

		// Start the music!
		if(game.gs.PLAY.temp.music){ core.FUNCS.audio.play_midi  ( "BGM1", gs.temp.music, true, 1.0 ); }
	},
	//
	main         : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Game over?
		else if(vars.gameOver){
			console.log("yup, game over!");
			if(JSGAME.FLAGS.debug){ game.DEBUG.updateDebugDisplay(); }
			throw "done!";
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;
		}

		// Run.
		if(vars.init){
			if(0){
			}
			else {
				// Is the pause active?
				if(vars.paused){
					if( game.chkBtn("BTN_START"    , "btnPressed1") ){
						// Restore previous VRAMs.
						_CFG.DrawMap2(0, 0, vars.prev_vram1, "VRAM1");
						_CFG.DrawMap2(0, 0, vars.prev_vram2, "VRAM2");

						vars.currSprite_indexes.forEach(function(d){
							let flags = _CFG.setSpriteFlag(_CG.sprites[d].flags, "SPRITE_OFF", "OFF");
							_CFG.changeSpriteFlags(d, flags);
						});
						_CG.flags.SPRITE=true;

						// Clear the paused flag.
						vars.paused=false;

						// Resume the music.
						if(game.gs.PLAY.temp.music){ core.FUNCS.audio.resume_midi( "BGM1"); }
						return;
					}
					return;
				}

				// Is a piece in the process of being removed?
				if(vars.linesCleared){
					// Ready for the next animation?
					if(vars.linesCleared_cnt >= consts.linesCleared_speed){
						vars.linesCleared_cnt  = 0;

						// Flashed enough times? Stop the animation.
						if(vars.linesCleared_f_Cnt >= consts.linesCleared_flashes){
							// Clear the flag.
							vars.linesCleared=false;

							// Draw the new field.
							_CFG.DrawMap2(consts.min_x_tile, consts.min_y_tile, vars.field.new );

							gs.updatePieceCounts(vars.currentPiece);
							gs.startNextTurn();
						}
						else{
							if(vars.linesCleared_f_Cnt%2==0){
								_CFG.DrawMap2(consts.min_x_tile, consts.min_y_tile, vars.field.adj );
							}
							else{
								_CFG.DrawMap2(consts.min_x_tile, consts.min_y_tile, vars.field.org );
							}

							vars.linesCleared_f_Cnt +=1 ;
							vars.linesCleared_cnt += 1;
						}

					}
					else{
						vars.linesCleared_cnt += 1;
					}

					return;
				}

				// Do we move the piece down (auto-decend?)
				if( vars.instantDrop || (vars.dropSpeed_cnt >= vars.dropSpeed) ){
					// Can the piece move down?
					if( gs.canThePieceBeDrawn("DOWN") ){
						// YES: Drop the piece one tile down after a certain time.
						game.gs.PLAY.vars.matrix_y+=1;
						game.gs.PLAY.drawCurrentPiece();
						vars.dropSpeed_cnt=0;
						vars.inputSpeed_cnt=0;
					}
					else{
						// 1 NO:  If at the top then game over.
						if( vars.matrix_y == consts.max_y_tile ){
							if(vars.instantDrop){ vars.instantDrop = false ; }
							gs.clearBoard(0);
							// vars.gameOver=true;
							// gs.gameOver();
						}
						// 2 NO:  Else, next piece.
						else{
							if(vars.instantDrop){ vars.instantDrop = false ; }

							// Save the sprite as VRAM tiles at their present location.
							gs.currentPiecetoVRAM1();

							// Clear the sprites.
							_CFG.clearSprites();

							// Detect completed lines!
							let linesCleared = gs.detectCompletedLines();

							// Spawn the next piece right away if no lines were cleared.
							if(!linesCleared){
								gs.updatePieceCounts(vars.currentPiece);
								gs.startNextTurn();
							}
						}
					}
				}
				// Increment the dropSpeed_cnt.
				else{
					vars.dropSpeed_cnt  += 1;
				}

				// Pause?
				if     ( game.chkBtn("BTN_START"    , "btnPressed1") ){
					// Copy VRAM1 and VRAM2.
					vars.prev_vram1 = _CFG.vramRegionToTilemap(0,0, _CS.VRAM_TILES_H, _CS.VRAM_TILES_V, "VRAM1");
					vars.prev_vram2 = _CFG.vramRegionToTilemap(0,0, _CS.VRAM_TILES_H, _CS.VRAM_TILES_V, "VRAM2");

					// Clear VRAM1 and VRAM2.
					_CFG.Fill(0,0,_CS.VRAM_TILES_H,_CS.VRAM_TILES_V, vars.blacktile, "VRAM1");
					_CFG.Fill(0,0,_CS.VRAM_TILES_H,_CS.VRAM_TILES_V, vars.blacktile, "VRAM2");

					// Draw the pause text.
					let text = "-- PAUSED --";
					let x    = (_CS.VRAM_TILES_H/2)-text.length+(text.length/2);
					let y    = (_CS.VRAM_TILES_V/2)-1;
					game.SHARED.drawMenu_box(x-2, y-2, 16, 5, game.SHARED.menuStyle1, vars.blacktile);
					_CFG.Print(x, y, text, "VRAM2");

					// Turn off the active sprites.
					vars.currSprite_indexes.forEach(function(d){
						let flags = _CFG.setSpriteFlag(_CG.sprites[d].flags, "SPRITE_OFF", "ON");
						_CFG.changeSpriteFlags(d, flags);
					});
					_CG.flags.SPRITE=true;

					// Set the paused flag.
					vars.paused=true;

					// Pause the music.
					core.FUNCS.audio.stop_midi("BGM1", false);
					return;
				}
				// Menu?
				else if( game.chkBtn("BTN_SELECT"    , "btnPressed1") ){
					// vars.menuActive=true;
				}

				// Instant drop?
				else if( game.chkBtn("BTN_UP"    , "btnPressed1") ){
					core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);
					vars.instantDrop=true;
					vars.dropSpeed_cnt=0;
					vars.inputSpeed_cnt=0;
					return;
				}
				// Move the piece DOWN, LEFT, or RIGHT?
				else if(vars.inputSpeed_cnt >= consts.inputSpeed){
					// Handle directional user input.
					if     ( game.chkBtn("BTN_DOWN" , "btnHeld1") ){
						if( gs.canThePieceBeDrawn("DOWN" ) ) {
							core.FUNCS.audio.playSound_mp3("cursorTick1", true, 1.0);
							game.gs.PLAY.vars.matrix_y+=1;
							game.gs.PLAY.drawCurrentPiece();
							vars.dropSpeed_cnt=0;
						}
						vars.inputSpeed_cnt=0;
					}
					else if( game.chkBtn("BTN_LEFT" , "btnHeld1") ){
						if( gs.canThePieceBeDrawn("LEFT" ) ) {
							core.FUNCS.audio.playSound_mp3("cursorTick1", true, 1.0);
							game.gs.PLAY.vars.matrix_x-=1;
							game.gs.PLAY.drawCurrentPiece();
						}
						vars.inputSpeed_cnt=0;
					}
					else if( game.chkBtn("BTN_RIGHT", "btnHeld1") ){
						if( gs.canThePieceBeDrawn("RIGHT") ) {
							core.FUNCS.audio.playSound_mp3("cursorTick1", true, 1.0);
							game.gs.PLAY.vars.matrix_x+=1;
							game.gs.PLAY.drawCurrentPiece();
						}
						vars.inputSpeed_cnt=0;
					}

					// if(reset){ vars.inputSpeed_cnt=0; }
					// else     { vars.inputSpeed_cnt += 1; }
				}
				else{ vars.inputSpeed_cnt += 1; }

				// Rotate the piece LEFT or RIGHT?
				// if(vars.inputSpeed_cnt != 0 && ! vars.instantDrop){
				if(! vars.instantDrop){
					if     ( game.chkBtn("BTN_A"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_RIGHT" ) ) { gs.rotatePiece("R_RIGHT"); core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0); gs.drawCurrentPiece(); } }
					else if( game.chkBtn("BTN_B"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_LEFT"  ) ) { gs.rotatePiece("R_LEFT") ; core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0); gs.drawCurrentPiece(); } }
				}
			}
		}
	},

	// *** SUPPORT FUNCTIONS ***

	// TESTING

	//
	gameOver              : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		console.log("game over");

		if(1){
			vars.gameOver=true;
		}
	},

	// WORKING
	startNextTurn : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// Spawn a piece.
		gs.spawnPiece( vars.nextPiece );

		// Set the next piece.
		vars.nextPiece = consts.validPieces[ game.getRandomInt_inRange(0, consts.validPieces.length-1) ];
		gs.updateNextPiece();

		// Update the stats.
		gs.updateStats();
	},
	//
	convert2dTo1d         : function(arr){
		let new_arr = [];

		for(var i = 0; i < arr.length; i++){
			new_arr = new_arr.concat(arr[i]);
		}

		return new_arr;
	},
	//
	playboardVramToArray  : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		let x_lines = consts.x_lines;
		let y_lines = consts.y_lines;

		//
		let field = [];

		// Copy the VRAM block into the field.
		for(let y=y_lines.length-1; y>=0; y-=1){
			// Create the row (blank.)

			// OLD WAY
			// let newRow=[];
			// Populate the row from VRAM data.
			// for(let x=0; x<x_lines.length; x+=1){
			// 	newRow.push( _CG.VRAM1[ ( ( y_lines[y] ) * _CS.VRAM_TILES_H) + ( x_lines[x] ) ] );
			// }

			// NEW WAY
			let newRow = _CFG.vramRegionToTilemap(x_lines[0], y_lines[y], x_lines.length, 1, "VRAM1");
			// Remove the indexes containing width and height since they are not needed.
			newRow.shift();
			newRow.shift();

			// Add the completed row.
			field.push(newRow);
		}

		return field;
	},
	//
	detectCompletedLines  : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		let X_tile = core.ASSETS.graphics.tilemaps[ "X_tile" ][2];

		vars.field.org = gs.playboardVramToArray();
		let oldFields  = gs.playboardVramToArray();
		let newFields = [];

		// The playboard has 20 lines all 10 tiles wide.
		let linesCleared = 0;

		// Determine all lines that are complete.
		for(let y=0; y<20; y+=1){
			let completedLine=true;

			for(let x=0; x<10; x+=1){
				let thisTile = oldFields[y][x];
				// Is the tile solid?
				if(game.SHARED.solidBg1Tiles.indexOf( thisTile ) == -1){
					// No? Clear flag and break.
					completedLine=false;
					break;
				}
			}

			// If a line is completed, clear the line and then reset y and scan again.
			if(completedLine){
				linesCleared+=1;

				// Replace the row with X.
				oldFields[y] = [X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile,X_tile] ;
			}
			else{
				newFields.push( oldFields[y].map(function(d){ return d; }) );
			}
		}

		if(linesCleared){
			// Recreate the fields array.

			// Shift to the top the number of rows removed.
			for(let i=0; i<linesCleared; i+=1){
				let empty_square = core.ASSETS.graphics.tilemaps[ "empty_square" ][2];
				newFields.unshift( [
					empty_square,empty_square,empty_square,empty_square,empty_square,
					empty_square,empty_square,empty_square,empty_square,empty_square
				] );
			}

			//
			oldFields      = gs.convert2dTo1d(oldFields);
			newFields      = gs.convert2dTo1d(newFields);
			vars.field.org = gs.convert2dTo1d(vars.field.org) ;

			//
			vars.field.org.unshift( 0 );
			vars.field.org.unshift( 0 );
			vars.field.org[0] = 10;
			vars.field.org[1] = 20;

			//
			oldFields.unshift( 0 );
			oldFields.unshift( 0 );
			oldFields[0] = 10;
			oldFields[1] = 20;

			//
			newFields.unshift( 0 );
			newFields.unshift( 0 );
			newFields[0] = 10;
			newFields[1] = 20;

			//
			vars.field.adj = oldFields ;
			vars.field.new = newFields ;

			// Add to the line count.
			vars.lines += linesCleared;
			gs.updateLineCount();

			// Add to the score.
			switch(linesCleared){
				case 1 : { vars.score += ( 40   + ((vars.level+gs.temp.level)*40  ) ); break; } // Single
				case 2 : { vars.score += ( 100  + ((vars.level+gs.temp.level)*100 ) ); break; } // Double
				case 3 : { vars.score += ( 300  + ((vars.level+gs.temp.level)*300 ) ); break; } // Triple
				case 4 : { vars.score += ( 1200 + ((vars.level+gs.temp.level)*1200) ); break; } // Tetris
				default : {
					vars.score += 0 ;
					console.log("this should not have happened. linesCleared:", linesCleared);
					break;
				}
			}
			gs.updateScore();

			// Change the level?
			let old_level = vars.level;
			gs.updateLevel();
			if(old_level != vars.level && gs.temp.level < vars.level){ gs.setNextDropSpeed("UP"); }

			// Start the flash animation.
			vars.linesCleared            = true;
			vars.linesCleared_f_Cnt = 0;
			vars.linesCleared_cnt        = 0;
			vars.linesCleared_cnt = consts.linesCleared_speed;

			return linesCleared;
		}
		else { return 0; }
	},
	// Updates ALL stats (convenience function.)
	updateStats           : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		gs.updateLineCount();
		gs.updateScore();
		gs.updateLevel();
		// gs.clearPieceCounts();
		gs.updateType();
		gs.updateNextPiece();

		_CFG.Print(17, 11, "-STATS-", "VRAM2");
	},
	//
	updateLineCount       : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		_CFG.Fill(15, 19, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.lines.toString().padStart(5, " ");
		_CFG.Print(15, 19-1, "LINES", "VRAM2");
		_CFG.Print(15, 19, str, "VRAM2");
	},
	//
	updateType            : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		_CFG.Fill(15, 22, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.type.toString().padStart(5, " ");
		_CFG.Print(15, 22-1, "TYPE "   , "VRAM2");
		_CFG.Print(15, 22, str, "VRAM2");

	},
	//
	updateScore           : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		_CFG.Fill(21, 22, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.score.toString().padStart(5, " ");
		_CFG.Print(21, 22-1, "SCORE", "VRAM2");
		_CFG.Print(21, 22, str, "VRAM2");
	},
	//
	updateLevel           : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// Determine current level value.
		vars.level = parseInt( (vars.lines / 10),10);

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		_CFG.Fill(21, 19, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=(vars.level+gs.temp.level).toString().padStart(5, " ");
		_CFG.Print(21, 19-1, "LEVEL", "VRAM2");
		_CFG.Print(21, 19, str, "VRAM2");
	},
	//
	updateNextPiece       : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// T_map :: purple
		// J_map :: green
		// Z_map :: orange
		// O_map :: red
		// S_map :: d blue
		// L_map :: yellow
		// I_map :: l blue

		let map = core.ASSETS.graphics.tilemaps[ vars.nextPiece + "_map"];
		if(!map){ console.log("updateNextPiece: map not found!"); return; }

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		_CFG.Fill(19, 5, 5, 4, blacktile, "VRAM1");

		// Draw the tile map.
		_CFG.DrawMap2(20,6, map, "VRAM1");

		// Draw the "NEXT".
		_CFG.Print(18, 5 , "N"      , "VRAM2");
		_CFG.Print(18, 6 , "E"      , "VRAM2");
		_CFG.Print(18, 7 , "X"      , "VRAM2");
		_CFG.Print(18, 8 , "T"      , "VRAM2");

	},
	//
	clearPieceCounts      : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		let keys = Object.keys( vars.pieceCounts );
		for(let i = 0; i<keys.length; i+=1){
			let key = keys[i];
			vars.pieceCounts[key]=0;
		}
		let str;
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];

		_CFG.Fill(17, 13, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[0] ].toString().padStart(3, "0");
		_CFG.Print(17, 13, str, "VRAM2");

		_CFG.Fill(17, 14, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[1] ].toString().padStart(3, "0");
		_CFG.Print(17, 14, str, "VRAM2");

		_CFG.Fill(17, 15, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[2] ].toString().padStart(3, "0");
		_CFG.Print(17, 15, str, "VRAM2");

		_CFG.Fill(17, 16, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[3] ].toString().padStart(3, "0");
		_CFG.Print(17, 16, str, "VRAM2");

		_CFG.Fill(23, 14, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[4] ].toString().padStart(3, "0");
		_CFG.Print(23, 14, str, "VRAM2");

		_CFG.Fill(23, 13, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[5] ].toString().padStart(3, "0");
		_CFG.Print(23, 13, str, "VRAM2");

		_CFG.Fill(23, 15, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[6] ].toString().padStart(3, "0");
		_CFG.Print(23, 15, str, "VRAM2");
	},
	//
	updatePieceCounts     : function(type){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		let x;
		let y;

		switch(type){
			case "T" : { x=17 ; y=13; break; } // purple
			case "J" : { x=17 ; y=14; break; } // green
			case "Z" : { x=23 ; y=13; break; } // yellow
			case "O" : { x=23 ; y=14; break; } // d blue
			case "S" : { x=17 ; y=15; break; } // orange
			case "L" : { x=17 ; y=16; break; } // red
			case "I" : { x=23 ; y=15; break; } // l blue
			default : {
				console.log("INVALID PIECE SPECIFIED!", type);
				return;
				break;
			}
		};

		// Increment the count
		vars.pieceCounts[type]+=1;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		_CFG.Fill(x, y, 3,1, blacktile, "VRAM1");

		// Draw the count text.
		let str = vars.pieceCounts[type].toString().padStart(3, "0") ;
		_CFG.Print(x, y, str, "VRAM2");
	},
	//
	clearBoard            : function(){
		// Clears the VRAM of the playing board.

		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		let empty_square = core.ASSETS.graphics.tilemaps[ "empty_square" ][2];
		_CFG.Fill(consts.min_x_tile, consts.min_y_tile, 10, 20, empty_square, "VRAM1");
	},
	//
	setDropSpeed          : function(index){
		// game.gs[game.gamestate].setDropSpeed(0);
		// game.gs[game.gamestate].setNextDropSpeed("UP");
		// game.gs[game.gamestate].setNextDropSpeed("DOWN");

		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		if(consts.dropSpeeds[index]){
			vars.dropSpeed     = consts.dropSpeeds[index] ;
			vars.dropSpeed_cnt = 0                  ;

			// console.log("Speed has been set to index:", index);
		}
		else{
			console.log("Invalid drop speed index was specified!");
		}
	},
	//
	setNextDropSpeed      : function(dir){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		let len = consts.dropSpeeds.length;

		if(dir=="DOWN"){
			if( vars.dropSpeedIndex == 0 )    { }
			else                              { vars.dropSpeedIndex--; }
		}

		else if(dir=="UP"){
			if( vars.dropSpeedIndex == len-1 ) { }
			else                               { vars.dropSpeedIndex++;  }
		}

		gs.setDropSpeed( vars.dropSpeedIndex );
	},
	//
	currentPiecetoVRAM1   : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		// currSprite_indexes
		let len = vars.currSprite_indexes.length;
		for(let i=0; i<len; i+=1){
			let index  = vars.currSprite_indexes[i]   ;
			let sprite = _CG.sprites[index] ;
			let map;
			let sprTileId;
			let bgTileIndex;

			// Get the index of this tile (sp and bg.)
			switch( sprite.tileIndex ){
				case core.ASSETS.graphics.tilemaps["T_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["T_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["T_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["J_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["J_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["J_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["Z_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["Z_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["Z_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["O_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["O_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["O_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["S_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["S_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["S_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["L_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["L_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["L_bgtile"][2];
					break;
				}
				case core.ASSETS.graphics.tilemaps["I_sptile"][2] : {
					sprTileId   = core.ASSETS.graphics.tilemaps["I_sptile"][2];
					bgTileIndex = core.ASSETS.graphics.tilemaps["I_bgtile"][2];
					break;
				}
				default : { console.log(i-1, i, sprite.tileIndex, "-- INVALID PIECE SPECIFIED!"); break; }
			};

			// Write this to VRAM at the correct position. (Expects that sprite and bg x,y are fully aligned.
			_CFG.SetTile(
				sprite.x/_CS.TILE_WIDTH,
				sprite.y/_CS.TILE_HEIGHT,
				bgTileIndex,
				"VRAM1"
			);

		}
	},
	//
	spawnPiece            : function( type ){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		switch(type){
			case "T" : { vars.currentMap = "T_sptile"; break; } // purple
			case "J" : { vars.currentMap = "J_sptile"; break; } // green
			case "Z" : { vars.currentMap = "Z_sptile"; break; } // orange
			case "O" : { vars.currentMap = "O_sptile"; break; } // red
			case "S" : { vars.currentMap = "S_sptile"; break; } // d blue
			case "L" : { vars.currentMap = "L_sptile"; break; } // yellow
			case "I" : { vars.currentMap = "I_sptile"; break; } // l blue
			default : { console.log("INVALID PIECE SPECIFIED!", type); return; break; }
		};

		vars.currentPiece  = type;
		vars.rotationIndex = game.pieces_spawnIndexes[vars.currentPiece] ;
		vars.currentMatrix = game.pieces[ vars.currentPiece ][ vars.rotationIndex ];

		vars.matrix_x = consts.min_x_tile;
		vars.matrix_y = consts.min_y_tile;

		gs.drawCurrentPiece();

		// Reset the drop counter.
		vars.dropSpeed_cnt=0;

	},
	//
	canThePieceBeDrawn    : function(movement){
		// Check game.playBoard and the current rotation matrix for the current piece.
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		let type;

		// Create a new temporary matrix to use for checking the sprites.
		if     ( movement=="R_LEFT" || movement=="R_RIGHT" )                                       { type="ROT"; }
		else if( movement=="UP"     || movement=="DOWN" || movement=="LEFT" || movement=="RIGHT" ) { type="DIR"; }
		else{
			// Movement NEEDS to be valid.
			console.log("canThePieceBeDrawn: Invalid movement specified.");
			return false;
		}

		// len should always be 4.
		let len = vars.currSprite_indexes.length;
		for(let i=0; i<len; i+=1){
			// Get this sprite as-is.
			let checking_sprite;
			if(type=="DIR"){
				checking_sprite = {
					"x" : _CG.sprites[ vars.currSprite_indexes[i] ].x,
					"y" : _CG.sprites[ vars.currSprite_indexes[i] ].y,
					"w" : _CS.TILE_WIDTH                             ,
					"h" : _CS.TILE_HEIGHT                            ,
				};
			}
			// Get the next rotation position for this sprite.
			else if(type=="ROT"){
				let rot_len = game.pieces[ vars.currentPiece ].length;
				let temp_rotationIndex = vars.rotationIndex;

				if(movement=="R_LEFT" ){
					if( temp_rotationIndex == 0         ) { temp_rotationIndex = rot_len-1; }
					else                                  { temp_rotationIndex --;          }
				}
				else if(movement=="R_RIGHT"){
					if( temp_rotationIndex == rot_len-1 ) { temp_rotationIndex = 0;         }
					else                                  { temp_rotationIndex ++;          }
				}
				else{ console.log("ERROR!"); }

				let _x = (game.pieces[ vars.currentPiece ][ temp_rotationIndex ][i][0] * _CS.TILE_WIDTH ) + ((3+vars.matrix_x  ) * _CS.TILE_WIDTH  ); // x;
				let _y = (game.pieces[ vars.currentPiece ][ temp_rotationIndex ][i][1] * _CS.TILE_HEIGHT) + (  (vars.matrix_y-2) * _CS.TILE_HEIGHT ); // y;

				checking_sprite = {
					"x" : _x                        ,
					"y" : _y                        ,
					"w" : _CS.TILE_WIDTH  ,
					"h" : _CS.TILE_HEIGHT ,
				};
			}

			// Adjust the sprite location that will be checked.
			switch(movement){
				case "UP"      : { checking_sprite.y -= _CS.TILE_HEIGHT; break; }
				case "DOWN"    : { checking_sprite.y += _CS.TILE_HEIGHT; break; }
				case "LEFT"    : { checking_sprite.x -= _CS.TILE_WIDTH ; break; }
				case "RIGHT"   : { checking_sprite.x += _CS.TILE_WIDTH ; break; }
				case "R_LEFT"  : { break; }
				case "R_RIGHT" : { break; }
				default        : { return; break; }
			};

			// Determine the x, y for the bg tile based on the checking_sprite.
			let checking_bgtile = {
				// Get the pixel coords for the tile.
				"x" : parseInt((checking_sprite.x / _CS.TILE_WIDTH ) * _CS.TILE_WIDTH , 10) ,
				"y" : parseInt((checking_sprite.y / _CS.TILE_HEIGHT) * _CS.TILE_HEIGHT, 10) ,

				// Get the tile grid coords for the tile.
				"xT" : parseInt((checking_sprite.x / _CS.TILE_WIDTH ), 10) ,
				"yT" : parseInt((checking_sprite.y / _CS.TILE_HEIGHT), 10) ,

				"w" : _CS.TILE_WIDTH  ,
				"h" : _CS.TILE_HEIGHT ,
			};

			let fullOverlap = ( (checking_sprite.x == checking_bgtile.x) && (checking_sprite.y == checking_bgtile.y) ? true : false );

			// Perform the easier collision detection?
			// let bg_tileId = _CG.VRAM1[ (_CS.VRAM_TILES_H * checking_bgtile.yT) + checking_bgtile.xT ];
			let bg_tileId = _CFG.GetTile(checking_bgtile.xT, checking_bgtile.yT, "VRAM1");

			if(fullOverlap && game.SHARED.solidBg1Tiles.indexOf(bg_tileId) != -1){
				// We have an exact overlap. And the bg_tileId is a solid tile.
				// The draw must be denied.

				// console.log("Cannot draw");
				return false; // CanNOT draw.
			}

		}

		// Getting here means there were no blocking collisions. Return true.

		// console.log("CAN draw");
		return true;
	},
	//
	drawCurrentPiece      : function(){
		let gs    = this;
		let vars  = gs.vars;
		let consts = gs.consts;

		_CFG.clearSprites();

		// Draw the matrix.
		let spriteNum=0;

		vars.currSprite_indexes = [];

		// Draw 4 sprites (each block always has 4 sprites.)
		for(let i=0; i<4; i+=1){

			_CFG.MapSprite2(
				spriteNum,
				core.ASSETS.graphics.tilemaps[vars.currentMap],
				0 | _CC["SPRITE_BANK0"]
			);

			_CFG.MoveSprite(
				spriteNum,
				(vars.currentMatrix[i][0] * _CS.TILE_WIDTH)  + ((3+vars.matrix_x  ) * _CS.TILE_WIDTH  ), // x
				(vars.currentMatrix[i][1] * _CS.TILE_HEIGHT) + (  (vars.matrix_y-2) * _CS.TILE_HEIGHT ), // y
				core.ASSETS.graphics.tilemaps[vars.currentMap][0],
				core.ASSETS.graphics.tilemaps[vars.currentMap][1]
			);

			vars.currSprite_indexes.push(spriteNum);

			spriteNum+=1;
		}

	},
	//
	rotatePiece           : function(dir){
		let gs   = this;
		let vars = gs.vars;
		let consts = gs.consts;

		let len = vars.currentMatrix.length;

		// Update the rotationIndex.
		if(dir=="R_LEFT" ){
			if( vars.rotationIndex == 0 ) { vars.rotationIndex = len-1; }
			else                          { vars.rotationIndex --;      }
		}
		else if(dir=="R_RIGHT"){
			if( vars.rotationIndex == len-1 ) { vars.rotationIndex = 0; }
			else                              { vars.rotationIndex ++;  }
		}

		// Update the currentMatrix.
		vars.currentMatrix = game.pieces[ vars.currentPiece ][ vars.rotationIndex ];
	},
};