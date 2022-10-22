_APP.game.gamestates["gs_title2"] = {
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
        // console.log("gs_title2 init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.game.shared.msToFrames(1000, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        await _GFX.fade.fadeIn(5, true);

        _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"RAINBOWTEST1", x:0 , y:0 , w:16, h:15, tsn:"tilesMISC", li:1 });
        _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"RAINBOWTEST2", x:16, y:0 , w:16, h:15, tsn:"tilesMISC", li:1 });
        _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"RAINBOWTEST3", x:0 , y:15, w:16, h:15, tsn:"tilesMISC", li:1 });
        _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"RAINBOWTEST4", x:16, y:15, w:16, h:15, tsn:"tilesMISC", li:1 });

        _GFX.util.tiles.drawTilemap({ tmn:"title_tetris", x:3, y:6, tsn:"tilesG1", li:1, ri:0 } );

        _GFX.util.tiles.fillTile({ tid:1, x:9, y:21, w:14, h:3, tsn:"tilesBG1", li:1 });
        _GFX.util.tiles.print({ str:"PRESS  START", x:10, y:22, tsn:"tilesTX1", li:2 });

        this.inited = true; 
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

                await _GFX.fade.fadeOut(5, true);
            }
            else if(this.endDelay.finished){
                // Set the next game state.
                // game.setGamestate1("TITLE1", true);
                // _APP.game.changeGamestate1("gs_title0");
                // _APP.game.changeGamestate1("gs_title1");
                _APP.game.changeGamestate1("gs_title2");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};