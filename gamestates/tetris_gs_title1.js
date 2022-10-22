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

        if(_GFX.fade.isActive){ 
            console.log("A fade is currently in progress.");
            return; 
        }

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
                maxRepeats              : 1,
                maxWaitFrames           : _APP.game.shared.msToFrames(_APP.game.gameLoop.msFrame*3, _APP.game.gameLoop.msFrame),
                eraseBeforeDraw         : false,
                frameDirection          : 1,
                frames: [
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f1", x:12, y:9 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f2", x:12, y:9 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f3", x:12, y:9 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f4", x:12, y:9 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f5", x:12, y:9 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f1", x:12, y:9 },
                ],
                firstFrameTilemap : { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f1", x:12, y:9 },
                lastFrameTilemap  : { li: 0, tsn: "tilesLOAD", tmn: "n782_flare_f1", x:12, y:9 },
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
                    // { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f2", x:10, y:16 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f3" , x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f4" , x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f5" , x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f6" , x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f7" , x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f8" , x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f9" , x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f10", x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f11", x:12, y:17 },
                    { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f2" , x:12, y:17 },
                ],
                firstFrameTilemap : { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f1", x:12, y:17 },
                lastFrameTilemap  : { li: 0, tsn: "tilesLOAD", tmn: "n782_text_f1", x:12, y:17 },
            }
        );
        this.animations["anim_stars"].init(); 

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.game.shared.msToFrames(500, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        await _GFX.fade.fadeIn(5, true);

        this.inited = true; 
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        if(_INPUT.util.checkButton("p1", "press", [] )){
            _APP.game.changeGamestate1("gs_title2");
            return; 
        }
        
        // Run the stars animation.
        this.animations.draw("anim_stars");
        
        // Run the lense animation AFTER the stars animation is complete.
        if(this.animations.anim_stars.finished){
            // Run the lense animation.
            this.animations.draw("anim_lense");
        }

        // Are both animations complete?
        if(this.animations.anim_lense.finished && this.animations.anim_stars.finished && !this.endDelay.started){
            // Yes, start the endDelay.
            // console.log("endDelay started.");
            // await _GFX.fade.fadeOut(10, true);
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

                await _GFX.fade.fadeOut(5, true);
            }
            else if(this.endDelay.finished){
                // Set the next game state.
                // game.setGamestate1("TITLE1", true);
                // _APP.game.changeGamestate1("gs_title0");
                _APP.game.changeGamestate1("gs_title1");
                // _APP.game.changeGamestate1("gs_title2");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};