// FIRST MENU: INSTRUCTIONS, CONTROLS, GAME SETUP, HIGHSCORES, CREDITS

'use strict';

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

		// MENUS

		vars.menus = {
			"menuone"   : {
				"MENU":{"mx":5,"my":6,"mw":18,"mh":13,"menu":game.SHARED.menuStyle1},
				"TITLE": { "text":" MAKE A CHOICE", "x":1,"y":1 },
				"CURSOR":"cursor1",
				"OPTIONS"    : [
					{"cx":2,"cy":3 , "text":"INSTRUCTIONS", "tx":4,"ty":3 },
					{"cx":2,"cy":5 , "text":"CONTROLS"    , "tx":4,"ty":5 },
					{"cx":2,"cy":7 , "text":"GAME SETUP"  , "tx":4,"ty":7 },
					{"cx":2,"cy":9 , "text":"HIGH SCORES" , "tx":4,"ty":9 },
					{"cx":2,"cy":11, "text":"CREDITS"     , "tx":4,"ty":11},
				]
			},
		}
		vars.menu_keys = Object.keys(vars.menus);
		vars.currentMenuKey = "menuone";
		vars.menuSettings = {
			"menuone"  : {"option":2, "len":vars.menus["menuone"].OPTIONS.length},
		};
		vars.menu_visibility = {
			"menuone"  : true,
		};
		// Tile ids.
		vars.bg1_tile     = core.ASSETS.graphics.tilemaps["bg1_tile"][2];
		vars.bg2_tile     = core.ASSETS.graphics.tilemaps["bg2_tile"][2];
		vars.empty_square = core.ASSETS.graphics.tilemaps["empty_square"][2];
		vars.blacktile    = core.ASSETS.graphics.tilemaps["blacktile"][2];

		//
		vars.currentScreen="mainmenu";

		// Holds the indexs for the cursor sprites.
		vars.currSprite_indexes = {};

		// Indicates completion.
		vars.END = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		core.FUNCS.audio.stop_midi("BGM1", true);

		gs.show_mainMenu();
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){ return; }

		// Start of this game state?
		if(!vars.init){ vars.init=true; gs.init(); return; }

		// Run.
		if(vars.init){
			// Handle user input.

			// Still at the main menu?
			if(vars.currentScreen=="mainmenu"){
				// Handle cursor movements.
				if     ( game.chkBtn("BTN_DOWN"   , "btnPressed1") || game.chkBtn("BTN_RIGHT"   , "btnPressed1") ){
					// In bounds?
					if(! (vars.menuSettings[vars.currentMenuKey].option==vars.menuSettings[vars.currentMenuKey].len-1)){
						// Adjust the option index.
						vars.menuSettings[vars.currentMenuKey].option+=1;

						// Adjust the menu cursor and some other things.
						gs.menuCursorChange();
					}
				}

				else if( game.chkBtn("BTN_UP" , "btnPressed1") || game.chkBtn("BTN_LEFT"   , "btnPressed1") ){
					// In bounds?
					if(! (vars.menuSettings[vars.currentMenuKey].option==0)){
						// Adjust the option index.
						vars.menuSettings[vars.currentMenuKey].option-=1;

						// Adjust the menu cursor and some other things.
						gs.menuCursorChange();
					}
				}

				// gs.show_mainMenu

				// Pressed A? (confirm)
				else if( game.chkBtn("BTN_A"    , "btnPressed1") ){
					switch( vars.menuSettings[vars.currentMenuKey].option ){
						case 0 : { gs.show_instructions1(); break; } // "INSTRUCTIONS1"
						case 1 : { gs.show_controls();      break; } // "CONTROLS"
						case 2 : { gs.show_gameSetup();     break; } // "GAME SETUP"
						case 3 : { gs.show_highScores();    break; } // "HIGH SCORES"
						case 4 : { gs.show_credits();       break; } // "CREDITS"
					};
				}

				// Pressed B? (go back)
				else if( game.chkBtn("BTN_B"    , "btnPressed1") ){
					game.setGamestate1("TITLE2", true); // Setup screen 2
				}
			}
			else if(vars.currentScreen=="instructions1"){
				if     ( game.chkBtn("BTN_A"    , "btnPressed1") ){ gs.show_mainMenu(); }
				else if( game.chkBtn("BTN_B"    , "btnPressed1") ){ gs.show_mainMenu(); }
			}
			else if(vars.currentScreen=="controls"){
				if     ( game.chkBtn("BTN_A"    , "btnPressed1") ){ gs.show_mainMenu(); }
				else if( game.chkBtn("BTN_B"    , "btnPressed1") ){ gs.show_mainMenu(); }
			}
			else if(vars.currentScreen=="highScores"){
				if     ( game.chkBtn("BTN_A"    , "btnPressed1") ){ gs.show_mainMenu(); }
				else if( game.chkBtn("BTN_B"    , "btnPressed1") ){ gs.show_mainMenu(); }
			}
			else if(vars.currentScreen=="credits"){
				if     ( game.chkBtn("BTN_A"    , "btnPressed1") ){ gs.show_mainMenu(); }
				else if( game.chkBtn("BTN_B"    , "btnPressed1") ){ gs.show_mainMenu(); }
			}

		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	show_mainMenu(){
		let gs   = this;
		let vars = gs.vars;

		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		// Draw the border around the screen.
		game.SHARED.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, game.SHARED.menuStyle1, vars.empty_square);

		// Draw the menu title and box.
		vars.currentScreen="mainmenu";
		let x_mainmenu    = 7;
		let y_mainmenu    = 2;
		game.SHARED.drawMenu_box(x_mainmenu-1, y_mainmenu-1, 16, 3, game.SHARED.menuStyle1, vars.blacktile);
		let text_mainmenu = "-- MAIN MENU--";
		core.FUNCS.graphics.Print(x_mainmenu, y_mainmenu, text_mainmenu, "VRAM2");

		// Draw the menus.
		game.SHARED.drawMenus(gs);
	},
	//
	show_instructions1(){
		let gs   = this;
		let vars = gs.vars;

		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		// Draw the border around the screen.
		game.SHARED.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, game.SHARED.menuStyle1, vars.empty_square);

		// Draw the main menu title and box.
		vars.currentScreen="instructions1";
		let x_mainmenu    = 6;
		let y_mainmenu    = 2;
		game.SHARED.drawMenu_box(x_mainmenu-1, y_mainmenu-1, 18, 3, game.SHARED.menuStyle1, vars.blacktile);
		let text_mainmenu = "- INSTRUCTIONS -";
		core.FUNCS.graphics.Print(x_mainmenu, y_mainmenu, text_mainmenu, "VRAM2");

		// TEXT (break into individual words. Add a space after periods.)
		let text1 = (
			"Complete full lines using the blocks that come from the top. " +
			"You can complete up to 4 lines at once. "                                          +
			"You get more points for more lines cleared at a time. "                            +
			"Additionally, those points are multiplied depending on the current level. "        +
			""
		).split(" ");

		// Get the font map.
		let fontmap   = core.ASSETS.graphics.tilemaps[core.GRAPHICS.fontSettings.fontmap];

		// Draw the text.
		let xOffset = 2;
		let yOffset = 5;

		// Draw one character at a time. Handle line wrap.
		let x=0;
		let y=0;
		for(let i=0; i<text1.length; i+=1){
			// Get the word.
			let text = text1[i];

			// Will the word fit?
			if(x+text.length>=core.SETTINGS.VRAM_TILES_H-xOffset-1){ x=0; y+=2; }

			// Convert the word to an array. Add a space to the end.
			let arrText = Array.from(text); arrText.push(" ");

			// Go through each letter of the word. Convert to a tile id and draw it.
			arrText.map(
				function(d){
					let tileid = d.toUpperCase().charCodeAt() - 32;
					core.FUNCS.graphics.SetTile(x+xOffset, y+yOffset, fontmap[ tileid+2 ], "VRAM2");
					x+=1;
				}
			);
		}

	},
	//
	show_controls(){
		let gs   = this;
		let vars = gs.vars;

		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		// Draw the border around the screen.
		game.SHARED.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, game.SHARED.menuStyle1, vars.empty_square);

		// Draw the main menu title and box.
		vars.currentScreen="controls";
		let x_mainmenu    = 8;
		let y_mainmenu    = 2;
		game.SHARED.drawMenu_box(x_mainmenu-1, y_mainmenu-1, 14, 3, game.SHARED.menuStyle1, vars.blacktile);
		let text_mainmenu = "- CONTROLS -";
		core.FUNCS.graphics.Print(x_mainmenu, y_mainmenu, text_mainmenu, "VRAM2");

		// TEXT
		let text1 = [
			'-------- GAMEPAD -------' ,
			'' ,
			'A       = ROTATE  90 DEG' ,
			'B       = ROTATE -90 DEG' ,
			'SELECT  = UNUSED'         ,
			'START   = PAUSE/MENU'     ,
			'UP      = QUICK DROP'     ,
			'DOWN    = SLOW DROP'      ,
			'LEFT    = MOVE LEFT'      ,
			'RIGHT   = MOVE RIGHT'     ,
			'' ,
			'-------- KEYBOARD -------' ,
			'' ,
			'S       = ROTATE  90 DEG' ,
			'A       = ROTATE -90 DEG' ,
			'SPACE   = UNUSED'         ,
			'ENTER   = PAUSE/MENU'     ,
			'UP      = QUICK DROP'     ,
			'DOWN    = SLOW DROP'      ,
			'LEFT    = MOVE LEFT'      ,
			'RIGHT   = MOVE RIGHT'     ,
		];

		// Draw the text.
		let xOffset = 2;
		let yOffset = 5;
		for(let y=0; y<text1.length; y+=1){
			core.FUNCS.graphics.Print(xOffset, (y+yOffset), text1[y], "VRAM2");
		}

	},
	//
	show_highScores(){
		let gs   = this;
		let vars = gs.vars;

		// gs.show_mainMenu();
		// return;

		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		// Draw the border around the screen.
		// game.SHARED.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, game.SHARED.menuStyle1, vars.empty_square);
		game.SHARED.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, game.SHARED.menuStyle1, vars.blacktile);

		// Draw the main menu title and box.
		vars.currentScreen="highScores";
		let x_mainmenu    = 6;
		let y_mainmenu    = 2;
		game.SHARED.drawMenu_box(x_mainmenu-1, y_mainmenu-1, 18, 3, game.SHARED.menuStyle1, vars.blacktile);
		let text_mainmenu = "- HIGH  SCORES -";
		core.FUNCS.graphics.Print(x_mainmenu, y_mainmenu, text_mainmenu, "VRAM2");

		// Display the loading indicator.
		let str="...LOADING";
		let loading_x=((core.SETTINGS.VRAM_TILES_H-1) - str.length) ;
		let loading_y=((core.SETTINGS.VRAM_TILES_V-2));
		core.FUNCS.graphics.Print(loading_x, loading_y, str, "VRAM2");

		// Get the high scores.
		let prom = gs.getHighScores();

		// Display the high scores.
		prom.then(
			function(res){
				// Clear the loading indicator.
				core.FUNCS.graphics.Print(loading_x, loading_y, "          ", "VRAM2");

				// Update the display.
				let maxRecordsToDisplay=6;
				let startX=2;
				let startY=5;
				let y=0;
				let recsDisplayed=0;

				// If still on the high scores screen.
				if(vars.currentScreen=="highScores"){
					// Type A.
					core.FUNCS.graphics.Print_multiFont(
						startX+0, startY+y,
						{
							"text"  : "=======[ TYPE A ]=======" ,
							"font"  : "222222220000000022222222".split("").map(function(d){ return parseInt(d,10); }) ,
							"fonts" : [ "fonts1", "fonts2", "fonts3", "fonts4" ]
						},
						"VRAM2"
					);
					y+=1;

					core.FUNCS.graphics.Print(startX   , startY+y, "NAME     SCORE  LINES LV", "VRAM2", "fonts1"); y+=1;
					core.FUNCS.graphics.Print(startX   , startY+y, "========================", "VRAM2", "fonts3"); y+=1;
					y+=1;
					res.type_a.forEach(function(d){
						if(recsDisplayed >= maxRecordsToDisplay){ return; }
						let text = "" +
							(d.name            ).padEnd  (8," ") + " " +
							(d.score.toString()).padStart(6," ") + " " + " " +
							(d.lines.toString()).padEnd  (4," ") + " " +
							(d.level.toString()).padStart(2," ") + " " +
							""
						;
						core.FUNCS.graphics.Print(startX, startY+y, text, "VRAM2");
						y+=1;
						recsDisplayed+=1;
					});

					// Type B.
					recsDisplayed=0;
					y+=1;
					y+=1;
					core.FUNCS.graphics.Print_multiFont(
						startX+0, startY+y,
						{
							"text"  : "=======[ TYPE B ]=======" ,
							"font"  : "333333330000000033333333".split("").map(function(d){ return parseInt(d,10); }) ,
							"fonts" : [ "fonts1", "fonts2", "fonts3", "fonts4" ]
						},
						"VRAM2"
					);
					y+=1;
					core.FUNCS.graphics.Print(startX   , startY+y, "NAME     SCORE  LINES LV", "VRAM2", "fonts1"); y+=1;
					core.FUNCS.graphics.Print(startX   , startY+y, "========================", "VRAM2", "fonts4"); y+=1;
					y+=1;

					res.type_b.forEach(function(d){
						if(recsDisplayed >= maxRecordsToDisplay){ return; }
						let text = "" +
							(d.name            ).padEnd  (8," ") + " " +
							(d.score.toString()).padStart(6," ") + " " + " " +
							(d.lines.toString()).padEnd  (4," ") + " " +
							(d.level.toString()).padStart(2," ") + " " +
							""
						;
						core.FUNCS.graphics.Print(startX, startY+y, text, "VRAM2");
						y+=1;
						recsDisplayed+=1;
					});
				}

				// If not on the high scores screen anymore.
				else{
					console.log("The wrong sub-screen is currently active.");
					return;
				}
			},
			function(err){ console.log("err:", err); }
		);
	},
	//
	show_credits(){
		let gs   = this;
		let vars = gs.vars;

		core.FUNCS.graphics.clearSprites();
		core.FUNCS.graphics.ClearVram();

		// Draw the border around the screen.
		game.SHARED.drawMenu_box(0, 0, core.SETTINGS.VRAM_TILES_H, core.SETTINGS.VRAM_TILES_V, game.SHARED.menuStyle1, vars.empty_square);

		// Draw the main menu title and box.
		vars.currentScreen="credits";
		let x_mainmenu    = 8;
		let y_mainmenu    = 2;
		game.SHARED.drawMenu_box(x_mainmenu-1, y_mainmenu-1, 13, 3, game.SHARED.menuStyle1, vars.blacktile);
		let text_mainmenu = "- CREDITS -";
		core.FUNCS.graphics.Print(x_mainmenu, y_mainmenu, text_mainmenu, "VRAM2");

		// TEXT
		let text1 = [
			''                             ,
			''                             ,
			'        JSGAME PORT:'         ,
			''                             ,
			' NICK ANDERSEN (NICKSEN782)'  ,
			''                             ,
			''                             ,
			''                             ,
			''                             ,
			''                             ,
			'  ORIGINAL CONCEPT, DESIGN'   ,
			''                             ,
			'        AND PROGRAM'          ,
			''                             ,
			'    BY ALEXEY PAZHITNOV'      ,
			''                             ,
			'       TM AND C 1987'         ,
			''                             ,
			'  V/O ELECTRONORGTECHNICA'    ,
			''                             ,
			'         ("ELORG")'           ,
		];

		// Draw the text.
		let xOffset = 0;
		let yOffset = 5;
		for(let y=0; y<text1.length; y+=1){
			core.FUNCS.graphics.Print(xOffset, (y+yOffset), text1[y], "VRAM2");
		}
	},
	//
	show_gameSetup(){
		let gs   = this;
		let vars = gs.vars;

		vars.END = true;
		game.setGamestate1("SETUP2", true); // Setup screen 2
		return;
	},

	getHighScores(){
		let gs   = this;
		let vars = gs.vars;

		return new Promise(function(res,rej){
			// Ask the server for the high scores JSON file.
			let relative_gamedir = JSGAME.PRELOAD.PHP_VARS.relative_gamedir ;
			let url              = relative_gamedir+"/"+"highscores.json" ;
			let useGzip          = true ;
			let responseType     = "json" ;

			let prom = JSGAME.SHARED.getFile_fromUrl(url, useGzip, responseType);

			prom.then(
				function(data){ res(data); },
				function(err){ console.log("err:", err); }
			)

		});
	},

	// Used when the cursor moves within a menu.
	menuCursorChange : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Update the cursor position.
		game.SHARED.changeCursorState(vars.currentMenuKey, "ON",gs);

		// Play the cursor move sound.
		core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);
	},
};