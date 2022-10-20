_APP.game.gamestates["gs_title0"] = {
    // Variables within this game state.

    // Animations. (Populated via _APP.game.shared.animations1.generator).
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
        // console.log("gs_title0 init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Animations: drawing functions.
        this.animations.draw = _APP.game.shared.animations1.draw;
        this.animations._draw = _APP.game.shared.animations1._draw;

        // Generate and init the lense animation.
        this.animations["anim_jsgameLogo"] = _APP.game.shared.animations1.generator(
            {
                reverseDirectionOnRepeat: false,
                resetFrameIndexOnRepeat : true,
                maxRepeats              : 4,
                maxWaitFrames           : _APP.game.shared.msToFrames(105, _APP.game.gameLoop.msFrame),
                eraseBeforeDraw         : false,
                frameDirection          : 1,
                frames: [
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo2", x:2, y:4, },
                    { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo1", x:2, y:4, },
                ],
                firstFrameTilemap : { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo1", x:2, y:4 },
                lastFrameTilemap  : { layerIndex: 0, tilesetIndex: 0, tilemap: "jsgame_logo2", x:2, y:4 },
            }
        );
        this.animations["anim_jsgameLogo"].init(); 

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

        // if(_INPUT.util.checkButton("p1", "press", "BTN_Y" )){
        // if(_INPUT.util.checkButton("p1", "press", ["BTN_Y", "BTN_B"] )){
        if(_INPUT.util.checkButton("p1", "press", [] )){
            console.log("gs_title0 button was pressed");
            _APP.game.changeGamestate1("gs_title1");
            return; 
        }
        // if(_APP.game.checkButton("p1", "press", [] )){
        //     _APP.game.changeGamestate1("gs_title1");
        //     return; 
        // }
        else{
            this.animations.draw("anim_jsgameLogo"); 
            if(this.animations.anim_jsgameLogo.finished && !this.endDelay.started){
                this.endDelay.started = true; 
                return;
            }
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
                // game("TITLE1", true);
                // _APP.game.changeGamestate1("gs_title0");
                _APP.game.changeGamestate1("gs_title1");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};