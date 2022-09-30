// Activated if the debug mode is on.
_APP.debug = {
    parent:null,
    DOM:{},

    TinySimpleHash:s=>{for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9},

    // TinySimpleHash: function(s){
    //     // _APP.debug.TinySimpleHash("string");
    //     // https://stackoverflow.com/a/52171480/2731377
    //     for(var i=0, h=9; i<s.length;) {
    //         h = Math.imul(h^s.charCodeAt(i++), 9**9); 
    //     }
    //     return h^h>>>9; 
    // },

    // Tile draw test.
    debug1:{
        parent:null,

        // Tileset draw test.
        drawTiles: function(tilesetName, dest1){
            let div1a = document.createElement("div"); 
            let div1b = document.createElement("div"); div1b.innerText = `${tilesetName}: TILES`; div1b.style = "background-color:white;"
            let div1c = document.createElement("div");
            div1a.append(div1b, div1c);
            _GFX.cache[tilesetName].tileset.forEach((d)=>{
                let div = document.createElement("div"); 
                div.style["display"] = "inline-block";
                div.style["vertical-align"] = "top";
                div.style["border"]  = "1px solid white";
                div.style["margin"]  = "2px";
                div.style["padding"] = "5px";
                div.append(d.canvas);
                div1c.append(div);
            });
            dest1.append( div1a, document.createElement("br") );
        },

        // Tilemap draw test.
        drawTilemaps: function(tilesetName, dest2){
            let div2a = document.createElement("div"); 
            let div2b = document.createElement("div"); div2b.innerText = `${tilesetName}: MAPS`; div2b.style = "background-color:white;"
            let div2c = document.createElement("div");
            div2a.append(div2b, div2c);

            for(let key in _GFX.cache[tilesetName].tilemap){
                for(let rec of _GFX.cache[tilesetName].tilemap[key]){
                    let div = document.createElement("div"); 
                    div.style["display"]  = "inline-block";
                    div.style["vertical-align"]  = "top";
                    div.style["border"]  = "1px solid white";
                    div.style["margin"]  = "2px";
                    div.style["padding"]  = "5px";
                    div.append(rec.canvas);
                    div2c.append(div);
                }
            };
    
            dest2.append( div2a, document.createElement("br") );
        },

        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;
    
                for(let key in _GFX.cache){
                    this.drawTiles(key, this.parent.DOM["debug1Div"]);
                }

                for(let key in _GFX.cache){
                    this.drawTilemaps(key, this.parent.DOM["debug1Div"]);
                }
    
                resolve();
            });
        },
    },

    gs_title0: {
        parent: null,
        gs: null,
        DOM: {},

        getVarsObj_anim:function(key){
            // Get the data for the table display. 
            let anim = this.gs.animations[key];
            let div  ;
            let table;
            let obj = { "NAME": key };
            
            if(key == "anim_lense"){
                div   = this.DOM.tetris_app_debug_anim_lense;
                table = this.DOM.tetris_app_debug_anim_lense.querySelector("table");
            }
            else if(key == "anim_stars"){
                div   = this.DOM.tetris_app_debug_anim_stars;
                table = this.DOM.tetris_app_debug_anim_stars.querySelector("table");
            }
            else{
                console.log("getVarsObj_anim: INVALID KEY:", key);
                throw "";
            }

            obj.finished        = anim.finished;
            obj.repeats         = `${anim.repeatCounter} / ${anim.maxRepeats}`;
            obj.waitFrames      = `${anim.waitFrames} / ${anim.maxWaitFrames}`;
            obj.dir             = anim.frameDirection;
            obj.eraseBefore     = anim.eraseBeforeDraw;
            obj.currentFrame    = anim.currentFrameIndex;
            
            if(anim.currentFrameIndex >= 0 && anim.currentFrameIndex < anim.frames.length ){
                obj._f_tilemap = anim.frames[anim.currentFrameIndex].tilemap;
                obj._f_x       = anim.frames[anim.currentFrameIndex].x;
                obj._f_y       = anim.frames[anim.currentFrameIndex].y;
            }
            else{
                obj._f_tilemap = "**CYCLE_END**";
                obj._f_x       = "**CYCLE_END**";
                obj._f_y       = "**CYCLE_END**";
            }
            return {
                obj  : obj,
                div  : div,
                table: table,
            };

        },
        getVarsObj_vars: function(){
            let div   = this.DOM.tetris_app_debug_vars;
            let table = this.DOM.tetris_app_debug_vars.querySelector("table");
            let obj = {
                "NAME": "gs_title0 vars",
                "endDelay.start" : this.gs.endDelay.started,
                "endDelay.finish": this.gs.endDelay.finished,
                "endDelay:w f"   : `${this.gs.endDelay.frameCount}/${this.gs.endDelay.maxFrames} (ms:${this.gs.endDelay.maxFrames * _APP.game.gameLoop["msFrame"]})`,
                "inited": this.gs.inited,
            };
            return {
                obj   : obj,
                div   : div,
                table : table,
            };
        },

        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;

                // Save shorthand to the game state object. 
                this.gs = _APP.game.gamestates["gs_title0"];
    
                // Load in the DOM from meta.
                this.DOM = _JSG.loadedConfig.meta.debugDOM.gs_title0.DOM;
                await _JSG.shared.parseObjectStringDOM(this.DOM, false);
    
                // Event listeners.
                
                resolve();
            });
        },
    },

    // Debug tab navigation.
    nav:{
        parent:null,
        DOM:{
            tabs: {},
            views: {},
        },
        defaultTabKey: null,

        hideAllViews: function(){
            // Deactivate all tabs and views. 
            for(let key in this.DOM.tabs) { this.DOM.tabs[key] .classList.remove("active"); }
            for(let key in this.DOM.views){ this.DOM.views[key].classList.remove("active"); }
        },
        showOneView: function(tabKey){
            // Deactivate all tabs and views. 
            this.hideAllViews();
            
            // Get the tab and the view.
            let tabElem  = this.DOM.tabs [ tabKey ];
            let viewElem = this.DOM.views[ tabKey ];
            // console.log("showOneView:", tabElem, viewElem);
    
            // Set the active class for this tab and view. 
            tabElem .classList.add("active");
            viewElem.classList.add("active");
        },
        init: function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;

                // Load in the DOM from meta.
                this.defaultTabKey = _JSG.loadedConfig.meta.debugDOM.nav.defaultTabKey;
                this.DOM.tabs      = _JSG.loadedConfig.meta.debugDOM.nav.DOM.tabs;
                this.DOM.views     = _JSG.loadedConfig.meta.debugDOM.nav.DOM.views;
                await _JSG.shared.parseObjectStringDOM(this.DOM.tabs, false);
                await _JSG.shared.parseObjectStringDOM(this.DOM.views, false);

                // Deactivate all tabs and views. 
                this.hideAllViews();
            
                // Add event listeners to the tabs.
                for(let key in this.DOM.tabs){
                    this.DOM.tabs[key].addEventListener("click", () => this.showOneView(key), false); 
                }
        
                // Show the default view.
                this.showOneView(this.defaultTabKey);

                resolve();
            });
        }
    },

    debugDisplays: {
        runDebugDisplay: function(){
            let gamestate1 = _APP.game.gameLoop["gamestate1"];
            let gamestate2 = _APP.game.gameLoop["gamestate2"];
            let data;
            
            // Toggle the debug indicator.
            _APP.debug.DOM["runIndicator_debug"].classList.toggle("active");

            // Always show the gameLoop debug.
            data = _APP.debug.debug_gameloop_div.getVarsObj_gameLoop_div1();
            this.generateDebugTable1(data);
            data = _APP.debug.debug_gameloop_div.getVarsObj_gameLoop_div2();
            this.generateDebugTable1(data);
            
            if(gamestate1 == "gs_title0"){
                // Anim_lense debug.
                data =_APP.debug.gs_title0.getVarsObj_anim("anim_lense");
                this.generateDebugTable1(data);
                
                // Anim_stars debug.
                data =_APP.debug.gs_title0.getVarsObj_anim("anim_stars");
                this.generateDebugTable1(data);

                // Anim_stars debug.
                data =_APP.debug.gs_title0.getVarsObj_vars();
                this.generateDebugTable1(data);
            }
        },

        generateDebugTable1: function(data){
            let obj   = data.obj;
            let div   = data.div;
            let table = data.table;

            if(table){
                // Update the rows and columns for the table. 
                let rec, recHash, td, valueHash, value;
                for(let key1 in obj){
                    // New data.
                    rec       = obj[key1].toString().trim();
                    recHash   = _APP.debug.TinySimpleHash(rec);

                    // Previous data.
                    td        = table.querySelector(`td[key="${key1}"]`);
                    valueHash = td.getAttribute("valuehash");
                    value     = td.getAttribute("value");

                    //.Are the hashes different?
                    if(valueHash != recHash){
                        td.innerText = rec.toString().trim().padEnd(17, " ");
                        td.setAttribute("valuehash", recHash)
                        td.setAttribute("value", rec)
                        td.classList.add("updated");
                    }
                    else{
                        td.classList.remove("updated");
                    }
                }
            }
            else{
                // Create the base table structure. 
                table = document.createElement("table");
                let thead = document.createElement("thead");
                let tbody = document.createElement("tbody");
                table.append(thead,tbody);
        
                // Create the rows and columns for the table. 
                let rec, tr, td;
                for(let key1 in obj){
                    rec = obj[key1];
                    tr = tbody.insertRow(-1);
                    
                    td = tr.insertCell(-1);
                    td.innerText = key1.toString().padEnd(17, " ");
                    
                    td = tr.insertCell(-1);
                    td.innerText = rec.toString().trim().padEnd(17, " ");
                    td.setAttribute("key", key1);
                    td.setAttribute("value", rec.toString().trim());
                    td.setAttribute("valueHash", _APP.debug.TinySimpleHash(rec.toString().trim()))
                }
        
                // Clear the destination. 
                div.innerHTML = "";
            
                // Add the table to the destination.
                div.append(table);
            }
        },
    },

    // Runs during the gameLoop on a frame count timer.
    debug_gameloop_div: {
        parent: null,
        
        getVarsObj_gameLoop_div1: function(){
            let div   = this.parent.DOM.gameLoopVars_div1;
            let table = this.parent.DOM.gameLoopVars_div1.querySelector("table");
            return {
                obj : {
                    // "NAME": "gameLoop vars 1",
                    "gameLoop running" : _APP.game.gameLoop["running"] ,
                    "gamestate1"       : `'${_APP.game.gameLoop["gamestate1"]}'` ,
                    "gamestate2"       : `'${_APP.game.gameLoop["gamestate2"]}'` ,
                    "netGame"     : `${_APP.game.gameLoop["netGame"]}` ,
                },
                div  : div,
                table: table,
            };
        },
        getVarsObj_gameLoop_div2: function(){
            let div   = this.parent.DOM.gameLoopVars_div2;
            let table = this.parent.DOM.gameLoopVars_div2.querySelector("table");
            return {
                obj : {
                    // "NAME": "gameLoop vars 2",
                    "Calc FPS"    : `${_APP.game.gameLoop.fpsCalc["average"].toFixed(1)}f (${_APP.game.gameLoop["msFrame"].toFixed(1)}ms/f)` ,
                    "debugTiming" : `${_APP.game.gameLoop["debugDelay"].toFixed(1)}f, (${(_APP.game.gameLoop["debugDelay"] * _APP.game.gameLoop["msFrame"]).toFixed(1)}ms)` ,
                    ""            : "" ,
                    "frameCounter"     : _APP.game.gameLoop["frameCounter"] ,
                },
                div  : div,
                table: table,
            };
        },

        startGameLoop:function(){
            // Cancel the current animation frame. 
            window.cancelAnimationFrame(_APP.game.gameLoop.raf_id); 

            // Trigger gamestate change but keep the same gamestates.
            _APP.game.gameLoop.changeGamestate1( _APP.game.gameLoop.gamestate1 );
            _APP.game.gameLoop.changeGamestate2( _APP.game.gameLoop.gamestate2 );
            
            // Set the gameLoop.running to true. 
            _APP.game.gameLoop.running = true; 

            // Start the gameLoop.
            _APP.game.gameLoop.loop();
        },
        stopGameLoop:function(){
            // Cancel the current animation frame. 
            window.cancelAnimationFrame(_APP.game.gameLoop.raf_id); 

            // Set the gameLoop.running to false. 
            _APP.game.gameLoop.running = false;

            // DEBUG.
            if(_JSG.loadedConfig.meta.debug){
                // Display the debug data one more time. 
                _APP.debug.debugDisplays.runDebugDisplay();

                // Update gameLoop.lastDebug.
                _APP.game.gameLoop.lastDebug = performance.now();
            }
        },
        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;

                // Save shorthand to the game state object. 
                // this.gs = _APP.game["gs_title0"];
    
                // Load in the DOM from meta.
                // this.DOM = _JSG.loadedConfig.meta.debugDOM.gs_title0.DOM;
                // await _JSG.shared.parseObjectStringDOM(this.DOM, false);
    
                // Event listeners.
                this.parent.DOM["startBtn"].addEventListener("click", () => this.startGameLoop(), false); 
                this.parent.DOM["stopBtn"] .addEventListener("click", () => this.stopGameLoop(), false); 
                
                resolve();
            });
        },
        
    },
    init: async function(parent){
        return new Promise(async (resolve,reject)=>{
            // Set parent(s)
            this.parent = parent;

            // Load in the DOM from meta.
            this.DOM = _JSG.loadedConfig.meta.debugDOM.main.DOM;
            await _JSG.shared.parseObjectStringDOM(this.DOM, false);

            // Init(s).
            await this.nav.init(this);
            await this.debug_gameloop_div.init(this);
            await this.debug1.init(this);
            await this.gs_title0.init(this);
            
            resolve();
        });
    },

};