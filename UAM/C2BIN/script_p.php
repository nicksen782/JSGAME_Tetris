<?php
ini_set('register_argc_argv', 1);

// Input files:
$filesIn=[
	'../PROGMEM/tilesBG1.inc',
	'../PROGMEM/tilesSP1.inc',
	'../PROGMEM/tilesTX1.inc',
];

// Combined, minimized, output file.
$combinedFile2 = "../PROGMEM/_min_combined_alltilegraphics.inc";

// Make sure that the input files all exist.
for($i=0; $i<sizeof($filesIn) ; $i+=1){
	if(!file_exists($filesIn[$i] )){
		exit("An input file was missing: " . $filesIn[$i] . "\n");
	}
}

// Regular expressions to perform on each input file.
$regex = [
	// (pattern, replace)
	[ '/\r\n/'                             , "\n"   ] , // Normalize to Unix line endings.
	[ '/^\s*[\r\n]/m'                      , ""     ] , // Blank lines.
	[ '/const char/m'                      , ""     ] , // Remove const char
	[ '/PROGMEM/m'                         , ""     ] , // Remove PROGMEM
	[ '/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/m', ""     ] , // Single and Multi-line comments.
	[ '/\s*[#;].+$/m'                      , ""     ] , // Hash and Comma comments.
	[ '/  +/'                              , ""     ] , // ?? Multiple spaces (to become 0 spaces)
	[ '/^\s+|\s+$/'                        , ""     ] , // Strip leading and trailing spaces
	[ '/= /m'                              , "="    ] , // Remove "= "
	[ '/, /m'                              , ","    ] , // Remove ", "
	[ '/\n/m'                              , ""     ] , // Remove "\n"
	[ '/};/m'                              , "};\n" ] , // Add "\n" after "};"
	[ '/ /'                                , ""     ] , // Remove all spaces.
];

// Text of the output file.
$combinedFile_text="";

// Make the changes to the input files.
for($i=0; $i<sizeof($filesIn); $i+=1){
	// Bring file in.
	$data = file_get_contents($filesIn[$i]);

	// Do the regex.
	for($r=0; $r<sizeof($regex); $r+=1){
		// $data = preg_replace($patterns[$p], $replace[$p], $data);
		$data = preg_replace($regex[$r][0], $regex[$r][1], $data);
	}

	// Add this text to the combined text.
	$combinedFile_text .= $data . "\n";
}

// Output the combined text to a file.
file_put_contents( $combinedFile2, $combinedFile_text ) ;

echo "\n<pre>\n";
echo "\nfilesIn : \n";      print_r($filesIn);
echo "\ncombinedFile2 : \n"; print_r([$combinedFile2]);
echo "\n</pre>\n";

?>