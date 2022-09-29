// Activated if the debug mode is on.
_APP.debug = {
    parent:null,
    DOM:{},

    // Tile draw test.
    debug1:{
        parent:null,
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
            // dest1.append( document.createElement("br") );
        },
        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;
    
                for(let key in _GFX.cache){
                    this.drawTiles(key, this.parent.DOM["debug1Div"]);
                }
    
                resolve();
            });
        },
    },

    // Tilemap draw test.
    debug2:{
        parent:null,
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
            // dest2.append( document.createElement("br") );
        },

        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;
    
                for(let key in _GFX.cache){
                    this.drawTilemaps(key, this.parent.DOM["debug2Div"]);
                }
    
                resolve();
            });
        },
    },

    // Interactive tile/tilemap draw tests.
    debug3:{
        parent:null,
        DOM: {},

        clearLayer: async function(layers){
            console.log("clearLayer:", layers);

            // Clear the canvas.
            _APP.ctx.clearRect(0,0, _APP.canvas.width, _APP.canvas.height);

            return; 

            // TODO
            // Loop through the specified layer clears.
            for(let i=0; i<layers.length; i+=1){
                // Does the layer exist?

                // Clear the layer (VRAM). ("cleartile")

                // Clear the canvas.
                // _APP.ctx.clearRect(0,0, _APP.canvas.width, _APP.canvas.height);

                // Redraw the layer (CANVAS).
            }
        },
        populateTileSelect: function(){
            // console.log("populateTileSelect:");

            let select = this.DOM["debug_drawTileSelect"];
            let option;
            let frag = document.createDocumentFragment();
            for(let tilesetName in _GFX.cache){
                let tileset_tiles = _GFX.cache[tilesetName].tileset;
                // console.log("  TILESET:", tilesetName);
                for(let tileId in tileset_tiles){
                    // console.log("    TILEMAP:", tileId, tileset_tiles[tileId]);
                    option = document.createElement("option");
                    option.setAttribute("tilesetName", tilesetName);
                    option.setAttribute("tileId", tileId);
                    option.value = `TS: ${tilesetName}, "ID:" ${tileId}`;
                    option.innerText = `TS: ${tilesetName}, "ID:" ${tileId}`;
                    frag.append(option);
                }
            }
            select.append(frag);
        },
        populateTilemapSelect: function(){
            // console.log("populateTilemapSelect:");

            let select = this.DOM["debug_drawTileMapSelect"];
            let option;
            let frag = document.createDocumentFragment();
            for(let tilesetName in _GFX.cache){
                let tileset_maps = _GFX.cache[tilesetName].tilemap;
                // console.log("  TILEMAPS:", tilesetName);
                for(let tilemapName in tileset_maps){
                    // console.log("    TILEMAP:", tilemapName, tileset_maps[tilemapName]);
                    option = document.createElement("option");
                    option.setAttribute("tilesetName", tilesetName);
                    option.setAttribute("tilemapName", tilemapName);
                    option.value = `TS: ${tilesetName}, "NAME:" ${tilemapName}`;
                    option.innerText = `TS: ${tilesetName}, "NAME:" ${tilemapName}`;
                    frag.append(option);
                }
            }
            select.append(frag);
        },
        drawFromTileSelect: function(){
            // Get the select.
            let select = this.DOM["debug_drawTileSelect"];
            
            // Confirm that a value is selected.
            if(!select.value){ return; }

            // Get the values.
            let option = select.options[select.selectedIndex];
            let tilesetName = option.getAttribute("tilesetname");
            let tileId = option.getAttribute("tileId");

            // Get the tile canvas.
            let tileCanvas = _GFX.cache[tilesetName].tileset[tileId].canvas;
            
            // Draw the canvas to the main canvas. 
            _APP.ctx.drawImage(tileCanvas, 0, 0);

            // DEBUG
            // console.log("drawFromTileSelect:", tilesetName, tileId, tileCanvas);
        },
        drawFromTilemapSelect: function(method=2, rotationIndex=0){
            // Get the select.
            let select = this.DOM["debug_drawTileMapSelect"];
            
            // Confirm that a value is selected.
            if(!select.value){ return; }

            // Get the values.
            let option      = select.options[select.selectedIndex];
            let tilesetName = option.getAttribute("tilesetname");
            let tilemapName = option.getAttribute("tilemapName");
            let tilemapObj  = _GFX.cache[tilesetName].tilemap[tilemapName];
            
            // Stop if the tilemapObj is not found. 
            if(!tilemapObj){ console.log("ERROR: Tilemap object not found?", tilesetName, tilemapName); return ; }

            // Draw from already created tilemap. 
            if(method == 1){
                // Get the tilemap canvas.
                let canvas = tilemapObj[rotationIndex].canvas;

                // Stop if the tilemap is not found. 
                if(!canvas){ console.log("ERROR: Tilemap canvas not found?", tilesetName, tilemapName); return ; }

                // Draw the canvas to the main canvas. 
                _APP.ctx.drawImage(canvas, 0, 0);

                // DEBUG
                // console.log("drawFromTilemapSelect:", tilesetName, tilemapName, canvas, `method: ${method}`);
            }

            // Draw tilemap via the individual tiles of the tilemap.
            else if(method == 2){
                // Get the tilemap. 
                let tilemap = tilemapObj[rotationIndex].orgTilemap;

                // Stop if the tilemap is not found. 
                if(!tilemap){ console.log("ERROR: Tilemap not found?", tilesetName, tilemapName); return ; }

                // The width of the tilemap is first.
                let w = tilemap[0];

                // The height of the tilemap is second.
                let h = tilemap[1];

                // Strip off the width and height from the tilemap.
                tilemap = tilemap.slice(2);

                // Create a tilemap image canvas out of tiles for each tilemap.
                let index = 0;
                for(let y=0; y<h; y+=1){
                    for(let x=0; x<w; x+=1){
                        let tileId =  tilemap[index];
                        let canvas = _GFX.cache[tilesetName].tileset[ tileId ].canvas;
                        let dx = x * _GFX.cache[tilesetName].config.tileWidth ;
                        let dy = y * _GFX.cache[tilesetName].config.tileHeight;
                        _APP.ctx.drawImage( canvas, dx, dy );
                        index += 1 ;
                    }
                }

                // console.log("drawFromTilemapSelect:", tilesetName, tilemapName, [w, h, ...tilemap], `method: ${method}`);
            }
        },

        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;
    
                // Load in the DOM from meta.
                this.DOM = _JSG.loadedConfig.meta.debugDOM.debug3.DOM;
                await _JSG.shared.parseObjectStringDOM(this.DOM, false);
    
                // Event listeners.
                this.DOM["debug_clearAllLayers"]   .addEventListener("click", () => this.clearLayer([0]), false); 
                this.DOM["debug_clearLayer1"]      .addEventListener("click", () => this.clearLayer([0,1]), false); 
                this.DOM["debug_clearLayer2"]      .addEventListener("click", () => this.clearLayer([0,1,2]), false); 
                this.DOM["debug_clearLayer3"]      .addEventListener("click", () => this.clearLayer([0,1,2,3]), false); 
                
                // Populate the selects.
                this.populateTileSelect();
                this.populateTilemapSelect();
                
                this.DOM["debug_drawTileButton"]   .addEventListener("click", () => this.drawFromTileSelect(), false); 
                this.DOM["debug_drawTileMapButton1"].addEventListener("click", () => this.drawFromTilemapSelect(2, 0), false); 
                resolve();
            });
        },
    },
    
    gs_title0: {
        parent: null,
        gs: null,
        DOM: {},

        runDebugDisplay: function(){
            this.debug_animation("anim_lense");
            this.debug_animation("anim_stars");
            this.debug_vars();
            this.DOM["tetris_app_debug_runIndicator"].classList.toggle("active");
        },

        debug_animation:function(key){ 
            // Get the data for the table display. 
            let anim = this.gs.animations[key];

            try{
                let obj = {
                    [key] : {
                        NAME: key,
                    },
                };
                obj[key].finished          = anim.finished;
                obj[key].repeatCounter     = `${anim.repeatCounter} / ${anim.maxRepeats}`;
                obj[key].waitFrames        = `${anim.waitFrames} / ${anim.maxWaitFrames}`;

                obj[key].frameDirection    = anim.frameDirection;
                obj[key].eraseBeforeDraw   = anim.eraseBeforeDraw;
                obj[key].currentFrameIndex = anim.currentFrameIndex;
                
                if(anim.currentFrameIndex >= 0 && anim.currentFrameIndex < anim.frames.length ){
                    obj[key]._currentFrame_tilemap = anim.frames[anim.currentFrameIndex].tilemap;
                    obj[key]._currentFrame_x       = anim.frames[anim.currentFrameIndex].x;
                    obj[key]._currentFrame_y       = anim.frames[anim.currentFrameIndex].y;
                }
                else{
                    obj[key]._currentFrame_tilemap = "**CYCLE_END**";
                    obj[key]._currentFrame_x       = "**CYCLE_END**";
                    obj[key]._currentFrame_y       = "**CYCLE_END**";
                }
                
                // Create the base table structure. 
                let table = document.createElement("table");
                let thead = document.createElement("thead");
                let tbody = document.createElement("tbody");
                table.append(thead,tbody);

                // Create the rows and columns for the table. 
                let rec, tr, td;
                for(let key1 in obj[key]){
                    rec = obj[key][key1];
                    tr = tbody.insertRow(-1);

                    td = tr.insertCell(-1);
                    td.innerText = key1;
                    
                    td = tr.insertCell(-1);
                    td.innerText = rec;
                }

                if(key == "anim_lense"){
                    // Clear the destination. 
                    this.DOM.tetris_app_debug_anim_lense.innerHTML = "";
        
                    // Add the table to the destination.
                    this.DOM.tetris_app_debug_anim_lense.append(table);
                }
                else if(key == "anim_stars"){
                    // Clear the destination. 
                    this.DOM.tetris_app_debug_anim_stars.innerHTML = "";
        
                    // Add the table to the destination.
                    this.DOM.tetris_app_debug_anim_stars.append(table);
                }
            }
            catch(e){
                console.log("ERROR: debug_animation:", key, e, anim);
                return; 
            }
        },
        debug_vars: function(){
            // let anim = this.gs.animations[key];
            let obj = {
                "NAME": "gs_title0 vars",
                "endDelay.started": this.gs.endDelay.started,
                "endDelay.finished": this.gs.endDelay.finished,
                "endDelay:waitFrames": `${this.gs.endDelay.frameCount} / ${this.gs.endDelay.maxFrames}`,
                "inited": this.gs.inited,
            };

            // Create the base table structure. 
            let table = document.createElement("table");
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
            table.append(thead,tbody);

            // Create the rows and columns for the table. 
            let rec, tr, td;
            for(let key1 in obj){
                rec = obj[key1];
                tr = tbody.insertRow(-1);

                td = tr.insertCell(-1);
                td.innerText = key1;
                
                td = tr.insertCell(-1);
                td.innerText = rec;
            }

            // Clear the destination. 
            this.DOM.tetris_app_debug_vars.innerHTML = "";
        
            // Add the table to the destination.
            this.DOM.tetris_app_debug_vars.append(table);

        },
        run_gamestate: function(){
            let ts1 = performance.now();
            let anim_lense = this.gs.animations.anim_lense;
            let anim_stars = this.gs.animations.anim_stars;
            let id1 = setInterval(()=>{ 
                document.getElementById("tetris_app_debug_runGsTitle0_main").click(); 
                _GFX.VRAM.draw();
                // if( (anim_lense.finished && anim_stars.finished) || performance.now() - ts1 > 30000){ 
                if( this.gs.endDelay.finished || performance.now() - ts1 > 30000){ 
                    console.log(`Clearing interval. Interval lasted for: ${(performance.now() - ts1).toFixed(2)} ms`);
                    clearInterval(id1); 
                }
            }, 25);
        },
        uninit_gsTitle0: function(){
            this.gs.inited = false; 
        },

        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;

                // Save shorthand to the game state object. 
                this.gs = _APP.game["gs_title0"];
    
                // Load in the DOM from meta.
                this.DOM = _JSG.loadedConfig.meta.debugDOM.gs_title0.DOM;
                await _JSG.shared.parseObjectStringDOM(this.DOM, false);
    
                // Event listeners.
                this.DOM["tetris_app_debug_runGsTitle0_main"].addEventListener("click", () => this.gs.main(), false); 
                this.DOM["tetris_app_debug_run_anim_lense"]  .addEventListener("click", () => this.run_gamestate(), false); 
                this.DOM["tetris_app_debug_uninit_gsTitle0"] .addEventListener("click", () => this.uninit_gsTitle0(), false); 
                
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

    init: async function(parent){
        return new Promise(async (resolve,reject)=>{
            // Set parent(s)
            this.parent = parent;

            // Load in the DOM from meta.
            this.DOM = _JSG.loadedConfig.meta.debugDOM.main.DOM;
            await _JSG.shared.parseObjectStringDOM(this.DOM, false);

            // Init(s).
            await this.nav.init(this);
            await this.debug1.init(this);
            await this.debug2.init(this);
            await this.debug3.init(this);
            await this.gs_title0.init(this);
            
            resolve();
        });
    },

};