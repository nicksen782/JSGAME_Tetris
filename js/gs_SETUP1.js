// (TODO) ---- FIRST MENU. INSTRUCTIONS, GAME SETUP, HIGHSCORES, CREDITS
game.gs.SETUP1 = {
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

		console.log("init");
		core.FUNCS.graphics.SetFont("fonts1"); // White
		// core.FUNCS.graphics.SetFont("fonts2"); // Dark gray.

		core.FUNCS.graphics.Print(8, 10, "INSTRUCTIONS", "VRAM2"); // INSTRUCTIONS
		core.FUNCS.graphics.Print(8, 12, "GAME SETUP"  , "VRAM2"); // GAME SETUP
		core.FUNCS.graphics.Print(8, 14, "HIGH SCORES" , "VRAM2"); // HIGH SCORES
		core.FUNCS.graphics.Print(8, 16, "CREDITS"     , "VRAM2"); // CREDITS

		vars.END = true;
		setTimeout(function(){
			game.setGamestate1("SETUP2"          , true); // Setup screen 2
		}, 1000);
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){ return; }

		// Start of this game state?
		if(!vars.init){
			vars.init=true;
			gs.init();
			return;
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