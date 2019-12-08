<?php
ini_set('register_argc_argv', 1);

$filesIn=[
	'../PROGMEM/tilesBG1.inc',
	'../PROGMEM/tilesSP1.inc',
	'../PROGMEM/tilesTX1.inc',
];

$filesOut=[
	'../PROGMEM/_min_tilesBG1.inc',
	'../PROGMEM/_min_tilesSP1.inc',
	'../PROGMEM/_min_tilesTX1.inc',
];

$combinedFile1 = "../PROGMEM/_min_combined_alltilegraphics.inc";
$combinedFile2 = "../PROGMEM/_min_combined_alltilegraphics.txt";

$patterns = array (
	'/\r\n/'                              , // Normalize to Unix line endings.
	'/^\s*[\r\n]/m'                       , // Blank lines.
	'/const char/m'                       , // Remove const char
	'/PROGMEM/m'                          , // Remove PROGMEM
	'/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/m' , // Single and Multi-line comments.
	'/\s*[#;].+$/m'                       , // Hash and Comma comments.
	'/  +/'                               , // ?? Multiple spaces (to become 0 spaces)
	'/^\s+|\s+$/'                         , // Strip leading and trailing spaces
	'/= /m'                               , // Remove "= "
	'/, /m'                               , // Remove ", "
	'/\n/m'                               , // Remove "\n"
	'/};/m'                               , // Add "\n" after "};"
	'/ /'                                 , // Remove all spaces.
);

$replace  = array (
	"\n"    , // Normalize to Unix line endings.
	""      , // Blank lines.
	""      , // Remove const char
	""      , // Remove PROGMEM
	""      , // Single and Multi-line comments.
	""      , // Hash and Comma comments.
	""      , // ?? Multiple spaces (to become 0 spaces)
	""      , // Strip leading and trailing spaces
	"="     , // Remove "= "
	","     , // Remove ", "
	""      , // Remove "\n"
	"};\n"  , // Add "\n" after "};"
	""      , // Remove all spaces.
);

$combinedFile_text="";

for($i=0; $i<sizeof($filesIn); $i+=1){
	// Bring file in.
	$data = file_get_contents($filesIn[$i]);

	// Do the regex.
	for($p=0; $p<sizeof($patterns); $p+=1){
		$data = preg_replace($patterns[$p], $replace[$p], $data);
	}

	// Write file out.
	file_put_contents( $filesOut[$i], $data ) ;

	// Add this text to the combined text.
	$combinedFile_text .= $data . "\n";
}

// Output the combined text to a file.
file_put_contents( $combinedFile1, $combinedFile_text ) ;
file_put_contents( $combinedFile2, $combinedFile_text ) ;

echo "\n<pre>\n";
echo "\nfilesIn : \n";      print_r($filesIn);
echo "\nfilesOut : \n";     print_r($filesOut);
echo "\ncombinedFile1 : \n"; print_r([$combinedFile1]);
echo "\ncombinedFile2 : \n"; print_r([$combinedFile2]);
echo "\n</pre>\n";

?>