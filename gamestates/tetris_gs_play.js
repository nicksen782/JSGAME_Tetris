_APP.game.gamestates["gs_play"] = {
    // Variables within this game state.

    // Animations. (Populated via _APP.game.sharedharedhared.animations1.generator).
    animations: {
        // Placeholder animation objects.
        
        // Placeholder draw objects.
        draw       : {},
        _draw      : {},
    },

    // consts.dropSpeeds  = [
    //     game.secondsToFrames(1.00) , // 0
    //     game.secondsToFrames(0.90) , // 1
    //     game.secondsToFrames(0.80) , // 2
    //     game.secondsToFrames(0.70) , // 3
    //     game.secondsToFrames(0.60) , // 4
    //     game.secondsToFrames(0.50) , // 5
    //     game.secondsToFrames(0.40) , // 6
    //     game.secondsToFrames(0.30) , // 7
    //     game.secondsToFrames(0.20) , // 8
    //     game.secondsToFrames(0.15) , // 9
    //     // game.secondsToFrames(0.05) , // 10 // This was too fast and blocked user input.
    // ];

    // mode: "multi",
    playField: {
        // 
        
        // Tetriminos spawnIndexs and matrixes of rotations.
        pieceSpawnIndexes: {
            "T":2,
            "L":1,
            "Z":0,
            "O":0,
            "S":0,
            "J":3,
            "I":1,
        },
        pieces : {
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
            "T" : {
                "rotations": 
                [
                    [ [1,2],[2,2],[3,2],[2,1] ], // T up
                    [ [2,1],[2,2],[3,2],[2,3] ], // T right
                    [ [1,2],[2,2],[3,2],[2,3] ], // T down (spawn)
                    [ [2,1],[1,2],[2,2],[2,3] ]  // T left
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
                    [ [2,1],[2,2],[2,3],[3,3] ], // L right
                    [ [1,2],[2,2],[3,2],[1,3] ], // L down (SPAWN)
                    [ [1,1],[2,1],[2,2],[2,3] ], // L left
                    [ [3,1],[1,2],[2,2],[3,2] ]  // L up
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
                    [ [1,2],[2,2],[2,3],[3,3] ], // Z horizontal (spawn)
                    [ [3,1],[2,2],[3,2],[2,3] ], // Z vertical
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
                    [ [1,2],[2,2],[1,3],[2,3] ], // O (SPAWN)
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
                    [ [2,2],[3,2],[1,3],[2,3] ], // S horizontal (SPAWN)
                    [ [2,1],[2,2],[3,2],[3,3] ], // S vertical
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
                    [ [2,1],[2,2],[1,3],[2,3] ], // J left
                    [ [1,1],[1,2],[2,2],[3,2] ], // J up
                    [ [2,1],[3,1],[2,2],[2,3] ], // J right
                    [ [1,2],[2,2],[3,2],[3,3] ]  // J down (SPAWN)
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
                    [ [2,0],[2,1],[2,2],[2,3] ], // I vertical
                    [ [0,2],[1,2],[2,2],[3,2] ], // I horizontal (SPAWN)
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
        getDropSpeedFramesFromLevel: function(level){
            // Levels 0 through 9.
            if(level >= 0 && level <= 9){
                return this.dropSpeeds.set[level].f;
            }
            // Levels above 9 and less than 29.
            else if(level > 9 && level < 29){
                return this.dropSpeeds.range.find(rec=>rec.l.indexOf(level) != -1).f;
            }
            // Levels equal or above 29.
            else{
                return this.dropSpeeds.range.find(rec=>rec.l.indexOf(29) != -1).f;
            }
        },
        // https://meatfighter.com/nintendotetrisai/ (Dropping Tetriminos)
        dropSpeeds: {
            set:[
                { f:48, l:0 },
                { f:43, l:1 },
                { f:38, l:2 },
                { f:33, l:3 },
                { f:28, l:4 },
                { f:23, l:5 },
                { f:18, l:6 },
                { f:13, l:7 },
                { f:8 , l:8 },
                { f:6 , l:9 },
            ],
            range:[
                { f:5 , l:[...Array(12 - 10 + 1).keys()].map(x => x + 10) },
                { f:4 , l:[...Array(15 - 13 + 1).keys()].map(x => x + 13) },
                { f:3 , l:[...Array(18 - 16 + 1).keys()].map(x => x + 16) },
                { f:2 , l:[...Array(28 - 19 + 1).keys()].map(x => x + 19) },
                { f:1 , l:[29] },
            ],
        },

        // Copy from here.
        _core: {
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

            // (COPY THIS) Drawn with coords relative to "pieceStats_home". 
            "pieceStats_text"  : {
                "T":{ tsn:"tilesTX1", x:3+(3*0), y:0, li:1, value:0 },
                "L":{ tsn:"tilesTX1", x:4+(3*1), y:0, li:1, value:0 },
                "Z":{ tsn:"tilesTX1", x:5+(3*2), y:0, li:1, value:0 },
                "O":{ tsn:"tilesTX1", x:6+(3*3), y:0, li:1, value:0 },
                "S":{ tsn:"tilesTX1", x:7+(3*4), y:0, li:1, value:0 },
                "J":{ tsn:"tilesTX1", x:8+(3*5), y:0, li:1, value:0 },
                "I":{ tsn:"tilesTX1", x:9+(3*6), y:0, li:1, value:0 },
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

            // FUNCTIONS
            funcs: {
                // FUNCTIONS - STATS
                gameStats_set: function(key, value){
                    // EXAMPLE USAGE: gameStats_set("score", 0);
                    this.gameStats[key].value = value;
                },
                gameStats_incrementBy: function(key, value){
                    // EXAMPLE USAGE: gameStats_set("score", 10);
                    this.gameStats[key].value += value;
                },
                gameStats_draw: function(){
                    for(let key in this.gameStats){
                        _GFX.util.tiles.print( 
                            { 
                                tsn: "tilesTX1", 
                                x  : this.gameStats[key].x+6, 
                                y  : this.gameStats[key].y, 
                                li : 1, 
                                str: this.gameStats[key].value.toString().padStart(6, "0") 
                            } 
                        );
                    }
                },
                pieceStats_set: function(key, value){
                    this.pieceStats[key].value = value;
                    this.pieceStats_draw();
                },
                pieceStats_increment: function(key, value){
                    this.pieceStats[key].value += 1;
                    this.pieceStats_draw();
                },
                pieceStats_draw: function(){
                    for(let key in this.pieceStats){
                        _GFX.util.tiles.print(
                            { 
                                tsn: "tilesTX1", 
                                x  : this.pieceStats[key].x, 
                                y  : this.pieceStats[key].y, 
                                li : 1, 
                                str: this.pieceStats[key].value.toString().padStart(3, "0") 
                            }
                        );
                    }
                },
    
                // FUNCTIONS - PIECES LANDED
                addPieceToLanded_debug: function(){
                    this.piecesField[this.piecesField.length-5] = [ "L", "Z", "O", "S", "J", "Z", "I", "T", " ", " " ];
                    this.piecesField[this.piecesField.length-4] = [ "O", "J", "Z", "O", "S", "I", "Z", "T", "T", "O" ];
                    this.piecesField[this.piecesField.length-3] = [ "O", "L", "Z", "I", "S", "J", "Z", "I", "T", "O" ];
                    this.piecesField[this.piecesField.length-2] = [ "O", "T", "Z", "O", "I", "J", "I", "I", "T", "O" ];
                    this.piecesField[this.piecesField.length-1] = [ " ", "L", "Z", "O", "S", "J", "Z", "I", "T", " " ];
                },
                drawLandedPieces: function(){
                    for(let y=0, yl=this.piecesField.length; y<yl; y+=1){
                        for(let x=0, xl=this.piecesField[y].length; x<xl; x+=1){
                            let tilesetName = "tilesG1";
                            let tilemapName;

                            // Background tiles. 
                            switch(this.piecesField[y][x]){
                                case " ": { tilemapName = "transparent_tile"; break; }
                                case "X": { tilemapName = "X_tile"; break; }
                                case "T": { tilemapName = this.parent.pieces.getData("T", 0).map_bg; break; }
                                case "L": { tilemapName = this.parent.pieces.getData("L", 0).map_bg; break; }
                                case "Z": { tilemapName = this.parent.pieces.getData("Z", 0).map_bg; break; }
                                case "O": { tilemapName = this.parent.pieces.getData("O", 0).map_bg; break; }
                                case "S": { tilemapName = this.parent.pieces.getData("S", 0).map_bg; break; }
                                case "J": { tilemapName = this.parent.pieces.getData("J", 0).map_bg; break; }
                                case "I": { tilemapName = this.parent.pieces.getData("I", 0).map_bg; break; }
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
                detectLineCompletions: function(){
                    let lineNumbersCompleted = [];
                    for(let y=0, yl=this.piecesField.length; y<yl; y+=1){
                        if(this.piecesField[y].indexOf(" ") == -1){ lineNumbersCompleted.push({ line: y, count: 0, state:0, prev: this.piecesField[y].slice() } ); }
                    }
                    // console.log("updateLineCompletions: lineNumbersCompleted:", lineNumbersCompleted);
                    this.lineNumbersCompleted = lineNumbersCompleted;
                    return lineNumbersCompleted.length ? true : false;
                },
                doLineCompletionAnimation: function(){
                    let line;
                    let allLinesDone = false;
                    for(let i=this.lineNumbersCompleted.length-1; i >= 0; i -=1 ){
                        // Save the line number to save some space here.
                        line = this.lineNumbersCompleted[i].line; 

                        // Change the values on even iterations of count.
                        if(this.lineNumbersCompleted[i].count % 2 == 0){ this.piecesField[line].fill("X"); }
                        
                        // Return the values to their previous values on odd iterations of the count.
                        else                                           { this.piecesField[line] = this.lineNumbersCompleted[i].prev.slice(); }
                        
                        // Increment the count. 
                        this.lineNumbersCompleted[i].count += 1;
                        
                        // If the count is over then remove this line from lineNumbersCompleted.
                        if(this.lineNumbersCompleted[i].count > 7){ 
                            // this.lineNumbersCompleted.splice(i, 1); 
                            // this.piecesField[line].fill(" ");
                            // this.piecesField[line].splice(line, 1);
                            // this.piecesField.unshift( Array(10).fill(" ") );
                            this.piecesField[line].fill("X");
                            allLinesDone = true;
                        }
                    }

                    if(!allLinesDone){ 
                        // console.log("Lines still remain to be cleared."); 
                    }
                    else{ 
                        // The piecesField should end up with the same number of rows that it started with.
                        // console.log("No more lines to clear."); 
                        for(let i=this.lineNumbersCompleted.length-1; i >= 0; i -=1 ){
                            // Add a blank line to the top.
                            this.piecesField.unshift( Array(10).fill(" ") );
                        }
                        
                        // Clear out the lineNumbersCompleted.
                        this.lineNumbersCompleted = []; 

                        // Move the pieces down.
                        // Remove all rows in piecesField where it includes "X".
                        this.piecesField = this.piecesField.filter(c=>{ 
                            return ! c.includes("X")
                        });

                        // console.table(this.lineNumbersCompleted);
                        // console.table(_APP.game.gamestates["gs_play"].playField.single.piecesField);
                    }
                },
                addPieceToLanded: function(){
                    // Convert the currPiece tiles to tiles on layer 1 and remove the currPiece from layer 2.
                },

                // FUNCTIONS - MOVING PIECES
                generateRandomPiece: function(){
                    let keys = ["T","L", "Z","O", "S","J", "I"];
                    let min = 0;
                    let max = keys.length -1;
                    let next = Math.floor(Math.random() * (max - min + 1)) + min;
                    return keys[next];
                },
                spawnNextPiece: function(){
                    this.spawnPiece(this.nextPiece);
                },
                spawnPiece: function(piece){
                    // Save this piece as the currPiece.
                    this.currPiece = piece;
                    this.pieceStats_increment(this.currPiece);

                    // Set the default starting rotation.
                    this.currPieceRotation = this.parent.pieceSpawnIndexes[piece];

                    // Set the default x and y for this piece.
                    this.currPieceX =   3;
                    this.currPieceY =  -2;

                    // Generate the nextPiece.
                    this.nextPiece = this.generateRandomPiece();

                    // Draw the currPiece.
                    this.drawCurrentPiece();
                },
                drawCurrentPiece: function(){
                    let rec = this.parent.pieces.getData(this.currPiece, 0);

                    // // DEBUG: Display currPieceX and currPieceY and matrix.
                    // _GFX.util.tiles.fillWithOneTile_tilemap({ 
                    //     tmn:"X_tile782", 
                    //     // tmn:"X_tile", 
                    //     x  : this.currPieceX + (this.playfield.x+1), 
                    //     y  : this.currPieceY + (this.playfield.y+1), 
                    //     w:5, 
                    //     h:5, 
                    //     // tsn:"tilesG1", 
                    //     tsn:"tilesLOAD", 
                    //     li:2 
                    // });

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
                // boundingBoxCollision: function(rect1, rect2){
                //     // Sharing same coordinate.
                //     // if( rect1.x==rect2.x && rect1.y==rect2.y ) { return true; }
                //     if(0){}
                //     // Rect within rect.
                //     else{
                //         return (
                //             rect1.x < rect2.x + rect2.w &&
                //             rect1.x + rect1.w > rect2.x &&
                //             rect1.y < rect2.y + rect2.h &&
                //             rect1.h + rect1.y > rect2.y
                //         );
                //     }
                // },

                // Playfield boundary check. Works for movement. Supports all rotations during movement.
                boundaryCheck_move: function(dir){
                    // For a playfield boundary check it is only required that each piece still be within the playfield after the specified movement.
                    // We WANT a collision in this case.

                    let rec = this.parent.pieces.getData(this.currPiece, 0).rotations[this.currPieceRotation];
                    let rect2 = {
                        x:this.playfield.x+1, 
                        y:this.playfield.y+1, 
                        w:this.playfield.w-3, 
                        h:this.playfield.h-3
                    };

                    // Check all parts of the piece.
                    for(let piece of rec){
                        // Get the piece x,y and the absolute coords.
                        let pieceX = piece[0] + rect2.x + this.currPieceX;
                        let pieceY = piece[1] + rect2.y + this.currPieceY;

                        // Check for pieceY - 1 against rect2.y for up.
                        if     (dir == "UP"    && (pieceY - 1) < rect2.y)          { return false; }

                        // Check for pieceX - 1 against rect2.x for left.
                        else if(dir == "LEFT"  && (pieceX - 1) < rect2.x)          { return false; }
                        
                        // Check for pieceY + 1 against rect2.y for down.
                        else if(dir == "DOWN"  && (pieceY + 1) > rect2.y + rect2.h){ return false; }
                        
                        // Check for pieceX + 1 against rect2.x for right.
                        else if(dir == "RIGHT" && (pieceX + 1) > rect2.x + rect2.w){ return false; }
                    }
                    return true; 
                },

                // Playfield boundary check. Works for rotations.
                boundaryCheck_rotate: function(rotationDir){
                    let pieceRotations = this.parent.pieces.getData(this.currPiece, 0).rotations;
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
                        let rec = this.parent.pieces.getData(this.currPiece, 0).rotations[newRotationIndex];
                        let rect2 = {
                            x:this.playfield.x+1, 
                            y:this.playfield.y+1, 
                            w:this.playfield.w-3, 
                            h:this.playfield.h-3
                        };

                        // Check all parts of the piece.
                        for(let piece of rec){
                            let pieceX = piece[0] + rect2.x + this.currPieceX;
                            let pieceY = piece[1] + rect2.y + this.currPieceY;
                            
                            // Rotations use boundary checks for each piece (all boundary sides.)
                            if( (pieceY) < rect2.y          ){ return false; } // Boundary test: UP
                            if( (pieceX) < rect2.x          ){ return false; } // Boundary test: LEFT
                            if( (pieceY) > rect2.y + rect2.h){ return false; } // Boundary test: DOWN
                            if( (pieceX) > rect2.x + rect2.w){ return false; } // Boundary test: RIGHT
                        }
                        return true; 
                    })();

                    // If it cannot rotate then return false.
                    if(!canRotate){ return false; }
                    
                    // If it can rotate then assign the new value and return true.
                    this.currPieceRotation = newRotationIndex;
                    return true;
                },

                landedPiecesCheck_move: function(dir){},
                landedPiecesCheck_rotation: function(rotationDir){},
            },

        },

        // Same init for single, multi (p1, p2).
        init: function(players){
            for(let p=0; p<players; p+=1){
                // Generate the player key to be used here. 
                let mainKey;
                let pkey   ;
                
                if(players == 1){ 
                    mainKey = `single`;
                    pkey    = `p1`;
                }
                else{
                    mainKey = `p${p+1}`;
                    pkey    = `p${p+1}`;
                }

                // Create the mainKey object if it does not exist.
                if(!this[mainKey]){ this[mainKey] = {}; }
                
                // Set the parent.
                this[mainKey].parent = this;

                // Copy some of the _core values.
                this[mainKey].playfield  = JSON.parse(JSON.stringify(this._core.playfield));
                this[mainKey].gameStats  = JSON.parse(JSON.stringify(this._core.gameStats));
                this[mainKey].pieceStats = JSON.parse(JSON.stringify(this._core.pieceStats_text));

                // Copy the _core functions.
                for(func in this._core.funcs){
                    this[mainKey][func] = this._core.funcs[func];
                }
    
                // Adjust the playfield.
                this[mainKey].playfield.x += this._core.home[mainKey].x;
                this[mainKey].playfield.y += this._core.home[mainKey].y;
    
                // Adjust the gamestats, print the label, and reset each value to 0.
                for(let key in this[mainKey].gameStats){
                    this[mainKey].gameStats[key].x += this._core.home[mainKey].x ;
                    this[mainKey].gameStats[key].y += this._core.home[mainKey].y ;
                    _GFX.util.tiles.print( { tsn:"tilesTX1", x:this[mainKey].gameStats[key].x, y:this[mainKey].gameStats[key].y, li:1, str:this[mainKey].gameStats[key].label } );
                    this[mainKey].gameStats_set(key, 0);
    
                    // Draw the backgrounds for the game stats.
                    _GFX.util.tiles.fillWithOneTile_tilemap({ 
                        tmn: "bg6_tile", 
                        x  : this[mainKey].gameStats[key].x, 
                        y  : this[mainKey].gameStats[key].y, 
                        w  : 12, h:1, 
                        tsn: "tilesBG1", li:0 
                    });
                }
    
                // Adjust the pieceStats, print the label, and reset each value to 0.
                let keys = ["T","L","Z","O","S","J","I"];
                for(let i=0, l=keys.length; i<l; i+=1){
                    // Adjust the y for the piece texts.
                    this[mainKey].pieceStats[keys[i]].x += this._core.pieceStats_home[pkey].x;
                    this[mainKey].pieceStats[keys[i]].y += this._core.pieceStats_home[pkey].y;
    
                    // Set the value to 0.
                    this[mainKey].pieceStats_set(keys[i], 0);
                }

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

                // Draw the playfield (DEBUG).
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
                this[mainKey].gameStats_draw();
    
                // Draw the background for the piece stats.
                _GFX.util.tiles.fillWithOneTile_tilemap({ 
                    tmn: "bg6_tile", 
                    x  : 1, 
                    y  : 28, 
                    w  : 30, h:3, 
                    tsn: "tilesBG1", li:0 
                });

                this[mainKey].nextPiece         = this[mainKey].generateRandomPiece();
                this[mainKey].currPiece         = undefined;
                this[mainKey].currPieceRotation = undefined;

                this[mainKey].addPieceToLanded_debug();
            }
    
            // Draw the piece stats images.
            for(let key in this._core.pieceStats_img){
                // Piece stats - img.
                _GFX.util.tiles.drawTilemap(this._core.pieceStats_img[key]);
            }
        },
    },

    config: {
        players          : undefined,
        paused           : undefined,
    },
    unpausedVRAM: undefined,

    inited: false,

    // Constants within this game state.
    //

    // Run once upon changing to this game state.
    init: async function(){
        console.log("gs_play init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Make sure any existing fade gets cleared.
        _GFX.util.fade.setFade({ level: 0 });

        // _GFX.util.fade.fadeIn({ delay: 5, block: true });

        let dimensions = _JSG.loadedConfig.meta.dimensions;
        
        // Background - / stripe.
        // _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"bg1_tile", x:0, y:0, w:dimensions.cols, h:dimensions.rows, tsn:"tilesBG1", li:0 });
        
        // Background - \ stripe.
        // _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"bg2_tile", x:0, y:0, w:dimensions.cols, h:dimensions.rows, tsn:"tilesBG1", li:0 });
        
        // Background - deep blue.
        _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"bg5_tile", x:0, y:0, w:dimensions.cols, h:dimensions.rows, tsn:"tilesBG1", li:0 });
        
        // Background - grey.
        // _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"bg6_tile", x:0, y:0, w:dimensions.cols, h:dimensions.rows, tsn:"tilesBG1", li:0 });

        // TIMERS
        for(let mainKey of ["single", "p1", "p2"]){
            _APP.game.shared.createGeneralTimer(mainKey + "inputDelay", 6);
            _APP.game.shared.createGeneralTimer(mainKey + "dropDelay", _APP.game.gamestates["gs_play"].playField.getDropSpeedFramesFromLevel(0));
            _APP.game.shared.createGeneralTimer(mainKey + "lineClearDelay", 8);
        }
        // _APP.game.shared.resetGeneralTimer("")
        // _APP.game.shared.finishGeneralTimer("")

        for(let key in this.config){
            this.config[key] = undefined;
        }

        this.inited = true; 

        this.config.paused  = false;
        this.config.players = 1;
        // this.players = 2;

        // let players = 2;
        this.playField.init(this.config.players);
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        // Run init and return if this gamestate is not yet inited.
        if(!this.inited){ this.init(); return; }

        let mainKey;
        let pkey   ;
        for(let p=0; p<this.config.players; p+=1){
            // Generate the player key to be used here. 
            if(this.config.players == 1){ mainKey = `single` ; pkey  = `p1`; }
            else                        { mainKey = `p${p+1}`; pkey  = mainKey; }

            // GAME OVER 
            // if(this.gameover){ 
                // Change the gamestate.
                //

                // Return.
                // return; 
            // }

            // BUTTON INPUT: PAUSE/UNPAUSE? 
            if(_INPUT.util.checkButton(pkey, "press", "BTN_START" )){
                // Not paused? Pause it.
                if(!this.config.paused){
                    // Copy the current VRAM.
                    let dimensions = _JSG.loadedConfig.meta.dimensions;
                    this.unpausedVRAM = _GFX.util.VRAM.getVramRegion( { 
                        x: 0, 
                        y: 0, 
                        w: dimensions.cols, 
                        h: dimensions.rows, 
                        l: [0, 1, 2] 
                    } );
                    _GFX.VRAM.clearVram();

                    // Display the pause text.
                    _APP.game.shared.drawBorderBox_tilemaps(
                        _APP.game.shared.createBorderBox_tilemaps( 
                            ((dimensions.cols/2) - (10/2)) << 0, // x
                            ((dimensions.rows/2) - (6/2))  << 0, // y
                            10, // w
                            6,  // h
                            [
                                "",
                                "  GAME  ",
                                " PAUSED ",
                                "",
                            ], 
                            {
                                // border_bg  : { li:0, tsn:"tilesBG1", tmn: "bg2_tile" },
                                border_fg  : { li:1 },
                                // inner_bg   : { li:0, tsn:"tilesBG1", tmn: "grid1" },
                                inner_text : { li:1, tsn:"tilesTX1" }
                            }
                        )
                    );

                    // Hide sprites.
                    //

                    // Pause the music.
                    //

                    // Draw the pause screen.

                    // Set the paused flag. 
                    this.config.paused = true;

                    // End the loop for this player.
                    continue;
                }
                
                // Already paused? Unpause it.
                else{
                    // Clear the paused flag.
                    this.config.paused = false;
                    
                    // Restore the previously saved VRAM.
                    _GFX.VRAM.clearVram();
                    _GFX.util.VRAM.setVramRegion(this.unpausedVRAM);
                    //

                    // Restore sprites.
                    //

                    // Unpause the music.
                    //

                    // End the loop for this player.
                    continue; 
                }
            }

            // PAUSED
            if(this.config.paused){ 
                // End the loop for all players.
                return; 
            }

            // LINE ANIMATION/REMOVAL
            
            // Are lines waiting to be animated/removed?
            if(this.playField[mainKey].lineNumbersCompleted.length){
                // Is it time to do an animation/removal?
                if(_APP.game.shared.checkGeneralTimer(mainKey + "lineClearDelay")){
                    let howManyLines = this.playField[mainKey].lineNumbersCompleted.length; 

                    // Do the animation/remove and then draw.
                    this.playField[mainKey].doLineCompletionAnimation();
                    this.playField[mainKey].drawLandedPieces();

                    // Reset the timer for the next run.
                    _APP.game.shared.resetGeneralTimer(mainKey + "lineClearDelay");

                    // Lines fully removed? 
                    if(this.playField[mainKey].lineNumbersCompleted.length == 0){
                        // Assign points based on the number of lines and the level.
                        //
                    }
                }

                // Line animations/removals must be completed before the player can continue.
                // End the loop for this player.
                continue;
            }
            else{
                // Check for line completions.
                this.playField[mainKey].detectLineCompletions();
            }

            // SPAWN NEXT PIECE.
            if(!this.playField[mainKey].currPiece){
                // Spawn the nextPiece, generate a new nextPiece, draw the new currPiece.
                this.playField[mainKey].spawnNextPiece();

                // End the loop for this player. 
                continue;
            }

            // PIECE DROP
            /*
            if(this.quickDrop || _APP.game.shared.checkGeneralTimer(mainKey + "dropDelay")){
                // Piece can drop. 

                // Can it drop?: YES
                if( this.playField[mainKey].canPieceGoDown() ){
                    // DROP IT.
                }
                
                // Can it drop?: NO
                else{
                    // Gameover?: Is this piece at the top? YES
                    if( this.playField[mainKey].pieceisAtTop() ){
                        if(this.quickDrop){ this.quickDrop = false; return; }
                        this.gameover = true; 
                        
                        // Gameover animation.
                        //
                        
                        // Clear the playfield.
                        if( this.playField[mainKey].clearThePlayfield() ){

                        return; 
                    }

                    // Gameover?: Is this piece at the top? NO
                    else{
                        // Land the piece, update pieceField, load the next piece.
                        //
                    }
                }

                // Quick drop? ( Piece must end it's drop before other operations can continue. )
                if(this.quickDrop){ return; }
            }
            */
           
            // DEBUG: Free movement of a piece.
            if( _INPUT.util.checkButton(pkey, "press", ["BTN_UP", "BTN_DOWN", "BTN_LEFT", "BTN_RIGHT", "BTN_A", "BTN_B", "BTN_X", "BTN_Y", "BTN_SL", "BTN_SR"] ) ){
                let moved = false;
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_UP"]    ) ){ 
                    //
                    if(this.playField[mainKey].boundaryCheck_move("UP")){
                        this.playField[mainKey].currPieceY -= 1;
                        moved = true;
                    }
                    // console.log("Pressed: BTN_UP"); 
                }
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_DOWN"]  ) ){ 
                    //
                    if(this.playField[mainKey].boundaryCheck_move("DOWN")){
                        this.playField[mainKey].currPieceY += 1;
                        moved = true;
                    }
                }
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_LEFT"]  ) ){ 
                    //
                    if(this.playField[mainKey].boundaryCheck_move("LEFT")){
                        this.playField[mainKey].currPieceX -= 1;
                        moved = true;
                    }
                }
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_RIGHT"] ) ){ 
                    //
                    if(this.playField[mainKey].boundaryCheck_move("RIGHT")){
                        this.playField[mainKey].currPieceX += 1;
                        moved = true;
                    }
                }

                let rotated = false;
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_A"]     ) ){ 
                    // console.log("Pressed: BTN_A"); 
                    if(this.playField[mainKey].boundaryCheck_rotate(1)){
                        rotated = true; 
                    }
                }
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_B"]     ) ){ 
                    // console.log("Pressed: BTN_B"); 
                    if(this.playField[mainKey].boundaryCheck_rotate(-1)){
                        rotated = true; 
                    }
                }

                if(moved || rotated){
                    // Clear inner-playfield with the transparent_tile.
                    _GFX.util.tiles.fillWithOneTile_tilemap({ 
                        // tmn:"blacktile", 
                        tmn:"transparent_tile", 
                        // tmn:"X_tile", 
                        x:this.playField[mainKey].playfield.x+1, 
                        y:this.playField[mainKey].playfield.y+1, 
                        w:this.playField[mainKey].playfield.w-2, 
                        h:this.playField[mainKey].playfield.h-2, 
                        tsn:"tilesG1", 
                        li:2 
                    });
    
                    // console.log("pos x,y:", this.playField[mainKey].currPieceX, this.playField[mainKey].currPieceY);
                    this.playField[mainKey].drawCurrentPiece();
                }

                if( _INPUT.util.checkButton(pkey, "press", ["BTN_X"]     ) ){ console.log("Pressed: BTN_X"); }
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_Y"]     ) ){ console.log("Pressed: BTN_Y"); }
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_SL"]    ) ){ console.log("Pressed: BTN_SL"); _APP.game.gameLoop.loop_restart_sameStates(); return; }
                if( _INPUT.util.checkButton(pkey, "press", ["BTN_SR"]    ) ){ console.log("Pressed: BTN_SR"); }
            }
           
            // Move the piece down?
            /*
            */
          
            // BUTTON INPUT
            /*
            */
          
            // BUTTON INPUT: piece rotation
            /*
            */
          
            // BUTTON INPUT: horizontal movement
            /*
            */
          
            // BUTTON INPUT: downward movement (slow drop/quick drop).
            /*
            */

            continue; 
        }
    },

};