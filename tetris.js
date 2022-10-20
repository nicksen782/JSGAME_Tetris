_APP = {
    // canvas       : undefined,
    // ctx          : undefined,
    // sprite_canvas: undefined,
    // sprite_ctx   : undefined,
    // fade_canvas  : undefined,
    // fade_ctx     : undefined,

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

    OLDinput: {
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

    // JSGAME: app pre-init.
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

            // Input init.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init: Input.`, "loading");
            await _INPUT.init( [_APP.DOM["app_game"], _APP.DOM["gameContDiv"] ] );

            // DEBUG? Unhide the div, init and switch to the debug tab if debug is active.
            if(_JSG.loadedConfig.meta.debug == true){
                // Move the game's debugDiv to the JSGAME lobby debug div. (debug tab.)
                this.DOM["lobby_nav_view_debug"].append(this.DOM["app_debugDiv"]);
                
                // Unhide the app_debugDiv.
                this.DOM["app_debugDiv"].classList.remove("hide");

                // Increase the width of the lobby div. 
                this.DOM["lobbyDiv"].style.width = "800px";
                
                // Show the lobby even if specified to be hidden (it displays the debug data.)
                if(_JSG.loadedConfig.meta.hideLobby){
                    _JSG.loadedConfig.meta.hideLobby = false;
                }

                await _APP.debug.init(this);
                if(_JSG.loadedConfig.meta.autoSwitchToLobbyDebugTab){ _JSG.lobby.nav.showOneView("debug"); }
                // resolve();
            }
            
            // Otherwise, switch to some other default lobby tab if so specified.
            else if(_JSG.loadedConfig.meta.defaultLobbyTab){
                _JSG.lobby.nav.showOneView(_JSG.loadedConfig.meta.defaultLobbyTab);
                // resolve();
            }
            // else{ resolve(); }

            resolve();
        });
    },

    // JSGAME: app post-init.
    start: async function(){
        // Request that fade tiles be created.
        await _WEBW.videoModeA.video.initFadeSend(true);

        // Display the fade tiles in the TESTS tab.
        if(_JSG.loadedConfig.meta.debug == true){
            // _APP.debug.tests.displayFadedTileset();
        }

        // Start the gameLoop after a short delay.
        await new Promise((res,rej)=>{ setTimeout(()=>{res();}, 500); });
            
        // Request the next frame.
        _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: GAMELOOP START.`, "loading");
        console.log("GAMELOOP START");
        console.log("");

        // Get initial input states.
        await _INPUT.util.getStatesForPlayers();

        // Start the game loop.
        _APP.game.gameLoop.loop_start();
    },
};