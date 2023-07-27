_APP.debug.gs_play = {
    parent: null,
    gs: null,
    DOM: {},

    vars_config: function(){
        let div   = this.DOM.config;
        let table = div.querySelector("table");
        
        let longestKey;
        longestKey = Math.max(...(Object.keys(this.gs.config).map(el => el.length))) ;
        let config = [];
        for(let key in this.gs.config){ config.push(`${key.padEnd(longestKey, " ")}: ${this.gs.config[key]}`); }

        let obj = {
            "NAME"   : "INPUT/CONFIG",
            "CONFIG" : config.join("\n"),
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
    playerData_p1: function(){
        let div   = this.DOM.data_p1;
        let table = div.querySelector("table");
        let timers = {};
        for(let mainKey of ["single", "p1"]){ timers[mainKey] = this.createTimerObj(mainKey); }

        let obj = {
            "NAME": "P1 DATA",
        };
        if(this.gs.playField.single){
            if(this.gs.playField["single"]){ 
                let data = this.gs.playField["single"].playfield;
                obj["S1: playField"] = `x: ${data.x}, y: ${data.y}, w: ${data.w}, h: ${data.h}`; 
            }
            obj["S1: quickDrop"] = this.gs.playField["single"].quickDrop ? true : false;

            let rotationArray;
            obj["S1 : PIECE"         ] = `x: ${this.gs.playField["single"].currPieceX}, y: ${this.gs.playField["single"].currPieceY}\nc: ${this.gs.playField["single"].currPiece || "?"}, r: ${this.gs.playField["single"].currPieceRotation || "0"}, n: ${this.gs.playField["single"].nextPiece}`;
            
            if(this.gs.playField["single"].currPiece){
                rotationArray = this.gs.playField.pieces[this.gs.playField["single"].currPiece].rotations[this.gs.playField["single"].currPieceRotation]
                obj["S1 : rotation"      ] = JSON.stringify(rotationArray);
            }
            else{
                obj["S1 : rotation"      ] = [];
            }
            
            obj["S1: inputDelay"    ] = (()=>{ let tmp=[]; for(let key in timers["single"].inputDelay    ){ tmp.push(`${key.padEnd(10, " ")}: ${timers["single"].inputDelay    [key]}`); } return tmp.join("\n"); })();
            obj["S1: dropDelay"     ] = (()=>{ let tmp=[]; for(let key in timers["single"].dropDelay     ){ tmp.push(`${key.padEnd(10, " ")}: ${timers["single"].dropDelay     [key]}`); } return tmp.join("\n"); })();
            obj["S1: lineClearDelay"] = (()=>{ let tmp=[]; for(let key in timers["single"].lineClearDelay){ tmp.push(`${key.padEnd(10, " ")}: ${timers["single"].lineClearDelay[key]}`); } return tmp.join("\n"); })();
        }
        else if(this.gs.playField.p1){
            if(this.gs.playField["p1"]){ 
                let data = this.gs.playField["p1"].playfield;
                obj["P1: playField"] = `x: ${data.x}, y: ${data.y}, w: ${data.w}, h: ${data.h}`; 
            }
            obj["P1: quickDrop"] = this.gs.playField["p1"]    .quickDrop ? true : false;
        
            let rotationArray;
            obj["P1 : PIECE"         ] = `x: ${this.gs.playField["p1"].currPieceX}, y: ${this.gs.playField["p1"].currPieceY}\nc: ${this.gs.playField["p1"].currPiece || "?"}, r: ${this.gs.playField["p1"].currPieceRotation || "0"}, n: ${this.gs.playField["p1"].nextPiece}`;
            
            if(this.gs.playField["p1"].currPiece){
                rotationArray = this.gs.playField.pieces[this.gs.playField["p1"].currPiece].rotations[this.gs.playField["p1"].currPieceRotation]
                obj["P1 : rotation"      ] = JSON.stringify(rotationArray);
            }
            else{
                obj["P1 : rotation"      ] = [];
            }

            obj["P1: inputDelay"    ] = (()=>{ let tmp=[]; for(let key in timers["p1"].inputDelay    ){ tmp.push(`${key.padEnd(10, " ")}: ${timers["p1"].inputDelay    [key]}`); } return tmp.join("\n"); })();
            obj["P1: dropDelay"     ] = (()=>{ let tmp=[]; for(let key in timers["p1"].dropDelay     ){ tmp.push(`${key.padEnd(10, " ")}: ${timers["p1"].dropDelay     [key]}`); } return tmp.join("\n"); })();
            obj["P1: lineClearDelay"] = (()=>{ let tmp=[]; for(let key in timers["p1"].lineClearDelay){ tmp.push(`${key.padEnd(10, " ")}: ${timers["p1"].lineClearDelay[key]}`); } return tmp.join("\n"); })();
        }
        obj["P1: INPUT: press  "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["press"]  )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["press"]  )[k]);
        obj["P1: INPUT: held   "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["held"]   )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["held"]   )[k]);
        obj["P1: INPUT: release"] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p1"]["release"])).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p1"]["release"])[k]);

        return {
            obj   : obj,
            div   : div,
            table : table,
        };
    },
    playerData_p2: function(){
        let div   = this.DOM.data_p2;
        let table = div.querySelector("table");
        let timers = {};
        for(let mainKey of ["p2"]){ timers[mainKey] = this.createTimerObj(mainKey); }

        let obj = {
            "NAME": "P2 DATA",
        };
        if(this.gs.playField.p2){
            if(this.gs.playField["p2"]){ 
                let data = this.gs.playField["p2"].playfield;
                obj["P2: playField"] = `x: ${data.x}, y: ${data.y}, w: ${data.w}, h: ${data.h}`; 
            }
            obj["P2: quickDrop"] = this.gs.playField["p2"]    .quickDrop ? true : false;

            let rotationArray;
            obj["P2 : PIECE"         ] = `x: ${this.gs.playField["p2"].currPieceX}, y: ${this.gs.playField["p2"].currPieceY}\nc: ${this.gs.playField["p2"].currPiece || "?"}, r: ${this.gs.playField["p2"].currPieceRotation || "0"}, n: ${this.gs.playField["p2"].nextPiece}`;
            
            if(this.gs.playField["p2"].currPiece){
                rotationArray = this.gs.playField.pieces[this.gs.playField["p2"].currPiece].rotations[this.gs.playField["p2"].currPieceRotation]
                obj["P2 : rotation"      ] = JSON.stringify(rotationArray);
            }
            else{
                obj["P2 : rotation"      ] = [];
            }

            obj["P2: inputDelay"    ] = (()=>{ let tmp=[]; for(let key in timers.p2.inputDelay    ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p2.inputDelay    [key]}`); } return tmp.join("\n"); })();
            obj["P2: dropDelay"     ] = (()=>{ let tmp=[]; for(let key in timers.p2.dropDelay     ){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p2.dropDelay     [key]}`); } return tmp.join("\n"); })();
            obj["P2: lineClearDelay"] = (()=>{ let tmp=[]; for(let key in timers.p2.lineClearDelay){ tmp.push(`${key.padEnd(10, " ")}: ${timers.p2.lineClearDelay[key]}`); } return tmp.join("\n"); })();
        }
        obj["P2: INPUT: press  "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p2"]["press"]  )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p2"]["press"]  )[k]);
        obj["P2: INPUT: held   "] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p2"]["held"]   )).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p2"]["held"]   )[k]);
        obj["P2: INPUT: release"] = Object.keys(_INPUT.util.stateByteToObj(_INPUT.states["p2"]["release"])).filter(k => _INPUT.util.stateByteToObj(_INPUT.states["p2"]["release"])[k]);
        return {
            obj   : obj,
            div   : div,
            table : table,
        };
    },
    
    // OLD
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
            this.DOM = _APP.configObj.OLDCONFIG.meta.debugDOM.gs_play.DOM;
            await _JSG.shared.parseObjectStringDOM(this.DOM, false);

            // Event listeners.
            
            resolve();
        });
    },
};
