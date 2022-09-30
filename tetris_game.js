_APP.game = {
    //
    gamestates: {
    },

    gameLoop : {
        frameCounter: 0,
        raf_id     : null,
        running    : false,
        fps        : 20,
        msFrame    : null,
        lastLoop   : performance.now(),

        lastDebug: performance.now(),
        debugDelay: undefined,
        netGame: false,

        stop: function(){},
        start: function(){},
        pause: function(){},

        gamestate1: "gs_title0",
        gamestate2: "",
        changeGamestate1: function(new_gamestate){
            // Is this a valid gamestate key?
            // if(!1){ console.log("Unknown new_gamestate:", new_gamestate); throw ""; }

            // Remove the inited flag of the current gamestate.
            _APP.game.gamestates[this.gamestate1].inited = false;

            // Change the current gamestate to the new gamestate.
            this.gamestate1 = new_gamestate;
        },
        changeGamestate2: function(new_gamestate){
            // Is this a valid gamestate key?
            // if(!1){ console.log("Unknown new_gamestate:", new_gamestate); throw ""; }

            // Change the current gamestate to the new gamestate.
            this.gamestate2 = new_gamestate;
        },

        // Calculates the average frames per second.
        fpsCalc : {
            // colxi: https://stackoverflow.com/a/55644176/2731377
            sampleSize : undefined,
            _sample_   : undefined,
            average    : undefined,
            _index_    : undefined,
            _lastTick_ : undefined,
            tick : function(now){
                // if is first tick, just set tick timestamp and return
                if( !this._lastTick_ ){ this._lastTick_ = now; return 0; }

                // Determine the fps for this tick. 
                let delta = (now - this._lastTick_) / 1000;
                let fps = (1 / delta) << 0; // Round down fps.
                
                // Add to fps samples the current tick fps value.
                this._sample_[ this._index_ ] = fps;
                // this._sample_[ this._index_ ] = Math.round(fps);
                // this._sample_[ this._index_ ] = Math.floor(fps);
                // this._sample_[ this._index_ ] = Math.ceil(fps);
                
                // Iiterate through the samples to obtain the average fps.
                let average = 0;
                for(i=0; i<this._sample_.length; i++) average += this._sample_[i];
                average = ( average / this.sampleSize);
                // average = Math.round( average / this.sampleSize);
                // average = Math.floor( average / this.sampleSize);
                // average = Math.ceil( average / this.sampleSize);
        
                // set new FPS average.
                this.average = average;

                // store current timestamp
                this._lastTick_ = now;

                // increase sample index counter
                this._index_ ++;

                // Rest the sample index counter if it excedes the maximum sampleSize limit
                if( this._index_ === this.sampleSize) this._index_ = 0;
                
                return this.average;
            },
            init: function(sampleSize){
                // Set initial values.
                this.sampleSize = sampleSize;
                this._index_    = 0 ;
                this.average    = 0 ;
                this._lastTick_ = 0 ;

                // Create new samples Uint8Array and fill with the default value.
                this._sample_ = new Uint8Array( new ArrayBuffer(this.sampleSize) );
                this._sample_.fill(0);
            },
        },	

        loop: async function(timestamp){
            // Is the loop running?
            if( this.running ){
                // Calculate the time difference between the timestamp and the last loop run. 
                let delta = timestamp - this.lastLoop;
                
                // Is it time to run the next loop?
                if( (delta >= this.msFrame) ){
                    // Track performance.
                    this.fpsCalc.tick(timestamp - (delta % this.msFrame));
                    this.frameCounter += 1;
                    _APP.debug.DOM["runIndicator_gameLoop"].classList.toggle("active");

                    // Update this.lastLoop with this timestamp.
                    this.lastLoop = timestamp - (delta % this.msFrame);
                    
                    // Get input.
                    //
                    
                    // Run logic.
                    await _APP.game.gamestates[this.gamestate1].main();
                    
                    // DEBUG.
                    if(_JSG.loadedConfig.meta.debug){
                        if(timestamp - this.lastDebug > this.debugDelay){
                            _APP.debug.debugDisplays.runDebugDisplay();
                            this.lastDebug = timestamp;
                        }
                    }
                    
                    // Update graphics.
                    _GFX.util.VRAM.draw();

                    // Request the next frame.
                    this.raf_id = window.requestAnimationFrame( (newTimestamp)=>{ this.loop( newTimestamp ); } );
                }
                // No.
                else{
                    // Request the next frame.
                    this.raf_id = window.requestAnimationFrame( (newTimestamp)=>{ this.loop( newTimestamp ); } );
                }
            }
            
            // No. Nothing to do until this.running is true again.
            else{
                //
                console.log("gameLoop is not running.");
            }
        },
    
        init: function(parent){
            return new Promise(async (resolve,reject) => {
                // Calculate the ms required per frame.
                this.msFrame = 1000 / this.fps;

                //
                this.fpsCalc.init(this.fps);

                //
                this.debugDelay = 100;

                resolve();
            });
        },
    },
};