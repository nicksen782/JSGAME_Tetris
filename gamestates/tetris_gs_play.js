_APP.game.gamestates["gs_play"] = {
    // Variables within this game state.

    // Animations. (Populated via _APP.game.sharedharedhared.animations1.generator).
    animations: {
        // Placeholder animation objects.
        
        // Placeholder draw objects.
        draw       : {},
        _draw      : {},
    },

    // Ending delay timer. 
    endDelay: {
        started: undefined,
        finished: undefined,
        maxFrames: undefined,
        frameCount: undefined,
    },

    inited: false,

    // Constants within this game state.
    //

    // Run once upon changing to this game state.
    init: async function(){
        console.log("gs_play init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.game.shared.msToFrames(1000, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        // await _GFX.fade.fadeIn(5, true);

        // _GFX.util.tiles.fillTile({ tid:2, x:0, y:0, w:14, h:14, tsi:0, li:0 });

        // _GFX.util.tiles.drawTilemap({ tmn:"main_game", x:0, y:0, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print({ str:"N", x:18, y:5, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"E", x:18, y:6, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"X", x:18, y:7, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"T", x:18, y:8, tsn:"tilesTX1", li:2 });
        
        // _GFX.util.tiles.print({ str:"-STATS-", x:17, y:11, tsn:"tilesTX1", li:2 });

        // _GFX.util.tiles.print({ str:"000"    , x:17, y:10+3, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"000"    , x:23, y:10+3, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"000"    , x:17, y:11+3, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"000"    , x:23, y:11+3, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"000"    , x:17, y:12+3, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"000"    , x:23, y:12+3, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"000"    , x:17, y:13+3, tsn:"tilesTX1", li:2 });
        
        // _GFX.util.tiles.print({ str:"LINES"             , x:15, y:18, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"0".padStart(5, " "), x:15, y:19, tsn:"tilesTX1", li:2 });
        
        // _GFX.util.tiles.print({ str:"LEVEL"             , x:21, y:18, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"0".padStart(5, " "), x:21, y:19, tsn:"tilesTX1", li:2 });
        
        // _GFX.util.tiles.print({ str:"TYPE"              , x:15, y:21, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"0".padStart(5, " "), x:15, y:22, tsn:"tilesTX1", li:2 });
        
        // _GFX.util.tiles.print({ str:"SCORE"             , x:21, y:21, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.print({ str:"0".padStart(5, " "), x:21, y:22, tsn:"tilesTX1", li:2 });

        // Background - layer 0.
        let dimensions = _JSG.loadedConfig.meta.dimensions;
        _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"bg1_tile", x:0, y:0, w:dimensions.cols, h:dimensions.rows, tsn:"tilesBG1", li:0 });

        // Border box - Layer 0 and layer 2. (TEST)
        // let menuObj = _APP.game.shared.createBorderBox_tilemaps( 1, 1, 18, 4, 0, 2, 0, ["Line 1", "Line 2 (3456789)"] );
        // _APP.game.shared.drawBorderBox_tilemaps(menuObj);
        
        // Border box - Layer 0 and layer 2. (PLAYFIELD - P1)
        //  menuObj = _APP.game.shared.createBorderBox_tilemaps( 1, 7, 10, 18, 0, 2, 2, [] ); // Gameboy
        //  _APP.game.shared.drawBorderBox_tilemaps(menuObj);
        //  menuObj = _APP.game.shared.createBorderBox_tilemaps( 1, 1, 10, 20, 0, 2, 2, [] ); // NES
        // _APP.game.shared.drawBorderBox_tilemaps(menuObj);

        // _GFX.util.tiles.drawTilemap({ tmn:"T_map_small", x:1   , y:22, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print(      { str:"000"        , x:1+2 , y:22, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.drawTilemap({ tmn:"L_map_small", x:6   , y:22, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print(      { str:"000"        , x:6+2 , y:22, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.drawTilemap({ tmn:"Z_map_small", x:1   , y:23, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print(      { str:"000"        , x:1+2 , y:23, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.drawTilemap({ tmn:"O_map_small", x:6   , y:23, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print(      { str:"000"        , x:6+2 , y:23, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.drawTilemap({ tmn:"S_map_small", x:1   , y:24, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print(      { str:"000"        , x:1+2 , y:24, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.drawTilemap({ tmn:"J_map_small", x:6   , y:24, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print(      { str:"000"        , x:6+2 , y:24, tsn:"tilesTX1", li:2 });
        // _GFX.util.tiles.drawTilemap({ tmn:"I_map_small", x:1   , y:25, tsn:"tilesBG1", li:0, ri:0 } );
        // _GFX.util.tiles.print(      { str:"000"        , x:1+2 , y:25, tsn:"tilesTX1", li:2 });
        this.createPlayfield(2);
        this.inited = true; 
    },

    createPlayfield: function(players){
        let menuObj;
        let dims2 = {
            "p1_single": {
                "playfield":{},
                "piece_stats":{},
                "game_stats":{},
                _drawAll: function(){
                },
            },
            "p1_multi" : {
                "playfield":{ x:1 , y:1+3, w:10, h:20 },
                "piece_stats":{
                    "T":{ 
                        dims: { 
                            img: { tmn:"T_map_small", x:1, y:25, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000", x:3, y:25, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                    "L":{ 
                        dims: { 
                            img: { tmn:"L_map_small", x:6, y:25, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000", x:8, y:25, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                    "Z":{ 
                        dims: { 
                            img: { tmn:"Z_map_small", x:1, y:26, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000", x:3, y:26, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                    "O":{ 
                        dims: { 
                            img: { tmn:"O_map_small", x:6, y:26, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000", x:8, y:26, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                    "S":{ 
                        dims: { 
                            img: { tmn:"S_map_small", x:1, y:27, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000", x:3, y:27, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                    "J":{ 
                        dims: { 
                            img: { tmn:"J_map_small", x:6, y:27, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000", x:8, y:27, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                    "I":{ 
                        dims: { 
                            img: { tmn:"I_map_small", x:1, y:28, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000", x:3, y:28, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                },
                "game_stats":{
                    box: _APP.game.shared.createBorderBox_tilemaps( 12, 4, 8, 10, 0, 2, 2, [
                        "<=P1  ",
                        "------",
                        "LINES",
                        "0".padStart(6, " "),
                        "SCORE",
                        "0".padStart(6, " "),
                        "LEVEL",
                        "0".padStart(6, " "),
                    ] ),
                },
                _drawPlayfield : function(){
                    _APP.game.shared.drawBorderBox_tilemaps(
                        _APP.game.shared.createBorderBox_tilemaps( this.playfield.x, this.playfield.y, this.playfield.w, this.playfield.h, 0, 2, 2, [] )
                    );
                },
                _drawPieceStats: function(){
                    for(let key in this.piece_stats){
                        if(key.length > 1){ continue; }

                        // Piece stats - img.
                        _GFX.util.tiles.drawTilemap(this.piece_stats[key].dims.img);
                        // Piece stats - text.
                        _GFX.util.tiles.print(this.piece_stats[key].dims.text);
                    }
                },
                _drawGameStats : function(){
                    _APP.game.shared.drawBorderBox_tilemaps(this.game_stats.box);

                },
                _drawAll: function(){
                    // Playfield. 
                    this._drawPlayfield();
                    
                    // Piece stats.
                    this._drawPieceStats();
                    
                    // Game stats.
                    this._drawGameStats();
                },
            },
            "p2_multi" : {
                "playfield":{ x:21, y:1+3, w:10, h:20 },
                "piece_stats":{
                    "T":{ 
                        dims: { 
                            img: { tmn:"T_map_small", x:1+18+2, y:22+3, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000"        , x:3+18+2, y:22+3, tsn:"tilesTX1", li:2 }, 
                        }, 
                        value: 0 
                    },
                    "L":{ 
                        dims: { 
                            img: { tmn:"L_map_small", x:6+18+2, y:22+3, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000"        , x:8+18+2, y:22+3, tsn:"tilesTX1", li:2 }
                        }, 
                        value: 0 
                    },
                    "Z":{ 
                        dims: { 
                            img: { tmn:"Z_map_small", x:1+18+2, y:23+3, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000"        , x:3+18+2, y:23+3, tsn:"tilesTX1", li:2 }
                        }, 
                        value: 0 
                    },
                    "O":{ 
                        dims: { 
                            img: { tmn:"O_map_small", x:6+18+2, y:23+3, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000"        , x:8+18+2, y:23+3, tsn:"tilesTX1", li:2 }
                        }, 
                        value: 0 
                    },
                    "S":{ 
                        dims: { 
                            img: { tmn:"S_map_small", x:1+18+2, y:24+3, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000"        , x:3+18+2, y:24+3, tsn:"tilesTX1", li:2 }
                        }, 
                        value: 0 
                    },
                    "J":{ 
                        dims: { 
                            img: { tmn:"J_map_small", x:6+18+2, y:24+3, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000"        , x:8+18+2, y:24+3, tsn:"tilesTX1", li:2 }
                        }, 
                        value: 0 
                    },
                    "I":{ 
                        dims: { 
                            img: { tmn:"I_map_small", x:1+18+2, y:25+3, tsn:"tilesBG1", li:0, ri:0 },
                            text:{ str:"000"        , x:3+18+2, y:25+3, tsn:"tilesTX1", li:2 }
                        }, 
                        value: 0 
                    },
                },
                "game_stats":{
                    box: _APP.game.shared.createBorderBox_tilemaps( 12, 14, 8, 10, 0, 2, 2, [
                        "  P2->",
                        "------",
                        "LINES",
                        "0".padStart(6, " "),
                        "SCORE",
                        "0".padStart(6, " "),
                        "LEVEL",
                        "0".padStart(6, " "),
                    ] ),
                },
                _drawPlayfield : function(){
                    _APP.game.shared.drawBorderBox_tilemaps(
                        _APP.game.shared.createBorderBox_tilemaps( this.playfield.x, this.playfield.y, this.playfield.w, this.playfield.h, 0, 2, 2, [] )
                    );
                },
                _drawPieceStats: function(){
                    for(let key in this.piece_stats){
                        if(key.length > 1){ continue; }

                        // Piece stats - img.
                        _GFX.util.tiles.drawTilemap(this.piece_stats[key].dims.img);
                        // Piece stats - text.
                        _GFX.util.tiles.print(this.piece_stats[key].dims.text);
                    }
                },
                _drawGameStats : function(){
                    _APP.game.shared.drawBorderBox_tilemaps(this.game_stats.box);

                },
                _drawAll: function(){
                    // Playfield. 
                    this._drawPlayfield();
                    
                    // Piece stats.
                    this._drawPieceStats();
                    
                    // Game stats.
                    this._drawGameStats();
                },
            },
        };
        let dims = { 
            playfield1: { x:1 , y:1+3, w:10, h:20 },
            playfield2: { x:21, y:1+3, w:10, h:20 },
        }
        if(players == 1){
            return; 
        }
        if(players >= 1){
            dims2.p1_multi._drawAll();
        }
        if(players >= 2){
            dims2.p2_multi._drawAll();
        }
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        if(_INPUT.util.checkButton("p1", "press", [] )){
            _APP.game.changeGamestate1("gs_title0");
            return; 
        }

        this.endDelay.started = true;
        
        // Delay before progressing to the next game state?
        if(this.endDelay.started){
            // console.log("endDelay is running.");
            if(this.endDelay.frameCount >= this.endDelay.maxFrames && !this.endDelay.finished){
                // Set the endDelay finished flag (Not needed. Here for completeness.)
                // console.log("endDelay finished.");
                this.endDelay.finished = true;

                // await _GFX.fade.fadeOut(5, true);
            }
            else if(this.endDelay.finished){
                // Set the next game state.
                // game.setGamestate1("TITLE1", true);
                // _APP.game.changeGamestate1("gs_title0");
                // _APP.game.changeGamestate1("gs_title1");
                // _APP.game.changeGamestate1("gs_title2");
                // _APP.game.changeGamestate1("gs_play");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};