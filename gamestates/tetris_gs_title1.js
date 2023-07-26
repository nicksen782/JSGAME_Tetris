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

    progressFlags: {
        anim_stars             : undefined,
        anim_lense             : undefined,
        anims_done             : undefined,
        timer1_done            : undefined,
        copyrightText_displayed: undefined,
        endDelayStarted        : undefined,
        timer2_done            : undefined,
    },

    inited: false,

    // Constants within this game state.

    copyrightText: [
        '       TM AND (C) 1987        ', '', 
        '   V/O ELECTRONORGTECHNICA    ', '', 
        '          ("ELORG")           ', '', 
        '   ORIGINAL CONCEPT, DESIGN   ', '', 
        '         AND  PROGRAM         ', '', 
        '     BY: ALEXEY PAZHITNOV     ', '', 
        '  --------------------------  ', 
        '  --------------------------  ', '', 
        '       JS GAME v2 PORT:       ', '', 
        '  NICK ANDERSEN (NICKSEN782)  ', 
    ],

    // Run once upon changing to this game state.
    init: async function(){
        // console.log("gs_title1 init");

        // Fade-guard. (Should use blocking fades instead of having this here).
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

        _GFX.util.fade.fadeIn({ delay: 4, block: true });

        this.copyrightText_display = false;

        _APP.game.shared.createGeneralTimer("timer1", _APP.game.shared.msToFrames(750, _APP.game.gameLoop.msFrame));
        _APP.game.shared.createGeneralTimer("timer2", _APP.game.shared.msToFrames(2500, _APP.game.gameLoop.msFrame));

        // Clear the progress flags. 
        for(let key in this.progressFlags){ this.progressFlags[key] = false; }
        
        this.inited = true; 
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        if(_INPUT.util.checkButton("p1", "press", [] )){
            _APP.game.changeGamestate1("gs_title2");
            return; 
        }

        // Is the animation chain unfinished?
        if(!this.progressFlags["anims_done"]){
            // Run the stars animation.
            if(!this.progressFlags["anim_stars"]){
                this.animations.draw("anim_stars");
                if(this.animations.anim_stars.finished){ this.progressFlags["anim_stars"] = true; }
            }
            
            // Run the lense animation AFTER the stars animation is complete.
            if(this.progressFlags["anim_stars"]){
                // Run the lense animation.
                this.animations.draw("anim_lense");
                if(this.animations.anim_lense.finished){ this.progressFlags["anim_lense"] = true; }

                if(this.progressFlags["anim_lense"] && this.progressFlags["anim_lense"]){
                    this.progressFlags["anims_done"] = true;
                }
            }
        }
        
        // Are the animations done but not the timer1?
        else if(this.progressFlags["anims_done"] && !this.progressFlags["timer1_done"]){
            if(_APP.game.shared.checkGeneralTimer("timer1")){
                this.progressFlags["timer1_done"] = true;
                _GFX.util.fade.fadeOut({ delay: 4, block: true });
            }
        }

        // Is timer1 done but the copyright text not displayed? 
        else if(this.progressFlags["timer1_done"] && !this.progressFlags["copyrightText_displayed"]){
            // Clear the screen. 
            _GFX.VRAM.clearVram();

            // Draw the copyright lines. 
            let x=1;
            let y=6;
            for(let i = 0, l = this.copyrightText.length; i<l; i+=1){
                _GFX.util.tiles.print({ str:this.copyrightText[i], x:x, y:y, tsn:"tilesTX1", li:2 });
                y+=1;
            }

            this.progressFlags["copyrightText_displayed"] = true;
            this.progressFlags["endDelayStarted"] = true;

            _GFX.util.fade.fadeIn({ delay: 4, block: true });
        }

        // Is the endDelay started but the timer2 isn't done?
        else if(this.progressFlags["endDelayStarted"] && !this.progressFlags["timer2_done"] && _APP.game.shared.checkGeneralTimer("timer2")){
            this.progressFlags["timer2_done"] = true;
            _GFX.util.fade.fadeOut({ delay: 4, block: true });
            
            // Set the next game state.
            // game.setGamestate1("TITLE1", true);
            // _APP.game.changeGamestate1("gs_title0");
            // _APP.game.changeGamestate1("gs_title1");
            _APP.game.changeGamestate1("gs_title2");
        }
    },
};