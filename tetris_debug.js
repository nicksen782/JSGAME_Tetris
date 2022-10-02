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
            
            if(key == "anim_jsgameLogo"){
                div   = this.DOM.gs0_anim_jsgameLogo;
                table = this.DOM.gs0_anim_jsgameLogo.querySelector("table");
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
            let div   = this.DOM.gs0_debug_vars;
            let table = this.DOM.gs0_debug_vars.querySelector("table");
            let obj = {
                "NAME": "gs_title0 vars",
                "endDelay.start" : this.gs.endDelay.started,
                "endDelay.finish": this.gs.endDelay.finished,
                "endDelay:w f"   : `${this.gs.endDelay.frameCount}/${this.gs.endDelay.maxFrames} (ms:${this.gs.endDelay.maxFrames * _APP.game.gameLoop["msFrame"].toFixed(1)})`,
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
    
                resolve();
            });
        },

    },
    gs_title1: {
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
                "NAME": "gs_title1 vars",
                "endDelay.start" : this.gs.endDelay.started,
                "endDelay.finish": this.gs.endDelay.finished,
                "endDelay:w f"   : `${this.gs.endDelay.frameCount}/${this.gs.endDelay.maxFrames} (ms:${this.gs.endDelay.maxFrames * _APP.game.gameLoop["msFrame"].toFixed(1)})`,
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
                this.gs = _APP.game.gamestates["gs_title1"];
    
                // Load in the DOM from meta.
                this.DOM = _JSG.loadedConfig.meta.debugDOM.gs_title1.DOM;
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
            data = _APP.debug.debug_gameloop_div.getVarsObj_gameLoop_div3();
            this.generateDebugTable2b(data);

            if(_APP.debug.DOM["gamestateSelect"].value != _APP.game.gameLoop.gamestate1){
                // console.log("changing");
                _APP.debug.DOM["gamestateSelect"].value = _APP.game.gameLoop.gamestate1;
            }
            
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
                // anim_jsgameLogo debug.
                // data =_APP.debug.gs_title0.getVarsObj_anim("anim_jsgameLogo");
                // this.generateDebugTable1(data);

                // debug
                // data =_APP.debug.gs_title0.getVarsObj_vars();
                // this.generateDebugTable1(data);
            }
        },

        // Create a multi-row table.
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
                    if(rec == undefined){ rec = ""; }
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
        // Creates a 2-row table with divs that change size and color.
        generateDebugTable2b: function(data){
            let obj   = data.obj;
            let div   = data.div;
            let table = data.table;
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
                    td.append(div2);
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
                    "gameLoop running" : `${_APP.game.gameLoop["running"]}, Type: ${_APP.game.gameLoop["loopType"]}` ,
                    "gamestate1"       : `'${_APP.game.gameLoop["gamestate1"]}'` ,
                    "gamestate2"       : `'${_APP.game.gameLoop["gamestate2"]}'` ,
                    "netGame"          : `${_APP.game.gameLoop["netGame"]}` ,
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
        getVarsObj_gameLoop_div3: function(){
            let div   = this.parent.DOM.gameDebugDiv_timeIt;
            let table = this.parent.DOM.gameDebugDiv_timeIt.querySelector("table");
            // let classes = [
            //     "divPercentRange_00", //
            //     "divPercentRange_10", //
            //     "divPercentRange_20", //
            //     "divPercentRange_30", //
            //     "divPercentRange_40", //
            //     "divPercentRange_50", //
            //     "divPercentRange_60", //
            //     "divPercentRange_70", //
            //     "divPercentRange_80", //
            //     "divPercentRange_90", //
            //     "divPercentRange_99", //
            // ];
            let classes = [
                "divPercentRange_00", // x
                "divPercentRange_00", // x
                "divPercentRange_20", // x
                "divPercentRange_20", // x
                "divPercentRange_40", // x
                "divPercentRange_40", // x
                "divPercentRange_60", // x
                "divPercentRange_60", // x
                "divPercentRange_80", // x
                "divPercentRange_90", // x
                "divPercentRange_99", //
            ];
            let obj = {};
            let func1 = function(rec){ 
                // Get percent.
                rec["%"] = rec.pt ? rec.pt/_APP.game.gameLoop.msFrame : 0; 

                // Add first class.
                rec.C.push("divPercentRange");

                // Get number within range (constrain to 0 - 10);.
                if(undefined == rec.pt){ 
                    rec.G = ">".padEnd(22, " "); 
                    rec.C.push(classes[0]);
                    return; 
                }
                // mapNumberToRange: function(x, in_min, in_max, out_min, out_max){
                tmp = Math.ceil(_APP.shared.mapNumberToRange(rec.pt, 0, _APP.game.gameLoop.msFrame, 0, 10));
                tmp = Math.ceil( _APP.shared.mapNumberToRange(tmp, 0, _APP.game.gameLoop.msFrame, 0, 10) );
                tmp = Math.min(10, tmp);
                tmp = Math.max(0, tmp);
                
                let v1 = "=".repeat(tmp).padEnd(10, " ");
                let v2 = ((rec["%"] * 100) << 0);
                if(v2 >= 100){ 
                    v2 = " 101".padStart(3, "."); 
                    rec.C.push(classes[classes.length-1]);
                }
                else{
                    rec.C.push(classes[tmp]);
                }
                rec.len = tmp;
                rec.len2 = tmp;
                rec.G = `${v1}> ${v2.toString().padStart(3, ".")}%`.padEnd(22, " ");

                // rec.C = "black";
                
                // let in_min = 0;
                // let in_max = _APP.game.gameLoop.msFrame;
                // let out_min = 0;
                // let out_max = 10;
                // if(!rec.pt){ rec.G = ">"; return; }
                // let tmp = Math.min(_APP.game.gameLoop.msFrame<<0, Math.ceil((rec.pt - in_min) * (out_max - out_min) / (in_max - in_min) + out_min) );
                // let v2= ((rec["%"] * 100).toFixed(2)).padStart(6, " ");
                // tmp = Math.min(_APP.game.gameLoop.msFrame<<0, tmp);
                // console.log(tmp);
                // rec.G = tmp;return;
                // rec.G = ("=".repeat(tmp).padEnd(12, " ") +`> ${v2}%` ).trim().padEnd(25, " ");
            };
            let entries = [
                {
                    "key": "full_gameLoop",
                    "pt": _JSG.shared.timeIt.stamp("full_gameLoop" , "pt", "gameLoop"),
                    "%":0,
                    "G":"",
                    "C":[],
                },
                {
                    "key": "get_input",
                    "pt": _JSG.shared.timeIt.stamp("get_input" , "pt", "gameLoop"),
                    "%":0,
                    "G":"",
                    "C":[],
                },
                {
                    "key": "do_logic",
                    "pt": _JSG.shared.timeIt.stamp("do_logic" , "pt", "gameLoop"),
                    "%":0,
                    "G":"",
                    "C":[],
                },
                {
                    "key": "do_draw",
                    "pt": _JSG.shared.timeIt.stamp("do_draw" , "pt", "gameLoop"),
                    "%":0,
                    "G":"",
                    "C":[],
                },
                {
                    "key": "do_debug",
                    "pt": _JSG.shared.timeIt.stamp("do_debug" , "pt", "gameLoop"),
                    "%":0,
                    "G":"",
                    "C":[],
                },
            ];
            for(let i=0, l=entries.length; i<l; i+=1){ 
                // Get the record. 
                let rec = entries[i];
                
                // Replace undefined values with 0.
                if(rec.pt == undefined){ rec.pt = 0; }

                // Get the % value of this time vs a full frame.
                // Get the "graphical" % of this time vs a full frame.
                func1(rec);

                // Generate the text values. 
                // let v1= rec.pt.toFixed(2).padStart(6, " ");
                // let v2= (rec["%"] * 100).toFixed(2).padStart(6, " ");

                // ================>3491.40)%
                // Final text value.
                // obj[rec.key] = `${v1}ms (${v2}%)`;
                // obj[rec.key] = `${"-".repeat(rec.G)} > ${rec.G} > ${v2}%`;
                obj[rec.key] = rec;
                // obj[rec.key] = `${rec.G}`;
                // console.log(rec);
            }
            return {
                obj  : obj,
                div  : div,
                table: table,
                classes: classes,
            };
        },

        populateGamestatesSelect: function(){
            let gamestates = _APP.game.gamestates_list;
            let frag = document.createDocumentFragment();
            for(let i=0, l=gamestates.length; i<l; i+=1){
                let option = document.createElement("option");
                option.innerText = gamestates[i];
                option.value = gamestates[i];
                frag.append(option);
            }
            this.parent.DOM["gamestateSelect"].append(frag);
        },
        changeGamestate: function(newGamestate){
            // Cancel the current animation frame. 
            window.cancelAnimationFrame(_APP.game.gameLoop.raf_id); 

            // Trigger gamestate change.
            _APP.game.gameLoop.changeGamestate1( newGamestate );
            _APP.game.gameLoop.changeGamestate2( "" );

            // Set the gameLoop.running to true. 
            _APP.game.gameLoop.running = true; 

            // Start the gameLoop.
            _APP.game.gameLoop.loop();
        },

        startGameLoop:function(){
            // Cancel the current animation frame. 
            window.cancelAnimationFrame(_APP.game.gameLoop.raf_id); 

            this.parent.DOM["gamestateSelect"].value = _APP.game.gameLoop.gamestate1;

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
        toggleLoopType: function(){
            if     (_APP.game.gameLoop.loopType == "raf"){ _APP.game.gameLoop.loopType = "to"; }
            else if(_APP.game.gameLoop.loopType == "to") { _APP.game.gameLoop.loopType = "raf"; }
        },

        init: async function(parent){
            return new Promise(async (resolve,reject)=>{
                // Set parent(s)
                this.parent = parent;

                // Event listeners.
                this.parent.DOM["startBtn"].addEventListener("click", () => this.startGameLoop(), false); 
                this.parent.DOM["stopBtn"] .addEventListener("click", () => this.stopGameLoop(), false); 
                this.parent.DOM["toggleLoopType_btn"] .addEventListener("click", () => this.toggleLoopType(), false); 
                this.parent.DOM["gamestateSelect"].addEventListener("change", (ev)=>{this.changeGamestate(ev.target.value);}, false);
                //
                this.populateGamestatesSelect();
                
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
            await this.gs_title1.init(this);
            
            resolve();
        });
    },

};