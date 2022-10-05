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
        console.log("gs_title2 init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.game.shared.msToFrames(1000, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
        await _GFX.fade.blocking.fadeIn(speedMs, true);
        
        this.inited = true; 
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        this.endDelay.started = true;
        // Delay before progressing to the next game state?
        if(this.endDelay.started){
            // console.log("endDelay is running.");
            if(this.endDelay.frameCount >= this.endDelay.maxFrames && !this.endDelay.finished){
                // Set the endDelay finished flag (Not needed. Here for completeness.)
                // console.log("endDelay finished.");
                this.endDelay.finished = true;

                let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
                await _GFX.fade.blocking.fadeOut(speedMs, true);
            }
            else if(this.endDelay.finished){
                // Set the next game state.
                // game.setGamestate1("TITLE1", true);
                _APP.game.gameLoop.changeGamestate1("gs_title0");
                // _APP.game.gameLoop.changeGamestate1("gs_title1");
                // _APP.game.gameLoop.changeGamestate1("gs_title2");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};