// (TODO) ---- NICKSEN782 ANIMATION
game.gs.TITLE0 = {
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

			game.setGamestate1("TITLE1", true);
			vars.END = true;

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