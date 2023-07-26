_APP.debug.gs_title2 = {
    parent: null,
    gs: null,
    DOM: {},

    getVarsObj_vars: function(){
        let div   = this.DOM.debug_varsDiv;
        let table = this.DOM.debug_varsDiv.querySelector("table");
        let obj = {
            "NAME": "gs_title2 vars",
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
            this.gs = _APP.game.gamestates["gs_title2"];

            // Load in the DOM from meta.
            this.DOM = _JSG.loadedConfig.meta.debugDOM.gs_title2.DOM;
            await _JSG.shared.parseObjectStringDOM(this.DOM, false);

            // Event listeners.
            
            resolve();
        });
    },
};