// Runs during the gameLoop on a frame count timer.

_APP.debug.gameLoop = {
    parent: null,
    gs: null,
    DOM: {},

    parent: null,
        
    getVarsObj_gameLoop_div1: function(){
        let div   = this.DOM.gameLoopVars_div1;
        let table = this.DOM.gameLoopVars_div1.querySelector("table");
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
        let div   = this.DOM.gameLoopVars_div2;
        let table = this.DOM.gameLoopVars_div2.querySelector("table");
        return {
            obj : {
                // "NAME": "gameLoop vars 2",
                // "Calc FPS"    : `${_APP.game.gameLoop.fpsCalc["average"].toFixed(1)}f (${_APP.game.gameLoop["msFrame"].toFixed(1)}ms/f)` ,
                "Calc FPS"    : `${_APP.game.gameLoop.fpsCalc["average"].toFixed(1)}f (${_APP.game.gameLoop.fpsCalc.avgMsPerFrame.toFixed(1)}ms/f)` ,
                "debugTiming" : `${_APP.game.gameLoop["debugDelay"].toFixed(1)}f, (${(_APP.game.gameLoop["debugDelay"] * _APP.game.gameLoop["msFrame"]).toFixed(1)}ms)` ,
                ""            : "" ,
                "frameCounter"     : _APP.game.gameLoop["frameCounter"] ,
            },
            div  : div,
            table: table,
        };
    },
    getVarsObj_gameLoop_div3: function(){
        let div   = this.DOM.gameDebugDiv_timeIt;
        let table = this.DOM.gameDebugDiv_timeIt.querySelector("table");
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
            tmp = Math.ceil(_APP.game.shared.mapNumberToRange(rec.pt, 0, _APP.game.gameLoop.msFrame, 0, 10));
            tmp = Math.ceil( _APP.game.shared.mapNumberToRange(tmp, 0, _APP.game.gameLoop.msFrame, 0, 10) );
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
        this.DOM["gamestateSelect"].append(frag);
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

        this.DOM["gamestateSelect"].value = _APP.game.gameLoop.gamestate1;

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

            this.DOM = _JSG.loadedConfig.meta.debugDOM.gameLoop.DOM;
            await _JSG.shared.parseObjectStringDOM(this.DOM, false);

            // Event listeners.
            this.DOM["startBtn"].addEventListener("click", () => this.startGameLoop(), false); 
            this.DOM["stopBtn"] .addEventListener("click", () => this.stopGameLoop(), false); 
            this.DOM["toggleLoopType_btn"] .addEventListener("click", () => this.toggleLoopType(), false); 
            this.DOM["gamestateSelect"].addEventListener("change", (ev)=>{this.changeGamestate(ev.target.value);}, false);
            //
            this.populateGamestatesSelect();
            
            resolve();
        });
    },    
};