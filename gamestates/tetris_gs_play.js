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
                gameStats_update: function(key, value){
                    this.gameStats[key].value = value;
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
                pieceStats_update: function(key, value){
                    this.pieceStats[key].value = value;
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
                    for(let y=14, yl=this.piecesField.length; y<yl; y+=1){
                        this.piecesField[y] = [" ", "L", "Z", "O", "S", "J", "Z", "I", "T", " " ];
                    }
                    this.piecesField[this.piecesField.length-3] = ["O", "J", "Z", "O", "S", "J", "Z", "I", "T", "O" ];
                    this.piecesField[this.piecesField.length-2] = ["O", "L", "Z", "O", "S", "J", "Z", "I", "T", "O" ];
                    this.piecesField[this.piecesField.length-1] = ["O", "T", "Z", "O", "S", "J", "Z", "I", "T", "O" ];
                    this.drawLandedPieces();
                    this.detectLineCompletions();
                    // for(let i=0; i<11; i+=1){
                    //     this.doLineCompletionAnimation();
                    //     this.drawLandedPieces();
                    // }
                },
                addPieceToLanded: function(){
                },
                drawLandedPieces: function(){
                    for(let y=0, yl=this.piecesField.length; y<yl; y+=1){
                        for(let x=0, xl=this.piecesField[y].length; x<xl; x+=1){
                            let tilemapName;
                            // Background tiles. 
                            switch(this.piecesField[y][x]){
                                case " ": { tilemapName = "transparent_tile"; break; }
                                case "X": { tilemapName = "X_tile"; break; }
                                case "T": { tilemapName = "T_bgtile"; break; }
                                case "L": { tilemapName = "L_bgtile"; break; }
                                case "Z": { tilemapName = "Z_bgtile"; break; }
                                case "O": { tilemapName = "O_bgtile"; break; }
                                case "S": { tilemapName = "S_bgtile"; break; }
                                case "J": { tilemapName = "J_bgtile"; break; }
                                case "I": { tilemapName = "I_bgtile"; break; }
                                default: { console.error("drawLandedPieces: Invalid piece value:", this.piecesField[y][x]); return; break; }
                            };
                            _GFX.util.tiles.drawTilemap( { 
                                tsn: "tilesG1", 
                                x  : x + this.playfield.x + 1, 
                                y  : y + this.playfield.y + 1, 
                                li : 2, 
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
                        if(this.lineNumbersCompleted[i].count > 10){ 
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
                        console.log("No more lines to clear."); 
                        for(let i=this.lineNumbersCompleted.length-1; i >= 0; i -=1 ){
                            // Save the line number to save some space here.
                            line = this.lineNumbersCompleted[i].line; 
                            console.log("removing line:", line);

                            console.log( this.piecesField[line], line);
                            // console.log( this.piecesField[line].splice(line, 1) );
                            // this.piecesField.unshift( Array(10).fill("T") );
                            // this.lineNumbersCompleted.splice(i, 1); 
                        }
                        this.lineNumbersCompleted = []; 
                        this.piecesField = this.piecesField.filter(c=>{ 
                            console.log(c, c.includes("X"));
                            return ! c.includes("X")
                        });
                        this.piecesField.unshift();
                        this.piecesField.unshift();
                        this.piecesField.unshift();

                        // Move the pieces down.
                        console.table(this.lineNumbersCompleted);
                        console.table(_APP.game.gamestates["gs_play"].playField.single.piecesField);
                    }
                },
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
                    this[mainKey].gameStats_update(key, 0);
    
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
                    this[mainKey].pieceStats_update(keys[i], 0);
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
                // _APP.game.shared.drawBorderBox_tilemaps(
                //     _APP.game.shared.createBorderBox_tilemaps( 
                //         this[mainKey].playfield.x, 
                //         this[mainKey].playfield.y, 
                //         this[mainKey].playfield.w, 
                //         this[mainKey].playfield.h, 
                //         [], 
                //         {
                //             // border_bg  : { li:0, tsn:"tilesBG1", tmn: "bg2_tile" },
                //             border_fg  : { li:2 },
                //             // inner_bg   : { li:0, tsn:"tilesBG1", tmn: "grid1" },
                //             // inner_text : { li:1, tsn:"tilesTX1" }
                //         }
                //     )
                // );
    
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
    
                // Print the piece stats counts.
                this[mainKey].pieceStats_draw();
    
                // Draw the background for the piece stats.
                _GFX.util.tiles.fillWithOneTile_tilemap({ 
                    tmn: "bg6_tile", 
                    x  : 1, 
                    y  : 28, 
                    w  : 30, h:3, 
                    tsn: "tilesBG1", li:0 
                });
            }
    
            // Draw the piece stats images.
            for(let key in this._core.pieceStats_img){
                // Piece stats - img.
                _GFX.util.tiles.drawTilemap(this._core.pieceStats_img[key]);
            }
        },
    },

   

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
        _APP.game.shared.createGeneralTimer("inputDelay", 1);
        _APP.game.shared.createGeneralTimer("dropDelay", 1);
        _APP.game.shared.createGeneralTimer("lineClearDelay", 10);

        // _APP.game.shared.resetGeneralTimer("inputDelay")
        // _APP.game.shared.resetGeneralTimer("dropDelay")
        // _APP.game.shared.resetGeneralTimer("lineClearDelay")
        
        // _APP.game.shared.checkGeneralTimer("inputDelay")
        // _APP.game.shared.checkGeneralTimer("dropDelay")
        // _APP.game.shared.checkGeneralTimer("lineClearDelay")
        
        // _APP.game.shared.finishGeneralTimer("inputDelay")
        // _APP.game.shared.finishGeneralTimer("dropDelay")
        // _APP.game.shared.finishGeneralTimer("lineClearDelay")

        this.inited = true; 

        let players = 1;
        // let players = 2;
        this.playField.init(players);

        _APP.game.gamestates["gs_play"].playField.single.addPieceToLanded_debug();
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        // Run init and return if this gamestate is not yet inited.
        if(!this.inited){ this.init(); return; }

        
        if(_APP.game.shared.checkGeneralTimer("lineClearDelay")){
            _APP.game.shared.resetGeneralTimer("lineClearDelay");
            _APP.game.gamestates["gs_play"].playField.single.doLineCompletionAnimation();
            _APP.game.gamestates["gs_play"].playField.single.drawLandedPieces();
        }

        // Is gameover? 
        // if(this.gameover){ 
            // Change the gamestate.
            //

            // Return.
            // return; 
        // }

        // BUTTON INPUT: PAUSE/UNPAUSE? 
        if(_INPUT.util.checkButton("p1", "press", "BTN_START" )){
            // _APP.game.changeGamestate1("gs_title0");
            

            // Not paused? Pause it.
            // if(!this.paused){
                // Copy the current VRAM.
                //

                // Hide sprites.
                //

                // Pause the music.
                //
    
                // Set the paused flag. 
                // this.paused = true;
    
                // Return.
            // }
            
            // Already paused? Unpause it.
            // else{
                // Clear the paused flag.
                // this.paused = false;
                
                // Restore the previously saved VRAM.
                //

                // Restore sprites.
                //

                // Unpause the music.
                //
    
                // Return.
                // return; 
            // }

            return; 
        }

        // If paused then return; 
        /*
        if(this.paused){ return; }
        */

        // Line being removed?
        /*
        if(this.linesBeingRemoved){
            // Done with clearing animation?
            //

            // No? Add to the timer.
        }
        */
       
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
    },

};