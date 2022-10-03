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
        let lastLoopTimeMs = _JSG.shared.timeIt.stamp("full_gameLoop" , "pt", "gameLoop");
        let lastLoopTimeMsTooLong = lastLoopTimeMs > (_APP.game.gameLoop["msFrame"]) ? true : false;
        if(lastLoopTimeMsTooLong){
            console.log(`lastLoopTimeMsTooLong: ${lastLoopTimeMs.toFixed(1)} vs ${_APP.game.gameLoop["msFrame"].toFixed(1)}`);
        }
        return {
            obj : {
                // "NAME": "gameLoop vars 2",
                // "Calc FPS"    : `${_APP.game.gameLoop.fpsCalc["average"].toFixed(1)}f (${_APP.game.gameLoop["msFrame"].toFixed(1)}ms/f)` ,
                "Calc FPS"      : `${_APP.game.gameLoop.fpsCalc["average"].toFixed(1)}f (${_APP.game.gameLoop.fpsCalc.avgMsPerFrame.toFixed(1)}ms/f)` ,
                "debugTiming"   : `${_APP.game.gameLoop["debugDelay"].toFixed(1)}f, (${(_APP.game.gameLoop["debugDelay"] * _APP.game.gameLoop["msFrame"]).toFixed(1)}ms)` ,
                "LastLoop time" : lastLoopTimeMsTooLong ? `!!!!!` : `GOOD`,
                "frameCounter"  : _APP.game.gameLoop["frameCounter"] ,
            },
            div  : div,
            table: table,
        };
    },

    avgs: {
        keys: {
            full_gameLoop : { index: 0, max: 60, times: [] },
            do_fade       : { index: 0, max: 60, times: [] },
            get_input     : { index: 0, max: 60, times: [] },
            do_logic      : { index: 0, max: 60, times: [] },
            do_draw       : { index: 0, max: 60, times: [] },
            do_debug      : { index: 0, max: 60, times: [] },
        },
        getAvg: function(key){
            // Get the record.
            let rec = this.keys[key];

            // Get the average by summing all samples and dividing by the sample count. 
            let avg = 0;
            let i = rec.max; 
            while (i--) { avg += rec.times[i]; } 
            avg = ( avg / rec.max);

            // Return the average.
            return avg;
        },
        addTime: function(key, newValue){
            // Get the record.
            let rec = this.keys[key];

            // if(newValue == undefined){ newValue = 0; }
            if( isNaN(newValue) ){ return; }
            rec.times[rec.index] = newValue;

            // Increment the index.
            rec.index +=1;

            // Reset the index if it gets to max.
            if(rec.index >= rec.max){ rec.index = 0; }
        },
        init: function(){
            for(let key in this.keys){
                // Get the record.
                let rec = this.keys[key];
        
                // Fill the array.
                for(let i=0, l=rec.max; i<l; i+=1){ rec.times.push(0); }
        
                // Set index to 0.
                rec.index == 0;
            }
        },
    
    },
    getVarsObj_gameLoop_div3: function(){
        let div   = this.DOM.gameDebugDiv_timeIt;
        let table = this.DOM.gameDebugDiv_timeIt.querySelector("table");
        let classes = [
            "divPercentRange_00", // 0
            "divPercentRange_10", // 1
            "divPercentRange_20", // 2
            "divPercentRange_30", // 3
            "divPercentRange_40", // 4
            "divPercentRange_50", // 5
            "divPercentRange_60", // 6
            "divPercentRange_70", // 7
            "divPercentRange_80", // 8
            "divPercentRange_90", // 9
            "divPercentRange_99", // 10
        ];

        let obj = {};
        let func1 = function(rec){ 
            // Get percent.
            // rec["%"] = rec.pt ? rec.pt/_APP.game.gameLoop.msFrame : 0; 

            // if(rec.key == "do_debug"){ 
            //     console.log(_APP.debug.gameLoop.avgs.keys.do_debug, rec);
            // }

            // Get number within range (constrain to 0 - 10);.
            if(undefined == rec.pt){ rec.pt = 0.0; }
            // mapNumberToRange: function(x, in_min, in_max, out_min, out_max){
            tmp = Math.ceil( _APP.game.shared.mapNumberToRange(rec.pt, 0, _APP.game.gameLoop.msFrame, 0, 10));
            tmp = Math.ceil( _APP.game.shared.mapNumberToRange(tmp   , 0, _APP.game.gameLoop.msFrame, 0, 10));
            tmp = Math.min(10, tmp);
            tmp = Math.max(0, tmp);
            rec.C.push("divPercentRange");
            if(tmp < classes.length){
                rec.C.push(classes[tmp]);
            }
            else{
                console.log("uh oh", tmp, classes.length, rec.key);
            }
            rec.len = tmp;
            rec.len2 = tmp;
        };

        this.avgs.addTime("full_gameLoop", _JSG.shared.timeIt.stamp("full_gameLoop" , "pt", "gameLoop"));
        this.avgs.addTime("do_fade"      , _JSG.shared.timeIt.stamp("do_fade"       , "pt", "gameLoop"));
        this.avgs.addTime("get_input"    , _JSG.shared.timeIt.stamp("get_input"     , "pt", "gameLoop"));
        this.avgs.addTime("do_logic"     , _JSG.shared.timeIt.stamp("do_logic"      , "pt", "gameLoop"));
        this.avgs.addTime("do_draw"      , _JSG.shared.timeIt.stamp("do_draw"       , "pt", "gameLoop"));
        this.avgs.addTime("do_debug"     , _JSG.shared.timeIt.stamp("do_debug"      , "pt", "gameLoop"));

        let entries = [
            { "key": "full_gameLoop", "pt": this.avgs.getAvg("full_gameLoop"), "%":0, "G":"", "C":[] },
            { "key": "do_fade"      , "pt": this.avgs.getAvg("do_fade")      , "%":0, "G":"", "C":[] },
            { "key": "get_input"    , "pt": this.avgs.getAvg("get_input")    , "%":0, "G":"", "C":[] },
            { "key": "do_logic"     , "pt": this.avgs.getAvg("do_logic")     , "%":0, "G":"", "C":[] },
            { "key": "do_draw"      , "pt": this.avgs.getAvg("do_draw")      , "%":0, "G":"", "C":[] },
            { "key": "do_debug"     , "pt": this.avgs.getAvg("do_debug")     , "%":0, "G":"", "C":[] },
        ];
            
        for(let i=0, l=entries.length; i<l; i+=1){ 
            // Get the record. 
            let rec = entries[i];
            
            // Replace undefined values with 0.
            if(rec.pt == undefined){ rec.pt = 0; }

            // Get the % value of this time vs a full frame.
            // Get the "graphical" % of this time vs a full frame.
            func1(rec);

            // Final text value.
            obj[rec.key] = rec;
        }
        return {
            obj  : obj,
            div  : div,
            table: table,
            classes: classes,
        };
        
    },
    OLDgetVarsObj_gameLoop_div3: function(){
        let div   = this.DOM.gameDebugDiv_timeIt;
        let table = this.DOM.gameDebugDiv_timeIt.querySelector("table");
        let classes = [
            "divPercentRange_00", // 0
            "divPercentRange_10", // 1
            "divPercentRange_20", // 2
            "divPercentRange_30", // 3
            "divPercentRange_40", // 4
            "divPercentRange_50", // 5
            "divPercentRange_60", // 6
            "divPercentRange_70", // 7
            "divPercentRange_80", // 8
            "divPercentRange_90", // 9
            "divPercentRange_99", // 10
        ];
        // let classes = [
        //     "divPercentRange_00", // x
        //     "divPercentRange_00", // x
        //     "divPercentRange_20", // x
        //     "divPercentRange_20", // x
        //     "divPercentRange_40", // x
        //     "divPercentRange_40", // x
        //     "divPercentRange_60", // x
        //     "divPercentRange_60", // x
        //     "divPercentRange_80", // x
        //     "divPercentRange_90", // x
        //     "divPercentRange_99", //
        // ];
        let obj = {};
        let func1 = function(rec){ 
            // Get percent.
            rec["%"] = rec.pt ? rec.pt/_APP.game.gameLoop.msFrame : 0; 

            // Add first class.
            rec.C.push("divPercentRange");

            // Get number within range (constrain to 0 - 10);.
            if(undefined == rec.pt){ rec.pt = 0.0; }
            // mapNumberToRange: function(x, in_min, in_max, out_min, out_max){
            tmp = Math.ceil( _APP.game.shared.mapNumberToRange(rec.pt, 0, _APP.game.gameLoop.msFrame, 0, 10));
            tmp = Math.floor( _APP.game.shared.mapNumberToRange(tmp, 0, _APP.game.gameLoop.msFrame, 0, 10) );
            tmp = Math.min(10, tmp);
            tmp = Math.max(0, tmp);
            rec.C.push(classes[tmp]);
            rec.len = tmp;
            rec.len2 = tmp;
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
                "key": "do_fade",
                "pt": _JSG.shared.timeIt.stamp("do_fade" , "pt", "gameLoop"),
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

    // Stops the gameLoop but does not re-init any values on toggle on/off.
    toggleGameLoop: function(){
        if(_APP.game.gameLoop.running){
            this.stopGameLoop();
        }
        else{
            // Set the gameLoop.running to true. 
            _APP.game.gameLoop.running = true; 
    
            // Start the gameLoop.
            _APP.game.gameLoop.loop();
        }
    },
    // Restart the gameLoop.
    restartGameLoop:function(){
        // Cancel the current animation frame. 
        window.cancelAnimationFrame(_APP.game.gameLoop.raf_id); 

        this.DOM["gamestateSelect"].value = _APP.game.gameLoop.gamestate1;

        // Trigger gamestate change (re-inits) but keep the same gamestates.
        _APP.game.gameLoop.changeGamestate1( _APP.game.gameLoop.gamestate1 );
        _APP.game.gameLoop.changeGamestate2( _APP.game.gameLoop.gamestate2 );
        
        // Set the gameLoop.running to true. 
        _APP.game.gameLoop.running = true; 

        // Start the gameLoop.
        _APP.game.gameLoop.loop();
    },
    // Stops the gameloop.
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
            this.DOM["togglePauseBtn"].addEventListener("click", () => { this.toggleGameLoop(); }, false); 
            this.DOM["restartBtn"].addEventListener("click", () => this.restartGameLoop(), false); 
            this.DOM["stopBtn"] .addEventListener("click", () => this.stopGameLoop(), false); 
            this.DOM["toggleLoopType_btn"] .addEventListener("click", () => this.toggleLoopType(), false); 
            this.DOM["gamestateSelect"].addEventListener("change", (ev)=>{this.changeGamestate(ev.target.value);}, false);

            this.avgs.init();

            // this.DOM["fadeUp_btn"] .addEventListener("click", () => _APP.fadeLayer.testUp(), false); 
            // this.DOM["fadeDown_btn"].addEventListener("click", () => _APP.fadeLayer.testDown(), false); 
            //
            this.populateGamestatesSelect();
            
            resolve();
        });
    },    
};