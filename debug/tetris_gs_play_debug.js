_APP.debug.gs_play = {
    parent: null,
    gs: null,
    DOM: {},

    getVarsObj_vars: function(){
        let div   = this.DOM.debug_varsDiv;
        let table = this.DOM.debug_varsDiv.querySelector("table");
        let obj = {
            "NAME": "gs_play vars",
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
    createTimerObj: function(mainKey){
        let timers = {};
        for(let timerKey of ["inputDelay","dropDelay","lineClearDelay"]){
            for(let key in _APP.game.shared.generalTimers["gs_play"][mainKey+timerKey]){ 
                if(!timers[timerKey]){ timers[timerKey] = {}; }
                timers[timerKey][key] =  `${_APP.game.shared.generalTimers["gs_play"][mainKey+timerKey][key]}` ;
            }
        }
        return timers;
    },
    showTimers: function(){
        // console.log(this.gs.playField["single"]);
        // debugger;
        // .
        // .
        // .
        let div   = this.DOM.timers;
        let table = this.DOM.timers.querySelector("table");
        let longestKey
        
        longestKey = Math.max(...(Object.keys(this.gs.config).map(el => el.length))) ;
        let config = [];
        for(let key in this.gs.config){ config.push(`${key.padEnd(longestKey, " ")}: ${this.gs.config[key]}`); }

        let timers = {};
        
        for(let mainKey of ["single", "p1", "p2"]){
            timers[mainKey] = this.createTimerObj(mainKey);
        }

        let obj = {
            "NAME": "TIMERS",
            "CONFIG"        : config.join("\n"),
        };
        if(this.gs.playField.single){
            let rotationArray;
            obj["S : PIECE"         ] = `X: ${this.gs.playField["single"].currPieceX}, Y: ${this.gs.playField["single"].currPieceY}, C: ${this.gs.playField["single"].currPiece || "?"}, R: ${this.gs.playField["single"].currPieceRotation || "0"}, N: ${this.gs.playField["single"].nextPiece}`;
            
            if(this.gs.playField["single"].currPiece){
                rotationArray = this.gs.playField.pieces[this.gs.playField["single"].currPiece].rotations[this.gs.playField["single"].currPieceRotation]
                obj["S : rotation"      ] = JSON.stringify(rotationArray);
            }
            else{
                obj["S : rotation"      ] = [];
            }
            
            obj["S : inputDelay"    ] = (()=>{ let tmp=[]; for(let key in timers.single.inputDelay    ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.single.inputDelay    [key]}`); } return tmp.join("\n"); })();
            obj["S : dropDelay"     ] = (()=>{ let tmp=[]; for(let key in timers.single.dropDelay     ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.single.dropDelay     [key]}`); } return tmp.join("\n"); })();
            obj["S : lineClearDelay"] = (()=>{ let tmp=[]; for(let key in timers.single.lineClearDelay){ tmp.push(`${key.padEnd(10, " ")}: ${timers.single.lineClearDelay[key]}`); } return tmp.join("\n"); })();

            obj["INPUT P1: press  "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["press"]  )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["press"]  )[k]);
            obj["INPUT P1: held   "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["held"]   )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["held"]   )[k]);
            obj["INPUT P1: release"] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["release"])).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["release"])[k]);
        }
        
        if(this.gs.playField.p1){
            obj["P1: PIECE"         ] = `${this.gs.playField["p1"].currPiece || "?"}/${this.gs.playField["p1"].currPieceRotation || "0"}`;
            obj["P1: inputDelay"    ] = (()=>{ let tmp=[]; for(let key in timers.p1.inputDelay    ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p1.inputDelay    [key]}`); } return tmp.join("\n"); })();
            obj["P1: dropDelay"     ] = (()=>{ let tmp=[]; for(let key in timers.p1.dropDelay     ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p1.dropDelay     [key]}`); } return tmp.join("\n"); })();
            obj["P1: lineClearDelay"] = (()=>{ let tmp=[]; for(let key in timers.p1.lineClearDelay){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p1.lineClearDelay[key]}`); } return tmp.join("\n"); })();

            obj["INPUT P1: press  "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["press"]  )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["press"]  )[k]);
            obj["INPUT P1: held   "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["held"]   )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["held"]   )[k]);
            obj["INPUT P1: release"] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["release"])).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["release"])[k]);
        }
        if(this.gs.playField.p2){
            obj["P2: PIECE"         ] = `${this.gs.playField["p2"].currPiece || "?"}/${this.gs.playField["p2"].currPieceRotation || "0"}`;
            obj["P2: inputDelay"    ] = (()=>{ let tmp=[]; for(let key in timers.p2.inputDelay    ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p2.inputDelay    [key]}`); } return tmp.join("\n"); })();
            obj["P2: dropDelay"     ] = (()=>{ let tmp=[]; for(let key in timers.p2.dropDelay     ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p2.dropDelay     [key]}`); } return tmp.join("\n"); })();
            obj["P2: lineClearDelay"] = (()=>{ let tmp=[]; for(let key in timers.p2.lineClearDelay){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p2.lineClearDelay[key]}`); } return tmp.join("\n"); })();

            obj["INPUT P2: press  "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p2"]["press"]  )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p2"]["press"]  )[k]);
            obj["INPUT P2: held   "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p2"]["held"]   )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p2"]["held"]   )[k]);
            obj["INPUT P2: release"] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p2"]["release"])).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p2"]["release"])[k]);
        }
        return {
            obj   : obj,
            div   : div,
            table : table,
        };
    },

    showPieces: function(){
        let div   = this.DOM.pieces;
        let table = this.DOM.pieces.querySelector("table");
        let obj = {
            "NAME": "SINGLE",
        };

        if(this.gs.playField){
            if(this.gs.playField.single){
                obj.lines = {};
                
                obj.lines['width'] = this.gs.playField.single.piecesField[0].length;
                obj.lines['height'] = this.gs.playField.single.piecesField.length;
                for(let y=0, yl=this.gs.playField.single.piecesField.length; y<yl; y+=1){
                    obj.lines[`L${ y.toString().padStart(2, "0") }`] = this.gs.playField.single.piecesField[y].join("");
                }
                obj.lines = JSON.stringify(obj.lines,null,1);
            }
        }
        else{
            console.error("no playfield?", this.gs);
            return false;
        }

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
            this.gs = _APP.game.gamestates["gs_play"];

            // Load in the DOM from meta.
            this.DOM = _JSG.loadedConfig.meta.debugDOM.gs_play.DOM;
            await _JSG.shared.parseObjectStringDOM(this.DOM, false);

            // Event listeners.
            
            resolve();
        });
    },
};
