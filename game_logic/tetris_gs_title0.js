_APP.game.gamestates["gs_title0"] = {
    // Variables within this game state.

    // Animations. (Populated via _APP.shared.animations1.generator).
    animations: {
        // Placeholder animation objects.
        anim_jsgameLogo : {},
        
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
        console.log("gs_title1 init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Animations: drawing functions.
        this.animations.draw = _APP.shared.animations1.draw;
        this.animations._draw = _APP.shared.animations1._draw;

        // Generate and init the lense animation.
        this.animations["anim_jsgameLogo"] = _APP.shared.animations1.generator(
            {
                reverseDirectionOnRepeat: false,
                resetFrameIndexOnRepeat : true,
                maxRepeats              : 1,
                maxWaitFrames           : _APP.shared.msToFrames(105, _APP.game.gameLoop.msFrame),
                // maxWaitFrames           : _APP.shared.msToFrames(55, _APP.game.gameLoop.fpsCalc["average"]),
                eraseBeforeDraw         : false,
                frameDirection          : 1,
                frames: [
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo2", x:2, y:4, },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo1", x:2, y:4, },
                ],
                firstFrameTilemap : { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo1", x:2, y:4 },
                lastFrameTilemap  : { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo1", x:2, y:4 },
            }
        );
        this.animations["anim_jsgameLogo"].init(); 

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.shared.msToFrames(500, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        // DEBUG: Swtich to the debug tab for this gamestate.
        if(_JSG.loadedConfig.meta.debug){
            _APP.debug.nav.showOneView(_APP.game.gameLoop.gamestate1);
        }

        this.inited = true; 
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        this.animations.draw("anim_jsgameLogo"); 
        if(this.animations.anim_jsgameLogo.finished && !this.endDelay.started){
            this.endDelay.started = true; 
            return;
        }

        // Delay before progressing to the next game state?
        if(this.endDelay.started){
            // console.log("endDelay is running.");
            if(this.endDelay.frameCount >= this.endDelay.maxFrames){
                // Set the endDelay finished flag (Not needed. Here for completeness.)
                // console.log("endDelay finished.");
                this.endDelay.finished = true;

                // Fade out the display.
                // _CG.FADER.FUNCS.FadeOut(1, true, false);

                // Set the next game state.
                // game.setGamestate1("TITLE1", true);
                _APP.game.gameLoop.changeGamestate1("gs_title1");
                // _APP.game.gameLoop.changeGamestate1("gs_title0");

                console.log("gs_title0 DONE");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};