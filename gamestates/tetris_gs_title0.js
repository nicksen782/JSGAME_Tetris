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
                maxRepeats              : 1,
                // maxWaitFrames           : _APP.game.shared.msToFrames(167, _APP.game.gameLoop.msFrame),
                maxWaitFrames           : 8,
                eraseBeforeDraw         : false,
                frameDirection          : 1,
                frames: [
                    { li: 0, tsn: "tilesLOAD", tmn: "jsgame_logo2", x:4, y:5, },
                    { li: 0, tsn: "tilesLOAD", tmn: "jsgame_logo1", x:4, y:5, },
                ],
                firstFrameTilemap : { li: 0, tsn: "tilesLOAD", tmn: "jsgame_logo1", x:4, y:5 },
                lastFrameTilemap  : { li: 0, tsn: "tilesLOAD", tmn: "jsgame_logo2", x:4, y:5 },
            }
        );
        this.animations["anim_jsgameLogo"].init(); 

        // Init the endDelay values. 
        _APP.game.shared.createGeneralTimer("endDelay", _APP.game.shared.msToFrames(750, _APP.game.gameLoop.msFrame));

        _GFX.util.fade.fadeIn({ delay: 2, block: true });

        this.inited = true; 
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        // Check for canceling button press.
        if(_INPUT.util.checkButton("p1", "press", [] )){
            console.log("gs_title0 button was pressed");
            _APP.game.changeGamestate1("gs_title1");
            return; 
        }

        // Run the JSGAME animation.
        else if(!this.animations.anim_jsgameLogo.finished){
            this.animations.draw("anim_jsgameLogo"); 
        }

        // Use the general timer to delay the change to the next gamestate.
        else{
            if(_APP.game.shared.checkGeneralTimer("endDelay")){
                _GFX.util.fade.fadeOut({ delay: 2, block: true });

                // Set the next game state.
                // _APP.game.changeGamestate1("gs_title0");
                _APP.game.changeGamestate1("gs_title1");
            }
        }
    },

};