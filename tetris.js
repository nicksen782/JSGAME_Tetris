_APP = {
    init_createHiDPI_Canvas: function(w,h, srcCanvas=null){
        // Based on: MyNameIsKoL: https://stackoverflow.com/a/15666143
        let PIXEL_RATIO = (function () {
            let ctx = document.createElement("canvas").getContext("2d", { alpha: false });
            // let ctx = document.createElement("canvas").getContext("2d", { alpha: true });
            let dpr = window.devicePixelRatio || 1,
                bsr = ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio      ||
                    ctx.msBackingStorePixelRatio       ||
                    ctx.oBackingStorePixelRatio        ||
                    ctx.backingStorePixelRatio         || 
                    1;
            return dpr / bsr;
        })();

        ratio = PIXEL_RATIO;
        let canvas;
        let ctx;

        // Use the srcCanvas if provided (must not have used getContext!)
        if(srcCanvas){ canvas = srcCanvas; }
        // Create a new canvas.
        else{ canvas = document.createElement("canvas"); }
        
        canvas.width        = w * ratio;
        canvas.height       = h * ratio;
        canvas.style.width  = w + "px";
        canvas.style.height = h + "px";
        ctx = canvas.getContext("2d", { 
            alpha: false,
            // alpha: true,
            // desynchronized: true,
            // preserveDrawingBuffer: true,
        });
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        return { canvas:canvas, ctx:ctx };
    },

    // Create Canvas And Event Listeners.
    init_createCanvasAndEventListeners: function(){
        // Create/save the canvas and drawing context. 
        let obj;
        // console.log("Creating game canvas.");
    
        // Get the dimensions.
        let dimensions = _JSG.loadedConfig.meta.dimensions;
    
        // Use the HiDPI canvas?
        if(_JSG.loadedConfig.meta.createHiDPI_Canvas){
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: init_createCanvasAndEventListeners: HiDPI canvas`, "loading");
            obj = this.init_createHiDPI_Canvas(dimensions.tileWidth * dimensions.cols, dimensions.tileHeight * dimensions.rows, null);
            this.canvas   = obj.canvas;
            this.ctx      = obj.ctx;
        }
        // Use the normal canvas (natural dimensions).
        else{
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: init_createCanvasAndEventListeners: Normal canvas.`, "loading");
            this.canvas = this.DOM["app_game_canvas"];
            this.canvas.width  = dimensions.tileWidth * dimensions.cols;
            this.canvas.height = dimensions.tileHeight * dimensions.rows;
            // this.canvas.style.width  = (dimensions.tileWidth * dimensions.cols) + "px";
            // this.canvas.style.height = (dimensions.tileHeight * dimensions.rows) + "px";
            this.ctx = this.canvas.getContext("2d", { alpha: true });
            // this.ctx = this.canvas.getContext("2d", { alpha: false });
        }
        this.DOM["gameContDiv"].setAttribute('tabindex','0');
    
        // Set pixelated canvas.
        _GFX.gfxConversion.setPixelated(this.ctx);
    
        // console.log("Creating game canvas event listeners.", this.canvas);
    
        _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: init_createCanvasAndEventListeners: Add event listeners.`, "loading");
        // Add the keydown input handler.
        this.DOM["gameContDiv"].addEventListener("keydown", (ev)=>{game.getInput(ev);}, false);
        
        // Add focus/blur event to the canvas.
        this.DOM["gameContDiv"].addEventListener("focus", (ev)=>{ this.DOM["gameContDiv"].classList.add("focused"); }, false);
        this.DOM["gameContDiv"].addEventListener("blur" , (ev)=>{ this.DOM["gameContDiv"].classList.remove("focused"); }, false);

        // let ctx = this.DOM["snake_dpad"].getContext("2d");
        // this.dpad1_ctx=ctx;
        // ctx.canvas.width  = this.tileCache["dpad1_full"].width;
        // ctx.canvas.height = this.tileCache["dpad1_full"].height;
        // ctx.drawImage(this.tileCache["dpad1_full"], 0, 0);
    },

    init: async function(){
        return new Promise(async (resolve, reject)=>{
            // Load in the DOM from meta.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init.`, "loading");
            _APP.DOM = _JSG.loadedConfig.meta.DOM;
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, false);
            _APP.DOM["gameDiv"].innerHTML = this.files["tetris_html"]; 
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, true);

            // Create Canvas And Event Listeners.
            this.init_createCanvasAndEventListeners();

            // Show the debug div if debug is on.
            if(_JSG.loadedConfig.meta.debug == true){
                // Move the game's debugDiv to the JSGAME lobby debug div. (debug tab.)
                this.DOM["lobby_nav_view_debug"].append(this.DOM["app_debugDiv"]);
                
                // Unhide the app_debugDiv.
                this.DOM["app_debugDiv"].classList.remove("hide");
            }

            // Graphics init.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init: Graphics.`, "loading");
            await _GFX.init();
            await _APP.gameLoop.init(this);
            
            // DEBUG? Init and switch to the debug tab if debug is active.
            let defaultLobbyTab           = _JSG.loadedConfig.meta.defaultLobbyTab;
            if(_JSG.loadedConfig.meta.debug){
                await _APP.debug.init(this);
                if(_JSG.loadedConfig.meta.autoSwitchToLobbyDebugTab){ _JSG.lobby.nav.showOneView("debug"); }
                resolve();
            }
            // Otherwise, switch to some other default lobby tab if so specified.
            else if(defaultLobbyTab){
                _JSG.lobby.nav.showOneView(defaultLobbyTab);
                resolve();
            }
            else{ resolve(); }
        });
    },
};