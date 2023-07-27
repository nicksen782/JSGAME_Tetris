const fs = require('fs').promises;
const path = require('path'); 

process.chdir(__dirname);
// console.log(process.cwd());

// Get tile data from rgba array.
// const getTileData = function(imageData, canvasWidth, x, y, tileWidth, tileHeight) {
//     let tileData = new Uint8ClampedArray(tileWidth * tileHeight * 4);
//     for (let row = 0; row < tileHeight; row++) {
//         let sourcePos = ((y + row) * canvasWidth + x) * 4;
//         let destPos = row * tileWidth * 4;
//         for (let col = 0; col < tileWidth; col++) {
//             tileData[destPos++] = imageData[sourcePos++];
//             tileData[destPos++] = imageData[sourcePos++];
//             tileData[destPos++] = imageData[sourcePos++];
//             tileData[destPos++] = imageData[sourcePos++];
//         }
//     }
//     return tileData;
// };

// const updateTileData = function(data, canvasWidth, x, y, tileWidth, tileHeight, tileData) {
// 	for (let row = 0; row < tileHeight; row++) {
// 		let sourcePos = row * tileWidth * 4;
// 		let destPos = ((y + row) * canvasWidth + x) * 4;
// 		for (let col = 0; col < tileWidth; col++) {
// 			data[destPos++] = tileData[sourcePos++];
// 			data[destPos++] = tileData[sourcePos++];
// 			data[destPos++] = tileData[sourcePos++];
// 			data[destPos++] = tileData[sourcePos++];
// 		}
// 	}
// };

