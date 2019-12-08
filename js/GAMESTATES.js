// *** GAMESTATE FUNCTIONS ***

//
game.gs.PLAY_A = {
	vars         : {
	},
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
			( (1000/core.SETTINGS.fps) * 1.00 ) , // 0
			( (1000/core.SETTINGS.fps) * 0.90 ) , // 1
			( (1000/core.SETTINGS.fps) * 0.80 ) , // 2
			( (1000/core.SETTINGS.fps) * 0.70 ) , // 3
			( (1000/core.SETTINGS.fps) * 0.60 ) , // 4
			( (1000/core.SETTINGS.fps) * 0.50 ) , // 5
			( (1000/core.SETTINGS.fps) * 0.40 ) , // 6
			( (1000/core.SETTINGS.fps) * 0.30 ) , // 7
			( (1000/core.SETTINGS.fps) * 0.20 ) , // 8
			( (1000/core.SETTINGS.fps) * 0.10 ) , // 9
			( (1000/core.SETTINGS.fps) * 0.05 ) , // 10
		];
		vars.validPieces = ["T"  ,"J"  ,"Z"  ,"O"  ,"S"  ,"L"  ,"I"];

		vars.pieceCounts = {"T":0,"J":0,"Z":0,"O":0,"S":0,"L":0,"I":0,};

		// Drop speed/delay
		vars.dropSpeedIndex     = 0 ;
		vars.dropSpeed          = vars.dropSpeeds[ vars.dropSpeedIndex ] ;
		vars.dropSpeed_cnt      = 0                               ;

		// Input speed/delay
		vars.inputSpeed     = vars.dropSpeeds[ 10 ];
		vars.inputSpeed_cnt = 0 ;

		vars.END                = false           ;
		vars.currentPiece       = ""              ;
		vars.currentMatrix      = ""              ;
		vars.currSprite_indexes = []              ;
		vars.currentMap         = ""              ;
		vars.gameOver           = false           ;
		vars.rotationIndex      = 0               ;
		vars.matrix_x           = vars.min_x_tile ;
		vars.matrix_y           = vars.min_y_tile ;

		vars.nextPiece ;

		// Scoring
		vars.lines = 9;
		vars.score = 0;
		vars.level = 0;
	},
	main         : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}
		else if(vars.gameOver){
			console.log("yup, game over!");
			if(JSGAME.SHARED.debug){ game.DEBUG.updateDebugDisplay(); }
			throw "done!";
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;

			core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen1"], "VRAM1"); // PLAY
			// vars.END = true;

			// Clears.
			gs.updateLineCount();
			gs.updateScore();
			gs.updateLevel();
			gs.clearPieceCounts();

			// Determine the next piece.
			vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];
			gs.updateNextPiece();

			// Spawn a piece.
			gs.spawnPiece( vars.nextPiece );

			// Determine the next piece.
			vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];
			gs.updateNextPiece();

			// Start the theme music!
			// core.FUNCS.audio.play_midi  ( "music1", "A_THEME", true, 1.0 );
			// core.FUNCS.audio.play_midi  ( "music1", "B_THEME", true, 1.0 );
			core.FUNCS.audio.play_midi  ( "music1", "C_THEME", true, 1.0 );
		}

		// Run.
		if(vars.init){
			// Do we move the piece down (auto-decend?)

			if(vars.dropSpeed_cnt >= vars.dropSpeed){
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
						gs.clearBoard(0);
						// vars.gameOver=true;
						// gs.gameOver();
					}
					// 2 NO:  Else, next piece.
					else{
						gs.updatePieceCounts(vars.currentPiece);

						// Save the sprite as VRAM tiles at their present location.
						gs.currentPiecetoVRAM1();

						// Clear the sprites.
						core.FUNCS.graphics.clearSprites();

						// Detect completed lines!
						gs.detectCompletedLines();

						// Determine the next piece.
						let newIndex = game.getRandomInt_inRange(0, vars.validPieces.length-1) ;

						// Spawn a piece.
						gs.spawnPiece( vars.nextPiece );

						// Set the next piece.
						vars.nextPiece = vars.validPieces[ game.getRandomInt_inRange(0, vars.validPieces.length-1) ];
						gs.updateNextPiece();
					}
				}
			}
			else{
				vars.dropSpeed_cnt  += 1;
			}

			// Handle directional user input.
			if(vars.inputSpeed_cnt >= vars.inputSpeed){
				let reset=false;

				if     ( game.chkBtn("BTN_UP"    , "btnHeld1") ){ if( gs.canThePieceBeDrawn("UP"   )   ) {game.gs.PLAY_A.vars.matrix_y-=1; game.gs.PLAY_A.drawCurrentPiece(); } reset=true; vars.dropSpeed_cnt=0; }
				else if( game.chkBtn("BTN_DOWN"  , "btnHeld1") ){ if( gs.canThePieceBeDrawn("DOWN" )   ) {game.gs.PLAY_A.vars.matrix_y+=1; game.gs.PLAY_A.drawCurrentPiece(); } reset=true; }
				else if( game.chkBtn("BTN_LEFT"  , "btnHeld1") ){ if( gs.canThePieceBeDrawn("LEFT" )   ) {game.gs.PLAY_A.vars.matrix_x-=1; game.gs.PLAY_A.drawCurrentPiece(); } reset=true; }
				else if( game.chkBtn("BTN_RIGHT" , "btnHeld1") ){ if( gs.canThePieceBeDrawn("RIGHT")   ) {game.gs.PLAY_A.vars.matrix_x+=1; game.gs.PLAY_A.drawCurrentPiece(); } reset=true; }

				if(reset){ vars.inputSpeed_cnt=0; }
				else     { vars.inputSpeed_cnt += 1; }
			}
			else{ vars.inputSpeed_cnt += 1; }

			// Handle user-input: rotation.
			if(vars.inputSpeed_cnt != 0){
				if     ( game.chkBtn("BTN_A"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_RIGHT" ) ) { gs.rotatePiece("R_RIGHT"); gs.drawCurrentPiece(); vars.dropSpeed_cnt=0; } }
				else if( game.chkBtn("BTN_B"     , "btnPressed1") ){ if( gs.canThePieceBeDrawn("R_LEFT"  ) ) { gs.rotatePiece("R_LEFT") ; gs.drawCurrentPiece(); vars.dropSpeed_cnt=0; } }
			}

			// Handle user-input: pause (start).
			//

			// Handle user-input: menu (select).
			//

		}
	},

	// *** SUPPORT FUNCTIONS ***

	// TESTING

	gameOver              : function(){
		let gs    = this;
		let vars  = gs.vars;

		console.log("game over");

		if(1){
			vars.gameOver=true;
		}
	},

	// WORKING

	convert2dTo1d         : function(arr){
		let new_arr = [];

		for(var i = 0; i < arr.length; i++){
			new_arr = new_arr.concat(arr[i]);
		}

		return new_arr;
	},
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

		return {
			// "oneD" : gs.convert2dTo1d(field) ,
			"twoD" : field                   ,
		};
	},
	detectCompletedLines  : function(){
		let gs    = this;
		let vars  = gs.vars;

		let fields = gs.playboardVramToArray();

		// The playboard has 20 lines all 10 tiles wide.
		let rowsToClear = [];

		// Determine all lines that are complete.
		for(let y=0; y<20; y+=1){
			let completedLine=true;

			for(let x=0; x<10; x+=1){
				let thisTile = fields["twoD"][y][x];
				// console.log("y", y, "x", x, " -- ", thisTile);
				// Is the tile solid?
				if(game.solidBg1Tiles.indexOf( thisTile ) == -1){
					// No? Clear flag and break.
					completedLine=false;
					break;
				}

			}

			if(completedLine){ rowsToClear.push(y); }

		}

		if(rowsToClear.length){
			// Remove the rows.
			for(let i=0; i<rowsToClear.length; i+=1){
				fields["twoD"].splice( rowsToClear[i] , 1 );
			}
			// Add blank rows to the top.
			for(let i=0; i<rowsToClear.length; i+=1){
				fields["twoD"].unshift( [1,1,1,1,1,1,1,1,1,1] );
			}

			// Update VRAM1 with fields oneD as a tilemap.
			fields["oneD"] = gs.convert2dTo1d(fields["twoD"]);
			fields["oneD"].unshift( 0 );
			fields["oneD"].unshift( 0 );
			fields["oneD"][0] = 10;
			fields["oneD"][1] = 20;

			core.FUNCS.graphics.DrawMap2(vars.min_x_tile, vars.min_y_tile, fields["oneD"] );

			// Add to the line count.
			vars.lines += rowsToClear.length;
			gs.updateLineCount();

			// Add to the score.
			switch(rowsToClear.length){
				case 1 : { vars.score += ( 40   + (vars.level*40  ) ); break; } // Single
				case 2 : { vars.score += ( 100  + (vars.level*100 ) ); break; } // Double
				case 3 : { vars.score += ( 300  + (vars.level*300 ) ); break; } // Triple
				case 4 : { vars.score += ( 1200 + (vars.level*1200) ); break; } // Tetris
				default : {
					vars.score += 0 ;
					console.log("this should not have happened. rowsToClear.length:", rowsToClear.length);
					break;
				}
			}
			gs.updateScore();

			// Change the level?
			let old_level = vars.level;
			gs.updateLevel();
			if(old_level != vars.level){ gs.setNextDropSpeed("UP"); }
		}
	},
	updateLineCount       : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		core.FUNCS.graphics.Fill(15, 19, 5,1, 2, "VRAM1");

		// Write the value.
		let str;
		str=vars.lines.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(15, 19, str, "VRAM2");
	},
	updateScore           : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Clear the area.
		core.FUNCS.graphics.Fill(21, 22, 5,1, 2, "VRAM1");

		// Write the value.
		let str;
		str=vars.score.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(21, 22, str, "VRAM2");
	},
	updateLevel           : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Determine current level value.
		vars.level = parseInt( (vars.lines / 10),10);

		// Clear the area.
		core.FUNCS.graphics.Fill(21, 19, 5,1, 2, "VRAM1");

		// Write the value.
		let str;
		str=vars.level.toString().padStart(5, " ");
		core.FUNCS.graphics.Print(21, 19, str, "VRAM2");
	},
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
		core.FUNCS.graphics.Fill(19, 5, 5, 4, 2, "VRAM1");

		// Draw the tile map.
		core.FUNCS.graphics.DrawMap2(20,6, map, "VRAM1");

	},
	clearPieceCounts      : function(){
		let gs    = this;
		let vars  = gs.vars;

		let keys = Object.keys( vars.pieceCounts );
		for(let i = 0; i<keys.length; i+=1){
			let key = keys[i];
			vars.pieceCounts[key]=0;
		}
		let str;
		core.FUNCS.graphics.Fill(17, 13, 3,1, 2, "VRAM1");
		str=vars.pieceCounts[ keys[0] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 13, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 14, 3,1, 2, "VRAM1");
		str=vars.pieceCounts[ keys[1] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 14, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 15, 3,1, 2, "VRAM1");
		str=vars.pieceCounts[ keys[2] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 15, str, "VRAM2");

		core.FUNCS.graphics.Fill(17, 16, 3,1, 2, "VRAM1");
		str=vars.pieceCounts[ keys[3] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(17, 16, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 14, 3,1, 2, "VRAM1");
		str=vars.pieceCounts[ keys[4] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 14, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 13, 3,1, 2, "VRAM1");
		str=vars.pieceCounts[ keys[5] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 13, str, "VRAM2");

		core.FUNCS.graphics.Fill(23, 15, 3,1, 2, "VRAM1");
		str=vars.pieceCounts[ keys[6] ].toString().padStart(3, "0");
		core.FUNCS.graphics.Print(23, 15, str, "VRAM2");
	},
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
		core.FUNCS.graphics.Fill(x, y, 3,1, 2, "VRAM1");

		// Draw the count text.
		let str = vars.pieceCounts[type].toString().padStart(3, "0") ;
		core.FUNCS.graphics.Print(x, y, str, "VRAM2");
	},
	clearBoard            : function(){
		// Clears the VRAM of the playing board.

		// game.gs[game.gamestate].clearBoard();
		let gs    = this;
		let vars  = gs.vars;

		// core.FUNCS.graphics.Fill(2,4,10,20,1,"VRAM1");
		core.FUNCS.graphics.Fill(vars.min_x_tile, vars.min_y_tile, 10, 20, 1, "VRAM1");
	},
	setDropSpeed          : function(index){
		// game.gs[game.gamestate].setDropSpeed(0);
		// game.gs[game.gamestate].setNextDropSpeed("UP");
		// game.gs[game.gamestate].setNextDropSpeed("DOWN");

		let gs    = this;
		let vars  = gs.vars;

		if(vars.dropSpeeds[index]){
			vars.dropSpeed     = vars.dropSpeeds[index] ;
			vars.dropSpeed_cnt = 0                  ;

			console.log("Speed has been set to index:", index);
		}
		else{
			console.log("Invalid drop speed index was specified!");
		}
	},
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
//
game.gs.TITLE1 = {
	vars         : {
	},
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
	},
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

			// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["gameboard1"], "VRAM1");
			// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen1"], "VRAM1"); // PLAY
			// core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen2"], "VRAM1"); // CREDITS
			core.FUNCS.graphics.DrawMap2(0,0, core.ASSETS.graphics.tilemaps["testscreen3"], "VRAM1"); // TITLE
			// core.FUNCS.graphics.Print(0,0, "LOOK AT ME! I AM TEST!", "VRAM2");
		}

		// Run.
		if(vars.init){
			if( game.chkBtn("BTN_START" , "btnHeld1") ){
				game.setGamestate1("PLAY_A", true);
				vars.END = true;
			}
		}
	},

	// *** SUPPORT FUNCTIONS ***

	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};

// *** TEMPLATE GAMESTATE FUNCTION ***

// GAMESTATE TEMPLATE
game.gs.TEMPLATE = {
	vars         : {
	},
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = false;
	},
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

	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};

// *** TEST GAMESTATE FUNCTIONS ***

//


