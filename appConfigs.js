// This is the main config file for the game and any plug-ins. 
( async function(){
    // "DOM": {
    //     "gameDiv"             : "jsgame_app",
    //     "lobbyDiv"            : "jsgame_lobby",
    //     "gameContDiv"         : "InputTester_app",
    //     "app_game"            : "InputTester_app_game",
    //     "preload_canvas"      : "InputTester_app_game_preload"
    // },

    _APP.configObj = {
        // INFO: _APP.game
        gameInfo: {
            "repo":{
                "author_title" : "JSGAME_Tetris",
                "author_C"     : true,
                "author_year"  : "2022",
                "author_name"  : "Nickolas Andersen",
                "author_handle": "(nicksen782)",
                "repoType"     : "Github",
                "repoHref"     : "https://github.com/nicksen782/JSGAME_Tetris/tree/v2",
                "repoText"     : "nicksen782/JSGAME_Tetris/tree/v2"
            }
        },
        OLDCONFIG: {
            "meta":{
                "debug": false,
                "debugDOM": {
                    "nav":{
                        "defaultTabKey": "debug1",
                        "DOM":{
                            "tabs": {
                                "gs_title0"    : "tetris_app_debug_nav_tab_debug_gs_title0",
                                "gs_title1"    : "tetris_app_debug_nav_tab_debug_gs_title1",
                                "gs_title2"    : "tetris_app_debug_nav_tab_debug_gs_title2",
                                "gs_setup1"    : "tetris_app_debug_nav_tab_debug_gs_setup1",
                                "gs_setup2"    : "tetris_app_debug_nav_tab_debug_gs_setup2",
                                "gs_play"      : "tetris_app_debug_nav_tab_debug_gs_play",
                                "gs_highscores": "tetris_app_debug_nav_tab_debug_gs_highscores",
                                "debug1"       : "tetris_app_debug_nav_tab_debug1",
                                "tests"        : "tetris_app_debug_nav_tab_tests"
                            },
                            "views": {
                                "gs_title0"    : "tetris_app_debug_nav_view_debug_gs_title0",
                                "gs_title1"    : "tetris_app_debug_nav_view_debug_gs_title1",
                                "gs_title2"    : "tetris_app_debug_nav_view_debug_gs_title2",
                                "gs_setup1"    : "tetris_app_debug_nav_view_debug_gs_setup1",
                                "gs_setup2"    : "tetris_app_debug_nav_view_debug_gs_setup2",
                                "gs_play"      : "tetris_app_debug_nav_view_debug_gs_play",
                                "gs_highscores": "tetris_app_debug_nav_view_debug_gs_highscores",
                                "debug1"       : "tetris_app_debug_nav_view_debug1",
                                "tests"        : "tetris_app_debug_nav_view_tests"
                            }
                        }
                    },
                    "gameLoop":{
                        "DOM": {
                            "togglePauseBtn"       : "tetris_app_debug_gameLoopVars_togglePauseBtn",
                            "restartBtn"             : "tetris_app_debug_gameLoopVars_restartBtn",
                            "toggleLoopType_btn"   : "tetris_app_debug_gameLoopVars_toggleLoopType_btn",
                            "gamestateSelect"      : "tetris_app_debug_gameLoopVars_gamestateSelect",
                            "gameLoopVars_div1"    : "tetris_app_debug_gameLoopVars_div1",
                            "gameLoopVars_div2"    : "tetris_app_debug_gameLoopVars_div2",
                            "gameLoopVars_div4"    : "tetris_app_debug_gameLoopVars_div4",
                            "gameDebugDiv_timeIt"  : "tetris_app_debug_gameDebugDiv_timeIt"
                        }
                    },
                    "main":{
                        "DOM": {
                        }
                    },
                    "tests":{
                        "DOM": {
                            "fade_slider_text": "tetris_app_debug_fade_slider_text",
                            "fade_slider": "tetris_app_debug_fade_slider",
                            "fadeLevels": "tetris_app_debug_fadeLevels",
                            "fadeTiles" : "tetris_app_debug_fadeTiles",
                            
                            "VRAM_copy"    : "tetris_app_debug_VRAM_copy",
                            "VRAM0_div"    : "tetris_app_debug_VRAM0_div",
                            "VRAM1_div"    : "tetris_app_debug_VRAM1_div",
                            "VRAM2_div"    : "tetris_app_debug_VRAM2_div",
                            "VRAM0_canvas" : "tetris_app_debug_VRAM0_canvas",
                            "VRAM1_canvas" : "tetris_app_debug_VRAM1_canvas",
                            "VRAM2_canvas" : "tetris_app_debug_VRAM2_canvas",
                            
                            "VRAM0_saved_div"   : "tetris_app_debug_VRAM0_saved_div",
                            "VRAM1_saved_div"   : "tetris_app_debug_VRAM1_saved_div",
                            "VRAM2_saved_div"   : "tetris_app_debug_VRAM2_saved_div",
                            "VRAM0_saved_canvas": "tetris_app_debug_VRAM0_saved_canvas",
                            "VRAM1_saved_canvas": "tetris_app_debug_VRAM1_saved_canvas",
                            "VRAM2_saved_canvas": "tetris_app_debug_VRAM2_saved_canvas"
                        }
                    },
                    "gs_title0":{
                        "DOM": {
                            "gs0_anim_jsgameLogo": "tetris_app_debug_gs0_anim_jsgameLogo",
                            "gs0_debug_vars": "tetris_app_debug_gs0_debug_vars"
                        }
                    },
                    "gs_title1":{
                        "DOM": {
                            "tetris_app_debug_anim_lense": "tetris_app_debug_anim_lense",
                            "tetris_app_debug_anim_stars": "tetris_app_debug_anim_stars",
                            "tetris_app_debug_vars": "tetris_app_debug_vars",
                            "tetris_app_debug_vars2": "tetris_app_debug_vars2"
                        }
                    },
                    "gs_title2":{
                        "DOM": {
                            "debug_varsDiv": "tetris_app_gs2_debug_varsDiv"
                        }
                    },
                    "gs_play":{
                        "DOM": {
                            "data_p1": "tetris_app_debug_data_p1",
                            "data_p2": "tetris_app_debug_data_p2",
                            "config" : "tetris_app_debug_config",
                            "pieces" : "tetris_app_debug_pieces"
                        }
                    }
                },
            },
        },

        // CONFIG: _APP.game
        gameConfig: {
            enabled: true,
            debug  : false,
            
            // Used as the document root (For the JSGAME loader.)
            appRelPath: "JSGAME_Tetris", 

            // Used for display.
            appNameText: "JSGAME: Tetris", 

            files:[
                // { "f":"tetris.css"                     , "t":"css"  , "n":"tetris_css"       },
                // { "f":"tetris.html"                    , "t":"html" , "n":"tetris_html"      },
                
                { "f":"tetris_main.js"                 , "t":"js"   , "n":"tetris_main"      },
                { "f":"tetris_SHARED.js"               , "t":"js"   , "n":"tetris_SHARED"    },
                
                { "f":"gamestates/tetris_gs_title0.js" , "t":"js"   , "n":"tetris_gs_title0" },
                { "f":"gamestates/tetris_gs_title1.js" , "t":"js"   , "n":"tetris_gs_title1" },
                { "f":"gamestates/tetris_gs_title2.js" , "t":"js"   , "n":"tetris_gs_title2" },
                { "f":"gamestates/tetris_gs_play.js"   , "t":"js"   , "n":"tetris_gs_play"   },
                { "f":"gamestates/tetris_data.js"      , "t":"js"   , "n":"tetris_data"      },
                
                { "f":"tetris_init.js"      , "t":"js"   , "n":"tetris_init"      },
            ],
            debugFiles:[
                // { f:"GAME/debug.js" , t:"js"  },
                // { f:"GAME/debug.css", t:"css" },
            ],
    
            // First gamestate1.
            // firstGamestate1:"gs_JSG",
            firstGamestate1:"gs_title0",
    
            // First gamestate2.
            firstGamestate2:"",
        },
    
        // CONFIG: _GFX
        gfxConfig: {
            enabled: true,
            debug  : false,
    
            files:[
                { f:"/SHARED/VIDEO_A/videoModeA.css"     , t:"css" },
                { f:"/SHARED/VIDEO_A/videoModeA_core.js" , t:"js" },
                { f:"/SHARED/VIDEO_A/videoModeA_user.js" , t:"js" },
            ],
            debugFiles:[
                // { f:"/SHARED/VIDEO_A/videoModeA_debug.js"  , t:"js"  },
            ],
            debugFiles2:[
                // { f:"/SHARED/VIDEO_A/debug.html", t:"html", destId: "navView_gfx_debug" },
            ],
            webWorker: "/SHARED/VIDEO_A/videoModeA_webworker.js",

            // Shared dimensions for each layer.
            dimensions: {
                "pointersSize" : 8,
                "tileWidth" : 8,
                "tileHeight": 8,
                "rows":32, 
                "cols":32
            },
    
            // Layer config.
            layers:[
                { "name": "BG1" , "canvasOptions": { "alpha": true }, "bg_color":"#000000" },
                { "name": "SP1" , "canvasOptions": { "alpha": true }, "bg_color":"" },
                { "name": "TEXT", "canvasOptions": { "alpha": true }, "bg_color":"" }
            ],

            // Container for the canvas layers.
            outputDiv: "gameView",
            
            // Element id to make full screen.
            // fullScreenElemId: "gameView",
            fullScreenElemId: "wrapper",
    
            "jsgame_shared_plugins_config":{
                "videoModeA": {
                    "fadeCreateAtStart": true,
                    "debugGFX":{
                        "generateAndReturnFadedTiles": false,
                        "recordPrevChanges"          : true,
                        "returnInitTimes":  true,
                    }
                },
            },

            // Relative paths need to be relative to the appRoot. The WebWorker will resolve the path correctly.
            tilesets: [
                "tilesBG1",
                "tilesSP1",
                "tilesTX1",
                "tilesTX2",
                "tilesMISC",
                "tilesG1",
                "tilesLOAD",
            ],
            tilesetFiles: [
                "UAM/JSON/tilesBG1.json",
                "UAM/JSON/tilesG1.json",
                "UAM/JSON/tilesLOAD.json",
                "UAM/JSON/tilesMISC.json",
                "UAM/JSON/tilesSP1.json",
                "UAM/JSON/tilesTX1.json",
                "UAM/JSON/tilesTX2.json",
            ],
    
            tabConfig: {
                destTabs   : "mainNavMenu_ul",
                destViews  : "mainNavMenuViews",
            //     destTabId  : "navTab_inputConfig",
            //     destViewId : "navView_inputConfig",
            //     destTabId2 : "navTab_input",
            //     destViewId2: "navView_input",
            },
        },
    
        // CONFIG: _INPUT
        inputConfig: {
            enabled: true,
            debug  : false,
    
            files:[
                { f: "/SHARED/INPUT_A/inputModeA_core.js"      , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_user.js"      , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_mappings.js"  , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_web.js"       , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_web.css"      , t:"css" },
                { f: "/SHARED/INPUT_A/inputModeA_customized.js", t:"js"  },
            ],
            files2: [
                { f: "/SHARED/INPUT_A/inputModeA_web.html"     , t:"html", type:"webConfig" },
            ],
            debugFiles:[
                // { f: "INPUT_A/debug.js" , t:"js"  },
                // { f: "INPUT_A/debug.css", t:"css" },
            ],
            debugFiles2:[
            ],
    
            useKeyboard   : true, 
            useGamepads   : true,
            listeningElems: ["gameView", "navView_input"],
            webElem       : "navView_inputConfig",
            liveGamepadsDestId: "navView_input",
            tabConfig: {
                destTabs   : "mainNavMenu_ul",
                destViews  : "mainNavMenuViews",
                destTabId  : "navTab_inputConfig",
                destViewId : "navView_inputConfig",
                destTabId2 : "navTab_input",
                destViewId2: "navView_input",
            },
        },
    
        // CONFIG: _SND
        soundConfig: {
            enabled: false,
            debug  : false,
    
            files:[
                // { f:"/SHARED//SOUND_B/soundModeB_core.js", t:"js"  },
                // { f:"/SHARED//SOUND_B/soundModeB_user.js", t:"js"  },
                // { f:"/SHARED//SOUND_B/soundModeB.css", t:"css"  },
            ],
            debugFiles:[
                // { f:"/SHARED//SOUND_B/debug.js" , t:"js"  },
                // { f:"/SHARED//SOUND_B/debug.css", t:"css" },
            ],
            debugFiles2:[
            ],
    
            interActionNeededId      : "audio_userInputNeeded_container",
            blockLoopIfSoundNotLoaded: false,
        },

        // Detects little or big endianness for the browser.
        endianness : {
            isBigEndian    : new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12 ? true : false, // ARM?
            isLittleEndian : new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78 ? true : false, // x86
        },

        // List of config keys.
        configKeys: ["gfxConfig", "inputConfig", "soundConfig", "gameConfig"],
    };
})();