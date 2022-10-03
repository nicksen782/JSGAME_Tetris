_APP = {
    // canvas       : undefined,
    // ctx          : undefined,
    // sprite_canvas: undefined,
    // sprite_ctx   : undefined,
    // fade_canvas  : undefined,
    // fade_ctx     : undefined,
    

    webWorkers:{
        video: {
            webworker: undefined,
            RECEIVE: function(e){
                // console.log("-------------------RECEIVE:", e, this);

                if(e.data && e.data.mode){
                    switch(e.data.mode){
                        case "init": this.initReceive(e); break;
                    }
                }
            },

            // INIT
            initSend: function(){
                console.log("+++++++++++++++ initSend:" );
                _APP.webWorkers.video.webworker.postMessage(
                    {
                        func: "init"
                    }, 
                    []
                );
            },
            initReceive: function(e){
                console.log("+++++++++++++++ initReceive:", e);
            },

            // FADE
            fadeSend: function(obj){
                _APP.webWorkers.video.webworker   .postMessage(
                    {
                        "func"     : "fade",
                        "maxRed"   : _CGF.CONSTS.fader[fadeStep].r ,
                        "maxGreen" : _CGF.CONSTS.fader[fadeStep].g ,
                        "maxBlue"  : _CGF.CONSTS.fader[fadeStep].b ,
                        "buf"      : img.data.buffer,
                    } ,
                    [
                        img.data.buffer
                    ]
                );
            },
            fadeReceive: function(e){
                // Convert the received data into a new ImageData.
                let arr     = new Uint8ClampedArray( e.data.modbuf );
                let imgData = new ImageData(arr, width, height);
    
                // Copy the image to the FADE canvas (can be used later if the other layers do not change.)
                // _CG.ctx.FADE.putImageData(imgData, 0,0);
    
                // Reset the counter.
                // _CGF.currFadeFrame=_CGF.fadeSpeed;
    
                // Record previous fade step.
                _CGF.prevFadeStep = fadeStep ;
    
                // Is this the end of a fadeOut?
                if      ( _CGF.fadeDir == -1 && _CGF.fadeStep==0         ){ fadeOutHasCompleted(); }
    
                // Is this the end of a fadeIn?
                else if ( _CGF.fadeDir ==  1 && _CGF.fadeStep==lastIndex ){ fadeInHasCompleted(); }
    
                // Fade steps still remain!
                else{
                    // Adjust to the new fade index.
                    _CGF.fadeStep += _CGF.fadeDir ;
    
                    COMPLETED();
    
                    return;
                }
    
            },
        },

        init: function(){
            // Create the WebWorkers and their message event listeners.
            _APP.webWorkers.video.webworker = new Worker( "shared/plugins/VIDEO_A/videoModeA_webworker.js" );
            _APP.webWorkers.video.webworker.addEventListener("message", (e)=>_APP.webWorkers.video.RECEIVE(e), false);

            // Send the init for each webworker.
            _APP.webWorkers.video.initSend();
            
            // URL.createObjectURL(
            //     new Blob(
            //         [ `(${container.toString()})();` ], 
            //         { type: 'application/javascript' }
            //     )
            // )
        },
    },

    fadeLayer: {
        parent: undefined,

        CONSTS : {
            // *** FADER *** tim1724
            // Modified for JavaScript by nicksen782.
            FADER_STEPS : 13 , // Number of steps in a fade.
            fader : [
                //                               INDEX BB GGG RRR  B G R    DEC   HEX
                { b: 0  , g: 0   , r: 0   } , // 0     00 000 000  0 0 0  , 0   , 0x00
                { b: 33 , g: 0   , r: 0   } , // 1     01 000 000  1 0 0  , 64  , 0x40
                { b: 66 , g: 14  , r: 0   } , // 2     10 001 000  2 1 0  , 136 , 0x88
                { b: 66 , g: 28  , r: 14  } , // 3     10 010 001  2 2 1  , 145 , 0x91
                { b: 100, g: 28  , r: 28  } , // 4     11 010 010  3 2 2  , 210 , 0xD2
                { b: 100, g: 57  , r: 57  } , // 5     11 100 100  3 4 4  , 228 , 0xE4
                { b: 66 , g: 71  , r: 71  } , // 6     10 101 101  2 5 5  , 173 , 0xAD
                { b: 66 , g: 85  , r: 71  } , // 7     10 110 101  2 6 5  , 181 , 0xB5
                { b: 66 , g: 85  , r: 85  } , // 8     10 110 110  2 6 6  , 182 , 0xB6
                { b: 66 , g: 100 , r: 85  } , // 9     10 111 110  2 7 6  , 190 , 0xBE
                { b: 66 , g: 100 , r: 100 } , // 10    10 111 111  2 7 7  , 191 , 0xBF
                { b: 100, g: 100 , r: 100 } , // 11    11 111 111  3 7 7  , 255 , 0xFF
                { b: 100, g: 100 , r: 100 } , // 12    11 111 111  3 7 7  , 255 , 0xFF
            ], // The rgb values for each fade level.
        } ,
        prevFadeStep   : 0     , // Previous frame step.
        fadeStep       : 0     , // Current frame step.
        fadeSpeed      : 0     , // Speed between fader array index changes.
        currFadeFrame  : 0     , // Current index into the fader array.
        fadeDir        : 1     , // Direction of fade (1 is up, -1 is down.)
        fadeActive     : false , // Fade is active.
        blocking       : false , // Do not allow further game logic updates if true.
        blockAfterFade : false , //
        stayDark       : false , // Stay dark after fade completes.

        // Starts the fade.
        doFade        : function(speed, blocking, blockAfterFade){
            if(blockAfterFade==undefined){ blockAfterFade=false; }
            this.stayDark      = false;
            this.blockAfterFade = blockAfterFade;
            this.fadeActive    = true     ;
            this.currFadeFrame = 0        ; //
            this.fadeSpeed     = speed    ;
            this.blocking      = blocking ;
        },
        // Sets up a fade out.
        FadeIn        : function(speed, blocking, blockAfterFade){
            if(blockAfterFade==undefined){ blockAfterFade=false; }

            this.prevFadeStep = 99;
            this.fadeStep     = 0;
            this.fadeDir      = 1;
            this.doFade(speed, blocking, blockAfterFade);
        },
        // Sets up a fade in.
        FadeOut       : function(speed, blocking, blockAfterFade){
            if(blockAfterFade==undefined){ blockAfterFade=false; }

            this.prevFadeStep = 99;
            this.fadeStep     = this.CONSTS.FADER_STEPS-1;
            this.fadeDir      = -1;
            this.doFade(speed, blocking, blockAfterFade);
        },

        getImgData: function(){
            // Get the image data for the canvas (time-expensive.)
            // this.parent.ctx.getImageData(0, 0, this.parent.canvas.width, this.parent.canvas.height);

            // Send a message to the worker to perform the image processing.

            let obj = {
                "func"     : "fade",
                "maxRed"   : _CGF.CONSTS.fader[fadeStep].r ,
                "maxGreen" : _CGF.CONSTS.fader[fadeStep].g ,
                "maxBlue"  : _CGF.CONSTS.fader[fadeStep].b ,
                "buf"      : img.data.buffer,
            }

            _APP.webWorkers.video.fadeSend();

        },

        init: function(parent){
            this.parent = parent; 

            // this.generateFadeValues();
        },
    },

    // Create Canvas And Event Listeners.
    init_createCanvasAndEventListeners: function(){
        this.DOM["gameContDiv"].setAttribute('tabindex','0');

        _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: init_createCanvasAndEventListeners: Add event listeners.`, "loading");
        // Add the keydown input handler.
        // this.DOM["gameContDiv"].addEventListener("keydown", (ev)=>{game.getInput(ev);}, false);
        
        // Add focus/blur event to the canvas.
        this.DOM["gameContDiv"].addEventListener("focus", (ev)=>{ this.DOM["gameContDiv"].classList.add("focused"); }, false);
        this.DOM["gameContDiv"].addEventListener("blur" , (ev)=>{ this.DOM["gameContDiv"].classList.remove("focused"); }, false);

        // Game size changer.
        this.DOM["option_size_range"].addEventListener("input", ()=>{
            for(let i=0, l= _GFX.canvasLayers.length; i<l; i+=1){
                _GFX.canvasLayers[i].canvas.style.height = `${this.DOM["option_size_range"].value}%`; ;
                _GFX.canvasLayers[i].canvas.style.height = `${this.DOM["option_size_range"].value}%`; ;
                _GFX.canvasLayers[i].canvas.style.height = `${this.DOM["option_size_range"].value}%`; ;
            }
            this.DOM["option_size_value"].innerText  = `${this.DOM["option_size_range"].value}%`;
        }, false);
        this.DOM["option_size_range"].value     = `${_JSG.loadedConfig.meta.defaultGameCanvasHeightPercent}`;
        this.DOM["option_size_value"].innerText = `${_JSG.loadedConfig.meta.defaultGameCanvasHeightPercent}%`;
        this.DOM["option_size_range"].dispatchEvent(new Event("input"));
    },

    input: {
        // https://developer.ibm.com/tutorials/wa-games/
        parent: null,
        DOM: {
            app_dpad_canvas : undefined,
            app_game_canvas : undefined,
        },

        mouse: {
            getElemPos: function(elem){
                // _APP.DOM["app_dpad_canvas"]
                // _APP.DOM["app_game_canvas"]
                return {
                    x: elem.offset().left,
                    y: elem.offset().top
                }
            },
            getElemMousePos: function(elem){
                // _APP.DOM["app_dpad_canvas"]
                // _APP.DOM["app_game_canvas"]
                let elemPos = this.getElemPos(elem);
                return {
                    x: e.pageX - elemPos.x,
                    y: e.pageY - elemPos.y
                }
            },
        },
        keyboard: {
            // _APP.DOM["app_dpad_canvas"]
            // _APP.DOM["app_game_canvas"]
        },
        draw_gamepad_onscreen: function(){
            let canvas = this.DOM["app_dpad_canvas"];
            let ctx = canvas.getContext("2d");
            let img = _GFX.cache.tilesBG1.tilemap.dpad_all_off[0].canvas;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        },
        init: function(parent){
            this.parent = parent; 

            this.DOM.app_dpad_canvas = _APP.DOM["app_dpad_canvas"];
            this.DOM.app_game_canvas = _APP.DOM["app_game_canvas"];

            this.draw_gamepad_onscreen();
        },
    },

    init: async function(){
        return new Promise(async (resolve, reject)=>{
            // appConfig overrides.
            if(_JSG.params.debug){
                if(_JSG.params.debug=="0"){ _JSG.loadedConfig.meta.debug = false; }
                else if(_JSG.params.debug=="1"){ _JSG.loadedConfig.meta.debug = true; }
            }

            // Load in the DOM from meta.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init.`, "loading");
            _APP.DOM = _JSG.loadedConfig.meta.DOM;
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, false);
            _APP.DOM["gameDiv"].innerHTML = this.files["tetris_html"]; 
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, true);

            // Create Canvas And Event Listeners.
            this.init_createCanvasAndEventListeners();

            // Gameloop init.
            await _APP.game.gameLoop.init(this);

            // Graphics init.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init: Graphics.`, "loading");
            await _GFX.init();

            // Add the _GFX-generated canvas layers.
            for(let i=0, l= _GFX.canvasLayers.length; i<l; i+=1){
                this.DOM["app_game"].append(_GFX.canvasLayers[i].canvas);
            }

            await this.input.init(this);
            await this.fadeLayer.init(this);
            await this.webWorkers.init(this);

            // DEBUG? Unhide the div, init and switch to the debug tab if debug is active.
            if(_JSG.loadedConfig.meta.debug == true){
                // Move the game's debugDiv to the JSGAME lobby debug div. (debug tab.)
                this.DOM["lobby_nav_view_debug"].append(this.DOM["app_debugDiv"]);
                
                // Unhide the app_debugDiv.
                this.DOM["app_debugDiv"].classList.remove("hide");

                await _APP.debug.init(this);
                if(_JSG.loadedConfig.meta.autoSwitchToLobbyDebugTab){ _JSG.lobby.nav.showOneView("debug"); }
                resolve();
            }
            
            // Otherwise, switch to some other default lobby tab if so specified.
            else if(_JSG.loadedConfig.meta.defaultLobbyTab){
                _JSG.lobby.nav.showOneView(_JSG.loadedConfig.meta.defaultLobbyTab);
                resolve();
            }
            else{ resolve(); }

            // Start the gameLoop after a short delay.
            await new Promise((res,rej)=>{ setTimeout(()=>{res();}, 500); });
            
            // Request the next frame.
            _APP.game.gameLoop.running = true; 
            if     (_APP.game.gameLoop.loopType == "raf"){ _APP.game.gameLoop.raf_id = window.requestAnimationFrame( (ts)=>{ _APP.game.gameLoop.loop( ts ); } ); }
            else if(_APP.game.gameLoop.loopType == "to") { _APP.game.gameLoop.raf_id = setTimeout( ()=>{ _APP.game.gameLoop.loop( performance.now() ); }, 0 ); }
            return; 

            _APP.game.gameLoop.loop();
        });
    },
};