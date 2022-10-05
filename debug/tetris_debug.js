// Activated if the debug mode is on.

// Additional keys/objects can be added via other files in the debug folder. 

_APP.debug = {
    parent:null,
    DOM:{},

    // DEBUG - This is the function that the gameLoop can run.
    doDebug: function(force){
        if( force || ( (_APP.game.gameLoop.thisLoopStart - _APP.game.gameLoop.lastDebug) > _APP.game.gameLoop.debugDelay) ){
            // Display the debug data one more time. 
            _APP.debug.debugDisplays.runDebugDisplay();

            // Update gameLoop.lastDebug.
            _APP.game.gameLoop.lastDebug = performance.now();
        }
    },

    TinySimpleHash:s=>{for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9},

    // Tile draw test.
    debug1:{
        parent:null,

        // Tileset draw test.
        drawTiles: function(tilesetName, dest1){
            let div1a = document.createElement("div"); 
            let div1b = document.createElement("div"); div1b.innerText = `${tilesetName}: TILES`; div1b.style = "background-color:white;"
            let div1c = document.createElement("div");
            div1a.append(div1b, div1c);
            _GFX.cache[tilesetName].tileset.forEach((d, i)=>{
                let div = document.createElement("div"); 
                div.style["display"] = "inline-block";
                div.style["vertical-align"] = "top";
                div.style["border"]  = "1px solid white";
                div.style["margin"]  = "2px";
                div.style["padding"] = "5px";
                div.title = `tileId: ${i}`;
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
                    div.title = `Tilemap: ${key}`;
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
                    this.drawTiles(key, this.parent.nav.DOM.views["debug1"]);
                }

                for(let key in _GFX.cache){
                    this.drawTilemaps(key, this.parent.nav.DOM.views["debug1"]);
                }
    
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
        doesViewExist: function(tabKey){
            if(this.DOM.tabs[tabKey] && this.DOM.views[tabKey]) { return true; }
            return false;
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
        // Runs via the gameLoop debug.
        runDebugDisplay: function(){
            let gamestate1 = _APP.game["gamestate1"];
            let gamestate2 = _APP.game["gamestate2"];
            let data;
            
            // Do not continue if gamestate1 is not set yet.
            if(!gamestate1){ console.log("no gamestate1"); return; }

            // Change the gamestate select and the view if the gamestate has changed.
            if(_APP.debug.gameLoop.DOM["gamestateSelect"].value == _APP.game.prev_gamestate1){
                // Change gamestate select.
                // console.log("switching debug gamestateselect select to: ", gamestate1);
                _APP.debug.gameLoop.DOM["gamestateSelect"].value = _APP.game.gamestate1;

                // Change to the gamestate's debug nav tab/view.
                if(_APP.debug.nav.doesViewExist(_APP.game.gamestate1)){
                    // console.log("switching debug nav view to: ", gamestate1);
                    _APP.debug.nav.showOneView(_APP.game.gamestate1);
                }
                else{
                    console.log("runDebugDisplay: No nav tab/view available for:", _APP.game.gameLoop.gamestate1);
                }
            }

            // Do not continue if the current gamestate1 has it's inited flag unset.
            if(!_APP.game.gamestates[gamestate1].inited){ return; }

            // Always show the gameLoop debug.
            data = _APP.debug.gameLoop.getVarsObj_gameLoop_div1();
            this.generateDebugTable1(data);
            data = _APP.debug.gameLoop.getVarsObj_gameLoop_div2();
            this.generateDebugTable1(data);
            data = _APP.debug.gameLoop.getVarsObj_gameLoop_div3();
            this.generateDebugTable2b(data);
            data = _APP.debug.gameLoop.getVarsObj_gameLoop_div4();
            this.generateDebugTable1(data);
            
            if(gamestate1 == "gs_title0"){
                // anim_jsgameLogo debug.
                data =_APP.debug.gs_title0.getVarsObj_anim("anim_jsgameLogo");
                this.generateDebugTable1(data);

                // debug
                data =_APP.debug.gs_title0.getVarsObj_vars();
                this.generateDebugTable1(data);
            }
            else if(gamestate1 == "gs_title1"){
                // Anim_lense debug.
                data =_APP.debug.gs_title1.getVarsObj_anim("anim_lense");
                this.generateDebugTable1(data);
                
                // Anim_stars debug.
                data =_APP.debug.gs_title1.getVarsObj_anim("anim_stars");
                this.generateDebugTable1(data);

                // debug.
                data =_APP.debug.gs_title1.getVarsObj_vars();
                this.generateDebugTable1(data);
            }
            else if(gamestate1 == "gs_title2"){
                // debug
                data =_APP.debug.gs_title2.getVarsObj_vars();
                this.generateDebugTable1(data);
            }
        },

        // Create a multi-row table.
        generateDebugTable1: function(data){
            let obj   = data.obj;
            let div   = data.div;
            let table = data.table;
            let padEndLen  = 17;
            let padEndChar = " ";
            if(data.padEnd){
                padEndLen  = data.padEnd.len ;
                padEndChar = data.padEnd.char;
            }

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
                        td.innerText = rec.toString().trim().padEnd(padEndLen, padEndChar);
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
                    td.innerText = key1.toString().padEnd(padEndLen, padEndChar);
                    
                    td = tr.insertCell(-1);
                    if(rec == undefined){ rec = ""; }
                    td.innerText = rec.toString().trim().padEnd(padEndLen, padEndChar);
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
        // Creates a 2-row table with divs that change size and color.
        generateDebugTable2b: function(data){
            let obj   = data.obj;
            let div   = data.div;
            let table = data.table;
            // let padEndLen  = 17;
            // let padEndChar = " ";
            // if(data.padEnd){
            //     padEndLen  = data.padEnd.len ;
            //     padEndChar = data.padEnd.char;
            // }
            let classes = data.classes;

            if(table){
                // Update the rows and columns for the table. 
                let rec, recHash, td, valueHash, value, div1, div2;
                for(let key1 in obj){
                    // New data.
                    rec       = obj[key1];
                    len_new   = rec.len;

                    // Previous data.
                    div2      = table.querySelector(`td[key="${key1}"] div:nth-child(1)`);
                    if(!div2){ console.log(key1, "DIV2 IS MISSING!"); continue; }
                    td        = table.querySelector(`td[key="${key1}"]`);
                    len_prev  = td.getAttribute("len");

                    //.Are the hashes different?
                    if(len_prev != len_new){
                        // td.innerText = recVal;
                        td.setAttribute("len", obj[key1].len);
                        div2.classList.remove(...classes);
                        div2.classList.add(...rec.C);
                        div2.innerText = obj[key1].len;
                    }
                    else{
                    }
                }
            }
            else{
                // Create the base table structure. 
                table = document.createElement("table");
                let thead = document.createElement("thead");
                let tbody = document.createElement("tbody");
                table.append(thead,tbody);
        
                let rec, recVal, td, div1, div2;
                let head_tr = thead.insertRow(-1);
                let body_tr = tbody.insertRow(-1);
                for(let key1 in obj){ 
                    // Header.
                    td = head_tr.insertCell(-1); 
                    td.innerText = key1.toString(); 
                    
                    
                    // Data.
                    rec = obj[key1];
                    td = body_tr.insertCell(-1); 
                    td.setAttribute("key", key1);
                    td.setAttribute("len", obj[key1].len);
                    div2 = document.createElement("div");
                    div2.classList.add(...rec.C);
                    div2.innerText = obj[key1].len;
                    td.append(div2);
                }
                
                // Clear the destination. 
                div.innerHTML = "";
            
                // Add the table to the destination.
                div.append(table);
            }
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
            await this.gameLoop.init(this);
            await this.debug1.init(this);
            await this.gs_title0.init(this);
            await this.gs_title1.init(this);
            await this.gs_title2.init(this);
            
            resolve();
        });
    },

};