let test2 = {
    // An array of tileset names.
    tilesetNames:[],

    // Tileset data. (Keyed by tileset name.)
    tilesets: {},

    // Where the .json file are.
    targetPath: "../JSON",
    
    fadeObj: {
        consts: {
            // Fade table created by tim1724 
            // http://uzebox.org/forums/viewtopic.php?p=2232#p2232
            // https://github.com/Uzebox/uzebox/blob/88991dbd76d3dd8590c1e18a47be0f7169049294/kernel/uzeboxVideoEngine.c#L259
            srcFadeTable: [
                //    // INDEX // DEC // B G R // BB GGG RRR // B%  G%  R%  
                0x00, //     0 // 0   // 0 0 0 // 00 000 000 // 0   0   0   
                0x40, //     1 // 64  // 1 0 0 // 01 000 000 // 33  0   0   
                0x88, //     2 // 136 // 2 1 0 // 10 001 000 // 66  14  0   
                0x91, //     3 // 145 // 2 2 1 // 10 010 001 // 66  28  14  
                0xD2, //     4 // 210 // 3 2 2 // 11 010 010 // 100 28  28  
                0xE4, //     5 // 228 // 3 4 4 // 11 100 100 // 100 57  57  
                0xAD, //     6 // 173 // 2 5 5 // 10 101 101 // 66  71  71  
                0xB5, //     7 // 181 // 2 6 5 // 10 110 101 // 66  85  71  
                0xB6, //     8 // 182 // 2 6 6 // 10 110 110 // 66  85  85  
                0xBE, //     9 // 190 // 2 7 6 // 10 111 110 // 66  100 85  
                0xBF, //    10 // 191 // 2 7 7 // 10 111 111 // 66  100 100 
                0xFF, //    11 // 255 // 3 7 7 // 11 111 111 // 100 100 100 
            ],
            
            // Modified srcFadeTable for max red/green/blue percentages of full by nicksen782.
            // Created by: createFadeValues.
            fadeTable: [],
        },
        createFadeValues: function(){
            let src = this.consts.srcFadeTable;
            let b,g,r;

            for(let i=0, l=src.length; i<l; i+=1){
                // console.log( {
                //     "index:"      : i,
                //     "hex_string"  : "0x"+src[i].toString(16).toUpperCase().padStart(2, "0"), 
                //     "dec"         : src[i], 
                //     "bin_string_b": ( (src[i] & 0b11000000) >> 6 ).toString(2).padStart(2, "0"), 
                //     "bin_string_g": ( (src[i] & 0b00111000) >> 3 ).toString(2).padStart(3, "0"), 
                //     "bin_string_r": ( (src[i] & 0b00000111) >> 0 ).toString(2).padStart(3, "0"),
                // } );

                // Add the values in reverse order (round down to the nearest whole integer).
                b = ( ( ( ( src[i] & 0b11000000 ) >> 6) / 3 ) * 100 ) << 0;
                g = ( ( ( ( src[i] & 0b00111000 ) >> 3) / 7 ) * 100 ) << 0;
                r = ( ( ( ( src[i] & 0b00000111 ) >> 0) / 7 ) * 100 ) << 0;
                this.consts.fadeTable.unshift( new Uint8ClampedArray([ b, g, r ]) );
            }
        },
    },

    getDataAndConvert: async function(){
        // Get the file extension from a filename string. (uses the last "." for the extension.)
        const getFileExtension = function(filename) {
            const parts = filename.split('.');
            return parts[parts.length - 1];
        };
        // Converts rgb332 pixel to rgb32 object.
        const rgb332_to_rgb32 = function(rgb332_byte) {
            let nR = ( ((rgb332_byte >> 0) & 0b00000111) * (255 / 7) ) << 0; // red
            let nG = ( ((rgb332_byte >> 3) & 0b00000111) * (255 / 7) ) << 0; // green
            let nB = ( ((rgb332_byte >> 6) & 0b00000011) * (255 / 3) ) << 0; // blue
            return { r: nR, g: nG, b: nB, a: 255 };
        };
        // Convert rgb32 object to rgb332 pixel.
        const rgb32_to_RGB332 = function(R, G, B, A, translucent_color){
            if(A==0){ return translucent_color; }
            // Convert the RGB value to RGB332 as hex string. (Jubation)
            // #define SQ_COLOR8(r, g, b) (((r >> 5) & 0x07U) | ((g >> 2) & 0x38U) | ((b) & 0xC0U))
            // var index = ((R >> 5) & 0x07) | ((G >> 2) & 0x38) | ((B) & 0xC0);

            // Convert the RGB value to RGB332 as hex string. (original)
            var rgb332 = (B & 0xc0) + ((G >> 2) & 0x38) + (R >> 5);

            return rgb332;
        };

        // Get the list of .json files in ../JSON.
        const files = await fs.readdir(this.targetPath);

        for(let i=0; i<files.length; i+=1){
            // Get the next file from the list.
            let file = files[i];
            // if(file != "sprite_tiles.json"){ continue; }
    
            // Get the file extension. 
            let ext = getFileExtension(file).toLowerCase();
    
            // Skip this file if the extension is NOT "json".
            if(ext != "json"){ continue; }

            console.log(`  Tileset file: ${file}`);
    
            // Create the absolute filepath for the file.
            let filepath = path.join(this.targetPath, file);
            
            // Read in the file and parse the JSON.
            let fileJson = await fs.readFile(filepath, "utf8");
            fileJson = JSON.parse(fileJson);
            
            // Create the arrays for the fadeTilesets.
            fileJson.fadeTileset = [];
            for(let levelI=0, levelL=this.fadeObj.consts.fadeTable.length; levelI<levelL; levelI+=1){
                // Skip the creation of the full color and black version of the tile (save some RAM since the draw2logic can already handle this.)
                if(levelI == 0 || levelI == this.fadeObj.consts.fadeTable.length -1){ continue; }
                fileJson.fadeTileset.push([]);
            }

            // Parse the JSON tileset tiles back to an array:
            let tw = fileJson.config.tileWidth;
            let th = fileJson.config.tileHeight;
            let translucent_color = fileJson.config.translucent_color;
            for(let tileIndex=0; tileIndex<fileJson.tileset.length; tileIndex+=1){
                // Get the tile.
                let srcTile = JSON.parse(fileJson.tileset[tileIndex]);
                
                // Create the rgba32 version of the tile. 
                let rgb332Tile = new Uint8ClampedArray(tw*th);
                let rgba32Tile = new Uint8ClampedArray(tw*th*4);
                let index = 0;
                let transParentPixelCount = 0;
                for(let j = 0; j < srcTile.length; j++){
                    let d = srcTile[j];
                    if (d === translucent_color) {
                        transParentPixelCount++;
                        rgba32Tile[index+0] = 0;
                        rgba32Tile[index+1] = 0;
                        rgba32Tile[index+2] = 0;
                        rgba32Tile[index+3] = 0;

                        // rgba32Tile[index+3] = 0;
                        // rgba32Tile[index+2] = 0;
                        // rgba32Tile[index+1] = 0;
                        // rgba32Tile[index+0] = 0;
                    } else {
                        // console.log("!");
                        let rgba = Object.values(rgb332_to_rgb32(d));
                        rgba32Tile[index+0] = rgba[0];
                        rgba32Tile[index+1] = rgba[1];
                        rgba32Tile[index+2] = rgba[2];
                        rgba32Tile[index+3] = rgba[3];

                        // rgba32Tile[index+3] = rgba[3];
                        // rgba32Tile[index+2] = rgba[2];
                        // rgba32Tile[index+1] = rgba[1];
                        // rgba32Tile[index+0] = rgba[0];
                    }
                    index+=4;
                }
                if(transParentPixelCount == srcTile.length){
                    // console.log(file, tileIndex, `transparent: ${transParentPixelCount} of ${srcTile.length} (FULL TRANSPARENT)`);
                }
                else{
                    // console.log(file, tileIndex, `transparent: ${transParentPixelCount} of ${srcTile.length}`);
                }

                // Create a version of this tile for each fade level.
                for(let levelI=0, levelL=this.fadeObj.consts.fadeTable.length; levelI<levelL; levelI+=1){
                    // Skip the creation of the full color and black version of the tile (save some RAM since the draw2logic can already handle this.)
                    if(levelI == 0 || levelI == this.fadeObj.consts.fadeTable.length -1){ continue; }

                    // Get the max for red, green, and blue fade level values.
                    let fadeColorObj = this.fadeObj.consts.fadeTable[levelI];
                    let maxRed   = fadeColorObj[2] / 100; // 
                    let maxGreen = fadeColorObj[1] / 100; // 
                    let maxBlue  = fadeColorObj[0] / 100; // 

                    // Create empty typed array for the rgba32 data.
                    let len = tw*th*4;
                    let uint8c = new Uint8ClampedArray(len);

                    // Convert the tileset_ImageData into the new fadeImageData.
                    for(let i=0; i<len; i+=4){
                        uint8c[i+0] = (rgba32Tile[i+0] * maxRed  ) << 0;
                        uint8c[i+1] = (rgba32Tile[i+1] * maxGreen) << 0;
                        uint8c[i+2] = (rgba32Tile[i+2] * maxBlue)  << 0;
                        uint8c[i+3] = (rgba32Tile[i+3]          )  << 0;
                    }
                    
                    // Convert the tile back to rgb332.
                    let rgb332_index = 0;
                    for(let i=0; i<len; i+=4){
                        let rgb332Byte = rgb32_to_RGB332(
                            uint8c[i+0], // R
                            uint8c[i+1], // G
                            uint8c[i+2], // B
                            uint8c[i+3], // A
                            fileJson.config.translucent_color
                        );
                        rgb332Tile[rgb332_index] = rgb332Byte;
                        // console.log(len, "rgb332Byte:", uint8c[i+0],uint8c[i+1],uint8c[i+2],uint8c[i+3], rgb332Byte);
                        rgb332_index += 1;
                    }

                    // Add the tile to this tileset's fade level.
                    fileJson.fadeTileset[levelI-1].push(
                        JSON.stringify(Array.from(rgb332Tile))
                    );
                }
            }
            
            // Add the tileset name to the list of tilesets.
            this.tilesetNames.push(fileJson.tilesetName);
            
            // Now we write back the file. 
            // this[fileJson.tilesetName] = fileJson; 
            // fs.writeFile(`${fileJson.tilesetName}_X.json`, JSON.stringify(fileJson,null,1));
            fs.writeFile(`${filepath}`, JSON.stringify(fileJson,null,1));
    
            // // Create the data for the tileset.
            // this.tilesets[ fileJson.tilesetName ] = {
            //     'config'      : fileJson['config'],
            //     'tilesetName' : fileJson['tilesetName'],
            //     'tileset'     : fileJson.tileset,
            // };
        }
    },
};


