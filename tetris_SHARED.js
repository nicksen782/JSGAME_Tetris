_APP.game.shared = {
	tests: {
		msToFramesTEST: function(){
			for(let i=0; i<11; i+=0.25){ 
				let msFrame = _APP.game.gameLoop.msFrame;
				let ms      = i * msFrame;
				let frames  = _APP.game.shared.msToFrames(ms, msFrame);
				let totalMs = frames*msFrame;
				let overage = totalMs - ms;

				let textOutput = `Wanted: ${ms.toFixed(2)} ms. Received: ${totalMs.toFixed(2)}. Frames needed: ${frames}.`;
				if(overage){ textOutput += ` (Overage: ${overage.toFixed(2)} ms.)`; }
				console.log(textOutput);
			}
		},
	},
	msToFrames : function(ms, msPerFrame){
		// Convert seconds to ms then divide by msPerFrame.
		if(!msPerFrame){ msPerFrame = _APP.game.gameLoop.msFrame; }
		let frames = ( (ms) / msPerFrame);

		// DEBUG
		// console.log(
		// 	`msToFrames:` + "\n" + 
		// 	`  Requested msPerFrame: ${(msPerFrame).toFixed(2)}` + "\n" + 
		// 	`  Requested ms        : ${(ms).toFixed(2)}`         + "\n" + 
		// 	`  Calculated frames   : ${frames}`                  + "\n" + 
		// 	`  Returned frames     : ${Math.ceil(frames)}`       + "\n" + 
		// 	``
		// );

		// Return the number of frames rounded up.
		return Math.ceil(frames);
	},

	// Convert a ms value to frames rounded up and then frames to ms. (May be a higher number that provided.)
	msToFramesToMs : function(ms, msPerFrame){
		// Convert seconds to ms then divide by msPerFrame.
		if(!msPerFrame){ msPerFrame = _APP.game.gameLoop.msFrame; }
		let frames = Math.ceil( (ms) / msPerFrame);

		// Return the newMs.
		let newMs = (frames * msPerFrame);
		return newMs;
	},

	animations1: {
		/*
			WHEN/WHERE TO USE THIS:
			-------------
			Animation of same-sized tilemaps (not sprites.)
			Follow the instructions below. "this" is expected to be whatever game state would use the animation.

			EXAMPLE USAGE:
			--------------

			// Create an object to hold your animations.
			this.animations = {};
			
			// Get a reference to the draw and _draw functions. 
			this.animations.draw = _APP.game.shared.animations1.draw;
			this.animations._draw = _APP.game.shared.animations1._draw;

			// Create the animation object:
			this.animations["new_animation_key"] = _APP.game.shared.animations1.generator(
				{
					reverseDirectionOnRepeat: false,
					resetFrameIndexOnRepeat : true,
					maxRepeats              : 2,
					maxWaitFrames           : _APP.game.shared.secondsToFrames(0.75, _APP.game.gameLoop.msFrame),
					eraseBeforeDraw         : false,
					frameDirection          : 1,
					frames: [
						{ layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
						{ layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f2", x:10, y:10 },
						{ layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f3", x:10, y:10 },
						{ layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f4", x:10, y:10 },
						{ layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f5", x:10, y:10 },
						{ layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
					],
					firstFrameTilemap : { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
					lastFrameTilemap  : { layerIndex: 0, tilesetIndex: 0, tilemap: "n782_flare_f1", x:10, y:10 },
				}
			);

			// Init the animation (start the animation from the beginning).
			// NOTE: You can also pass false to .init if you don't want the first frame drawn immediately.
			this.animations["new_animation_key"].init(); 


			// Run a frame of animation.
			_APP.game.shared.animations1.draw("new_animation_key", this.animations["new_animation_key"]);
		*/

		// Generates an animation object. 
		generator: function(confObj){
			return {
				// Does the animation still need to run?
				finished: undefined,
		
				// Repetition. 
				repeatCounter: undefined,
				maxRepeats: confObj.maxRepeats,
		
				// Timing of the display of each frame.
				waitFrames: undefined,
				maxWaitFrames: confObj.maxWaitFrames,
		
				// Current index into frames.
				currentFrameIndex: undefined,
		
				// Frame direction. (Up or down. (1, -1))
				frameDirection: undefined,
		
				// Should the frameDirection be reversed at each repeat?
				reverseDirectionOnRepeat: confObj.reverseDirectionOnRepeat, 
		
				// Reset frameIndex to 0 on repeat.
				resetFrameIndexOnRepeat: confObj.resetFrameIndexOnRepeat,
	
				// TODO: Erase before redraw?
				eraseBeforeDraw: confObj.eraseBeforeDraw,
		
				// Tilemaps in their draw order.
				frames: [...confObj.frames],
				
				// Tilemap for the first and the last drawn frames.
				firstFrameTilemap: confObj.firstFrameTilemap,
				lastFrameTilemap:  confObj.lastFrameTilemap,
	
				// Resets the variables to their default.
				init: function(){
						// These changes and will need to be reset if the animation is to run again.
						this.finished          = false;
						this.repeatCounter     = 0;
						this.waitFrames        = -1;
						this.currentFrameIndex = 0;
						this.frameDirection    = confObj.frameDirection;
			
						// Draw the first frame. 
						if(this.firstFrameTilemap){
							let thisFrame = this.firstFrameTilemap;
							let x = thisFrame.x;
							let y = thisFrame.y;
							_GFX.util.tiles.drawTilemap({ tmn:thisFrame.tilemap, x:x, y:y, tsi:0, li:0, ri:0 } );
						}
				},
			};
		},

		// Called from user-code to draw a frame of animation with "this" bound.
		draw: function(key){
			this._draw.bind( this[key] )(key);
		},

		// Does the actual drawing and maintenance of the animation. 
        _draw: function(key){
            // Is the animation already completed?
            if(this.finished){ return; }

            // Have enough frames been waited for?
            if(this.waitFrames >= this.maxWaitFrames){
                // Can we draw? (currentFrameIndex within range of 0 to frames.length-1).
                if(this.currentFrameIndex < this.frames.length && this.currentFrameIndex >= 0){
                    // Reset waitFrames back to 0.
                    this.waitFrames = 0;

                    // Clear ?
                    // if(this.eraseBeforeDraw){}

                    // Draw this frame. 
                    let thisFrame = this.frames[this.currentFrameIndex];
                    let x = thisFrame.x;
                    let y = thisFrame.y;
					_GFX.util.tiles.drawTilemap({ tmn:thisFrame.tilemap, x:x, y:y, tsi:0, li:0, ri:0 } );

                    // Increment currentFrameIndex by frameDirection.
                    this.currentFrameIndex += this.frameDirection;

                    // TODO: Detect out of range and set the animation cycle complete flag.
                    // Math.min(Math.max(parsed, 0), this.frames.length);
                }

                // Not in range. This cycle is completed.
                else{
                    // Do we do another cycle? 
                    if(this.repeatCounter < this.maxRepeats){
                        // Increment the repeat counter.
                        this.repeatCounter += 1;

                        // console.log(`Repeating: ${key}. repeatCounter: ${this.repeatCounter}, maxRepeats: ${this.maxRepeats}`);

                        // Reverse the frameDirection?
                        if(this.reverseDirectionOnRepeat){
                            // Reverse the frameDirection.
                            this.frameDirection *= -1;
                        }
                        if(this.resetFrameIndexOnRepeat){
                            this.currentFrameIndex = 0;
                        }
                        else{
                            // Change the frame.
                            this.currentFrameIndex += this.frameDirection;
                        }
                    }
                    
                    // No. The animation is done. 
                    else{
                        // Animation is finished. Set the finished flag.
                        this.finished = true; 

                        // console.log("Finished:", key);
    
                        // Clear ?
                        // if(this.eraseBeforeDraw){}
                        
                        // Draw the last frame. 
						if(this.lastFrameTilemap){
							let thisFrame = this.lastFrameTilemap;
							let x = thisFrame.x;
							let y = thisFrame.y;
							_GFX.util.tiles.drawTilemap({ tmn:thisFrame.tilemap, x:x, y:y, tsi:0, li:0, ri:0 } );
						}
                        return; 
                    }
                }
            }

            // No? Increment waitFrames.
            else{
                this.waitFrames += 1;
                return;
            }
        },
	},

	// https://www.arduino.cc/reference/en/language/functions/math/map/
	mapNumberToRange: function(x, in_min, in_max, out_min, out_max){
		return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	},
};