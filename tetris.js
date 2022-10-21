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
            document.getElementById("DEBUG_canvasLayer").style.height = `${this.DOM["option_size_range"].value}%`;

            this.DOM["option_size_value"].innerText  = `${this.DOM["option_size_range"].value}%`;
        }, false);
        this.DOM["option_size_range"].value     = `${_JSG.loadedConfig.meta.defaultGameCanvasHeightPercent}`;
        this.DOM["option_size_value"].innerText = `${_JSG.loadedConfig.meta.defaultGameCanvasHeightPercent}%`;
        this.DOM["option_size_range"].dispatchEvent(new Event("input"));
    },
    setupDebugGridAndNums_id: null,
    setupDebugGridAndNums: function(){
        // Match the debug dimensions to the normal play canvases.
        let elem1 = document.getElementById("DEBUG_canvasLayer");
        let elem2 = document.querySelector(".videoModeA_canvasLayer");
        elem1.width = elem2.width;
        elem1.height = elem2.height;

        let drawNumbers = function( canvas ){
            let ctx = canvas.getContext("2d");
            let tw = _GFX.cache.tilesTX2.json.config.tileWidth;
            let th = _GFX.cache.tilesTX2.json.config.tileHeight;
            let rows = _JSG.loadedConfig.meta.dimensions.rows;
            let cols = _JSG.loadedConfig.meta.dimensions.cols;

            console.log("tw  :", tw);
            console.log("th  :", th);
            console.log("rows:", rows);
            console.log("cols:", cols);
            // num_00            
            let numberTiles = [
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_00[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_01[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_02[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_03[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_04[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_05[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_06[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_07[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_08[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_09[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_10[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_11[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_12[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_13[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_14[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_15[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_16[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_17[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_18[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_19[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_20[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_21[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_22[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_23[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_24[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_25[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_26[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_27[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_28[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_29[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_30[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_31[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_32[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_33[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_34[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_35[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_36[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_37[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_38[0].orgTilemap[2] ].canvas,
                _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.num_39[0].orgTilemap[2] ].canvas,
            ];
            // let bgTile = _GFX.cache.tilesTX1.tileset[" ".charCodeAt(0) - 32].canvas; // Transparent.
            let bgTile = _GFX.cache.tilesBG1.tileset[1].canvas; // Black.
            let gridTile = _GFX.cache.tilesMISC.tileset[ _GFX.cache.tilesMISC.tilemap.grid2[0].orgTilemap[2] ].canvas; // Grid.

            let currentNumber = 1;
            for(let x=1; x<cols-1; x+=1){
                // TOP and BOTTOM ROW - background
                ctx.globalAlpha = 0.50;
                ctx.drawImage( bgTile, x*tw, 0*th) ; 
                ctx.drawImage( bgTile, x*tw, (rows-1)*th) ; 
                ctx.globalAlpha = 0.50;

                // TOP ROW - foreground
                ctx.drawImage( numberTiles[currentNumber], x*tw, 0*th) ; 
                
                // BOTTOM ROW - foreground
                ctx.drawImage( numberTiles[currentNumber], x*tw, (rows-1)*th) ; 

                currentNumber += 1; if(currentNumber > 39){ currentNumber = 0; }
            }
            
            ctx.globalAlpha = 1.0;
            currentNumber = 1;
            for(let y=1; y<rows-1; y+=1){
                // LEFT and RIGHT COL - background
                ctx.globalAlpha = 0.50;
                ctx.drawImage( bgTile, 0*tw, y*th) ; 
                // ctx.drawImage( bgTile, (rows-1)*tw, y*th) ; 
                ctx.globalAlpha = 0.50;
                
                // LEFT COL - foreground
                ctx.drawImage( numberTiles[currentNumber], 0*tw, y*th) ; 

                // RIGHT COL - foreground
                ctx.drawImage( numberTiles[currentNumber], (cols-1)*tw, y*th) ; 

                currentNumber += 1; if(currentNumber > 39){ currentNumber = 0; }
            }

            ctx.globalAlpha = 0.70;
            // Grid.
            for (let x=0; x<=(canvas.width/tw)-1; x+=1) {
                for (let y=0; y<=(canvas.height/th)-1; y+=1) {
                    ctx.drawImage( gridTile, x*tw, y*th) ; 
                }
            }
            ctx.globalAlpha = 1.0;

        };
        drawNumbers( document.getElementById("DEBUG_canvasLayer") );

        // Add the click event listener.
        document.getElementById("tetris_app_toggleNumbers").addEventListener("click", ()=>{
            let elem1 = document.getElementById("DEBUG_canvasLayer");
            elem1.classList.toggle("active");
            let elems = document.querySelectorAll(".videoModeA_canvasLayer");
            elems.forEach((d,i,a)=>{ 
                d.classList.toggle("debug"); 
                if(i+1 == a.length){
                    // elem1.style["width"]  = d.style["width"];
                    elem1.style["height"] = d.style["height"];
                    elem1.style["z-index"]  = (d.style["z-index"] << 0) + 5;
                }
            });
            // if(elem1.classList.contains("active")){
            //     // console.log("starting");
            //     clearInterval(this.setupDebugGridAndNums_id);
            //     document.getElementById("DEBUG_canvasLayer").style.opacity = 0;
            //     let opacity = 0.75;
            //     let opacityStep = 0.25;
            //     this.setupDebugGridAndNums_id = setInterval(()=>{
            //         document.getElementById("DEBUG_canvasLayer").style.opacity = opacity.toFixed(2);
            //         // opacity = (Math.min(Math.max(opacity, 0.0), 1.0));
            //         opacity += opacityStep;
            //         if((Math.sign(opacityStep) == 1 && opacity > 0.75) || (Math.sign(opacityStep) == -1 && opacity < 0.50) ){ 
            //             opacityStep *= -1; 
            //             if(opacity >= 0.75){ opacity += opacityStep; }
            //             if(opacity < 0.50 ){ opacity += opacityStep; }
            //         }
            //     }, 200);
            // }
            // else{
            //     // console.log("stopping");
            //     clearInterval(this.setupDebugGridAndNums_id);
            //     document.getElementById("DEBUG_canvasLayer").style.opacity = 0;
            // }

        }, false);

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

            if(_JSG.loadedConfig.meta.debug == true){
                this.setupDebugGridAndNums();
                document.getElementById("tetris_app_toggleNumbers").click();
            }
            else{
                document.getElementById("tetris_app_toggleNumbers").style.display = "none";
            }
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