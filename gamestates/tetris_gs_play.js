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
        gameover         : undefined,
        netgame          : undefined,
    },
    unpausedVRAM: undefined,

    inited: false,

    // Run once upon changing to this game state.
    init: async function(){
        //
        if(!_APP.gs_play_init.inited){ _APP.gs_play_init.init(); }

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Make sure any existing fade gets cleared.
        _GFX.util.fade.setFade({ level: 0 });

        // _GFX.util.fade.fadeIn({ delay: 5, block: true });

        let dimensions = _APP.configObj.gfxConfig.dimensions;
        
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
            _APP.game.shared.createGeneralTimer(mainKey + "inputDelay", 8);
            _APP.game.shared.createGeneralTimer(mainKey + "dropDelay", this.playField.dropSpeeds.getDropSpeedFramesFromLevel(0));
            _APP.game.shared.createGeneralTimer(mainKey + "lineClearDelay", 8);
        }
        // _APP.game.shared.resetGeneralTimer("")
        // _APP.game.shared.finishGeneralTimer("")

        for(let key in this.config){
            this.config[key] = undefined;
        }

        this.inited = true; 
        this.playField.parent = this;
        this.config.gameover = false; 

        this.config.paused  = false;
        // this.config.players = 1;
        this.config.players = 2;

        this.playField.init(this.config.players);
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        // Run init and return if this gamestate is not yet inited.
        if(!this.inited){ this.init(); return; }

        let mainKey;
        let pkey   ;

        // Go through the list of players.
        for(let p=0; p<this.config.players; p+=1){
            // Generate the player key to be used here. 
            if(this.config.players == 1){ mainKey = `single` ; pkey  = `p1`; }
            else                        { mainKey = `p${p+1}`; pkey  = mainKey; }

            // Check for gameover.
            if(this.config.gameover){ 
                // Gameover animation.
                //
                _APP.game.gameLoop.loop_restart_sameStates(); return; 

                // Fade out (blocking).
                _GFX.util.fade.fadeOut({ delay: 12, block: true });
                
                // Change the gamestate.
                _APP.game.changeGamestate1("gs_title2");

                // Return.
                return; 
            }

            // Check for pause request.
            if( this.playField[mainKey].pauseHandler() ){
                // End the loop for all players since the game is now paused.
                return;
            }

            // Check for pause is active.
            if(this.config.paused){ 
                // End the loop for all players.
                return; 
            }

            // Determine line completions.
            if(!this.playField[mainKey].lineNumbersCompleted.length){
                this.playField[mainKey].detectLineCompletions();
            }

            // Handle line removals.
            if(this.playField[mainKey].lineNumbersCompleted.length){
                // NOTE: Line animations/removals must be completed before the player can continue.

                // Is it time to do an animation/removal?
                if(_APP.game.shared.checkGeneralTimer(mainKey + "lineClearDelay")){
                    // Do the animation/remove and then draw.
                    this.playField[mainKey].doLineCompletionAnimation();
                    this.playField[mainKey].drawLandedPieces();

                    // Reset the timer for the next run.
                    _APP.game.shared.resetGeneralTimer(mainKey + "lineClearDelay");
                }

                // End the loop for this player.
                continue;
            }

            // Spawn next piece if needed.
            if(!this.playField[mainKey].currPiece){
                // Add any queued junkLines.
                if( this.playField[mainKey].addJunkPiecesToPlayfield() ){ continue; }

                // Spawn the nextPiece, generate a new nextPiece, draw the new currPiece.
                this.playField[mainKey].spawnNextPiece();
                
                // End the loop for this player. 
                continue;
            }

            // Auto drop
            if(this.playField[mainKey].quickDrop || _APP.game.shared.checkGeneralTimer(mainKey + "dropDelay")){ 
                // if(this.playField[mainKey].quickDrop){}
                _APP.game.shared.resetGeneralTimer(mainKey + "dropDelay");

                // Can it move down? (Playfield boundary and landed pieces check).
                if( this.playField[mainKey].checkForCollision_move("DOWN") ){ 
                    // Adjust Y.
                    this.playField[mainKey].currPieceY += 1; 

                    // Draw the piece.
                    this.playField[mainKey].drawCurrentPiece();

                    // End the loop for this player. 
                    continue;
                }

                // It cannot drop. Determine why. (gameover/landed piece). 
                else{
                    // Gameover?: Is this piece at the top?
                    if(this.playField[mainKey].pieceisAtTop()){
                        console.log("Can no longer drop pieces and we are at the top. GAME OVER!");

                        // Clear the playfield.
                        this.playField[mainKey].clearLowerPlayfield();
                        this.playField[mainKey].clearUpperPlayfield();

                        this.config.gameover = true; 
                        
                        // End the loop for this player. 
                        continue;
                    }
                    //

                    // Land the piece (updates the pieceField).
                    this.playField[mainKey].addPieceToLanded();
                    this.playField[mainKey].drawLandedPieces();

                    // Clear quickDrop
                    this.playField[mainKey].quickDrop = false;

                    // End the loop for this player. 
                    continue;
                }
            }
    
            // Act on any other user input.
            this.playField[mainKey].gameInputHandler();

            // DEBUG INPUT
            if(_INPUT.util.checkButton(pkey, "press", "BTN_SL" )){
                _APP.game.gameLoop.loop_restart_sameStates(); return; 
            }
            if(_INPUT.util.checkButton(pkey, "press", "BTN_SR" )){
                // this.playField[mainKey].addPieceToLanded(); 
                this.playField[mainKey].nextPiece = "I";
                this.playField[mainKey].drawNextPiece();
            }
        }

    },
};