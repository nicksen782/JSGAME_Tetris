// Main game object that will hold all the game's running code.
_APP.game = {
    // NETWORKING
    netGame      : false,

    // GAMESTATES
    // gamestate1: "gs_title0",
    // gamestate1: "gs_title1",
    // gamestate1: "gs_title2",
    // gamestate1: "gs_play",
    
    new_gamestate1: "",
    new_gamestate2: "",
    prev_gamestate1: "",
    prev_gamestate2: "",
    // gamestate1: "gs_play",
    gamestate1: "gs_title0",
    gamestate2: "",
    gamestate1ChangeTriggered: false,
    gamestate2ChangeTriggered: false,
    changeGamestate1: function changeGamestate1(new_gamestate){
        // Is this a valid gamestate key?
        if( _APP.game.gamestates_list.indexOf(new_gamestate) == -1){ console.log("Unknown new_gamestate:", new_gamestate); throw ""; }
        
        // Set the new_gamestate1 and the change triggered flag.
        this.new_gamestate1 = new_gamestate;
        this.gamestate1ChangeTriggered = true; 
    },
    changeGamestate2: function changeGamestate2(new_gamestate){
        // Is this a valid gamestate key?
        // if(!1){ console.log("Unknown new_gamestate:", new_gamestate); throw ""; }
        
        // Set the new_gamestate2 and the change triggered flag.
        this.new_gamestate2 = new_gamestate;
        this.gamestate2ChangeTriggered = true; 
    },
    _changeGamestate1: function changeGamestate1(){
        // Remove the inited flag of the current gamestate.
        _APP.game.gamestates[this.gamestate1].inited = false;

        // Set the previous gamestate. 
        this.prev_gamestate1 = this.gamestate1;

        // Change the current gamestate to the new gamestate.
        this.gamestate1 = this.new_gamestate1;

        // Clear the gamestate change triggered flag and new value.
        this.gamestate1ChangeTriggered = false; 
        this.new_gamestate1 = ""; 
    },
    _changeGamestate2: function changeGamestate2(){
        // Set the previous gamestate. 
        this.prev_gamestate2 = this.gamestate2;
        
        // Change the current gamestate to the new gamestate.
        this.gamestate2 = this.new_gamestate2;
        
        // Clear the gamestate change triggered flag and new value.
        this.gamestate2ChangeTriggered = false; 
        this.new_gamestate2 = ""; 
    },
    gamestates     : {}, // This is populated by the individual gs_ files. 
    gamestates_list: [], // This is populated with data from the individual gs_ files. 

    // KEYS POPULATED BY OTHER FILES
    shared: {}, // Populated by tetris_SHARED.js.
    debug : {}, // Populated by debug/tetris_debug.js.
    
    // KEYS THAT ARE POPULATED WITHIN THIS FILE. 
    gameLoop: {}, 
    tests   : {},  
};

