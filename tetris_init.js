// This should run AFTER the _APP.game.gameLoop.init.
_APP.game.init = async function(){
    // Border graphics.
    _APP.game.shared.borderTiles1 = {
        top  : _GFX.cache["tilesBG1"].tilemap.boardborder_top  [0].orgTilemap[2],
        topL : _GFX.cache["tilesBG1"].tilemap.boardborder_topL [0].orgTilemap[2],
        topR : _GFX.cache["tilesBG1"].tilemap.boardborder_topR [0].orgTilemap[2],
        bot  : _GFX.cache["tilesBG1"].tilemap.boardborder_bot  [0].orgTilemap[2],
        botL : _GFX.cache["tilesBG1"].tilemap.boardborder_botL [0].orgTilemap[2],
        botR : _GFX.cache["tilesBG1"].tilemap.boardborder_botR [0].orgTilemap[2],
        left : _GFX.cache["tilesBG1"].tilemap.boardborder_left [0].orgTilemap[2],
        right: _GFX.cache["tilesBG1"].tilemap.boardborder_right[0].orgTilemap[2],
    };

    // Request that fade tiles be created.
    if(!_GFX.config.fadeCreateAtStart){
        console.log("_GFX.config.fadeCreateAtStart was false. running initFadeSend(true).");
        await _WEBW.videoModeA.video.initFadeSend(true);
    }
    
    // Times:
    if(_GFX.config.debugGFX.returnInitTimes){
        setTimeout(async function(){
            let ww_data = await _WEBW.videoModeA.video.returnInitTimes_send(true);
            
            console.log(
                `GAMELOADER INIT TIMINGS` +
                `\n  GAMELOADER_init_TOTAL     : ${_GFX.timeIt("GAMELOADER_init_TOTAL", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    GAMELOADER_preInit      : ${_GFX.timeIt("GAMELOADER_preInit", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    GAMELOADER_getAppConfigs: ${_GFX.timeIt("GAMELOADER_getAppConfigs", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    GAMELOADER_loadFiles    : ${_GFX.timeIt("GAMELOADER_loadFiles", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    GAMELOADER_inits        : ${_GFX.timeIt("GAMELOADER_inits"    , "get").toFixed(1).padStart(9, " ")} ms` +
                // `` +
                ``
            );

            console.log(
                `MAIN THREAD GFX INIT TIMINGS` +
                `\n  VIDEOMODEA_INIT_TOTAL         : ${_GFX.timeIt("VIDEOMODEA_INIT_TOTAL", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    generateAndCache_tileSetData: ${_GFX.timeIt("generateAndCache_tileSetData", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n      tileSetData_fileDownloads : ${_GFX.timeIt("VIDEOMODEA_generateAndCache_tileSetData_fileDownloads", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    generateCanvasLayers        : ${_GFX.timeIt("generateCanvasLayers", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    initDraw                    : ${_GFX.timeIt("initDraw", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    initVRAM                    : ${_GFX.timeIt("initVRAM", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    initVideo                   : ${_GFX.timeIt("initVideo", "get").toFixed(1).padStart(9, " ")} ms` +
                `\n    initFade                    : ${_GFX.timeIt("initFade", "get").toFixed(1).padStart(9, " ")} ms` +
                // `` +
                ``
            );

            console.log(
                `WEBWORKER THREAD GFX INIT TIMINGS` +
                `\n  createCtxAndClears     : ${ww_data.createCtxAndClears.toFixed(1).padStart(9, " ")} ms` +
                `\n  createTilesetCanvases  : ${ww_data.createTilesetCanvases.toFixed(1).padStart(9, " ")} ms` +
                // `\n  fadeCreateAtStart      : ${ww_data.fadeCreateAtStart.toFixed(1).padStart(9, " ")} ms` +
                `\n  createFadeValues       : ${ww_data.createFadeValues.toFixed(1).padStart(9, " ")} ms` +
                `\n  convertAllFadeTilesets : ${ww_data.convertAllFadeTilesets.toFixed(1).padStart(9, " ")} ms` +
                `\n  DEBUG_generateAndReturnFadedTiles : ${ww_data.DEBUG_generateAndReturnFadedTiles.toFixed(1).padStart(9, " ")} ms` +
                // `` +
                ``
            );

            let keys = _APP.utility.timeIt("addFile_timer", "getBySimilarKey");
            let addFileStr = ``;
            let maxLen = 0;
            let totalTimeDownloadingFiles = 0;
            for(let key of keys){ if(key.length > maxLen){ maxLen = key.length; } }
            for(let key of keys){
                let time = _APP.utility.timeIt(key, "get");
                totalTimeDownloadingFiles += time;
                let key2 = key.replace("addFile_timer_", "");
                addFileStr  += `\n  ${key2.padEnd(maxLen-14, " ")}: ${time.toFixed(1).padStart(9, " ")} ms`; 
            }
            console.log(
                `FILE DOWNLOAD TIMINGS`, 
                addFileStr, 
                `\n  DOWNLOAD TIME: ${totalTimeDownloadingFiles.toFixed(1).padStart(9, " ")} ms` +
                // `` +
                ``
            );
        }, 1000);
    }

    // // Display the fade tiles in the TESTS tab. 
    // if(_GFX.config.debugGFX.generateAndReturnFadedTiles == true){
    //     // BUG: This appears to permanently mess up the framerate once drawn.
    //     await new Promise( 
    //         async (res,rej)=>{ 
    //             await _APP.debug.tests.displayFadedTileset(); 
    //             res(); 
    //         } 
    //     );
    // }

};