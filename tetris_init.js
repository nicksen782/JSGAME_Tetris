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
        let ww_data = await _WEBW.videoModeA.video.returnInitTimes_send(true);
        console.log(
            `MAIN THREAD GFX INIT TIMINGS` +
            `\n  generateAndCache_tileSetData: ${_GFX.timeIt("generateAndCache_tileSetData", "get").toFixed(1).padStart(9, " ")} ms` +
            `\n  generateCanvasLayers        : ${_GFX.timeIt("generateCanvasLayers", "get").toFixed(1).padStart(9, " ")} ms` +
            `\n  initDraw                    : ${_GFX.timeIt("initDraw", "get").toFixed(1).padStart(9, " ")} ms` +
            `\n  initVRAM                    : ${_GFX.timeIt("initVRAM", "get").toFixed(1).padStart(9, " ")} ms` +
            // `\n  initVideo                   : ${_GFX.timeIt("initVideo", "get").toFixed(1).padStart(9, " ")} ms` +
            `\n  initFade                    : ${_GFX.timeIt("initFade", "get").toFixed(1).padStart(9, " ")} ms` +
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
            // `` +
            ``
        );
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