// Creates rgba32 data with data created by 'prepTilesetData.'
async function OLDcreateRgbaTilesetData(){
    // For each tile I need a UInt8Clamped typed array of dimensions width*tw * height*th.
    // Then I need to convert each tile value from rgb332 to rgb32 and save to the typed array.
    // Save the tile object with the full width and height (width*tw, height*th) and the typed data itself.
    // Each tile should be exactly tw*th * 4 bytes.

    // Converts rgb332 pixel to rgb32 object.
    const rgb332_to_rgb32 = function(rgb332_byte) {
        let nR = ( ((rgb332_byte >> 0) & 0b00000111) * (255 / 7) ) << 0; // red
        let nG = ( ((rgb332_byte >> 3) & 0b00000111) * (255 / 7) ) << 0; // green
        let nB = ( ((rgb332_byte >> 6) & 0b00000011) * (255 / 3) ) << 0; // blue
        return { r: nR, g: nG, b: nB, a: 255 };
    };



    // Convert rgb332 tiles to rgba. Creates an object for each tile that can be used to create ImageData later.
    let tileset = "bg_tiles";
    let tileLen = _GFX.tilesets[tileset].config.tileWidth * _GFX.tilesets[tileset].config.tileHeight;
    for(let i=0; i<_GFX.org[tileset].tileset.length; i+=1){
        let transParentPixelCount = 0; 
        let tileArray = new Array(tileLen * 4);

        for(let j = 0; j < _GFX.org[tileset].tileset[i].length; j++){
            let d = _GFX.org[tileset].tileset[i][j];
            if (d === _GFX.tilesets[tileset].config.translucent_color) {
                transParentPixelCount++;
                tileArray.push([0, 0, 0, 0]);
            } else {
                tileArray.push(Object.values(rgb332_to_rgb32(d)));
            }
        }

        const uintc8 = new Uint8ClampedArray(tileArray.flat());
    
        let tileData = {
            widthPx           : _GFX.tilesets[tileset].config.tileWidth,
            heightPx          : _GFX.tilesets[tileset].config.tileHeight,
            widthTiles        : 1,
            heightTiles       : 1,
            isFullyTransparent: transParentPixelCount == tileLen,
            data              : uintc8,
        };

        _GFX.convert1[tileset].tileset.push(tileData);

        // if(tileData.isFullyTransparent || i<2){
            // console.log(tileData);
        // }
    }




    // "Draw" the tilemaps from the converted tiles.
    for(let map in _GFX.org[tileset].tilemaps){
        // fileJson.tilemaps[map] = JSON.parse(fileJson.tilemaps[map]);
        let tilemap = _GFX.org[tileset].tilemaps[map];
        // console.log(map, tilemap);
        let w = tilemap[0];
        let h = tilemap[1];
        let tw = _GFX.tilesets[tileset].config.tileWidth;
        let th = _GFX.tilesets[tileset].config.tileHeight;

        // let tileArray = new Array(tileLen * 4);
        const uintc8 = new Uint8ClampedArray( (w*tw) * (h*tw) * 4 );
        let newTileMap = {
            widthPx    : w * tw,
            heightPx   : h * th,
            widthTiles : w,
            heightTiles: h,
            data        : uintc8,
        };

        let index = 2;
        for(let y=0; y<h; y+=1){
            for(let x=0; x<w; x+=1){
                let tileId =  tilemap[index];
                let tileData = _GFX.convert1[tileset].tileset[tileId].data;
                updateTileData(uintc8, (w*tw), x, y, tw, th, tileData);
                index += 1 ;
            }
        }
        // _GFX.convert1[tileset].tilemaps[map] = JSON.stringify(newTileMap);
        _GFX.convert1[tileset].tilemaps[map] = newTileMap;
    }
    
    // for(let j = 0; j < _GFX.org[tileset].tileset[i].length; j++){
    //     _GFX.org[tileset].tileset[i] = JSON.stringify(_GFX.org[tileset].tileset[i]);
    // }

    // fs.writeFile("donetest.json", JSON.stringify(_GFX.convert1[tileset],null,1));
    // console.log(_GFX.convert1[tileset].tileset[0]);
}

(async function(){
    let ts = performance.now();

    let ts3 = performance.now();
    try { test2.fadeObj.createFadeValues(); } catch (err) { console.error("test2.fadeObj.createFadeValues():", err); }
    let ts3e = performance.now() - ts3;

    let ts5 = performance.now();
    try { await test2.getDataAndConvert(); } catch (err) { console.error("test2.getDataAndConvert:", err); }
    let ts5e = performance.now() - ts5;
    
    let tse = performance.now() - ts;

    console.log(`TIME : createFadeValues : ${ts3e.toFixed(2)} ms`);
    console.log(`TIME : getDataAndConvert: ${ts5e.toFixed(2)} ms`);
    console.log(`   TOTAL:, ${tse.toFixed(2)} ms`);

    console.log("done");
})();
