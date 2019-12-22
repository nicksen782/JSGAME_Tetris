// *** GAMESTATE FUNCTIONS ***

/*
ISSUES / TO DO:
	TITLE0           : DONE
	TITLE1           : DONE
	TITLE2           : DONE
	SETUP1           :
	SETUP2           :
	PLAY_A           : Still needs pause menu, gameover, more sound effects. Next piece comes too soon after a line clear.
	PLAY_B           :
	ENTER_HIGH_SCORE :

*/

// (TODO) ---- NICKSEN782 ANIMATION
game.gs.TITLE0 = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
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

			game.setGamestate1("TITLE1", true);
			vars.END = true;

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// COPYRIGHT SCREEN
game.gs.TITLE1 = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

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
			let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
			core.FUNCS.graphics.ClearVram();
			core.FUNCS.graphics.Fill(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, fillTile, "VRAM1")


			// vars.END = true;
			let xOffset = 0;
			let yOffset = 5;
			for(let y=0; y<vars.text1.length; y+=1){
				core.FUNCS.graphics.Print(xOffset, (y+yOffset), vars.text1[y], "VRAM2");
			}

			// Fade this in.
			core.GRAPHICS.FADER.FUNCS.FadeIn(2, true, false);
		}

		// Run.
		if(vars.init){
			if( game.chkBtn("BTN_START" , "btnPressed1") || vars.framesUntilDone_cnt >= vars.framesUntilDone){
				core.GRAPHICS.FADER.FUNCS.FadeOut(3, true, false);

				game.setGamestate1("TITLE2", true);
				vars.END = true;
			}
			else{
				vars.framesUntilDone_cnt+=1;
			}

		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// MAIN TITLE SCREEN
game.gs.TITLE2 = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
		vars.text1 = ["PRESS START!"];
		vars.text2 = ["            "];

		vars.xOffset_text               = 8;
		vars.yOffset_text               = 22;
		vars.framesBetweenFlashes       = game.secondsToFrames(0.40) ; // x % of max.
		vars.framesBetweenFlashes_cnt   = 0;
		vars.framesBetweenFlashes_state = false;
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

			let fillTile = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
			core.FUNCS.graphics.ClearVram();
			core.FUNCS.graphics.Fill(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, fillTile, "VRAM1")
			core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen3"], "VRAM1"); // TITLE

			// vars.END = true;

			for(let y=0; y<vars.text1.length; y+=1){
				core.FUNCS.graphics.Print(vars.xOffset_text, (y+vars.yOffset_text), vars.text2[y], "VRAM2");
			}

			core.GRAPHICS.FADER.FUNCS.FadeIn (3, true, false);

		}

		// Run.
		if(vars.init){
			// Dismiss this screen when the user presses start.
			if( game.chkBtn("BTN_START" , "btnPressed1") ){
				game.setGamestate1("PLAY_A", true);
				vars.END = true;
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
// (TODO) ---- SETUP FOR: MUSIC, GAME TYPE
game.gs.SETUP1 = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
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

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// (TODO) ---- LEVEL SELECTION, HIGH SCORES (A TYPE: LEVELS, HIGHSCORE, B TYPE: LEVELS, HIGH SCORE, HEIGHT.)
game.gs.SETUP2 = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
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

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// MAIN GAME: TYPE A
game.gs.PLAY_A = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		// Constants.
		vars.min_x_tile  = 2  ;
		vars.min_y_tile  = 4  ;
		vars.max_y_tile  = 4  ; // This is the first playgrid row.

		// X values within the game play grid.
		vars.x_lines = [
			(0+vars.min_x_tile),
			(1+vars.min_x_tile),
			(2+vars.min_x_tile),
			(3+vars.min_x_tile),
			(4+vars.min_x_tile),
			(5+vars.min_x_tile),
			(6+vars.min_x_tile),
			(7+vars.min_x_tile),
			(8+vars.min_x_tile),
			(9+vars.min_x_tile),
		];
		// Y values within the game play grid.
		vars.y_lines = [
			(19+vars.min_y_tile),
			(18+vars.min_y_tile),
			(17+vars.min_y_tile),
			(16+vars.min_y_tile),
			(15+vars.min_y_tile),
			(14+vars.min_y_tile),
			(13+vars.min_y_tile),
			(12+vars.min_y_tile),
			(11+vars.min_y_tile),
			(10+vars.min_y_tile),
			(9+vars.min_y_tile),
			(8+vars.min_y_tile),
			(7+vars.min_y_tile),
			(6+vars.min_y_tile),
			(5+vars.min_y_tile),
			(4+vars.min_y_tile),
			(3+vars.min_y_tile),
			(2+vars.min_y_tile),
			(1+vars.min_y_tile),
			(0+vars.min_y_tile),
		];

		// Variables.
		vars.dropSpeeds         = [
			game.secondsToFrames(1.00) , // 0
			game.secondsToFrames(0.90) , // 1
			game.secondsToFrames(0.80) , // 2
			game.secondsToFrames(0.70) , // 3
			game.secondsToFrames(0.60) , // 4
			game.secondsToFrames(0.50) , // 5
			game.secondsToFrames(0.40) , // 6
			game.secondsToFrames(0.30) , // 7
			game.secondsToFrames(0.20) , // 8
			game.secondsToFrames(0.10) , // 9
			game.secondsToFrames(0.05) , // 10
		];
		vars.validPieces = ["T"  ,"J"  ,"Z"  ,"O"  ,"S"  ,"L"  ,"I"];

		vars.pieceCounts = {"T":0,"J":0,"Z":0,"O":0,"S":0,"L":0,"I":0,};

		// Drop speed/delay
		vars.dropSpeedIndex     = 0 ;
		vars.dropSpeed          = vars.dropSpeeds[ vars.dropSpeedIndex ] ;
		vars.dropSpeed_cnt      = 0                               ;

		// Input speed/delay
		vars.inputSpeed     = game.secondsToFrames(0.075);
		vars.inputSpeed_cnt = 0 ;

		vars.END                = false           ;
		vars.currentPiece       = ""              ;
		vars.currentMatrix      = ""              ;
		vars.currSprite_indexes = []              ;
		vars.currentMap         = ""              ;
		vars.gameOver           = false           ;
		vars.rotationIndex      = 0               ;
		vars.matrix_x           = vars.min_x_tile ; // Position of the falling piece.
		vars.matrix_y           = vars.min_y_tile ; // Position of the falling piece.

		vars.nextPiece ; // Next piece.

		// Scoring
		vars.lines = 0;
		vars.score = 0;
		vars.level = 0;
		vars.type = "A";

		// Line clearing.
		vars.linesBeingCleared            = false;
		vars.linesBeingCleared_speed      = game.secondsToFrames(0.075);
		vars.linesBeingCleared_flashes    = 5;
		vars.linesBeingCleared_flashesCnt = 0;
		vars.linesBeingCleared_cnt        = 0;

		vars.field = {
			"org" : [] , // Before line clear.
			"adj" : [] , // During line clear.
			"new" : [] , // After line clear.
		};

		vars.instantDrop = false;
	},
	//
	main         : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Game over?
		else if(vars.gameOver){
			console.log("yup, game over!");
			if(JSGAME.SHARED.debug){ game.DEBUG.updateDebugDisplay(); }
			throw "done!";
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;

			core.FUNCS.graphics.ClearVram();

			core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen1"], "VRAM1"); // PLAY
			// vars.END = true;

			// Clears.
			gs.updateStats();

			// Determine the next piece.
			vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];
			gs.updateNextPiece();

			// Spawn a piece.
			gs.spawnPiece( vars.nextPiece );

			// Determine the next piece.
			vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];
			gs.updateNextPiece();

			// Start the theme music!
			// core.FUNCS.audio.play_midi  ( "BGM1", "TETRIS_A_THEME_MID", true, 1.0 );
			core.FUNCS.audio.play_midi  ( "BGM1", "TETRIS_B_THEME_MID", true, 1.0 );
			// core.FUNCS.audio.play_midi  ( "BGM1", "TETRIS_C_THEME_MID", true, 1.0 );
		}

		// Run.
		if(vars.init){
			// // Handle user-input: pause (start).
			// if     ( game.chkBtn("BTN_START"     , "btnPressed1") ){ console.log("START"); }

			// // Handle user-input: menu (select).
			// if     ( game.chkBtn("BTN_SELECT"     , "btnPressed1") ){ console.log("SELECT"); }

			if(0){
			}
			else {
				// Is a piece in the process of being removed?
				if(vars.linesBeingCleared){
					// Ready for the next animation?
					if(vars.linesBeingCleared_cnt >= vars.linesBeingCleared_speed){
						vars.linesBeingCleared_cnt  = 0;

						// Flashed enough times? Stop the animation.
						if(vars.linesBeingCleared_flashesCnt >= vars.linesBeingCleared_flashes){
							// Clear the flag.
							vars.linesBeingCleared=false;

							// Draw the new field.
							core.FUNCS.graphics.DrawMap2(vars.min_x_tile, vars.min_y_tile, vars.field.new );
						}
						else{
							// if(vars.linesBeingCleared_flashesCnt%2==0 && vars.linesBeingCleared_flashesCnt !=0){
							if(vars.linesBeingCleared_flashesCnt%2==0){
								core.FUNCS.graphics.DrawMap2(vars.min_x_tile, vars.min_y_tile, vars.field.adj );
							}
							else{
								core.FUNCS.graphics.DrawMap2(vars.min_x_tile, vars.min_y_tile, vars.field.org );
							}

							vars.linesBeingCleared_flashesCnt +=1 ;
							vars.linesBeingCleared_cnt += 1;
						}

					}
					else{
						vars.linesBeingCleared_cnt += 1;
					}

					return;
				}

				// Do we move the piece down (auto-decend?)
				if( vars.instantDrop || (vars.dropSpeed_cnt >= vars.dropSpeed) ){
					// Can the piece move down?
					if( gs.canThePieceBeDrawn("DOWN") ){
						// YES: Drop the piece one tile down after a certain time.
						game.gs.PLAY_A.vars.matrix_y+=1;
						game.gs.PLAY_A.drawCurrentPiece();
						vars.dropSpeed_cnt=0;
						vars.inputSpeed_cnt=0;
					}
					else{
						// 1 NO:  If at the top then game over.
						if( vars.matrix_y == vars.max_y_tile ){
							if(vars.instantDrop){ vars.instantDrop = false ; }
							gs.clearBoard(0);
							// vars.gameOver=true;
							// gs.gameOver();
						}
						// 2 NO:  Else, next piece.
						else{
							if(vars.instantDrop){ vars.instantDrop = false ; }

							gs.updatePieceCounts(vars.currentPiece);

							// Save the sprite as VRAM tiles at their present location.
							gs.currentPiecetoVRAM1();

							// Clear the sprites.
							core.FUNCS.graphics.clearSprites();

							// Detect completed lines!
							gs.detectCompletedLines();

							// Determine the next piece.
							// let newIndex = game.getRandomInt_inRange(0, vars.validPieces.length-1) ;

							// Spawn a piece.
							gs.spawnPiece( vars.nextPiece );

							// Set the next piece.
							vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];
							gs.updateNextPiece();
						}
					}
				}
				// Increment the dropSpeed_cnt.
				else{
					vars.dropSpeed_cnt  += 1;
				}

				// Instant drop?
				if     ( game.chkBtn("BTN_UP"    , "btnPressed1") ){
					vars.instantDrop=true;
					vars.inputSpeed_cnt=0;
				}
				// Move the piece DOWN, LEFT, or RIGHT?
				else if(vars.inputSpeed_cnt >= vars.inputSpeed){
					let reset=false;

					// Handle directional user input.
					if     ( game.chkBtn("BTN_DOWN"  , "btnHeld1") ){ if( gs.canThePieceBeDrawn("DOWN" )   ) {game.gs.PLAY_A.vars.matrix_y+=1; game.gs.PLAY_A.drawCurrentPiece(); } reset=true; vars.dropSpeed_cnt=0; }
					else if( game.chkBtn("BTN_LEFT"  , "btnHeld1") ){ if( gs.canThePieceBeDrawn("LEFT" )   ) {game.gs.PLAY_A.vars.matrix_x-=1; game.gs.PLAY_A.drawCurrentPiece(); } reset=true; }
					else if( game.chkBtn("BTN_RIGHT" , "btnHeld1") ){ if( gs.canThePieceBeDrawn("RIGHT")   ) {game.gs.PLAY_A.vars.matrix_x+=1; game.gs.PLAY_A.drawCurrentPiece(); } reset=true; }

					if(reset){ vars.inputSpeed_cnt=0; }
					// else     { vars.inputSpeed_cnt += 1; }
				}
				else{ vars.inputSpeed_cnt += 1; }

				// Rotate the piece LEFT or RIGHT?
				if(vars.inputSpeed_cnt != 0 && ! vars.instantDrop){
					if     ( game.chkBtn("BTN_A"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_RIGHT" ) ) { gs.rotatePiece("R_RIGHT"); gs.drawCurrentPiece(); /*vars.dropSpeed_cnt=0;*/ } }
					else if( game.chkBtn("BTN_B"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_LEFT"  ) ) { gs.rotatePiece("R_LEFT") ; gs.drawCurrentPiece(); /*vars.dropSpeed_cnt=0;*/ } }
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

		console.log("game over");

		if(1){
			vars.gameOver=true;
		}
	},

	// WORKING

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

		let x_lines = vars.x_lines;
		let y_lines = vars.y_lines;

		//
		let field = [];

		// Copy the VRAM block into the field.
		for(let y=y_lines.length-1; y>=0; y-=1){
			// Create the row (blank.)
			let newRow=[];

			// Populate the row from VRAM data.
			for(let x=0; x<x_lines.length; x+=1){
				newRow.push( core.GRAPHICS.VRAM1[ ( ( y_lines[y] ) * core.SETTINGS.VRAM_TILES_H) + ( x_lines[x] ) ] );
			}

			// Add the completed row.
			field.push(newRow);
		}

		return field;
	},
	//
	detectCompletedLines  : function(){
		let gs    = this;
		let vars  = gs.vars;

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
				if(game.solidBg1Tiles.indexOf( thisTile ) == -1){
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
				case 1 : { vars.score += ( 40   + (vars.level*40  ) ); break; } // Single
				case 2 : { vars.score += ( 100  + (vars.level*100 ) ); break; } // Double
				case 3 : { vars.score += ( 300  + (vars.level*300 ) ); break; } // Triple
				case 4 : { vars.score += ( 1200 + (vars.level*1200) ); break; } // Tetris
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
			if(old_level != vars.level){ gs.setNextDropSpeed("UP"); }

			// Start the flash animation.
			vars.linesBeingCleared            = true;
			vars.linesBeingCleared_flashesCnt = 0;
			vars.linesBeingCleared_cnt        = 0;
			vars.linesBeingCleared_cnt = vars.linesBeingCleared_speed;
		}
	},
	// Updates ALL stats (convenience function.)
	updateStats           : function(){
		let gs    = this;
		let vars  = gs.vars;

		gs.updateLineCount();
		gs.updateScore();
		gs.updateLevel();
		gs.clearPieceCounts();
		gs.updateType();
		gs.updateNextPiece();

		core.FUNCS.graphics.Print(17, 11, "-STATS-", "VRAM2");
	},
	//
	updateLineCount       : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(15, 19, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.lines.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(15, 19-1, "LINES", "VRAM2");
		core.FUNCS.graphics.Print(15, 19, str, "VRAM2");
	},
	//
	updateType       : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(15, 22, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.type.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(15, 22-1, "TYPE "   , "VRAM2");
		core.FUNCS.graphics.Print(15, 22, str, "VRAM2");

	},
	//
	updateScore           : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(21, 22, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.score.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(21, 22-1, "SCORE", "VRAM2");
		core.FUNCS.graphics.Print(21, 22, str, "VRAM2");
	},
	//
	updateLevel           : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Determine current level value.
		vars.level = parseInt( (vars.lines / 10),10);

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(21, 19, 5,1, blacktile, "VRAM1");

		// Write the value.
		let str;
		str=vars.level.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(21, 19-1, "LEVEL", "VRAM2");
		core.FUNCS.graphics.Print(21, 19, str, "VRAM2");
	},
	//
	updateNextPiece       : function(){
		let gs    = this;
		let vars  = gs.vars;

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
		core.FUNCS.graphics.Fill(19, 5, 5, 4, blacktile, "VRAM1");

		// Draw the tile map.
		core.FUNCS.graphics.DrawMap2(20,6, map, "VRAM1");

		// Draw the "NEXT".
		core.FUNCS.graphics.Print(18, 5 , "N"      , "VRAM2");
		core.FUNCS.graphics.Print(18, 6 , "E"      , "VRAM2");
		core.FUNCS.graphics.Print(18, 7 , "X"      , "VRAM2");
		core.FUNCS.graphics.Print(18, 8 , "T"      , "VRAM2");

	},
	//
	clearPieceCounts      : function(){
		let gs    = this;
		let vars  = gs.vars;

		let keys = Object.keys( vars.pieceCounts );
		for(let i = 0; i<keys.length; i+=1){
			let key = keys[i];
			vars.pieceCounts[key]=0;
		}
		let str;
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];

		core.FUNCS.graphics.Fill(17, 13, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[0] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 13, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 14, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[1] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 14, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 15, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[2] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 15, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 16, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[3] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 16, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 14, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[4] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 14, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 13, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[5] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 13, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 15, 3,1, blacktile, "VRAM1");
		str=vars.pieceCounts[ keys[6] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 15, str, "VRAM2");
	},
	//
	updatePieceCounts     : function(type){
		let gs    = this;
		let vars  = gs.vars;

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
			default : { console.log("INVALID PIECE SPECIFIED!", type); return; break; }
		};

		// Increment the count
		vars.pieceCounts[type]+=1;

		// Clear the area.
		let blacktile    = core.ASSETS.graphics.tilemaps[ "blacktile" ][2];
		core.FUNCS.graphics.Fill(x, y, 3,1, blacktile, "VRAM1");

		// Draw the count text.
		let str = vars.pieceCounts[type].toString().padStart(3, "0") ;
		core.FUNCS.graphics.Print(x, y, str, "VRAM2");
	},
	//
	clearBoard            : function(){
		// Clears the VRAM of the playing board.

		let gs    = this;
		let vars  = gs.vars;

		let empty_square = core.ASSETS.graphics.tilemaps[ "empty_square" ][2];
		core.FUNCS.graphics.Fill(vars.min_x_tile, vars.min_y_tile, 10, 20, empty_square, "VRAM1");
	},
	//
	setDropSpeed          : function(index){
		// game.gs[game.gamestate].setDropSpeed(0);
		// game.gs[game.gamestate].setNextDropSpeed("UP");
		// game.gs[game.gamestate].setNextDropSpeed("DOWN");

		let gs    = this;
		let vars  = gs.vars;

		if(vars.dropSpeeds[index]){
			vars.dropSpeed     = vars.dropSpeeds[index] ;
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

		let len = vars.dropSpeeds.length;

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

		// currSprite_indexes
		let len = vars.currSprite_indexes.length;
		for(let i=0; i<len; i+=1){
			let index  = vars.currSprite_indexes[i]   ;
			let sprite = core.GRAPHICS.sprites[index] ;
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
			core.FUNCS.graphics.SetTile(
				sprite.x/core.SETTINGS.TILE_WIDTH,
				sprite.y/core.SETTINGS.TILE_HEIGHT,
				bgTileIndex,
				"VRAM1"
			);

		}
	},
	//
	spawnPiece            : function( type ){
		let gs    = this;
		let vars  = gs.vars;

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

		vars.matrix_x = vars.min_x_tile;
		vars.matrix_y = vars.min_y_tile;

		gs.drawCurrentPiece();

		// Reset the drop counter.
		vars.dropSpeed_cnt=0;

	},
	//
	canThePieceBeDrawn    : function(movement){
		// Check game.playBoard and the current rotation matrix for the current piece.
		let gs    = this;
		let vars  = gs.vars;

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
					"x" : core.GRAPHICS.sprites[ vars.currSprite_indexes[i] ].x,
					"y" : core.GRAPHICS.sprites[ vars.currSprite_indexes[i] ].y,
					"w" : core.SETTINGS.TILE_WIDTH                             ,
					"h" : core.SETTINGS.TILE_HEIGHT                            ,
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

				// BUG HERE???? PIECE CAN ROTATE EVEN IF IT SHOULD NOT???? vars.matrix_x, vars.matrix_y
				let _x = (game.pieces[ vars.currentPiece ][ temp_rotationIndex ][i][0] * core.SETTINGS.TILE_WIDTH ) + ((3+vars.matrix_x  ) * core.SETTINGS.TILE_WIDTH  ); // x;
				let _y = (game.pieces[ vars.currentPiece ][ temp_rotationIndex ][i][1] * core.SETTINGS.TILE_HEIGHT) + (  (vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ); // y;

				// (vars.currentMatrix[i][0] * core.SETTINGS.TILE_WIDTH)  + ((3+vars.matrix_x  ) * core.SETTINGS.TILE_WIDTH  ), // x
				// (vars.currentMatrix[i][1] * core.SETTINGS.TILE_HEIGHT) + (  (vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ), // y

				checking_sprite = {
					"x" : _x                        ,
					"y" : _y                        ,
					"w" : core.SETTINGS.TILE_WIDTH  ,
					"h" : core.SETTINGS.TILE_HEIGHT ,
				};
			}

			// Adjust the sprite location that will be checked.
			switch(movement){
				case "UP"      : { checking_sprite.y -= core.SETTINGS.TILE_HEIGHT; break; }
				case "DOWN"    : { checking_sprite.y += core.SETTINGS.TILE_HEIGHT; break; }
				case "LEFT"    : { checking_sprite.x -= core.SETTINGS.TILE_WIDTH ; break; }
				case "RIGHT"   : { checking_sprite.x += core.SETTINGS.TILE_WIDTH ; break; }
				case "R_LEFT"  : { break; }
				case "R_RIGHT" : { break; }
				default        : { return; break; }
			};

			// Determine the x, y for the bg tile based on the checking_sprite.
			let checking_bgtile = {
				// Get the pixel coords for the tile.
				"x" : parseInt((checking_sprite.x / core.SETTINGS.TILE_WIDTH ) * core.SETTINGS.TILE_WIDTH , 10),
				"y" : parseInt((checking_sprite.y / core.SETTINGS.TILE_HEIGHT) * core.SETTINGS.TILE_HEIGHT, 10),

				// Get the tile grid coords for the tile.
				"xT" : parseInt((checking_sprite.x / core.SETTINGS.TILE_WIDTH ), 10),
				"yT" : parseInt((checking_sprite.y / core.SETTINGS.TILE_HEIGHT), 10),

				"w" : core.SETTINGS.TILE_WIDTH                             ,
				"h" : core.SETTINGS.TILE_HEIGHT                            ,
			};

			let fullOverlap = ( (checking_sprite.x == checking_bgtile.x) && (checking_sprite.y == checking_bgtile.y) ? true : false );

			// Perform the easier collision detection?
			let bg_tileId = core.GRAPHICS.VRAM1[ (core.SETTINGS.VRAM_TILES_H * checking_bgtile.yT) + checking_bgtile.xT ];

			if(fullOverlap && game.solidBg1Tiles.indexOf(bg_tileId) != -1){
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

		core.FUNCS.graphics.clearSprites();

		// Draw the matrix.
		let spriteNum=0;
		// core.FUNCS.graphics.MapSprite2(
		// 	spriteNum,
		// 	core.ASSETS.graphics.tilemaps["TESTMATRIX5_5"] ,
		// 	0 | core.CONSTS["SPRITE_BANK0"]
		// );
		// core.FUNCS.graphics.MoveSprite(
		// 	spriteNum,
		// 	((vars.matrix_x+3) * core.SETTINGS.TILE_WIDTH  ), // x
		// 	((vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ), // y
		// 	core.ASSETS.graphics.tilemaps["TESTMATRIX5_5"][0],
		// 	core.ASSETS.graphics.tilemaps["TESTMATRIX5_5"][1]
		// );
		// spriteNum+=(5*5);

		vars.currSprite_indexes = [];

		// Draw 4 sprites (each block always has 4 sprites.)
		for(let i=0; i<4; i+=1){
			core.FUNCS.graphics.MapSprite2(
				spriteNum,
				core.ASSETS.graphics.tilemaps[vars.currentMap],
				0 | core.CONSTS["SPRITE_BANK0"]
			);

			core.FUNCS.graphics.MoveSprite(
				spriteNum,
				(vars.currentMatrix[i][0] * core.SETTINGS.TILE_WIDTH)  + ((3+vars.matrix_x  ) * core.SETTINGS.TILE_WIDTH  ), // x
				(vars.currentMatrix[i][1] * core.SETTINGS.TILE_HEIGHT) + (  (vars.matrix_y-2) * core.SETTINGS.TILE_HEIGHT ), // y
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
// (TODO) ---- MAIN GAME: TYPE B
game.gs.PLAY_B = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
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

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};
// (TODO) ---- HIGH SCORE ENTRY SCREEN
game.gs.ENTER_HIGH_SCORE = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
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

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};

// *** TEMPLATE GAMESTATE FUNCTION ***

// GAMESTATE TEMPLATE
game.gs.TEMPLATE = {
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
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

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};

// *** TEST GAMESTATE FUNCTIONS ***

//


