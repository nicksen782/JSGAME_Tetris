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
                            _GFX.util.tiles.drawTilemap({ tmn:thisFrame.tmn, x:thisFrame.x, y:thisFrame.y, tsn:thisFrame.tsn, li:thisFrame.li, ri:0 } );
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
                    _GFX.util.tiles.drawTilemap({ tmn:thisFrame.tmn, x:thisFrame.x, y:thisFrame.y, tsn:thisFrame.tsn, li:thisFrame.li, ri:0 } );

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
                            _GFX.util.tiles.drawTilemap({ tmn:thisFrame.tmn, x:thisFrame.x, y:thisFrame.y, tsn:thisFrame.tsn, li:thisFrame.li, ri:0 } );
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
        // EXAMPLE USAGE: _APP.game.shared.mapNumberToRange(5, 0, 10, 10, 20);
        // https://www.arduino.cc/reference/en/language/functions/math/map/
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        // function value_limit(val, min, max) {
            //     return val < min ? min : (val > max ? max : val);
            // }
    },
    limitNumberToRange: function(val, min, max){
        // EXAMPLE USAGE: _APP.game.shared.limitNumberToRange(11, 0, 10);
        // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-37.php
        return val < min ? min : (val > max ? max : val);
    },

    // Created via JSGAME_Tetris.js
    borderTiles1: {},

    // Create a custom tilemap for a border box and optional text.
    createBorderBox_tilemaps: function(x, y, w, h, textLines=[], obj={}){
        // NOTE: print assumes that the text tileset's first tilemap is the fontset and that those tiles are generated in ASCII order.
        // EXAMPLE USAGE: 
        // _APP.game.shared.createBorderBox_tilemaps( 
        //     12, 14, 8, 10, 
        //     [ 
        //         "LINE", 
        //         "", 
        //         "LINE" 
        //     ], 
        //     {
        //         border_bg  : { li:0, tsn:"tilesBG1", tmn: "bg2_tile" },
        //         border_fg  : { li:1 },
        //         inner_bg   : { li:0, tsn:"tilesBG1", tmn: "grid1" },
        //         inner_text : { li:1, tsn:"tilesTX1" }
        //     }
        // );

        // If a key is missing then skip the related operations.
        if(obj.border_bg  == undefined){ obj.border_bg  = { skip: true }; }
        if(obj.border_fg  == undefined){ obj.border_fg  = { skip: true }; }
        if(obj.inner_bg   == undefined){ obj.inner_bg   = { skip: true }; }
        if(obj.inner_text == undefined){ obj.inner_text = { skip: true }; }

        // VARIABLES.
        let menuTilemap_fg_top;
        let menuTilemap_fg_left;
        let menuTilemap_fg_right;
        let menuTilemap_fg_bottom;
        let menuTilemap_bg_top;
        let menuTilemap_bg_left;
        let menuTilemap_bg_right;
        let menuTilemap_bg_bottom;
        let border_bg_tile;
        let inner_bg_tile;
        let inner_bg_tilemap;
        let inner_text_tilemap;
        let longestString;
        let newWidth;
        let newHeight;
        let char;
        let returnObj;
        let borderTiles = this.borderTiles1;

        // Border foreground tilemaps.
        if(!obj.border_fg.skip){
            menuTilemap_fg_top    = [ w, 1   ];
            menuTilemap_fg_left   = [ 1, h-2 ];
            menuTilemap_fg_right  = [ 1, h-2 ];
            menuTilemap_fg_bottom = [ w, 1   ];
        }
        
        // Border background tilemap.
        if(!obj.border_bg.skip){
            menuTilemap_bg_top    = [ 0, 0 ];
            menuTilemap_bg_left   = [ 0, 0 ];
            menuTilemap_bg_right  = [ 0, 0 ];
            menuTilemap_bg_bottom = [ 0, 0 ];
            border_bg_tile;
            try{ 
                obj.border_bg.tsn;
                obj.border_bg.tmn;
                border_bg_tile = _GFX.cache[obj.border_bg.tsn].tilemap[obj.border_bg.tmn][0].orgTilemap[2]; 
            } 
            catch(e){ obj.border_bg = { skip: true }; }
            if(border_bg_tile != undefined){ 
                menuTilemap_bg_top    = [ w, 1   ];
                menuTilemap_bg_left   = [ 1, h-2 ];
                menuTilemap_bg_right  = [ 1, h-2 ];
                menuTilemap_bg_bottom = [ w, 1   ];
            }
        }
        
        // Inner background tilemap.
        if(!obj.inner_bg.skip){
            // Check the tile exists.
            try{ 
                obj.inner_bg.tsn;
                obj.inner_bg.tmn;
                inner_bg_tile = _GFX.cache[obj.inner_bg.tsn].tilemap[obj.inner_bg.tmn][0].orgTilemap[2];
            }
            catch(e){ obj.inner_bg = { skip: true }; }

            if(inner_bg_tile != undefined){ 
                inner_bg_tilemap = [ 0, 0 ];
                inner_bg_tilemap = [w-2, h-2]; 
            }
        }

        // Inner text tilemap.
        if(!obj.inner_text.skip){
            // Convert to empty array if textLines isn't an array.
            if(!Array.isArray(textLines)){ textLines = []; }
            if(textLines.length){ 
                // Determine what the proper dimensions of the text tilemap should be.
                longestString      = Math.max(...(textLines.map(el => el.length))) ;
                newWidth           = _APP.game.shared.limitNumberToRange(longestString, 0, w-2);
                newHeight          = _APP.game.shared.limitNumberToRange(textLines.length, 0, h-2);
                inner_text_tilemap = [newWidth, newHeight]; 
            }
            else{ 
                obj.inner_text.skip = true;
            }
        }

        // Create the tilemaps. 
        for(let yi=0; yi<h; yi+=1){
            for(let xi=0; xi<w; xi+=1){
                // TOP
                if(yi == 0){
                    // Draw top-left corner?
                    if     (xi==0){ 
                        if(border_bg_tile != undefined){ menuTilemap_bg_top.push(border_bg_tile); }
                        if(menuTilemap_fg_top) { menuTilemap_fg_top.push(borderTiles["topL"]); }
                    }
                    
                    // Draw top-right corner?
                    else if(xi==w-1){ 
                        if(border_bg_tile != undefined){ menuTilemap_bg_top.push(border_bg_tile); }
                        if(menuTilemap_fg_top) { menuTilemap_fg_top.push(borderTiles["topR"]); }
                    }
                    
                    // Draw top?
                    else { 
                        if(border_bg_tile != undefined){ menuTilemap_bg_top.push(border_bg_tile); }
                        if(menuTilemap_fg_top) { menuTilemap_fg_top.push(borderTiles["top"]); }
                    }
                }
                
                // MIDDLE
                else if(yi != 0 && yi != h-1){
                    // Draw left?
                    if     (yi !=h && xi==0){ 
                        if(border_bg_tile != undefined){ menuTilemap_bg_left.push(border_bg_tile); }
                        if(menuTilemap_fg_left) { menuTilemap_fg_left.push(borderTiles["left"]); }
                    }
                
                    // Draw right?
                    else if(xi==w-1){ 
                        if(border_bg_tile != undefined){ menuTilemap_bg_right.push(border_bg_tile); }
                        if(menuTilemap_fg_right) { menuTilemap_fg_right.push(borderTiles["right"]); }
                    }
                    
                    // Draw bgTile/text?
                    else { 
                        // Add the inner_bg_tile?
                        if(inner_bg_tile != undefined){ inner_bg_tilemap.push(inner_bg_tile); }

                        // Draw text chars?
                        if(inner_text_tilemap && textLines.length){
                            // Is there text on this line? (Even if blank).
                            if(textLines[yi-1] != undefined){
                                // Skip if this would make x be wider than the longest line's length?
                                if(xi-1 >= inner_text_tilemap[0]){ continue; }
                                
                                // Skip if this would make y be taller than the total number of lines?
                                if(yi-1 >= inner_text_tilemap[1]){ continue; }

                                // Add the character. If undefined then add a space.
                                char = textLines[yi-1][xi-1] != undefined ? textLines[yi-1][xi-1] : " ";
                                inner_text_tilemap.push( char.charCodeAt(0) - 32 );

                                // console.log("H:", yi-1, "VS", inner_text_tilemap[1], ", W:", xi-1, "VS", inner_text_tilemap[0], ", TEXT on line:", (textLines[yi-1] != undefined ? 1 : 0), textLines[yi-1], ", CHAR:", char);
                            }
                        }
                    }
                }

                // BOTTOM
                else if(yi == h-1){
                    // Draw bottom-left corner?
                    if     (xi==0){ 
                        if(border_bg_tile != undefined){ menuTilemap_bg_bottom.push(border_bg_tile); }
                        if(menuTilemap_fg_bottom) { menuTilemap_fg_bottom.push(borderTiles["botL"]); }
                    }
                    
                    // Draw bottom-right corner?
                    else if(xi==w-1){ 
                        if(border_bg_tile != undefined){ menuTilemap_bg_bottom.push(border_bg_tile); }
                        if(menuTilemap_fg_bottom) { menuTilemap_fg_bottom.push(borderTiles["botR"]); }
                    }
                    
                    // Draw bottom?
                    else { 
                        if(border_bg_tile != undefined){ menuTilemap_bg_bottom.push(border_bg_tile); }
                        if(menuTilemap_fg_bottom) { menuTilemap_fg_bottom.push(borderTiles["bot"]); }
                    }
                }
            }
        }

        // Create the base returnObj.
        returnObj = {
            border_bg:  { skip: true },
            border_fg:  { skip: true },
            inner_bg:   { skip: true },
            inner_text: { skip: true },
        };

        // Add border_fg?
        if(!obj.border_fg.skip){
            returnObj.border_fg = {
                t:{ x: x    , y: y    , tsn:"tilesBG1", li: obj.border_fg.li, tm: menuTilemap_fg_top    },
                l:{ x: x    , y: y+1  , tsn:"tilesBG1", li: obj.border_fg.li, tm: menuTilemap_fg_left   },
                r:{ x: x+w-1, y: y+1  , tsn:"tilesBG1", li: obj.border_fg.li, tm: menuTilemap_fg_right  },
                b:{ x: x    , y: y+h-1, tsn:"tilesBG1", li: obj.border_fg.li, tm: menuTilemap_fg_bottom },
            }
        };

        // Add border_bg?
        if(!obj.border_bg.skip){
            returnObj.border_bg = {
                t:{ x: x    , y: y    , tsn:obj.border_bg.tsn, li: obj.border_bg.li, tm :menuTilemap_bg_top    },
                l:{ x: x    , y: y+1  , tsn:obj.border_bg.tsn, li: obj.border_bg.li, tm :menuTilemap_bg_left   },
                r:{ x: x+w-1, y: y+1  , tsn:obj.border_bg.tsn, li: obj.border_bg.li, tm :menuTilemap_bg_right  },
                b:{ x: x    , y: y+h-1, tsn:obj.border_bg.tsn, li: obj.border_bg.li, tm :menuTilemap_bg_bottom },
            };
        }
        
        // Add inner_bg?
        if(!obj.inner_bg.skip){
            returnObj.inner_bg = { x: x+1, y: y+1, tsn: obj.inner_bg.tsn, li: obj.inner_bg.li, tm: inner_bg_tilemap };
        }

        // Add inner_text?
        if(!obj.inner_text.skip){
            returnObj.inner_text = { x: x+1, y: y+1, tsn: obj.inner_text.tsn, li: obj.inner_text.li, tm: inner_text_tilemap };
        }

        // Return the completed object and tilemaps.
        return returnObj;
    },

    // Draw a previously created border box and optional text.
    drawBorderBox_tilemaps: function(o){
        // Border background.
        if(!o.border_bg.skip){
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_bg.t.x, y: o.border_bg.t.y, tsn: o.border_bg.t.tsn, li: o.border_bg.t.li, tm: o.border_bg.t.tm } );
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_bg.l.x, y: o.border_bg.l.y, tsn: o.border_bg.l.tsn, li: o.border_bg.l.li, tm: o.border_bg.l.tm } );
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_bg.r.x, y: o.border_bg.r.y, tsn: o.border_bg.r.tsn, li: o.border_bg.r.li, tm: o.border_bg.r.tm } );
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_bg.b.x, y: o.border_bg.b.y, tsn: o.border_bg.b.tsn, li: o.border_bg.b.li, tm: o.border_bg.b.tm } );
        }
        
        // Border foreground.
        if(!o.border_fg.skip){
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_fg.t.x, y: o.border_fg.t.y, tsn: o.border_fg.t.tsn, li: o.border_fg.t.li, tm: o.border_fg.t.tm } );
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_fg.l.x, y: o.border_fg.l.y, tsn: o.border_fg.l.tsn, li: o.border_fg.l.li, tm: o.border_fg.l.tm } );
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_fg.r.x, y: o.border_fg.r.y, tsn: o.border_fg.r.tsn, li: o.border_fg.r.li, tm: o.border_fg.r.tm } );
            _GFX.util.tiles.drawTilemap_custom( { x: o.border_fg.b.x, y: o.border_fg.b.y, tsn: o.border_fg.b.tsn, li: o.border_fg.b.li, tm: o.border_fg.b.tm } );
        }

        // Inner background.
        if(!o.inner_bg.skip){
            _GFX.util.tiles.drawTilemap_custom( { x: o.inner_bg.x, y: o.inner_bg.y, tsn: o.inner_bg.tsn, li: o.inner_bg.li, tm: o.inner_bg.tm } );
        }
        
        // Inner text.
        if(!o.inner_text.skip){
            _GFX.util.tiles.drawTilemap_custom( { x: o.inner_text.x, y: o.inner_text.y, tsn: o.inner_text.tsn, li: o.inner_text.li, tm: o.inner_text.tm } );
        }
    },

    // SPRITES.
    sprites: {},
    // Adds a single-tile sprite to a sprite name.
    mapSprite   : function(name, obj){
        // EXAMPLE USAGE: _APP.game.shared.mapSprite("tetromino1",  { x: 0, y:0, tsn: "tilesG1", li: 1, tm: "T_bgtile" });
        // Add new key to sprites for sprite name if is doesn't exist.
        if(this.sprites[name] == undefined){
            this.sprites[name] = {
                curr: {},
                prev: {},
                firstDraw: true
            };
        }

        // Add new sprite to the matching sprite name.
        this.sprites[name] = {
            curr: {...obj},
            prev: {...obj},
            firstDraw: true
        };
        
    },

    // Updates a single-tile sprite in a sprite name.
    updateSprite: function(name, obj, spriteIndex){
        // Update the property values of a previously mapped sprite. 
        if(obj.x  ){ this.sprites[name][spriteIndex].x   = obj.x  ; }
        if(obj.y  ){ this.sprites[name][spriteIndex].y   = obj.y  ; }
        if(obj.tsn){ this.sprites[name][spriteIndex].tsn = obj.tsn; }
        if(obj.li ){ this.sprites[name][spriteIndex].li  = obj.li ; }
        if(obj.tm ){ this.sprites[name][spriteIndex].tm  = obj.tm ; }
    },

    // Updates VRAM with the sprite tiles (run before the normal VRAM draw.)
    drawSprites  : function(){
        // Updates VRAM with each sprite in the sprites object.
        // firstDraw = false
    },

    // General timers.
    generalTimers: {},

    // Create a new timer.
    createGeneralTimer: function(name, maxFrames, step, gamestate){
        // Creates a timer. 
        // Is updated/checked with checkGeneralTimer.
        // A timer must be cleared or recreated after it finishes before it can be reused. (resetGeneralTimer/createGeneralTimer)

        if(gamestate == undefined){ gamestate = _APP.game.gamestate1; }
        if(this.generalTimers[gamestate] == undefined){ this.generalTimers[gamestate] = {}; }

        // Make sure that a step value is set.
        if(step == undefined){ step = 1; }

        this.generalTimers[gamestate][name] = {
            finished  : false,
            maxFrames : maxFrames,
            frameCount: 0,
            step      : step,
        };
    },
    // Reset a timer to it's initial values.
    resetGeneralTimer: function(name, gamestate){
        if(gamestate == undefined){ gamestate = _APP.game.gamestate1; }

        if(!this.generalTimers[gamestate][name]){ 
            console.error("ERROR: resetGeneralTimer: This timer does not exist:", name);
            return; 
        }

        // Reset the timer. 
        this.generalTimers[gamestate][name] = {
            finished  : false,
            maxFrames : this.generalTimers[gamestate][name].maxFrames,
            frameCount: 0,
            step      : this.generalTimers[gamestate][name].step,
        };
    },
    // Sets a timer to values to match the state of being finished.
    finishGeneralTimer: function(name, gamestate){
        if(gamestate == undefined){ gamestate = _APP.game.gamestate1; }

        if(!this.generalTimers[gamestate][name]){ 
            console.error("ERROR: finishGeneralTimer: This timer does not exist:", name);
            return; 
        }

        // Finish the timer. 
        this.generalTimers[gamestate][name] = {
            finished  : true,
            maxFrames : this.generalTimers[gamestate][name].maxFrames,
            frameCount: this.generalTimers[gamestate][name].maxFrames,
            step      : this.generalTimers[gamestate][name].step,
        };
    },
    // Checks a timer and updates it's frameCount.
    checkGeneralTimer: function(name, gamestate){
        // Returns true if the timer is complete.
        // Otherwise this function will update the timer and return if it is finished.
        
        if(gamestate == undefined){ gamestate = _APP.game.gamestate1; }

        if(!this.generalTimers[gamestate][name]){ 
            console.error("ERROR: checkGeneralTimer: This timer does not exist:", name, gamestate);
            return; 
        }

        // Return true if finished.
        if(this.generalTimers[gamestate][name].finished){ return true; };

        // Check and update the timer. 
        if(
            this.generalTimers[gamestate][name].frameCount >= this.generalTimers[gamestate][name].maxFrames && 
            !this.generalTimers[gamestate][name].finished
        ){
            this.generalTimers[gamestate][name].finished = true;
        }
        else{
            // Increment by 1.
            // this.generalTimers[gamestate][name].frameCount += 1;
            
            // Increment by step.
            this.generalTimers[gamestate][name].frameCount += this.generalTimers[gamestate][name].step;
        }

        return this.generalTimers[gamestate][name].finished;

    },

};