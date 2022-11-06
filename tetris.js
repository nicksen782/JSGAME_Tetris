_APP = {
    // canvas       : undefined,
    // ctx          : undefined,
    // sprite_canvas: undefined,
    // sprite_ctx   : undefined,
    // fade_canvas  : undefined,
    // fade_ctx     : undefined,
    
    toggleFullscreen: function(){
        let container = _APP.DOM["gameContDiv"]; // tetris_app (Whole loaded app.)
        let options   = _APP.DOM["app_options"]; // tetris_app_options (app options.)
        let game      = _APP.DOM["app_game"];    // tetris_app_game (canvas containter)

        window.requestAnimationFrame(()=>{
            // Go to fullscreen.
            if(!(
                document.fullscreenElement       || // Chrome
                document.webkitFullscreenElement || // Chrome
                document.fullscreen              || // Chrome
                document.msFullscreenElement     || // Edge/IE
                document.mozFullScreenElement    || // Firefox
                window  .fullScreen                 // Firefox
            )){
                if      (container.requestFullscreen      ) { container.requestFullscreen()      ; } // Standard
                else if (container.webkitRequestFullscreen) { container.webkitRequestFullscreen(); } // Chrome
                else if (container.mozRequestFullScreen   ) { container.mozRequestFullScreen()   ; } // Firefox
                else if (container.msRequestFullscreen    ) { container.msRequestFullscreen()    ; } // IE11
                
                // Subtract the the app_options width from the screen width to get the new width for app_game.
                let newGameWidth = screen.width - options.offsetWidth;
                
                // Apply the new width to app_game.
                game.style.width = newGameWidth + "px";

                // Add the fullscreen class to the container. 
                container.classList.add("tetris_fullscreen");
            }
            
            // Exit fullscreen.
            else{
                if     (document.exitFullscreen     )  { document.exitFullscreen()      ; } // Standard
                else if(document.webkitExitFullscreen) { document.webkitExitFullscreen(); } // Chrome
                else if(document.mozCancelFullScreen)  { document.mozCancelFullScreen() ; } // Firefox
                else if(document.msExitFullscreen)     { document.msExitFullscreen()    ; } // IE11
                
                // Remove the new width to app_game.
                game.style.width = "unset";

                // Remove the fullscreen class from the container. 
                container.classList.remove("tetris_fullscreen");
            }
        });
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
            }
            document.getElementById("DEBUG_canvasLayer").style.height = `${this.DOM["option_size_range"].value}%`;

            this.DOM["option_size_value"].innerText  = `${this.DOM["option_size_range"].value}%`;
        }, false);
        this.DOM["option_size_range"].value     = `${_JSG.loadedConfig.meta.defaultGameCanvasHeightPercent}`;
        this.DOM["option_size_value"].innerText = `${_JSG.loadedConfig.meta.defaultGameCanvasHeightPercent}%`;
        this.DOM["option_size_range"].dispatchEvent(new Event("input"));
        // this.DOM["option_size_range"].dispatchEvent(new Event("change"));

        window.onerror = function(msg, url, line, col, error) {
            // Note that col & error are new to the HTML 5 spec and may not be 
            // supported in every browser.  It worked for me in Chrome.
            var extra = !col ? '' : '\ncolumn: ' + col;
            extra += !error ? '' : '\nerror: ' + error;
         
            // You can view the information in an alert to see things working like this:
            let outputObj = {
                msg   : msg,
                reason: undefined,
                url   : url,
                line  : line,
                col   : col,
                error : error,
                extra : extra,
            };
            try{ outputObj.reason = msg.reason; } catch(e){ outputObj.reason = ""; }

            console.error(
                `msg   :`, outputObj.msg    ,  "\n" + 
                `reason:`, outputObj.reason ,  "\n" + 
                `url   :`, outputObj.url    ,  "\n" + 
                `line  :`, outputObj.line   ,  "\n" + 
                `col   :`, outputObj.col    ,  "\n" + 
                `error :`, outputObj.error  ,  "\n" + 
                `extra :`, outputObj.extra  ,  "\n" + 
                ``
            );

            debugger;

            // If you return true, then error alerts (like in older versions of 
            // Internet Explorer) will be suppressed.
            var suppressErrorAlert = true;
            return suppressErrorAlert;
         };

         window.onunhandledrejection = function(){
            window.onerror.apply(this, arguments); // call
        }
    },
    DEBUG_canvas:undefined,
    DEBUG_canvas_L1:undefined,
    DEBUG_canvas_L2:undefined,
    DEBUG_lastX:undefined,
    DEBUG_lastY:undefined,
    setupDebugGridAndNums: function(){
        // Match the debug dimensions to the normal play canvases.
        let elem1 = document.getElementById("DEBUG_canvasLayer");
        let elem2 = document.querySelector(".videoModeA_canvasLayer");
        elem1.width  = elem2.width;
        elem1.height = elem2.height;
        this.DEBUG_canvas = { canvas:elem1, ctx:elem1.getContext("2d") }; 

        let canvas1 = document.createElement("canvas");
        canvas1.width  = elem1.width; canvas1.height = elem1.height;
        let ctx1 = canvas1.getContext("2d");
        this.DEBUG_canvas_L1 = { canvas:canvas1, ctx:ctx1 }; 

        let canvas2 = document.createElement("canvas");
        canvas2.width  = elem1.width; canvas2.height = elem1.height;
        let ctx2 = canvas2.getContext("2d");
        this.DEBUG_canvas_L2 = { canvas:canvas2, ctx:ctx2 }; 

        let drawNumbers = ()=>{
            // let canvas = document.getElementById("DEBUG_canvasLayer");
            let canvas = this.DEBUG_canvas_L1.canvas;
            let ctx    = this.DEBUG_canvas_L1.ctx;
            let tw     = _GFX.cache.tilesTX2.json.config.tileWidth;
            let th     = _GFX.cache.tilesTX2.json.config.tileHeight;
            let rows   = _JSG.loadedConfig.meta.dimensions.rows;
            let cols   = _JSG.loadedConfig.meta.dimensions.cols;

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
            // let bgTile   = _GFX.cache.tilesBG1 .tileset[_GFX.cache.tilesBG1 .tilemap.transChecked1[0].orgTilemap[2]].canvas; 
            let bgTile   = _GFX.cache.tilesBG1 .tileset[_GFX.cache.tilesBG1 .tilemap.blacktile[0].orgTilemap[2]].canvas; 
            let gridTile = _GFX.cache.tilesMISC.tileset[_GFX.cache.tilesMISC.tilemap.grid3[0].orgTilemap[2] ].canvas; // Grid.

            let currentNumber = 1;
            for(let x=1; x<cols-1; x+=1){
                // TOP and BOTTOM ROW - background
                ctx.globalAlpha = 0.50;
                ctx.drawImage( bgTile, x*tw, 0*th) ; 
                ctx.drawImage( bgTile, x*tw, (rows-1)*th) ; 
                ctx.globalAlpha = 1;

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
                ctx.drawImage( bgTile, (rows-1)*tw, y*th) ; 
                ctx.globalAlpha = 1;
                
                // LEFT COL - foreground
                ctx.drawImage( numberTiles[currentNumber], 0*tw, y*th) ; 

                // RIGHT COL - foreground
                ctx.drawImage( numberTiles[currentNumber], (cols-1)*tw, y*th) ; 

                currentNumber += 1; if(currentNumber > 39){ currentNumber = 0; }
            }

            // Grid.
            ctx.globalAlpha = 0.70;
            for (let x=0; x<=(canvas.width/tw)-1; x+=1) {
                for (let y=0; y<=(canvas.height/th)-1; y+=1) {
                    ctx.drawImage( gridTile, x*tw, y*th) ; 
                }
            }
            ctx.globalAlpha = 1.0;

            this.DEBUG_canvas.ctx.drawImage(this.DEBUG_canvas_L1.canvas, 0, 0);
        };
        drawNumbers();

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

        }, false);

        // Add the mousemove listener.
        document.getElementById("DEBUG_canvasLayer").addEventListener('mousemove', event => {
            let canvas = this.DEBUG_canvas.canvas;
            let ctx    = this.DEBUG_canvas.ctx;
            let tw     = _GFX.cache.tilesTX2.json.config.tileWidth;
            let th     = _GFX.cache.tilesTX2.json.config.tileHeight;
            
            // Scale the mouse coordinates to canvas coordinates.
            const mouseX  = event.offsetX - canvas.offsetLeft;
            const mouseY  = event.offsetY - canvas.offsetTop;
            const canvasX = Math.floor((mouseX * canvas.width / canvas.clientWidth)/tw);
            const canvasY = Math.floor((mouseY * canvas.height / canvas.clientHeight)/th);

            // Do not redraw if the box would be in the same position.
            if(this.DEBUG_lastX == canvasX && this.DEBUG_lastY == canvasY){ return; }

            // Save the previous canvas X and Y values. 
            this.DEBUG_lastX = canvasX;
            this.DEBUG_lastY = canvasY;

            // Clear L2.
            this.DEBUG_canvas_L2.ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a hover indicator on L2.
            this.DEBUG_canvas_L2.ctx.fillStyle="rgba(244, 67, 54, 0.5)";
            this.DEBUG_canvas_L2.ctx.strokeStyle="white";
            this.DEBUG_canvas_L2.ctx.lineWidth=1;

            // Draw to a square.
            this.DEBUG_canvas_L2.ctx.strokeRect( canvasX*tw, canvasY*th, tw, th );
            this.DEBUG_canvas_L2.ctx.fillRect  ( canvasX*tw, canvasY*th, tw, th );
            
            // Draw to rectangles.
            // this.DEBUG_canvas_L2.ctx.fillStyle="rgba(255, 0, 0, 0.20)";
            // this.DEBUG_canvas_L2.ctx.fillRect  ( 0*tw      , canvasY*th, canvasX*tw, th         );
            // this.DEBUG_canvas_L2.ctx.fillRect  ( canvasX*tw, 0*th      , tw        , canvasY*th );
            
            // Draw as cross-hair.
            this.DEBUG_canvas_L2.ctx.fillStyle="rgba(255, 0, 0, 0.20)";
            this.DEBUG_canvas_L2.ctx.fillRect  ( 0*tw      , canvasY*th, canvas.width, th            );
            this.DEBUG_canvas_L2.ctx.fillRect  ( canvasX*tw, 0*th      , tw          , canvas.height );

            // Clear the destination.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Layer 2.
            ctx.drawImage(this.DEBUG_canvas_L2.canvas, 0,0);
            
            // Draw Layer 1.
            ctx.drawImage(this.DEBUG_canvas_L1.canvas, 0,0);
        });

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

    // Add debug files.
    addDebugFiles: async function(){
        return new Promise(async (resolve, reject)=>{
            // Get the support files.
            let appPath = _JSG.apps[_JSG.loadedAppKey].appPath;
            await _JSG.addFile( { "f": appPath + "/debug/tetris_debug.js"           , "t":"js", "n":"tetris_debug"           } , ".");
            let proms = [
                new Promise( async (res,rej) => { await _JSG.addFile( { "f": appPath + "/debug/tetris_gameLoop_debug.js"  , "t":"js", "n":"tetris_gameLoop_debug"  } , "."); res(); } ),
                new Promise( async (res,rej) => { await _JSG.addFile( { "f": appPath + "/debug/tetris_gs_title0_debug.js" , "t":"js", "n":"tetris_gs_title0_debug" } , "."); res(); } ),
                new Promise( async (res,rej) => { await _JSG.addFile( { "f": appPath + "/debug/tetris_gs_title1_debug.js" , "t":"js", "n":"tetris_gs_title1_debug" } , "."); res(); } ),
                new Promise( async (res,rej) => { await _JSG.addFile( { "f": appPath + "/debug/tetris_gs_title2_debug.js" , "t":"js", "n":"tetris_gs_title2_debug" } , "."); res(); } ),
                new Promise( async (res,rej) => { await _JSG.addFile( { "f": appPath + "/debug/tetris_gs_play_debug.js"   , "t":"js", "n":"tetris_gs_play_debug"   } , "."); res(); } ),
            ];
            await Promise.all(proms);
            resolve();
        });
    },

    // JSGAME: app pre-init.
    init: async function(){
        return new Promise(async (resolve, reject)=>{
            // appConfig overrides.
            if(_JSG.params.debug){
                if     (_JSG.params.debug=="0"){ _JSG.loadedConfig.meta.debug = false; }
                else if(_JSG.params.debug=="1"){ _JSG.loadedConfig.meta.debug = true;  }
            }

            // Load in the DOM from meta.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init.`, "loading");
            _APP.DOM = _JSG.loadedConfig.meta.DOM;
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, false);
            _APP.DOM["gameDiv"].innerHTML = this.files["tetris_html"]; 
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, true);

            // Gameloop init.
            await _APP.game.gameLoop.init(this);

            // Graphics init.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init: Graphics.`, "loading");
            await _GFX.init();

            // Create Canvas And Event Listeners.
            this.init_createCanvasAndEventListeners();

            // Input init.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init: Input.`, "loading");
            await _INPUT.init( [_APP.DOM["app_game"], _APP.DOM["gameContDiv"] ] );

            // Add the _GFX-generated canvas layers.
            for(let i=0, l= _GFX.canvasLayers.length; i<l; i+=1){ this.DOM["app_game"].append(_GFX.canvasLayers[i].canvas); }

            for(let i=0, l= _GFX.canvasLayers.length; i<l; i+=1){ 
                _GFX.canvasLayers[i].canvas.addEventListener("dblclick" , ()=>_APP.toggleFullscreen(), false );
            }

            // DEBUG? Unhide the div, init and switch to the debug tab if debug is active.
            if(_JSG.loadedConfig.meta.debug == true){
                // Move the game's debugDiv to the JSGAME lobby debug div. (debug tab.)
                this.DOM["lobby_nav_view_debug"].append(this.DOM["app_debugDiv"]);
                this.DOM["lobby_nav_view_debug"].style.height = "750px";
                
                // Unhide the app_debugDiv.
                this.DOM["app_debugDiv"].classList.remove("hide");

                // Increase the width of the lobby div. 
                this.DOM["lobbyDiv"].style.width = "800px";
                
                // Show the lobby even if specified to be hidden (it displays the debug data.)
                if(_JSG.loadedConfig.meta.hideLobby){
                    _JSG.loadedConfig.meta.hideLobby = false;
                }

                // Add the debug files. 
                await this.addDebugFiles();

                // Run the debug init.
                await _APP.debug.init(this);

                this.setupDebugGridAndNums();
                // document.getElementById("tetris_app_toggleNumbers").click();

                if(_JSG.loadedConfig.meta.autoSwitchToLobbyDebugTab){ _JSG.lobby.nav.showOneView("debug"); }
            }
            else{
                document.getElementById("tetris_app_toggleNumbers").style.display = "none";

                // Otherwise, switch to some other default lobby tab if so specified.
                if(_JSG.loadedConfig.meta.defaultLobbyTab){
                    _JSG.lobby.nav.showOneView(_JSG.loadedConfig.meta.defaultLobbyTab);
                }
            }

            //
            _APP.game.shared.borderTiles1 = {
                top  : _GFX.cache["tilesBG1"].tilemap.boardborder_top  [0].orgTilemap[2],
                topL : _GFX.cache["tilesBG1"].tilemap.boardborder_topL [0].orgTilemap[2],
                topR : _GFX.cache["tilesBG1"].tilemap.boardborder_topR [0].orgTilemap[2],
                bot  : _GFX.cache["tilesBG1"].tilemap.boardborder_bot  [0].orgTilemap[2],
                botL : _GFX.cache["tilesBG1"].tilemap.boardborder_botL [0].orgTilemap[2],
                botR : _GFX.cache["tilesBG1"].tilemap.boardborder_botR [0].orgTilemap[2],
                left : _GFX.cache["tilesBG1"].tilemap.boardborder_left [0].orgTilemap[2],
                right: _GFX.cache["tilesBG1"].tilemap.boardborder_right[0].orgTilemap[2],
            };
            
            resolve();
        });
    },

    // JSGAME: app post-init.
    start: async function(){
        // Request that fade tiles be created.
        await _WEBW.videoModeA.video.initFadeSend(true);

        // Display the fade tiles in the TESTS tab. 
        if(_GFX.config.debug.generateAndReturnFadedTiles == true){
            // BUG: This appears to permanently mess up the framerate once drawn.
            await new Promise( 
                async (res,rej)=>{ 
                    await _APP.debug.tests.displayFadedTileset(); 
                    res(); 
                } 
            );
        }

        // Get initial input states.
        await _INPUT.util.getStatesForPlayers();
        
        // Start the gameLoop after a short delay.
        _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: GAMELOOP START.`, "loading");
        await new Promise((res,rej)=>{ setTimeout(()=>{res();}, 250); });
        window.requestAnimationFrame(()=>{
            console.log("GAMELOOP START");
            console.log("");
            _APP.game.gameLoop.loop_start();
        });
    },
};