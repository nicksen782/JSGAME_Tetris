_APP.debug.gs_title0 = {
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
            obj._f_tilemap = anim.frames[anim.currentFrameIndex].tmn;
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
            this.DOM = _APP.configObj.OLDCONFIG.meta.debugDOM.gs_title0.DOM;
            await _JSG.shared.parseObjectStringDOM(this.DOM, false);

            resolve();
        });
    },

};