#!/bin/bash

echo "Changing to the directory of this shell script"
SCRIPT_PATH=$(dirname "$(realpath "$0")")
FULLPATH="$SCRIPT_PATH/$(basename $0)"
cd $SCRIPT_PATH

echo "Adding the faded tilesets"
node c2bin_runit.js

echo -_-_-_-
echo

# This string needs to be seen or the client will think there was an error.
echo // C 2 Bin - DONE!
