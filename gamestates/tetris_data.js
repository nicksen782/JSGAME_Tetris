_APP.gs_play_init = {
    inited: false,

    // Mostly CONSTS for gs_play.
    playField: {
        // https://meatfighter.com/nintendotetrisai/ (Dropping Tetriminos)
        dropSpeeds: {
            getDropSpeedFramesFromLevel: function(level){
                // Levels 0 through 9.
                if(level >= 0 && level <= 9){
                    return this.set[level].f;
                }
                // Levels above 9 and less than 29.
                else if(level > 9 && level < 29){
                    return this.range.find(rec=>rec.l.indexOf(level) != -1).f;
                }
                // Levels equal or above 29.
                else if(level >= 29){
                    return this.set[this.set.length-1].f;
                }
            },
            // For dropSpeeds that are only associated to one level (or anything above level 29.)
            set:[
                { f:48, l:0 }, // 
                { f:43, l:1 }, // 
                { f:38, l:2 }, // 
                { f:33, l:3 }, // 
                { f:28, l:4 }, // 
                { f:23, l:5 }, // 
                { f:18, l:6 }, // 
                { f:13, l:7 }, // 
                { f:8 , l:8 }, // 
                { f:6 , l:9 }, // 
                { f:1 , l:29}, // Last index. Same speed for level 29 and above.
            ],
            // For dropSpeeds that are only associated to multiple levels. 
            range:[
                { f:5 , l:[...Array(12 - 10 + 1).keys()].map(x => x + 10) },
                { f:4 , l:[...Array(15 - 13 + 1).keys()].map(x => x + 13) },
                { f:3 , l:[...Array(18 - 16 + 1).keys()].map(x => x + 16) },
                { f:2 , l:[...Array(28 - 19 + 1).keys()].map(x => x + 19) },
            ],
        },
        pieces : {
            // Returns the data for the specified piece at the specified level.
            getData: function(piece, level){
                // Return the rotations and the maps (map index will always be 0-9 due to the % 10.)
                return {
                    rotations : this[piece].rotations,
                    tileset_bg: this[piece].tileset_bg,
                    tileset_sp: this[piece].tileset_sp,
                    map_bg    : this[piece].maps_bg[level % 10],
                    map_sp    : this[piece].maps_sp[level % 10],
                };
            },

            // Tetriminos spawnIndexs and matrixes of rotations.
            pieceSpawnIndexes    : { "T":2, "L":1, "Z":0, "O":0, "S":0, "J":3, "I":1 },
            pieceSpawnIndexesNext: { "T":3, "L":0, "Z":1, "O":0, "S":1, "J":0, "I":1 },

            // Pieces/rotations/tilesets/tilemaps.
            "T" : {
                "rotations": 
                [
                    [ [1,2], [2,2], [3,2], [2,1] ], // T up
                    [ [2,1], [2,2], [3,2], [2,3] ], // T right
                    [ [1,2], [2,2], [3,2], [2,3] ], // T down (spawn)
                    [ [2,1], [1,2], [2,2], [2,3] ]  // T left
                ] ,
                "tileset_bg":"tilesG1",
                "tileset_sp":"tilesSP1",
                "maps_sp":[
                    "T_sptile_L0", "T_sptile_L1", "T_sptile_L2", "T_sptile_L3", "T_sptile_L4", 
                    "T_sptile_L5", "T_sptile_L6", "T_sptile_L7", "T_sptile_L8", "T_sptile_L9",
                ],
                "maps_bg":[
                    "T_bgtile_L0", "T_bgtile_L1", "T_bgtile_L2", "T_bgtile_L3", "T_bgtile_L4", 
                    "T_bgtile_L5", "T_bgtile_L6", "T_bgtile_L7", "T_bgtile_L8", "T_bgtile_L9",
                ],
            }, 
            "L" : {
                "rotations": 
                [
                    [ [2,1], [2,2], [2,3], [3,3] ], // L right
                    [ [1,2], [2,2], [3,2], [1,3] ], // L down (SPAWN)
                    [ [1,1], [2,1], [2,2], [2,3] ], // L left
                    [ [3,1], [1,2], [2,2], [3,2] ]  // L up
                ] ,
                "tileset_bg":"tilesG1",
                "tileset_sp":"tilesSP1",
                "maps_sp":[
                    "L_sptile_L0", "L_sptile_L1", "L_sptile_L2", "L_sptile_L3", "L_sptile_L4", 
                    "L_sptile_L5", "L_sptile_L6", "L_sptile_L7", "L_sptile_L8", "L_sptile_L9",
                ],
                "maps_bg":[
                    "L_bgtile_L0", "L_bgtile_L1", "L_bgtile_L2", "L_bgtile_L3", "L_bgtile_L4", 
                    "L_bgtile_L5", "L_bgtile_L6", "L_bgtile_L7", "L_bgtile_L8", "L_bgtile_L9",
                ],
            }, 
            "Z" : {
                "rotations": 
                [
                    [ [1,2], [2,2], [2,3], [3,3] ], // Z horizontal (spawn)
                    [ [3,1], [2,2], [3,2], [2,3] ], // Z vertical
                ] ,
                "tileset_bg":"tilesG1",
                "tileset_sp":"tilesSP1",
                "maps_sp":[
                    "Z_sptile_L0", "Z_sptile_L1", "Z_sptile_L2", "Z_sptile_L3", "Z_sptile_L4", 
                    "Z_sptile_L5", "Z_sptile_L6", "Z_sptile_L7", "Z_sptile_L8", "Z_sptile_L9",
                ],
                "maps_bg":[
                    "Z_bgtile_L0", "Z_bgtile_L1", "Z_bgtile_L2", "Z_bgtile_L3", "Z_bgtile_L4", 
                    "Z_bgtile_L5", "Z_bgtile_L6", "Z_bgtile_L7", "Z_bgtile_L8", "Z_bgtile_L9",
                ],
            }, 
            "O" : {
                "rotations": 
                [
                    [ [1,2], [2,2], [1,3], [2,3] ], // O (SPAWN)
                ] ,
                "tileset_bg":"tilesG1",
                "tileset_sp":"tilesSP1",
                "maps_sp":[
                    "O_sptile_L0", "O_sptile_L1", "O_sptile_L2", "O_sptile_L3", "O_sptile_L4", 
                    "O_sptile_L5", "O_sptile_L6", "O_sptile_L7", "O_sptile_L8", "O_sptile_L9",
                ],
                "maps_bg":[
                    "O_bgtile_L0", "O_bgtile_L1", "O_bgtile_L2", "O_bgtile_L3", "O_bgtile_L4", 
                    "O_bgtile_L5", "O_bgtile_L6", "O_bgtile_L7", "O_bgtile_L8", "O_bgtile_L9",
                ],
            }, 
            "S" : {
                "rotations": 
                [
                    [ [2,2], [3,2], [1,3], [2,3] ], // S horizontal (SPAWN)
                    [ [2,1], [2,2], [3,2], [3,3] ], // S vertical
                ] ,
                "tileset_bg":"tilesG1",
                "tileset_sp":"tilesSP1",
                "maps_sp":[
                    "S_sptile_L0", "S_sptile_L1", "S_sptile_L2", "S_sptile_L3", "S_sptile_L4", 
                    "S_sptile_L5", "S_sptile_L6", "S_sptile_L7", "S_sptile_L8", "S_sptile_L9",
            ],
                "maps_bg":[
                    "S_bgtile_L0", "S_bgtile_L1", "S_bgtile_L2", "S_bgtile_L3", "S_bgtile_L4", 
                    "S_bgtile_L5", "S_bgtile_L6", "S_bgtile_L7", "S_bgtile_L8", "S_bgtile_L9",
                ],
            }, 
            "J" : {
                "rotations": 
                [
                    [ [2,1], [2,2], [1,3], [2,3] ], // J left
                    [ [1,1], [1,2], [2,2], [3,2] ], // J up
                    [ [2,1], [3,1], [2,2], [2,3] ], // J right
                    [ [1,2], [2,2], [3,2], [3,3] ]  // J down (SPAWN)
                ] ,
                "tileset_bg":"tilesG1",
                "tileset_sp":"tilesSP1",
                "maps_sp":[
                    "J_sptile_L0", "J_sptile_L1", "J_sptile_L2", "J_sptile_L3", "J_sptile_L4", 
                    "J_sptile_L5", "J_sptile_L6", "J_sptile_L7", "J_sptile_L8", "J_sptile_L9",
                ],
                "maps_bg":[
                    "J_bgtile_L0", "J_bgtile_L1", "J_bgtile_L2", "J_bgtile_L3", "J_bgtile_L4", 
                    "J_bgtile_L5", "J_bgtile_L6", "J_bgtile_L7", "J_bgtile_L8", "J_bgtile_L9",
                ],
            }, 
            "I" : {
                "rotations": 
                [
                    [ [2,0], [2,1], [2,2], [2,3] ], // I vertical
                    [ [0,2], [1,2], [2,2], [3,2] ], // I horizontal (SPAWN)
                ] ,
                "tileset_bg":"tilesG1",
                "tileset_sp":"tilesSP1",
                "maps_sp":[
                    "I_sptile_L0", "I_sptile_L1", "I_sptile_L2", "I_sptile_L3", "I_sptile_L4", 
                    "I_sptile_L5", "I_sptile_L6", "I_sptile_L7", "I_sptile_L8", "I_sptile_L9",
                ],
                "maps_bg":[
                    "I_bgtile_L0", "I_bgtile_L1", "I_bgtile_L2", "I_bgtile_L3", "I_bgtile_L4", 
                    "I_bgtile_L5", "I_bgtile_L6", "I_bgtile_L7", "I_bgtile_L8", "I_bgtile_L9",
                ],
            }, 
        },

        _core_data: {
            // Start positions for the relative drawings.
            "home":{
                single: { x:10 , y:3 },
                p1    : { x:1  , y:3 },
                p2    : { x:19 , y:3 },
            },
    
            // (COPY THIS) Drawn with coords relative to "home". 
            "playfield" :{ x:0 , y:0, w:12, h:20 },
    
            // (COPY THIS) Drawn with coords relative to "home". 
            "gameStats":{
                "score":{ x:0, y:21, value: 0, label:"SCORE", value: 0 },
                "lines":{ x:0, y:22, value: 0, label:"LINES", value: 0 },
                "level":{ x:0, y:23, value: 0, label:"LEVEL", value: 0 },
            },
    
            // Absolute coords.
            pieceStats_home: {
                "p1":{ x:1 , y:29 },
                "p2":{ x:1 , y:30 },
            },

            // Next piece home coords.
            nextPiece_home: {
                "single":{ x:22 , y:3 , w:6, h:6 },
                "p1"    :{ x:13 , y:3 , w:6, h:6 },
                "p2"    :{ x:13 , y:17, w:6, h:6 },
            },
    
            // (COPY THIS) Drawn with coords relative to "pieceStats_home". 
            pieceCounter: 0,
            "pieceStats_text"  : {
                "T":{ tsn:"tilesTX1", x:3+(3*0), y:0, li:1, value:0, avg:0 },
                "L":{ tsn:"tilesTX1", x:4+(3*1), y:0, li:1, value:0, avg:0 },
                "Z":{ tsn:"tilesTX1", x:5+(3*2), y:0, li:1, value:0, avg:0 },
                "O":{ tsn:"tilesTX1", x:6+(3*3), y:0, li:1, value:0, avg:0 },
                "S":{ tsn:"tilesTX1", x:7+(3*4), y:0, li:1, value:0, avg:0 },
                "J":{ tsn:"tilesTX1", x:8+(3*5), y:0, li:1, value:0, avg:0 },
                "I":{ tsn:"tilesTX1", x:9+(3*6), y:0, li:1, value:0, avg:0 },
            },
    
            // Absolute coords.
            "pieceStats_img"  : {
                "T": { tsn:"tilesG1" , x:4+(4*0), y:28, li:1, tmn:"T_map_small" },
                "L": { tsn:"tilesG1" , x:4+(4*1), y:28, li:1, tmn:"L_map_small" },
                "Z": { tsn:"tilesG1" , x:4+(4*2), y:28, li:1, tmn:"Z_map_small" },
                "O": { tsn:"tilesG1" , x:4+(4*3), y:28, li:1, tmn:"O_map_small" },
                "S": { tsn:"tilesG1" , x:4+(4*4), y:28, li:1, tmn:"S_map_small" },
                "J": { tsn:"tilesG1" , x:4+(4*5), y:28, li:1, tmn:"J_map_small" },
                "I": { tsn:"tilesG1" , x:4+(4*6), y:28, li:1, tmn:"I_map_small" },
            },

            // JUNK LINES
            junkLines : [],
            prevPiecesField: [],
        },
        _core_funcs_gameStats: {
            // GAME STATS ("lines", "level", "score")
            gameStats_get: function(key){
                // EXAMPLE USAGE: gameStats_get("lines");
                return this.gameStats[key].value;
            },
            gameStats_set: function(key, value){
                // EXAMPLE USAGE: gameStats_set("score", 0);
                this.gameStats[key].value = value;
                this.gameStats_draw_one(key);
            },
            gameStats_incrementBy: function(key, value){
                // EXAMPLE USAGE: gameStats_incrementBy("lines", 1);
                // EXAMPLE USAGE: gameStats_incrementBy("level", 1);
                // EXAMPLE USAGE: gameStats_incrementBy("score", 10);
                this.gameStats[key].value += value;
                this.gameStats_draw_one(key);
            },
            gameStats_draw_all: function(){
                for(let key in this.gameStats){
                    this.gameStats_draw_one(key);
                }
            },
            gameStats_draw_one: function(key){
                _GFX.util.tiles.print( 
                    { 
                        tsn: "tilesTX1", 
                        x  : this.gameStats[key].x+6, 
                        y  : this.gameStats[key].y, 
                        li : 1, 
                        str: this.gameStats[key].value.toString().padStart(6, "0") 
                    } 
                );
            },

            drawNextPiece: function(){
                // Get the piece data.
                let rec = this.parent.pieces.getData(this.nextPiece, this.gameStats_get("level"));

                // Clear the piece box.
                _GFX.util.tiles.fillWithOneTile_tilemap({ 
                    tmn:"blacktile", 
                    x:this.nextPiece_home.x+1, y:this.nextPiece_home.y+2, 
                    w:this.nextPiece_home.w-2, h:this.nextPiece_home.h-3, 
                    tsn:"tilesBG1", li:1 
                });

                // Move some pieces around to keep them displayed centered.
                let rotation = this.parent.pieces.pieceSpawnIndexesNext[this.nextPiece];
                let x = this.nextPiece_home.x+1;
                let y = this.nextPiece_home.y+1;
                if(this.nextPiece == "L"){ x-=1; }
                if(this.nextPiece == "Z"){ x-=1; }
                if(this.nextPiece == "S"){ x-=1; }
                
                // Draw each part of the current piece and rotation.
                for(let piece of rec.rotations[rotation]){
                    // console.log(piece);
                    _GFX.util.tiles.drawTilemap( { 
                        tsn: rec.tileset_bg,
                        x  : x + piece[0], 
                        y  : y + piece[1], 
                        li : 1, 
                        tmn: rec.map_bg
                    } );
                }
            },
        },
        _core_funcs_pieceStats: {
            // PIECE STATS
            pieceStats_set: function(key, value){
                this.pieceStats[key].value = value;
                this.pieceStats_draw_one(key);
            },
            pieceStats_increment: function(key, value){
                this.pieceStats[key].value += value;
                this.pieceStats_draw_one(key);
            },
            pieceStats_draw_all: function(){
                for(let key in this.pieceStats){
                    this.pieceStats_draw_one(key);
                }
            },
            pieceStats_draw_one: function(key){
                _GFX.util.tiles.print(
                    { 
                        tsn: "tilesTX1", 
                        x  : this.pieceStats[key].x, 
                        y  : this.pieceStats[key].y, 
                        li : 1, 
                        str: this.pieceStats[key].value.toString().padStart(3, "0") 
                    }
                );
            },
        },
        _core_funcs_play: {
            // DRAWING/SPAWNING.
            
            // Generate the next piece and try to keep an average piece type distribution.
            generateRandomPiece: function(){
                let pieceStats = _APP.game.gamestates["gs_play"].playField[this.mainKey].pieceStats;

                let keys = ["T","L", "Z","O", "S","J", "I"];
                let next;
                let i=0;
                for(i=0; i<50; i+=1){
                    let min = 0;
                    let max = keys.length -1;
                    next = Math.floor(Math.random() * (max - min + 1)) + min;
                    
                    // Avoid division by 0.
                    if(this.pieceCounter == 0){ return keys[next]; }

                    // TODO: Avoid getting the same piece twice at earlier frames.
                    // 

                    // Allow this piece if it's usage is not at or above 15% of all pieces and isn't the last piece.
                    if( 
                        ! (pieceStats[keys[next]].avg >= 15) &&
                           keys[next] != this.currPiece 
                    ){ return keys[next]; }
                }

                // Could not find a good match. Give the last attempt.
                return keys[next];
            },
            // Spawns the next piece.
            spawnNextPiece: function(){
                this.spawnPiece(this.nextPiece);
            },
            // Add the specified piece as the active piece and displays it.
            spawnPiece: function(piece){
                // Save this piece as the currPiece.
                this.currPiece = piece;
                this.pieceStats_increment(this.currPiece, 1);
                this.pieceCounter += 1;

                // Set the default starting rotation.
                this.currPieceRotation = this.parent.pieces.pieceSpawnIndexes[piece];
    
                // Set the default x and y for this piece.
                this.currPieceX =   3;
                this.currPieceY =  -2;
                // this.currPieceY =  0;
    
                // Generate the nextPiece.
                this.nextPiece = this.generateRandomPiece();

                // Calculate the average usage count of all pieces.
                let pieceStats = _APP.game.gamestates["gs_play"].playField[this.mainKey].pieceStats;
                for(let key in pieceStats){
                    pieceStats[key].avg = ((pieceStats[key].value/this.pieceCounter)*100)<<0;
                }

                // Draw the piece into the next piece box.
                this.drawNextPiece();

                // Draw the currPiece.
                this.drawCurrentPiece();
            },
            // Clear the landed pieces from the display.
            clearLowerPlayfield: function(){
                // Clear inner-playfield with the transparent_tile.
                _GFX.util.tiles.fillWithOneTile_tilemap({ 
                    // tmn:"blacktile", 
                    tmn:"transparent_tile", 
                    // tmn:"X_tile", 
                    x:this.playfield.x+1, y:this.playfield.y+1, 
                    w:this.playfield.w-2, h:this.playfield.h-2, 
                    tsn:"tilesG1", li:1 
                });
                for(let i=0; i<this.piecesField.length; i+=1){
                    this.piecesField[i].fill(" ");
                }
            },
            // Clear the active piece from the display.
            clearUpperPlayfield: function(){
                // Clear inner-playfield with the transparent_tile.
                _GFX.util.tiles.fillWithOneTile_tilemap({ 
                    // tmn:"blacktile", 
                    tmn:"transparent_tile", 
                    // tmn:"X_tile", 
                    x:this.playfield.x+1, y:this.playfield.y+1, 
                    w:this.playfield.w-2, h:this.playfield.h-2, 
                    tsn:"tilesG1", li:2 
                });
            },
            drawCurrentPiece: function(){
                let rec = this.parent.pieces.getData(this.currPiece, this.gameStats_get("level"));
    
                // DEBUG: Display currPieceX and currPieceY and matrix.
                // _GFX.util.tiles.fillWithOneTile_tilemap({ 
                //     tmn:"X_tile782", 
                //     x  : this.currPieceX + (this.playfield.x+1), 
                //     y  : this.currPieceY + (this.playfield.y+1), 
                //     w:5, h:5, tsn:"tilesLOAD", li:2 
                // });
    
                // Clear inner-playfield with the transparent_tile.
                this.clearUpperPlayfield();

                // Draw each part of the current piece and rotation.
                for(let piece of rec.rotations[this.currPieceRotation]){
                    // console.log(piece);
                    _GFX.util.tiles.drawTilemap( { 
                        tsn: rec.tileset_sp, // "tilesSP1", 
                        x  : this.currPieceX + (this.playfield.x+1) + piece[0], 
                        y  : this.currPieceY + (this.playfield.y+1) + piece[1], 
                        li : 2, 
                        // tmn: this.currPieceTilemap
                        tmn: rec.map_sp
                    } );
                }
            },
        },
        _core_funcs_landed: {
            // PIECES LANDED

            // Determine if the piece is at the top.
            pieceisAtTop: function(){
                if(this.currPieceY == -2){ return true; }
                return false;
            },

            // Draw all pieces that are landed (in piecesField).
            drawLandedPieces: function(){
                for(let y=0, yl=this.piecesField.length; y<yl; y+=1){
                    for(let x=0, xl=this.piecesField[y].length; x<xl; x+=1){
                        let tilesetName = "tilesG1";
                        let tilemapName;
    
                        // Background tiles. 
                        switch(this.piecesField[y][x]){
                            case " ": { tilemapName = "transparent_tile"; break; }
                            case "X": { tilemapName = "X_tile";           break; }
                            case "G": { tilemapName = "garbage_tile";     break; }
                            case "T": { tilemapName = this.parent.pieces.getData("T", this.gameStats_get("level")).map_bg; break; }
                            case "L": { tilemapName = this.parent.pieces.getData("L", this.gameStats_get("level")).map_bg; break; }
                            case "Z": { tilemapName = this.parent.pieces.getData("Z", this.gameStats_get("level")).map_bg; break; }
                            case "O": { tilemapName = this.parent.pieces.getData("O", this.gameStats_get("level")).map_bg; break; }
                            case "S": { tilemapName = this.parent.pieces.getData("S", this.gameStats_get("level")).map_bg; break; }
                            case "J": { tilemapName = this.parent.pieces.getData("J", this.gameStats_get("level")).map_bg; break; }
                            case "I": { tilemapName = this.parent.pieces.getData("I", this.gameStats_get("level")).map_bg; break; }
                            default: { console.error("drawLandedPieces: Invalid piece value:", this.piecesField[y][x]); return; break; }
                        };
                        _GFX.util.tiles.drawTilemap( { 
                            tsn: tilesetName, // "tilesG1", 
                            x  : x + this.playfield.x + 1, 
                            y  : y + this.playfield.y + 1, 
                            li : 1, 
                            tmn: tilemapName
                        } );
                    }
                }
            },

            // Look for completed lines in the piecesField.
            detectLineCompletions: function(){
                // Look for lines that do NOT have '" "', meaning a piece is in each position on the line. 
                let lineNumbersCompleted = [];
                for(let y=0, yl=this.piecesField.length; y<yl; y+=1){
                    if(this.piecesField[y].indexOf(" ") == -1){ 
                        lineNumbersCompleted.push( { 
                            line : y,                          // Which line in piecesField is this?
                            count: 0,                          // Used later for animation counts.
                            prev : this.piecesField[y].slice() // Copy of the line prior to being cleared.
                        } ); 
                    }
                }
                
                // Update the number of completed lines. 
                this.lineNumbersCompleted = lineNumbersCompleted;

                // Return true if there are completed lines. 
                return lineNumbersCompleted.length ? true : false;
            },

            // Animation of line completions.
            doLineCompletionAnimation: function(){
                let line;
                let allLinesDone = false;

                // Go through all completed lines. 
                for(let i=this.lineNumbersCompleted.length-1; i >= 0; i -=1 ){
                    // Save the line to save some space here.
                    line = this.lineNumbersCompleted[i]; 
    
                    // Change the values on even iterations of count.
                    if(line.count % 2 == 0){ this.piecesField[line.line].fill("X"); }
                    
                    // Return the values to their previous values on odd iterations of the count.
                    else                   { this.piecesField[line.line] = line.prev.slice(); }
                    
                    // Increment the count. 
                    line.count += 1;
                    
                    // If the count is over then remove this line from lineNumbersCompleted.
                    if(line.count > 7){ 
                        this.piecesField[line.line].fill("X");
                        allLinesDone = true;
                    }
                }
    
                // If all lines are done animating...
                if(allLinesDone){ 
                    // The piecesField should end up with the same number of rows that it started with.
                    
                    // Determine the points to assign.
                    let basePoints = [40,100,300,1200];
                    let points = basePoints[this.lineNumbersCompleted.length-1] * (1+this.gameStats.level.value);

                    // DEBUG - Impossible under normal/correct gameplay.
                    if(this.lineNumbersCompleted.length > 4){ points = 112233; }
                    
                    // SCORE
                    if(this.quickDrop){ this.gameStats_incrementBy("score", 10 + (10*this.gameStats.level.value+1)); }
                    else              { this.gameStats_incrementBy("score", 5 + (5*this.gameStats.level.value+1));  }

                    // Get the lines completed count (before adding the new lines.)
                    let oldLevel = (this.gameStats_get("lines") / 10) << 0;
                    
                    // Add to score and to lines.
                    this.gameStats_incrementBy("score", points);
                    this.gameStats_incrementBy("lines", this.lineNumbersCompleted.length);
                    
                    // JUNK LINES
                    // Determine if this is multiplayer.
                    let playerKeys = Object.keys(this.parent).filter(d=>["p1", "p2"].indexOf(d) != -1);
                    if(playerKeys.length){
                        let junkLines = [];

                        // Go through all completed lines, use their line numbers to pull from prevPiecesField and add to junkLines. 
                        for(let i=this.lineNumbersCompleted.length-1; i >= 0; i -=1 ){
                            line = this.lineNumbersCompleted[i]; 
                            junkLines.push( JSON.parse(JSON.stringify(this.prevPiecesField[line.line])) );
                        }

                        // Ensure that the garbage lines added are one less than the total completed lines.
                        if(junkLines.length){
                            // junkLines.pop();   // Remove the last.
                            junkLines.shift(); // Remove the first.
                        }

                        // Yes, it is multiplayer. Add junk lines to all other players other than this player. 
                        for(let p=0, pl=playerKeys.length; p<pl; p+=1){
                            // Don't add junkLins to yourself.
                            if(this.pkey == playerKeys[p]){ continue; }

                            // Add the junkLines to this player.
                            this.parent[playerKeys[p]].junkLines.push(...junkLines);
                        }


                    }

                    // Get the new lines completed count. 
                    let newLevel = (this.gameStats_get("lines") / 10) << 0;

                    // Increase to the next level?
                    if(oldLevel != newLevel){
                        // Reset the drop timer to the delay of the new level.
                        _APP.game.shared.createGeneralTimer(this.mainKey + "dropDelay", this.parent.dropSpeeds.getDropSpeedFramesFromLevel(newLevel));

                        // Increase the level. 
                        this.gameStats_incrementBy("level", newLevel);
                    }

                    // Move the pieces down by removing all rows in piecesField where it includes "X".
                    this.piecesField = this.piecesField.filter(c => { return ! c.includes("X") } );
                    
                    // Add empty replacement lines to the top. (Add as many lines are were removed.)
                    for(let i=this.lineNumbersCompleted.length-1; i >= 0; i -=1 ){
                        this.piecesField.unshift( Array(10).fill(" ") );
                    }


                    // Clear out the lineNumbersCompleted.
                    this.lineNumbersCompleted = []; 
                }
            },

            // Add the active piece parts to the pieceField.
            addPieceToLanded: function(xOffset=0, yOffset=0){
                this.prevPiecesField = JSON.parse(JSON.stringify(this.piecesField));

                // Convert the currPiece tiles to tiles on layer 1 and remove the currPiece from layer 2.
                
                // We can get the coordinates of each part of the currPiece.
                let data = this.getCollisionData(this.currPiece, this.currPieceRotation, xOffset, yOffset);
                
                // Add those pieces at the same coordinates to the piecesField as normal tiles.
                for(let i=0, l=data.length; i<l; i+=1){
                    if(data[i].matchingLanded == null){ 
                        console.log("Null piece NOT drawn.");
                        continue; 
                    }
                    let x = data[i].landedCoord[1];
                    let y = data[i].landedCoord[0];
                    this.piecesField[y][x] = this.currPiece;
                }

                // Set the currPiece to undefined. 
                this.currPiece = undefined;

                // Clear the playfield.
                this.clearUpperPlayfield();
            },
    
            // MOVING/ROTATING PIECES (AND COLLISION)

            // Converts the specified piece/rotation with the specified x and y offset to data.
            getCollisionData: function(piece, rotation, xOffset, yOffset){
                let piecesCoords = this.parent.pieces.getData(piece, this.gameStats_get("level")).rotations[rotation];

                let rect2 = {
                    x:this.playfield.x+1, y:this.playfield.y+1, 
                    w:this.playfield.w-3, h:this.playfield.h-3
                };

                // TODO: Wall kick?
                //

                let data = [
                    {
                        pieceIndex:     0,
                        matchingLanded: null,
                        landedCoord:    [],
                        pieceCoords:    piecesCoords[0],
                        inBounds:       false,
                        oob:            [],
                    },
                    {
                        pieceIndex:     1,
                        matchingLanded: null,
                        landedCoord:    [],
                        pieceCoords:    piecesCoords[1],
                        inBounds:       false,
                        oob:            [],
                    },
                    {
                        pieceIndex:     2,
                        matchingLanded: null,
                        landedCoord:    [],
                        pieceCoords:    piecesCoords[2],
                        inBounds:       false,
                        oob:            [],
                    },
                    {
                        pieceIndex:     3,
                        matchingLanded: null,
                        landedCoord:    [],
                        pieceCoords:    piecesCoords[3],
                        inBounds:       false,
                        oob:            [],
                    },
                ];
                
                for(let rec of data){
                    // Get the piece x,y and the absolute coords.
                    let pieceX = rec.pieceCoords[0] + rect2.x + this.currPieceX;
                    let pieceY = rec.pieceCoords[1] + rect2.y + this.currPieceY;

                    // Is the piece in bounds?
                    if( (pieceY + yOffset) < rect2.y )           { rec.oob.push("UP"   ); }
                    if( (pieceX + xOffset) < rect2.x )           { rec.oob.push("LEFT" ); }
                    if( (pieceY + yOffset) > rect2.y + rect2.h ) { rec.oob.push("DOWN" ); }
                    if( (pieceX + xOffset) > rect2.x + rect2.w ) { rec.oob.push("RIGHT"); }
                    if(!rec.oob.length){ 
                        // Yes, it is inBounds.
                        rec.inBounds = true; 

                        // It is safe to get the other values. 
                        try{
                            rec.matchingLanded = 
                            this.piecesField
                                [ piecesCoords[rec.pieceIndex][1] + this.currPieceY +yOffset]
                                [ piecesCoords[rec.pieceIndex][0] + this.currPieceX +xOffset]
                            ;
                        }
                        catch(e){}
                        rec.landedCoord    = [
                            piecesCoords[rec.pieceIndex][1] + this.currPieceY+yOffset, 
                            piecesCoords[rec.pieceIndex][0] + this.currPieceX+xOffset
                        ];
                    }
                    // else{
                    //     console.log(rec.pieceIndex, "oob:", JSON.stringify(rec.oob));
                    // }
                }

                return data;
            },

            // Playfield/pieceField boundary check. Works for movement. Supports all rotations during movement.
            checkForCollision_move: function(dir){
                // For a playfield boundary check it is only required that each piece still be within the playfield after the specified movement.
                // We WANT a collision within the playfield boundaries in this case.
    
                let data;
                
                // Determine the required x or y offsets.
                let xOffset = 0;
                let yOffset = 0;
                if     (dir == "UP")   { yOffset = -1; }
                else if(dir == "LEFT") { xOffset = -1; }
                else if(dir == "DOWN") { yOffset =  1; }
                else if(dir == "RIGHT"){ xOffset =  1; }
                else{ console.error("INVALID DIR", dir); return false; }

                // Get the data. 
                data = this.getCollisionData(this.currPiece, this.currPieceRotation, xOffset, yOffset);

                // Check the data.
                for(let rec of data){ 
                    // Check for inBounds.
                    if(!rec.inBounds){ return false; } 
                    
                    // Check against landed pieces.
                    if(rec.matchingLanded != " "){ return false; }
                }
                return true; 
            },

            // Playfield/pieceField boundary check. Works for rotations.
            checkForCollision_rotate: function(rotationDir){
                let pieceRotations = this.parent.pieces.getData(this.currPiece, this.gameStats_get("level")).rotations;
                let newRotationIndex;
    
                // BTN_A
                if(rotationDir == 1){
                    // Rotation index bounds check.
                    if(this.currPieceRotation + 1 < pieceRotations.length){ newRotationIndex = this.currPieceRotation + 1; }
                    else                                                  { newRotationIndex = 0;                          }
                }
    
                // BTN_B
                else if(rotationDir == -1){
                    // Rotation index bounds check.
                    if(this.currPieceRotation - 1 >= 0){ newRotationIndex = this.currPieceRotation - 1; }
                    else                               { newRotationIndex = pieceRotations.length - 1;  }
                }
    
                // Try this rotation with no direction check.
                let canRotate = (()=>{
                    // Get the data. 
                    data = this.getCollisionData(this.currPiece, newRotationIndex, 0, 0);

                    // Check the data.
                    for(let rec of data){ 
                        // Check for inBounds.
                        if(!rec.inBounds){ return false; } 
                        
                        // Check against landed pieces.
                        if(rec.matchingLanded != " "){ return false; }
                    }
                    return true; 
                })();
    
                // If it cannot rotate then try for a wallkick. Return false if unable to wallkick.
                if(!canRotate){ 
                    // Wall kick?
                    let canWallFromKickLeft   = (()=>{
                        // Check the data.
                        let wallKickFromLeft_data  = this.getCollisionData(this.currPiece, newRotationIndex, 1, 0);
                        for(let rec of wallKickFromLeft_data){ 
                            // Check for inBounds.
                            if(!rec.inBounds){ return false; } 
                            
                            // Check against landed pieces.
                            if(rec.matchingLanded != " "){ return false; }
                        }
                        return true; 
                    })();
                    let canWallFromKickRight  = (()=>{
                        let wallKickFromRight_data = this.getCollisionData(this.currPiece, newRotationIndex, -1, 0);
                        // Check the data.
                        for(let rec of wallKickFromRight_data){ 
                            // Check for inBounds.
                            if(!rec.inBounds){ return false; } 
                            
                            // Check against landed pieces.
                            if(rec.matchingLanded != " "){ return false; }
                        }
                        return true; 
                    })();
                    let canWallFromKickTop    = (()=>{
                        let wallKickFromTop_data = this.getCollisionData(this.currPiece, newRotationIndex, 0, 1);
                        // Check the data.
                        for(let rec of wallKickFromTop_data){ 
                            // Check for inBounds.
                            if(!rec.inBounds){ return false; } 
                            
                            // Check against landed pieces.
                            if(rec.matchingLanded != " "){ return false; }
                        }
                        return true; 
                    })();
                    let canWallFromKickBottom = (()=>{
                        let wallKickFromBottom_data = this.getCollisionData(this.currPiece, newRotationIndex, 0, -1);
                        // Check the data.
                        for(let rec of wallKickFromBottom_data){ 
                            // Check for inBounds.
                            if(!rec.inBounds){ return false; } 
                            
                            // Check against landed pieces.
                            if(rec.matchingLanded != " "){ return false; }
                        }
                        return true; 
                    })();

                    if(canWallFromKickLeft){
                        // console.log("CAN WALLKICK: LEFT");
                        this.currPieceX += 1; 
                        
                    }
                    else if(canWallFromKickRight){
                        // console.log("CAN WALLKICK: RIGHT");
                        this.currPieceX -= 1; 
                    }
                    else if(canWallFromKickTop){
                        // console.log("CAN WALLKICK: TOP");
                        this.currPieceY += 1; 
                    }
                    else if(canWallFromKickBottom){
                        // console.log("CAN WALLKICK: BOTTOM");
                        this.currPieceY -= 1; 
                    }
                    else{
                        // console.log("CANNOT WALLKICK");
                        return false; 
                    }
                }
                
                // If it can rotate then assign the new value and return true.
                this.currPieceRotation = newRotationIndex;
                return true;
            },
        },
        _core_funcs_input: {
            pauseHandler: function(){
                // console.log(this.parent.parent.config.paused);
                if(_INPUT.util.checkButton(this.pkey, "press", "BTN_START" )){
                    // Not paused? Pause it.
                    if(!this.parent.parent.config.paused){
                        // Copy the current VRAM.
                        let dimensions = _APP.configObj.gfxConfig.dimensions;
                        this.parent.parent.unpausedVRAM = _GFX.util.VRAM.getVramRegion( { 
                            x: 0, 
                            y: 0, 
                            w: dimensions.cols, 
                            h: dimensions.rows, 
                            l: [0, 1, 2] 
                        } );
                        // _GFX.VRAM.clearVram();

                        _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"transChecked3", x:0, y:0, w:dimensions.cols, h:dimensions.rows, tsn:"tilesBG1", li:2 });

                        // Display the pause text.
                        _APP.game.shared.drawBorderBox_tilemaps(
                            _APP.game.shared.createBorderBox_tilemaps( 
                                ((dimensions.cols/2) - (14/2)) << 0, // x
                                ((dimensions.rows/2) - (6/2))  << 0, // y
                                14, // w
                                6,  // h
                                [
                                    "",
                                    "    GAME  ",
                                    "   PAUSED ",
                                ], 
                                {
                                    border_bg  : { li:1n, tsn:"tilesBG1", tmn: "bg6_tile" },
                                    border_fg  : { li:2 },
                                    inner_bg   : { li:1, tsn:"tilesBG1", tmn: "blacktile" },
                                    inner_text : { li:2, tsn:"tilesTX1" }
                                }
                            )
                        );

                        // Hide sprites.
                        //

                        // Pause the music.
                        //

                        // Draw the pause screen.

                        // Set the paused flag. 
                        this.parent.parent.config.paused = true;

                        // End the loop.
                        return true; 

                    }

                    // Already paused? Unpause it.
                    else{
                        // Clear the paused flag.
                        this.parent.parent.config.paused = false;

                        // Restore the previously saved VRAM.
                        _GFX.VRAM.clearVram();
                        _GFX.util.VRAM.setVramRegion(this.parent.parent.unpausedVRAM);
                        //

                        // Restore sprites.
                        //

                        // Unpause the music.
                        //

                        // End the loop.
                        return true; 
                    }
                }
            },

            gameInputHandler: function(){
                let data = {
                    movement: false,
                    rotate  : false,
                    keys    : ["press", "held"],
                    type    : "",
                };
                
                // Return if the player did not press/hold any buttons this frame. 
                if(!_INPUT.util.checkButton(this.pkey, ["press", "held"], [])){ return; }

                // Check against press and held.
                for(let i=0, l=data.keys.length; i<l; i+=1){
                    // Held keys must obey the general timer as a delay.
                    if(data.keys[i] == "held"){
                        // Do not act on held buttons if the timer is not yet finished.
                        if(!_APP.game.shared.checkGeneralTimer(this.mainKey + "inputDelay")){ 
                            continue; 
                        }
                    }
                    
                    // Set the type (and input data) for this iteration.
                    data.type = _INPUT.util.stateByteToObj(_INPUT.states[this.pkey][ data.keys[i] ]);

                    // Allow for movement on either press or held.
                    if( data.type.BTN_UP || data.type.BTN_DOWN || data.type.BTN_LEFT || data.type.BTN_RIGHT){
                        // Do not act if a movement was already set.
                        if(!data.movement){
                            if     (data.type.BTN_UP && data.keys[i] == "press"){ 
                                this.quickDrop = true; 
                            }
                            else if(data.type.BTN_DOWN){
                                if( this.checkForCollision_move("DOWN") ){ 
                                    // Reset the dropDelay since the user has just requested a drop.
                                    _APP.game.shared.resetGeneralTimer(this.mainKey + "dropDelay")
                                    this.currPieceY += 1; data.movement = true; 
                                }
                            }
                            else if(data.type.BTN_LEFT){
                                if( this.checkForCollision_move("LEFT") ){ this.currPieceX -= 1; data.movement = true; }
                            }
                            else if(data.type.BTN_RIGHT){
                                if( this.checkForCollision_move("RIGHT") ){ this.currPieceX += 1; data.movement = true; }
                            }
                        }
                    }

                    // Only allow rotations on press.
                    if(data.keys[i] == "press"){
                        if( (data.type.BTN_A || data.type.BTN_X || data.type.BTN_B || data.type.BTN_Y) ){
                            // Do not act if a rotate was already set.
                            if(!data.rotate){
                                // Rotate right?
                                if(data.type.BTN_A || data.type.BTN_X){
                                    if( this.checkForCollision_rotate(1) ){ data.rotate = true; }
                                }
                                // Rotate left?
                                else if(data.type.BTN_B || data.type.BTN_Y){
                                    if( this.checkForCollision_rotate(-1) ){ data.rotate = true; }
                                }
                            }
                        }
                    }
                }

                // Do any actions need to happen?
                if(data.movement || data.rotate){
                    // Reset the now general timer to restart the delay for held buttons. 
                    _APP.game.shared.resetGeneralTimer(this.mainKey + "inputDelay");
    
                    // Draw the piece.
                    this.drawCurrentPiece();
                }
            },
        },
        _core_funcs_unseparated: {
            // PIECES LANDED

            addPieceToLanded_debug: function(){
                
                this.prevPiecesField = JSON.parse(JSON.stringify(this.piecesField));
                this.prevPiecesField[this.piecesField.length-4] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", " " ]
                this.prevPiecesField[this.piecesField.length-3] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", " " ]
                this.prevPiecesField[this.piecesField.length-2] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", " " ]
                this.prevPiecesField[this.piecesField.length-1] = [ "T", "L", "Z", "O", "I", "S", "J", "I", "O", " " ]

                this.piecesField[this.piecesField.length-4] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", " " ];
                this.piecesField[this.piecesField.length-3] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", " " ];
                this.piecesField[this.piecesField.length-2] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", "O" ];
                this.piecesField[this.piecesField.length-1] = [ "T", "L", "Z", "O", "I", "S", "J", "I", "O", "O" ];
            },

            // Visual.
            addJunkPiecesToPlayfield: function(){
                // If there are junkLines for this player then draw them instead.
                if(this.junkLines.length){
                    for(let i=0, il=this.junkLines.length; i<il; i+=1){
                        // Change the tile used to the garbage_tile.
                        this.junkLines[i] = this.junkLines[i].map(d=>{ if(d!=" "){ d="G";} return d; });
                    }
                    // Add the junkLines to the bottom.
                    this.piecesField.push(...this.junkLines);

                    // Remove junkLines.length lines from the top.
                    for(let i=0, il=this.junkLines.length; i<il; i+=1){
                        this.piecesField.shift();
                    }

                    // Clear out the junkLines.
                    this.junkLines = [];

                    this.drawLandedPieces();

                    // End the loop for this player. 
                    return true;
                }
            },
        },

        // Same init for single, multi (p1, p2).
        init: function(players){
            // console.log(this);
            for(let p=0; p<players; p+=1){
                // Generate the player key to be used here. 
                let mainKey;
                let pkey   ;
                
                if(players == 1){ mainKey = `single` ; pkey = `p1`;      }
                else            { mainKey = `p${p+1}`; pkey = `p${p+1}`; }

                // Create the mainKey object if it does not exist.
                if(!this[mainKey]){ this[mainKey] = {}; }
                
                // Set the parent, mainKey, and pkey.
                this[mainKey].parent  = this;
                this[mainKey].mainKey = mainKey;
                this[mainKey].pkey    = pkey;

                // Copy some of the _core values.
                this[mainKey].playfield    = JSON.parse(JSON.stringify(this._core.playfield));
                this[mainKey].gameStats    = JSON.parse(JSON.stringify(this._core.gameStats));
                this[mainKey].pieceStats   = JSON.parse(JSON.stringify(this._core.pieceStats_text));
                this[mainKey].pieceCounter = this._core.pieceCounter;
                this[mainKey].prevPiecesField = JSON.parse(JSON.stringify(this._core.prevPiecesField));
                this[mainKey].junkLines    = JSON.parse(JSON.stringify(this._core.junkLines));

                // Copy the _core functions.
                for(func in this._core.funcs){ this[mainKey][func] = this._core.funcs[func]; }
    
                // Adjust the playfield.
                this[mainKey].playfield.x += this._core.home[mainKey].x;
                this[mainKey].playfield.y += this._core.home[mainKey].y;
    
                // Adjust the gamestats, print the label, and reset each value to 0.
                for(let key in this[mainKey].gameStats){
                    this[mainKey].gameStats[key].x += this._core.home[mainKey].x ;
                    this[mainKey].gameStats[key].y += this._core.home[mainKey].y ;
                    _GFX.util.tiles.print( { tsn:"tilesTX1", x:this[mainKey].gameStats[key].x, y:this[mainKey].gameStats[key].y, li:1, str:this[mainKey].gameStats[key].label } );
    
                    // Draw the backgrounds for the game stats.
                    _GFX.util.tiles.fillWithOneTile_tilemap({ 
                        tmn: "bg6_tile", 
                        x  : this[mainKey].gameStats[key].x, 
                        y  : this[mainKey].gameStats[key].y, 
                        w  : 12, h:1, 
                        tsn: "tilesBG1", li:0 
                    });
                }
                for(let key in this[mainKey].gameStats){
                    // Set the value to 0.
                    this[mainKey].gameStats_set(key, 0);
                }
    
                // Adjust the pieceStats, print the label, and reset each value to 0.
                let keys = ["T","L","Z","O","S","J","I"];
                for(let i=0, l=keys.length; i<l; i+=1){
                    // Adjust the y for the piece texts.
                    this[mainKey].pieceStats[keys[i]].x += this._core.pieceStats_home[pkey].x;
                    this[mainKey].pieceStats[keys[i]].y += this._core.pieceStats_home[pkey].y;
                }
                this[mainKey].pieceStats_draw_all();

                // Save the coords for the next piece box.
                this[mainKey].nextPiece_home = this._core.nextPiece_home[mainKey];

                // Draw the menu for the next piece.
                _APP.game.shared.drawBorderBox_tilemaps(
                    _APP.game.shared.createBorderBox_tilemaps( 
                        this._core.nextPiece_home[mainKey].x, 
                        this._core.nextPiece_home[mainKey].y, 
                        this._core.nextPiece_home[mainKey].w, 
                        this._core.nextPiece_home[mainKey].h, 
                        ["NEXT"], 
                        {
                            border_bg  : { li:0, tsn:"tilesBG1", tmn: "bg6_tile" },
                            border_fg  : { li:1 },
                            inner_bg   : { li:0, tsn:"tilesBG1", tmn: "blacktile" },
                            // inner_bg   : { li:0, tsn:"tilesBG1", tmn: "grid1" },
                            // inner_bg   : { li:0, tsn:"tilesBG1", tmn: "bg6_tile" },
                            inner_text : { li:1, tsn:"tilesTX1" }
                        }
                    )
                );

                // Create the piecesField array of arrays for this player. 
                this[mainKey].piecesField = [];
                for(let y=0, yl=this[mainKey].playfield.h-2; y<yl; y+=1){
                    this[mainKey].piecesField.push( Array(this[mainKey].playfield.w-2).fill(" ") );
                }

                // Create the lineNumbersCompleted array.
                this[mainKey].lineNumbersCompleted = [];
    
                // Print the top player label.
                _GFX.util.tiles.print( { 
                    tsn: "tilesTX1", 
                    x  : this[mainKey].playfield.x+2, 
                    y  : this[mainKey].playfield.y-2, 
                    li : 1, 
                    str: `Player ${p+1}` 
                } );
    
                // Draw the playfield.
                _APP.game.shared.drawBorderBox_tilemaps(
                    _APP.game.shared.createBorderBox_tilemaps( 
                        this[mainKey].playfield.x, 
                        this[mainKey].playfield.y, 
                        this[mainKey].playfield.w, 
                        this[mainKey].playfield.h, 
                        [], 
                        {
                            border_bg  : { li:0, tsn:"tilesBG1", tmn: "bg2_tile" },
                            border_fg  : { li:1 },
                            inner_bg   : { li:0, tsn:"tilesBG1", tmn: "grid1" },
                            inner_text : { li:1, tsn:"tilesTX1" }
                        }
                    )
                );

                // Draw the playfield border on Layer 2 (DEBUG).
                _APP.game.shared.drawBorderBox_tilemaps(
                    _APP.game.shared.createBorderBox_tilemaps( 
                        this[mainKey].playfield.x, 
                        this[mainKey].playfield.y, 
                        this[mainKey].playfield.w, 
                        this[mainKey].playfield.h, 
                        [], 
                        {
                            border_bg  : { li:0, tsn:"tilesBG1", tmn: "bg6_tile" },
                            border_fg  : { li:2 },
                            // inner_bg   : { li:0, tsn:"tilesBG1", tmn: "grid1" },
                            // inner_text : { li:1, tsn:"tilesTX1" }
                        }
                    )
                );
    
                // Print the player label for the piece stats.
                _GFX.util.tiles.print( { 
                    tsn: "tilesTX1", 
                    x  : this._core.pieceStats_home[pkey].x, 
                    y  : this._core.pieceStats_home[pkey].y, 
                    li : 1, 
                    str: `P${p+1}` 
                } );
    
                // Print the game stats values.
                this[mainKey].gameStats_draw_all();
    
                // Draw the background for the piece stats.
                _GFX.util.tiles.fillWithOneTile_tilemap({ 
                    tmn: "bg6_tile", 
                    x  : 1, 
                    y  : 28, 
                    w  : 30, h:3, 
                    tsn: "tilesBG1", li:0 
                });

                // Generate the nextPiece. Leave currPiece and currPieceRotation as undefined.
                this[mainKey].nextPiece         = this[mainKey].generateRandomPiece();
                this[mainKey].currPiece         = undefined;
                this[mainKey].currPieceRotation = undefined;
                
                // Set the initial value for quickDrop.
                this[mainKey].quickDrop = false;

                // DEBUG
                // if(pkey == "p1"){
                //     this[mainKey].addPieceToLanded_debug();
                // }
            }
    
            // Draw the piece stats images.
            for(let key in this._core.pieceStats_img){
                // Piece stats - img.
                _GFX.util.tiles.drawTilemap(this._core.pieceStats_img[key]);
            }
        },
    },

    init: function(){
        _APP.game.gamestates["gs_play"].playField.dropSpeeds = this.playField.dropSpeeds;
        _APP.game.gamestates["gs_play"].playField.pieces = this.playField.pieces;
        _APP.game.gamestates["gs_play"].playField.init = this.playField.init;

        // Create and return the _core object. 
        _APP.game.gamestates["gs_play"].playField._core = (()=>{
            let obj = { funcs:{} };
            
            // Data objects. 
            for(key in this.playField._core_data){ 
                obj[key] = this.playField._core_data[key]; 
            }
            
            // Core functions (not yet separated.)
            for(key in this.playField._core_funcs_unseparated){ 
                obj.funcs[key] = this.playField._core_funcs_unseparated[key]; 
            }

            // Play functions.
            for(key in this.playField._core_funcs_play){ 
                obj.funcs[key] = this.playField._core_funcs_play[key]; 
            }

            // Landed piece functions.
            for(key in this.playField._core_funcs_landed){ 
                obj.funcs[key] = this.playField._core_funcs_landed[key]; 
            }

            // gameStats funcs
            for(key in this.playField._core_funcs_gameStats){ 
                obj.funcs[key] = this.playField._core_funcs_gameStats[key]; 
            }
            
            // pieceStats funcs
            for(key in this.playField._core_funcs_pieceStats){ 
                obj.funcs[key] = this.playField._core_funcs_pieceStats[key]; 
            }
            
            // input funcs
            for(key in this.playField._core_funcs_input){ 
                obj.funcs[key] = this.playField._core_funcs_input[key]; 
            }

            return obj;
        })();
        this.inited = true;
    },
};