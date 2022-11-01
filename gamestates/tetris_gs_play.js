_APP.game.gamestates["gs_play"] = {
    // Variables within this game state.

    // Animations. (Populated via _APP.game.sharedharedhared.animations1.generator).
    animations: {
        // Placeholder animation objects.
        
        // Placeholder draw objects.
        draw       : {},
        _draw      : {},
    },

    playField: {
        // An object for each player will be created here. Much of it will be copied from _core.
        
        //
        pieces    : undefined, // FROM: _APP.gs_play_init.playField.dropSpeeds,
        dropSpeeds: undefined, // FROM: _APP.gs_play_init.playField.dropSpeeds,
        _core     : undefined, // FROM: _APP.gs_play_init.playField._core,
        init      : undefined, // FROM: _APP.gs_play_init.playField.init,
    },

    config: {
        players          : undefined,
        paused           : undefined,
    },
    unpausedVRAM: undefined,

    inited: false,

    // Run once upon changing to this game state.
    init: async function(){
        console.log("gs_play init");

        //
        if(!_APP.gs_play_init.inited){ _APP.gs_play_init.init(); }

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
        for(let mainKey of ["single", "p1", "p2"]){
            _APP.game.shared.createGeneralTimer(mainKey + "inputDelay", 9);
            _APP.game.shared.createGeneralTimer(mainKey + "dropDelay", _APP.game.gamestates["gs_play"].playField.dropSpeeds.getDropSpeedFramesFromLevel(0));
            _APP.game.shared.createGeneralTimer(mainKey + "lineClearDelay", 8);
        }
        // _APP.game.shared.resetGeneralTimer("")
        // _APP.game.shared.finishGeneralTimer("")

        for(let key in this.config){
            this.config[key] = undefined;
        }

        this.inited = true; 
        this.gameover = false; 

        this.config.paused  = false;
        this.config.players = 1;
        // this.players = 2;

        // let players = 2;
        this.playField.init(this.config.players);
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        // Run init and return if this gamestate is not yet inited.
        if(!this.inited){ this.init(); return; }

        let mainKey;
        let pkey   ;
        for(let p=0; p<this.config.players; p+=1){
            // Generate the player key to be used here. 
            if(this.config.players == 1){ mainKey = `single` ; pkey  = `p1`; }
            else                        { mainKey = `p${p+1}`; pkey  = mainKey; }
            // this.playField[mainKey].mainKey = mainKey;
            // this.playField[mainKey].pkey = pkey;
            
            // GAME OVER 
            if(this.gameover){ 
                // Gameover animation.
                //

                // Fade out (blocking).
                _GFX.util.fade.fadeOut({ delay: 12, block: true });
                
                // Change the gamestate.
                _APP.game.changeGamestate1("gs_title2");

                // Return.
                return; 
            }

            // BUTTON INPUT: PAUSE/UNPAUSE? 
            if(_INPUT.util.checkButton(pkey, "press", "BTN_START" )){
                // Not paused? Pause it.
                if(!this.config.paused){
                    // Copy the current VRAM.
                    let dimensions = _JSG.loadedConfig.meta.dimensions;
                    this.unpausedVRAM = _GFX.util.VRAM.getVramRegion( { 
                        x: 0, 
                        y: 0, 
                        w: dimensions.cols, 
                        h: dimensions.rows, 
                        l: [0, 1, 2] 
                    } );
                    // _GFX.VRAM.clearVram();

                    _GFX.util.tiles.fillWithOneTile_tilemap({ tmn:"transChecked3", x:0, y:0, w:dimensions.cols, h:dimensions.rows, tsn:"tilesBG1", li:2 });

                    // Display the pause text.
                    _APP.game.shared.drawBorderBox_tilemaps(
                        _APP.game.shared.createBorderBox_tilemaps( 
                            ((dimensions.cols/2) - (14/2)) << 0, // x
                            ((dimensions.rows/2) - (6/2))  << 0, // y
                            14, // w
                            6,  // h
                            [
                                "",
                                "    GAME  ",
                                "   PAUSED ",
                            ], 
                            {
                                border_bg  : { li:1n, tsn:"tilesBG1", tmn: "bg6_tile" },
                                border_fg  : { li:2 },
                                inner_bg   : { li:1, tsn:"tilesBG1", tmn: "blacktile" },
                                inner_text : { li:2, tsn:"tilesTX1" }
                            }
                        )
                    );

                    // Hide sprites.
                    //

                    // Pause the music.
                    //

                    // Draw the pause screen.

                    // Set the paused flag. 
                    this.config.paused = true;

                    // End the loop for this player.
                    continue;
                }
                
                // Already paused? Unpause it.
                else{
                    // Clear the paused flag.
                    this.config.paused = false;
                    
                    // Restore the previously saved VRAM.
                    _GFX.VRAM.clearVram();
                    _GFX.util.VRAM.setVramRegion(this.unpausedVRAM);
                    //

                    // Restore sprites.
                    //

                    // Unpause the music.
                    //

                    // End the loop for this player.
                    continue; 
                }
            }

            // PAUSED
            if(this.config.paused){ 
                // End the loop for all players.
                return; 
            }

            // LINE ANIMATION/REMOVAL
            
            // Check for line completions.
            if(!this.playField[mainKey].lineNumbersCompleted.length){
                this.playField[mainKey].detectLineCompletions();
            }

            // Are lines waiting to be animated/removed?
            if(this.playField[mainKey].lineNumbersCompleted.length){
                // Is it time to do an animation/removal?
                if(_APP.game.shared.checkGeneralTimer(mainKey + "lineClearDelay")){
                    let howManyLines = this.playField[mainKey].lineNumbersCompleted.length; 

                    // Do the animation/remove and then draw.
                    this.playField[mainKey].doLineCompletionAnimation();
                    this.playField[mainKey].drawLandedPieces();

                    // Reset the timer for the next run.
                    _APP.game.shared.resetGeneralTimer(mainKey + "lineClearDelay");

                    // Lines fully removed? 
                    if(this.playField[mainKey].lineNumbersCompleted.length == 0){
                        // Assign points based on the number of lines and the level.
                        //
                    }
                }

                // Line animations/removals must be completed before the player can continue.
                // End the loop for this player.
                continue;
            }
            else{
                // // Check for line completions.
                // this.playField[mainKey].detectLineCompletions();
            }

            // SPAWN NEXT PIECE.
            if(!this.playField[mainKey].currPiece){
                // Spawn the nextPiece, generate a new nextPiece, draw the new currPiece.
                this.playField[mainKey].spawnNextPiece();

                // End the loop for this player. 
                continue;
            }

            // Auto drop by one?
            if(this.playField[mainKey].quickDrop || _APP.game.shared.checkGeneralTimer(mainKey + "dropDelay")){ 
                // if(this.playField[mainKey].quickDrop){}
                _APP.game.shared.resetGeneralTimer(mainKey + "dropDelay");

                // Can it move down? (Playfield boundary and landed pieces check).
                if( this.playField[mainKey].checkForCollision_move("DOWN") ){ 
                    // Adjust Y.
                    this.playField[mainKey].currPieceY += 1; 

                    // Draw the piece.
                    this.playField[mainKey].drawCurrentPiece();
                }

                // It cannot drop. Determine why.
                else{
                    // Gameover?: Is this piece at the top?
                    if(this.playField[mainKey].pieceisAtTop()){
                        console.log("Oh no! We are at the top!");

                        // Clear the playfield.
                        this.playField[mainKey].clearLowerPlayfield();
                        this.playField[mainKey].clearUpperPlayfield();

                        this.gameover = true; 
                        
                        continue;
                    }
                    //

                    // Land the piece (updates the pieceField).
                    this.playField[mainKey].addPieceToLanded();
                    this.playField[mainKey].drawLandedPieces();

                    // Clear quickDrop
                    this.playField[mainKey].quickDrop = false;

                    //
                    // this.playField[mainKey].currPiece = undefined;
                    // Load the next piece. (Not needed. This will happen on the next frame.)
                    // this.playField[mainKey].spawnNextPiece();
                }
            }

            // User input.
            else{
                // Handle and act upon input.
                this.playField[mainKey].gameInputHandler();
                if(_INPUT.util.checkButton(pkey, "press", "BTN_SL" )){
                    _APP.game.gameLoop.loop_restart_sameStates(); return; 
                }
                if(_INPUT.util.checkButton(pkey, "press", "BTN_SR" )){
                    this.playField[mainKey].addPieceToLanded(); 
                }
            }

            continue; 
        }
    },

};