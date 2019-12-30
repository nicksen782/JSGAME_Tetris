// *** TEMPLATE GAMESTATE FUNCTION ***

// GAMESTATE TEMPLATE
game.gs.TEMPLATE = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	prepareState : function(){
		let gs   = this;
		let vars = gs.vars;
		vars.init=false;
		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		vars.END = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){
			return;
		}

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;

			// vars.END = true;
		}

		// Run.
		if(vars.init){
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	EXAMPLE : function( VALUE ){
		let gs    = this;
		let vars  = gs.vars;
	},
};