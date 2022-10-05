_APP.game.gamestates["gs_title1"] = {
    // Variables within this game state.

    // Animations. (Populated via _APP.game.shared.animations1.generator).
    animations: {
        // Placeholder animation objects.
        anim_lense : {},
        anim_stars : {},
        
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
        // console.log("gs_title1 init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Animations: drawing functions.
        this.animations.draw = _APP.game.shared.animations1.draw;
        this.animations._draw = _APP.game.shared.animations1._draw;

        // Generate and init the lense animation.
        this.animations["anim_lense"] = _APP.game.shared.animations1.generator(
            {
                reverseDirectionOnRepeat: false,
                resetFrameIndexOnRepeat : true,
                maxRepeats              : 2,
                maxWaitFrames           : _APP.game.shared.msToFrames(25, _APP.game.gameLoop.msFrame),
                eraseBeforeDraw         : false,
                frameDirection          : 1,
                frames: [
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f2", x:10, y:10 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f3", x:10, y:10 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f4", x:10, y:10 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f5", x:10, y:10 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
                ],
                firstFrameTilemap : { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
                lastFrameTilemap  : { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
            }
        );
        this.animations["anim_lense"].init(); 

        // Generate and init the stars animation.
        this.animations["anim_stars"] = _APP.game.shared.animations1.generator(
            {
                reverseDirectionOnRepeat: false,
                resetFrameIndexOnRepeat : true,
                maxRepeats              : 4,
                maxWaitFrames           : _APP.game.shared.msToFrames(25, _APP.game.gameLoop.msFrame),
                eraseBeforeDraw         : false,
                frameDirection          : 1,
                frames: [
                    // { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f2", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f3", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f4", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f5", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f6", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f7", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f8", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f9", x:10, y:16 },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f2", x:10, y:16 },
                ],
                firstFrameTilemap : { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f2", x:10, y:16 },
                lastFrameTilemap  : { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_text_f1", x:10, y:16 },
            }
        );
        this.animations["anim_stars"].init(); 

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.game.shared.msToFrames(500, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
        await _GFX.fade.blocking.fadeIn(speedMs, true);

        this.inited = true; 
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        // Run the lense animation.
        this.animations.draw("anim_lense");
        
        // Run the stars animation.
        this.animations.draw("anim_stars");
        
        // Are both animations complete?
        if(this.animations.anim_lense.finished && this.animations.anim_stars.finished && !this.endDelay.started){
            // Yes, start the endDelay.
            // console.log("endDelay started.");
            this.endDelay.started = true; 
            return;
        }
        
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