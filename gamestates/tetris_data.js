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
            pieceSpawnIndexes: { "T":2, "L":1, "Z":0, "O":0, "S":0, "J":3, "I":1 },

            // Pieces/rotations/tilesets/tilemaps.
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
        },
        _core_funcs_gameStats: {
            // GAME STATS
            gameStats_set: function(key, value){
                // EXAMPLE USAGE: gameStats_set("score", 0);
                this.gameStats[key].value = value;
                this.gameStats_draw_one(key);
            },
            gameStats_incrementBy: function(key, value){
                // EXAMPLE USAGE: gameStats_set("score", 10);
                // console.log("gameStats_incrementBy:", key, value);
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
        _core_funcs_unseparated: {
            // PIECES LANDED

            addPieceToLanded_debug: function(){
                this.piecesField[this.piecesField.length-7] = [ " ", " ", "T", "L", "Z", "O", "I", "S", "J", "I" ];
                this.piecesField[this.piecesField.length-6] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", "O" ];
                this.piecesField[this.piecesField.length-5] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", "O" ];
                this.piecesField[this.piecesField.length-4] = [ "O", "O", "O", "S", " ", " ", "S", "O", "O", "O" ];
                this.piecesField[this.piecesField.length-3] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", "O" ];
                this.piecesField[this.piecesField.length-2] = [ "O", "O", "O", "O", "I", "O", "O", "O", "O", "O" ];
                this.piecesField[this.piecesField.length-1] = [ "T", "L", "Z", "O", "I", "S", "J", "I", " ", " " ];
            },
            pieceisAtTop: function(){
                // x 15 and 16
                // y 14
                let piecesCoords = this.parent.pieces.getData(this.currPiece, 0).rotations[this.currPieceRotation];
                // console.log("pieceisAtTop:", piecesCoords, "Y:", this.currPieceY, "X:", this.currPieceX);
                if(this.currPieceY == -2){ return true; }
                return false;
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
                        this.piecesField[line].fill("X");
                        allLinesDone = true;
                    }
                }
    
                //
                if(allLinesDone){ 
                    // The piecesField should end up with the same number of rows that it started with.
                    
                    // Determine the points to assign.
                    let basePoints = [40,100,300,1200];
                    let points = basePoints[this.lineNumbersCompleted.length-1] * (1+this.gameStats.level.value);

                    // DEBUG - Impossible under normal/correct gameplay.
                    if(this.lineNumbersCompleted.length > 4){ points = 112233; }
                    
                    // Add to score and to lines.
                    this.gameStats_incrementBy("score", points);
                    this.gameStats_incrementBy("lines", this.lineNumbersCompleted.length);

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
            addPieceToLanded: function(xOffset=0, yOffset=0){
                // Convert the currPiece tiles to tiles on layer 1 and remove the currPiece from layer 2.
                
                // We can get the coordinates of each part of the currPiece.
                let data = this.getCollisionData(this.currPiece, this.currPieceRotation, xOffset, yOffset);
                
                // Add those pieces at the same coordinates to the piecesField as normal tiles.
                for(let i=0, l=data.length; i<l; i+=1){
                    let x = data[i].landedCoord[1];
                    let y = data[i].landedCoord[0];
                    this.piecesField[y][x] = this.currPiece;
                }

                // SCORE
                if(this.quickDrop){ this.gameStats_incrementBy("score", 10 + (10*this.gameStats.level.value+1)); }
                else              { this.gameStats_incrementBy("score", 5 + (5*this.gameStats.level.value+1));  }

                // Set the currPiece to undefined. 
                this.currPiece = undefined;

                // Clear the playfield. 
                this.clearUpperPlayfield();
            },
    
            // MOVING/ROTATING PIECES (AND COLLISION)

            // Converts the specified piece/rotation with the specified x and y offset to data.
            getCollisionData: function(piece, rotation, xOffset, yOffset){
                let piecesCoords = this.parent.pieces.getData(piece, 0).rotations[rotation];

                let rect2 = {
                    x:this.playfield.x+1, y:this.playfield.y+1, 
                    w:this.playfield.w-3, h:this.playfield.h-3
                };

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
                        rec.matchingLanded = this.piecesField[ piecesCoords[rec.pieceIndex][1] + this.currPieceY +yOffset][ piecesCoords[rec.pieceIndex][0] + this.currPieceX +xOffset];
                        rec.landedCoord    = [piecesCoords[rec.pieceIndex][1] + this.currPieceY+yOffset, piecesCoords[rec.pieceIndex][0] + this.currPieceX+xOffset];
                    }
                    // else{
                    //     console.log(rec.pieceIndex, "oob:", JSON.stringify(rec.oob));
                    // }
                }

                return data;
            },
            // Playfield boundary check. Works for movement. Supports all rotations during movement.
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
            // Playfield boundary check. Works for rotations.
            checkForCollision_rotate: function(rotationDir){
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
    
                // If it cannot rotate then return false.
                if(!canRotate){ return false; }
                
                // If it can rotate then assign the new value and return true.
                this.currPieceRotation = newRotationIndex;
                return true;
            },

            // DRAWING/SPAWNING.
            
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
                    if(this.pieceCounter == 0){ console.log("first"); return keys[next]; }

                    // 
                    // let avg = ((pieceStats[keys[next]].value/this.pieceCounter)*100)<<0;
                    // if( ! (avg >= 15) ){ return keys[next]; }
                    if( ! (pieceStats[keys[next]].avg >= 15) ){ return keys[next]; }
                }

                // Could not find a good match. Give the last attempt.
                return keys[next];
            },
            spawnNextPiece: function(){
                this.spawnPiece(this.nextPiece);
            },
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

                // Draw the currPiece.
                this.drawCurrentPiece();
            },
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
                let rec = this.parent.pieces.getData(this.currPiece, 0);
    
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
        _core_funcs_landed: {},
        _core_funcs_moving: {},
        _core_funcs_input: {
            gameInputHandler: function(){
                let data = {
                    movement: false,
                    rotate  : false,
                    keys    : ["press", "held"],
                    type    : "",
                };
                
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

                    // Only allow for movement/rotation button per frame.
                    if( data.type.BTN_UP || data.type.BTN_DOWN || data.type.BTN_LEFT || data.type.BTN_RIGHT){
                        // Do not act if a movement was already set.
                        if(!data.movement){
                            if     (data.type.BTN_UP && data.keys[i] == "press"){
                                this.quickDrop = !this.quickDrop;

                                // if( this.checkForCollision_move("UP") ){ 
                                //     this.currPieceY -= 1; 
                                //     data.movement = true; 
                                // }
                            }
                            else if(data.type.BTN_DOWN){
                                if( this.checkForCollision_move("DOWN") ){ 
                                    this.currPieceY += 1; 
                                    data.movement = true; 
                                }
                            }
                            else if(data.type.BTN_LEFT){
                                if( this.checkForCollision_move("LEFT") ){ 
                                    this.currPieceX -= 1; 
                                    data.movement = true; 
                                }
                            }
                            else if(data.type.BTN_RIGHT){
                                if( this.checkForCollision_move("RIGHT") ){ 
                                    this.currPieceX += 1; 
                                    data.movement = true; 
                                }
                            }
                        }
                    }

                    // Only allow rotations on press.
                    else if(data.keys[i] == "press"){
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

                if(data.movement || data.rotate){
                    // Reset the now general timer to restart the delay for held buttons. 
                    _APP.game.shared.resetGeneralTimer(this.mainKey + "inputDelay");
    
                    // Draw the piece.
                    this.drawCurrentPiece();
                }

                // // Has any button been pressed by this player?
                // if(_INPUT.util.checkButton(pkey, ["press"], [])){
                //     // Set the timer to finished.
                //     _APP.game.shared.finishGeneralTimer(mainKey + "inputDelay");
                // }
            },
        },

        // Same init for single, multi (p1, p2).
        init: function(players){
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
                // this[mainKey].addPieceToLanded_debug();
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