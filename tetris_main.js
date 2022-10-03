_APP.game = {
    // This is populated by individual gs_ files. 
    gamestates: {
    },
    gamestates_list: [],

    // Populated by tetris_SHARED.js.
    shared: {}, 
    
    gameLoop : {
        frameCounter: 0,
        raf_id     : null,
        running    : false,
        fps        : 60,
        msFrame    : null,
        lastLoop   : 0,
        delta      : undefined,
        loopType   : "raf", // Can be "raf" or "to".

        lastDebug: 0,
        debugDelay: undefined,
        netGame: false,

        stop: function(){},
        start: function(){},
        pause: function(){},

        prev_gamestate1: "",
        prev_gamestate2: "",
        gamestate1: "gs_title0",
        gamestate2: "",
        changeGamestate1: function changeGamestate1(new_gamestate){
            // Is this a valid gamestate key?
            if( _APP.game.gamestates_list.indexOf(new_gamestate) == -1){ console.log("Unknown new_gamestate:", new_gamestate); throw ""; }
            
            // Remove the inited flag of the current gamestate.
            _APP.game.gamestates[this.gamestate1].inited = false;

            // Set the previous gamestate. 
            this.prev_gamestate1 = this.gamestate1;

            // Change the current gamestate to the new gamestate.
            this.gamestate1 = new_gamestate;
        },
        changeGamestate2: function changeGamestate2(new_gamestate){
            // Is this a valid gamestate key?
            // if(!1){ console.log("Unknown new_gamestate:", new_gamestate); throw ""; }

            // Set the previous gamestate. 
            this.prev_gamestate2 = this.gamestate2;

            // Change the current gamestate to the new gamestate.
            this.gamestate2 = new_gamestate;
        },

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
            __delta_   : undefined,
            __fps_     : undefined,
            __average_ : undefined,

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
                let i = this._sample_.length; 
                while (i--) { __average_ += this._sample_[i]; } 
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

        doDebug: function(timestamp){
            _JSG.shared.timeIt.stamp("do_debug", "s", "gameLoop"); 
            if(_JSG.loadedConfig.meta.debug){
                _APP.debug.gameLoop.DOM["runIndicator_gameLoop"].classList.toggle("active");
                if(_APP.game.gamestates[this.gamestate1].inited){
                    if(timestamp - this.lastDebug > this.debugDelay){
                        _APP.debug.debugDisplays.runDebugDisplay();
                        this.lastDebug = timestamp;
                    }
                }
            }
            _JSG.shared.timeIt.stamp("do_debug", "e", "gameLoop"); 
        },
        doFade: function(timestamp){
            // Is a fade happening? (Fades are blocking.)
            if( _APP.fadeLayer.fadeActive || _APP.fadeLayer.blocking || _APP.fadeLayer.blockAfterFade ){
                _JSG.shared.timeIt.stamp("do_fade", "s", "gameLoop"); 

                // Process fading.
                // 

                _JSG.shared.timeIt.stamp("do_fade", "e", "gameLoop"); 
                
                return true;
            }
            return false;
        },
        loop: async function loop(timestamp){
            // Is the loop running?
            if( this.running ){
                // Calculate the time difference between the timestamp and the last loop run. 
                this.delta = timestamp - this.lastLoop;
                
                // Is it time to run the next loop?
                if( (this.delta >= this.msFrame) ){
                    // Fading?
                    if( this.doFade(timestamp) ) { 
                        // DEBUG.
                        this.doDebug(timestamp);

                        // Request the next frame.
                        if     (this.loopType == "raf"){ this.raf_id = window.requestAnimationFrame( (ts)=>{ this.loop( ts ); } ); }
                        else if(this.loopType == "to") { this.raf_id = setTimeout( ()=>{ this.loop( performance.now() ); }, 0 ); }
                        return; 
                    }

                    _JSG.shared.timeIt.stamp("full_gameLoop", "s", "gameLoop"); 
                    
                    // Update this.lastLoop with this timestamp.
                    this.lastLoop = timestamp - (this.delta % this.msFrame);

                    // Track performance.
                    this.fpsCalc.tick(timestamp - (this.delta % this.msFrame));
                    this.frameCounter += 1;

                    // Get input.
                    _JSG.shared.timeIt.stamp("get_input", "s", "gameLoop"); 
                    _JSG.shared.timeIt.stamp("get_input", "e", "gameLoop"); 
                    //
                    
                    // Run logic.
                    _JSG.shared.timeIt.stamp("do_logic", "s", "gameLoop"); 
                    await _APP.game.gamestates[this.gamestate1].main();
                    _JSG.shared.timeIt.stamp("do_logic", "e", "gameLoop"); 
                    
                    // DEBUG.
                    this.doDebug(timestamp);

                    _JSG.shared.timeIt.stamp("do_draw", "s", "gameLoop"); 
                    // Update graphics.
                    await _GFX.VRAM.draw();
                    // await _GFX.util.VRAM.draw();
                    _JSG.shared.timeIt.stamp("do_draw", "e", "gameLoop"); 

                    _JSG.shared.timeIt.stamp("full_gameLoop", "e", "gameLoop"); 

                    // Request the next frame.
                    if     (this.loopType == "raf"){ this.raf_id = window.requestAnimationFrame( (ts)=>{ this.loop( ts ); } ); }
                    else if(this.loopType == "to") { this.raf_id = setTimeout( ()=>{ this.loop( performance.now() ); }, 0 ); }
                }

                // No.
                else{
                    // Request the next frame.
                    if     (this.loopType == "raf"){ this.raf_id = window.requestAnimationFrame( (ts)=>{ this.loop( ts ); } ); }
                    else if(this.loopType == "to") { this.raf_id = setTimeout( ()=>{ this.loop( performance.now() ); }, 0 ); }
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
                _JSG.shared.timeIt.stamp("full_gameLoop", "s", "gameLoop"); _JSG.shared.timeIt.stamp("full_gameLoop", "e", "gameLoop");
                _JSG.shared.timeIt.stamp("get_input"    , "s", "gameLoop"); _JSG.shared.timeIt.stamp("get_input"    , "e", "gameLoop");
                _JSG.shared.timeIt.stamp("do_logic"     , "s", "gameLoop"); _JSG.shared.timeIt.stamp("do_logic"     , "e", "gameLoop");
                _JSG.shared.timeIt.stamp("do_draw"      , "s", "gameLoop"); _JSG.shared.timeIt.stamp("do_draw"      , "e", "gameLoop");
                _JSG.shared.timeIt.stamp("do_fade"      , "s", "gameLoop"); _JSG.shared.timeIt.stamp("do_fade"      , "e", "gameLoop");
                
                // Calculate the ms required per frame.
                this.msFrame = 1000 / this.fps;

                //
                this.fpsCalc.init(this.fps);

                //
                _APP.game.gamestates_list = Object.keys(_APP.game.gamestates);

                //
                this.debugDelay = 1;

                resolve();
            });
        },
    },
};