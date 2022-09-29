_APP.game = {
};
_APP.gameLoop = {
    running:false,
    isGameOver: false,
    fps:10,
    msFrame: null,
    lastLoop: performance.now(),
    loopStarted: false, 

    loop: function(timestamp){
        // Is it time to run the next loop?
        if( this.isRunning && (timestamp - this.lastLoop >= this.msFrame) ){
            // Get input.
            //
            
            // Run logic.
            //

            // Update graphics.
            //

            // Request the next frame.
            window.requestAnimationFrame( (ts)=>{ this.loop( ts ); } );
        }
    
        // No? Do some other thing.
        else{
            // DEBUG.
            //

            // Request the next frame.
            window.requestAnimationFrame( (ts)=>{ this.loop( ts ); } );
        }
    },

    init: function(parent){
        // Calculate the ms required per frame.
        this.msFrame = 1000 / this.fps;
    },
};