// The game loop for the game. 
_APP.game.gameLoop = {
    parent: null,

    frameCounter     : 0,
    frameDrawCounter : 0,
    raf_id       : null,
    running      : false,
    fps          : 60,
    msFrame      : null,
    thisLoopStart: 0,
    lastLoopRun  : 0,
    delta        : undefined,
    loopType     : "raf", // Can be "raf" or "to".
    lastDebug    : 0,
    debugDelay   : undefined,
    fadeIsBlocking: false,
    
    // Calculates the average frames per second.
    fpsCalc : {
        // colxi: https://stackoverflow.com/a/55644176/2731377
        sampleSize   : undefined,
        _sample_     : undefined,
        average      : undefined,
        avgMsPerFrame: undefined,
        _index_      : undefined,
        _lastTick_   : undefined,

        // Internal within tick.
        __delta_     : undefined,
        __fps_       : undefined,
        __average_   : undefined,
        __average_i_ : undefined,

        tick : function tick(now){
            // if is first tick, just set tick timestamp and return
            if( !this._lastTick_ ){ this._lastTick_ = now; return 0; }

            // Determine the fps for this tick. 
            __delta_ = (now - this._lastTick_) / 1000;
            __fps_ = (1 / __delta_) << 0; // Round down fps.
            
            // Add to fps samples the current tick fps value.
            this._sample_[ this._index_ ] = __fps_;
            
            // Get the fps average by summing all samples and dividing by the sample count. 
            __average_ = 0;
            this.__average_i_ = this._sample_.length; 
            while (this.__average_i_--) { __average_ += this._sample_[this.__average_i_]; } 
            __average_ = ( __average_ / this._sample_.length);
    
            // Set the new FPS average.
            this.average = __average_;
            this.avgMsPerFrame = 1000 / __average_;

            // Store current timestamp
            this._lastTick_ = now;

            // Increase the sample index counter
            this._index_ += 1;

            // Reset the sample index counter if it excedes the maximum sampleSize limit
            if( this._index_ == this.sampleSize) this._index_ = 0;
            
            return this.average;
        },
        init: function init(sampleSize){
            // Set initial values.
            this.sampleSize = sampleSize;
            this._index_    = 0 ;
            this.average    = 0 ;
            this.avgMsPerFrame = 0 ;
            this._lastTick_ = 0 ;

            // Create new samples Uint8Array and fill with the default value.
            this._sample_ = new Uint8Array( new ArrayBuffer(this.sampleSize) );
            this._sample_.fill(0);
            // this._sample_.fill(sampleSize);
        },
    },

    // Starts the gameLoop.
    loop_start: function(){
        // Stop the gameLoop if it is running.
        if(_APP.game.gameLoop.running){ this.loop_stop(); }
        
        // Start the gameLoop.
        _APP.game.gameLoop.running = true; 
        this.loop_schedule_nextRun();
    },
    loop_schedule_nextRun: function(){
        if     (_APP.game.gameLoop.loopType == "raf"){ _APP.game.gameLoop.raf_id = window.requestAnimationFrame( (ts)=>{ _APP.game.gameLoop.loop( ts ); } ); }
        else if(_APP.game.gameLoop.loopType == "to") { _APP.game.gameLoop.raf_id = setTimeout(                   (  )=>{ _APP.game.gameLoop.loop( performance.now() ); }, 0 ); }
    },
    loop_restart_sameStates: function(){
        // Stop the gameloop and run debug if debug is enabled. 
        this.loop_stop();

        // DEBUG
        // if(_APP.configObj.gfxConfig.debug){
        //     _APP.debug.gameLoop.DOM["gamestateSelect"].value = _APP.game.gamestate1;
        // };

        // Trigger gamestate change (re-inits) but keep the same gamestates.
        _APP.game.changeGamestate1( _APP.game.gamestate1 );
        _APP.game.changeGamestate2( _APP.game.gamestate2 );

        // Start the gameLoop.
        _APP.game.gameLoop.running = true; 
        this.loop_schedule_nextRun();
    },
    // Stops the gameLoop if it is running. Starts the gameLoop if it is not running. 
    loop_pause: function(){
        // Stop the gameLoop if it is running.
        if(_APP.game.gameLoop.running){ this.loop_stop(); }
        
        // Start the gameLoop.
        else{ _APP.game.gameLoop.running = true; this.loop_schedule_nextRun(); }
    },
    // Stops the gameloop and runs debug if debug is enabled. 
    loop_stop: function(){
        // Cancel the current animation frame. 
        window.cancelAnimationFrame(_APP.game.gameLoop.raf_id); 

        // Set the gameLoop.running to false. 
        _APP.game.gameLoop.running = false;
    },
    endOfLoopTasks: function(){
        // Network tasks.
        // Should this client skip the next frame to catch up to the other client?

        // DEBUG.
        // if(_APP.configObj.gfxConfig.debug){
        //     // console.log("RUNNING DEBUG");
        //     if(_APP.debug.doDebug){ _APP.debug.doDebug(false); }
        //     // _APP.debug.doDebug(false); 
        // }

        // Request the next frame.
        this.loop_schedule_nextRun();
    },

    loop: async function loop(timestamp){
        // Is the loop running?
        if( this.running ){
            // Calculate the time difference between the thisLoopStart and the last loop run. 
            this.thisLoopStart = timestamp;
            this.delta = timestamp - this.lastLoopRun;
            
            // Is it time to run the next loop?
            if( (this.delta >= this.msFrame) ){
                // Update this.lastLoopRun with this timestamp.
                this.lastLoopRun = this.thisLoopStart - (this.delta % this.msFrame);

                // Track performance.
                this.fpsCalc.tick(this.thisLoopStart - (this.delta % this.msFrame));
                this.frameCounter += 1;

                // Network tasks.
                // Should this client skip the next frame to catch up to the other client?

                // HANDLE GAMESTATE CHANGES.
                if(_APP.game.gamestate1ChangeTriggered){ _APP.game._changeGamestate1(); }
                if(_APP.game.gamestate2ChangeTriggered){ _APP.game._changeGamestate2(); }

                // FADE
                
                // Function processFading will determine when the fade level needs to change.
                // If processFading returns true then the LOGIC and INPUT should be skipped.
                this.fadeIsBlocking = await _GFX.fade.processFading();
                if( this.fadeIsBlocking ){
                    // Count this as a draw frame if fade frame will be drawn.
                    if(_GFX.fade.framesSinceLastFadeChange == _GFX.fade.framesBetweenFadeChanges){ this.frameDrawCounter += 1; }

                    // Draw (the fade level.)
                    await _GFX.VRAM.draw(); 
                    
                    // Run the end of loop tasks and schedule the next loop. 
                    this.endOfLoopTasks();
                    return;
                }
                else{
                }

                // INPUT
                await _INPUT.util.getStatesForPlayers();
                //

                // Network tasks.
                // Should p1 or p2 input be replaced by data from the other client?
                
                // LOGIC
                await _APP.game.gamestates[_APP.game.gamestate1].main();

                // DRAW
                
                // Count this as a draw frame if there are changes. 
                if(_GFX.VRAM.changesStats.new){ this.frameDrawCounter += 1; }

                // TODO
                // "Sprite draw" to update VRAM before it gets drawn?

                // Draw.
                await _GFX.VRAM.draw(); 

                // Run the end of loop tasks and schedule the next loop. 
                this.endOfLoopTasks();
            }

            // No.
            else{
                // Run the end of loop tasks and schedule the next loop. 
                this.endOfLoopTasks();
                return;
            }
        }
        
        // No. Nothing to do until this.running is true again.
        else{
            //
            console.log("gameLoop is not running.");
        }
    },

    init: function init(parent){
        return new Promise(async (resolve,reject) => {
            this.parent = _APP.game;

            // Calculate the ms required per frame.
            this.msFrame = 1000 / this.fps;

            //
            this.fpsCalc.init(this.fps);

            //
            _APP.game.gamestates_list = Object.keys(_APP.game.gamestates);

            //
            // this.debugDelay = this.msFrame*1 ;
            // this.debugDelay = 1000 ;
            this.debugDelay = 0 ;

            resolve();
        });
    },
};

// Misc tests.
_APP.game.tests = {
    // fadeInTest: async function(){
    //     // let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 0, _APP.game.gameLoop.msFrame);
    //     // let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 1, _APP.game.gameLoop.msFrame);
    //     // let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
    //     let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 10, _APP.game.gameLoop.msFrame);
    //     await _GFX.fade.blocking.fadeIn(speedMs, true);
    //     console.log("DONE: fadeInTest");
    // },
    // fadeOutTest: async function(){
    //     // let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 0, _APP.game.gameLoop.msFrame);
    //     // let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 1, _APP.game.gameLoop.msFrame);
    //     // let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 2, _APP.game.gameLoop.msFrame);
    //     // let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
    //     let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 10, _APP.game.gameLoop.msFrame);
    //     await _GFX.fade.blocking.fadeOut(speedMs, true);
    //     console.log("DONE: fadeInTest");
    // },
    init: function(){
        // document.getElementById("tetris_app_tests_fadeIn") .addEventListener("click", ()=>{ this.fadeInTest(); }, false);
        // document.getElementById("tetris_app_tests_fadeOut").addEventListener("click", ()=>{ this.fadeOutTest(); }, false);
    },
};